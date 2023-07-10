from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from playground.models import Customer, Store, Item, Order, Driver, Cart, Task
from playground.serializers import CustomerSerializer, StoreSerializer, ItemSerializer, OrderSerializer, CartSerializer, DriverSerializer, TaskSerializer
from playground.driver_utils import update_driver_zone, create_task_from_order, get_zone_from_lat_long
from playground.shared_data import get_task_manager
from django.core.files.storage import default_storage
import json
from django.core.cache import cache

from django.http import JsonResponse, HttpResponse


@csrf_exempt
def login_view(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    print(username)
    print(password)
    try:
        user = Customer.objects.get(username=username)
    except Customer.DoesNotExist:
        return JsonResponse({'error': 'Invalid username or password'}, status=401)

    if user.password == password:
        request.session['customer_id'] = user.customer_id
        request.session['first_name'] = user.first_name
        request.session['last_name'] = user.last_name
        request.session['username'] = user.username
        request.session['password'] = user.password
        request.session['phone_number'] = user.phone_number
        request.session['latitude'] = float(user.latitude)
        request.session['longitude'] = float(user.longitude)
        favorite_stores = list(user.favorite_stores.values())

        return JsonResponse({'message': 'Login Successful', 'customerId': user.customer_id,  'first_name': user.first_name, 'last_name': user.last_name, 'username': user.username, 'password': user.password, 'phone_number': user.phone_number, 'email': user.email, 'latitude': user.latitude, 'longitude': user.longitude, 'favorite_stores': favorite_stores})
    else:
        return JsonResponse({'error': 'Invalid username or password'}, status=401)


@csrf_exempt
def login_view_driver(request):
    driver_username = request.GET.get('driver_username')
    driver_password = request.GET.get('driver_password')
    print(driver_username)
    print(driver_password)
    try:
        user = Driver.objects.get(driver_username=driver_username)
    except Customer.DoesNotExist:
        return JsonResponse({'error': 'Invalid username or password'}, status=401)

    if user.driver_password == driver_password:
        request.session['driver_id'] = user.driver_id
        request.session['driver_username'] = user.driver_username
        request.session['driver_password'] = user.driver_password

        return JsonResponse({'message': 'Login Successful', 'driver_id': user.driver_id,  'driver_username': user.driver_username, 'driver_password': user.driver_password})
    else:
        return JsonResponse({'error': 'Invalid username or password'}, status=401)


@csrf_exempt
def get_store_items(request):
    # Assuming the store ID is sent as a query parameter
    store_id = request.GET.get('store_id')
    if store_id is not None:
        try:
            items = Item.objects.filter(store_id=store_id)
            serializer = ItemSerializer(items, many=True)
            return JsonResponse({'items': serializer.data})
        except Item.DoesNotExist:
            return JsonResponse({'error': 'Store not found'}, status=404)
    else:
        return JsonResponse({'error': 'Store ID parameter is missing'}, status=400)


@csrf_exempt
def CustomerApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            try:
                customer = Customer.objects.get(customer_id=id)
            except Customer.DoesNotExist:
                return JsonResponse({"error": "User does not exist"}, status=404)
            customer_serializer = CustomerSerializer(customer)
            customer_data = customer_serializer.data
            del customer_data['customer_id']
            return JsonResponse(customer_data, safe=False)
        else:
            customers = Customer.objects.all()
            customer_serializer = CustomerSerializer(customers, many=True)
            return JsonResponse(customer_serializer.data, safe=False)
    elif request.method == 'POST':
        customer_data = JSONParser().parse(request)
        customer_serializer = CustomerSerializer(data=customer_data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add!", safe=False)
    elif request.method == 'PUT':
        customer_data = JSONParser().parse(request)
        customer = Customer.objects.get(
            customer_id=customer_data['customer_id'])
        customer_serializer = CustomerSerializer(customer, data=customer_data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed To Update!", safe=False)
    elif request.method == 'DELETE':
        customer = Customer.objects.get(customer_id=id)
        customer.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    elif request.method == 'FAVORITE_STORES':
        customer_id = id
        customer = Customer.objects.get(customer_id=customer_id)
        favorite_stores = customer.favorite_stores.all()
        store_serializer = StoreSerializer(favorite_stores, many=True)
        return JsonResponse(store_serializer.data, safe=False)
    elif request.method == 'PUT_F':
        fav_data = JSONParser().parse(request)
        customer_id = fav_data['customer_id']
        store_id = fav_data['store_id']
        customer = Customer.objects.filter(customer_id=customer_id).first()
        store = Store.objects.filter(store_id=store_id).first()
        if customer and store:
            if 0 <= store_id <= 8:  # Checking if store_id is within the valid range
                customer.favorite_stores.add(store)
                return JsonResponse("Update Successfully", safe=False)
            else:
                return JsonResponse("Invalid store_id", status=400)
        else:
            return JsonResponse("Customer or store not found", status=404)
    elif request.method == 'DELETE_F':
        fav_data = JSONParser().parse(request)
        customer_id = fav_data['customer_id']
        store_id = fav_data['store_id']
        customer = Customer.objects.filter(customer_id=customer_id).first()
        store = Store.objects.filter(store_id=store_id).first()
        if customer and store:
            if 0 <= store_id <= 8:  # Checking if store_id is within the valid range
                customer.favorite_stores.remove(store)
                return JsonResponse("Deleted store Successfully", safe=False)
            else:
                return JsonResponse("Invalid store_id", status=400)
        else:
            return JsonResponse("Customer or store not found", status=404)


@csrf_exempt
def DriverApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            try:
                driver = Driver.objects.get(customer_id=id)
            except Driver.DoesNotExist:
                return JsonResponse({"error": "User does not exist"}, status=404)
            driver_serializer = DriverSerializer(driver)
            driver_data = driver_serializer.data
            del driver_data['driver_id']
            return JsonResponse(driver_data, safe=False)
        else:
            drivers = Driver.objects.all()
            driver_serializer = DriverSerializer(drivers, many=True)
            return JsonResponse(driver_serializer.data, safe=False)
    elif request.method == 'POST':
        driver_data = JSONParser().parse(request)
        driver_serializer = DriverSerializer(data=driver_data)
        if driver_serializer.is_valid():
            driver_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add!", safe=False)
    elif request.method == 'DELETE':
        driver = Driver.objects.get(driver_id=id)
        driver.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def StoreApi(request, id=0):
    if request.method == 'GET':
        stores = Store.objects.all()
        store_serializer = StoreSerializer(stores, many=True)
        return JsonResponse(store_serializer.data, safe=False)
    elif request.method == 'POST':
        store_data = JSONParser().parse(request)
        store_serializer = StoreSerializer(data=store_data)
        if store_serializer.is_valid():
            store_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add!", safe=False)
    elif request.method == 'PUT':
        store_data = JSONParser().parse(request)
        store = Store.objects.get(store_id=store_data['store_id'])
        store_serializer = StoreSerializer(store, data=store_data)
        if store_serializer.is_valid():
            store_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed To Update!", safe=False)
    elif request.method == 'DELETE':
        store = Store.objects.get(store_id=id)
        store.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def ItemApi(request, id=0):
    if request.method == 'GET' and id == 0:
        items = Item.objects.all()
        item_serializer = ItemSerializer(items, many=True)
        return JsonResponse(item_serializer.data, safe=False)
    elif request.method == 'POST':
        item_data = JSONParser().parse(request)
        item_serializer = ItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add!", safe=False)
    elif request.method == 'PUT':
        item_data = JSONParser().parse(request)
        item = Item.objects.get(item_id=item_data['item_id'])
        item_serializer = ItemSerializer(item, data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed To Update!", safe=False)
    elif request.method == 'DELETE':
        item = Item.objects.get(item_id=id)
        item.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt 
def get_store_by_item_id(request):
    try:
        item_id = request.GET.get('item_id')    
        item = Item.objects.get(item_id=item_id)
        return HttpResponse(f"Store ID: {item.store_id}")
    except Item.DoesNotExist:
        return HttpResponse("Item not found", status=404)


@csrf_exempt
def CartApi(request, id=0):
    if request.method == 'GET' and id == 0:
        carts = Cart.objects.all()
        cart_serializer = CartSerializer(carts, many=True)
        return JsonResponse(cart_serializer.data, safe=False)
    elif request.method == 'POST':
        cart_data = json.loads(request.body)
        customer_id = cart_data.get('customer')
        itemsincart_ids = cart_data.get('itemsincart', [])

        try:
            customer = Customer.objects.get(customer_id=customer_id)
            cart, created = Cart.objects.get_or_create(customer=customer)

            # Update the items in the existing cart
            itemsincart = Item.objects.filter(item_id__in=itemsincart_ids)
            cart.itemsincart.set(itemsincart)

            if created:
                return JsonResponse("Cart Created Successfully", status=201, safe=False)
            else:
                return JsonResponse("Cart Updated Successfully", status=200, safe=False)

        except Customer.DoesNotExist:
            return JsonResponse("Customer not found", status=404)

        except Cart.DoesNotExist:
            return JsonResponse("Cart not found", status=404)

    elif request.method == 'PUT':
        cart_data = JSONParser().parse(request)
        cart = Cart.objects.get(cart_id=cart_data['cart_id'])
        cart_serializer = CartSerializer(cart, data=cart_data)
        if cart_serializer.is_valid():
            cart_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed To Update!", safe=False)
    elif request.method == 'DELETE':
        cart = Cart.objects.get(cart_id=id)
        cart.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    elif request.method == 'ADD_I':
        all_data = JSONParser().parse(request)
        customer = Customer.objects.get(customer_id=all_data['customer_id'])
        cart = Cart.objects.get(cart_id=all_data['cart_id'])
        item = Item.objects.get(item_id=all_data['item_id'])
        if customer:
            if cart:
                if item:
                    cart.itemsincart.add(item)
                    return JsonResponse("Update Successfully", safe=False)
                else:
                    return JsonResponse("no item found", safe=False)
            else:
                return JsonResponse("no store found", safe=False)
        else:
            return JsonResponse("no customer found", safe=False)
    elif request.method == 'DELETE_I':
        all_data = JSONParser().parse(request)
        customer = Customer.objects.get(customer_id=all_data['customer_id'])
        cart = Cart.objects.get(cart_id=all_data['cart_id'])
        item = Item.objects.get(item_id=all_data['item_id'])
        if customer:
            if cart:
                if item:
                    cart.itemsincart.remove(item)
                    return JsonResponse("Update Successfully", safe=False)
                else:
                    return JsonResponse("no item found", safe=False)
            else:
                return JsonResponse("no store found", safe=False)
        else:
            return JsonResponse("no customer found", safe=False)


@csrf_exempt
def SaveFile(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)


@csrf_exempt
def OrderApi(request, id=0):
    if request.method == 'GET':
        order = Order.objects.all()
        order_serializer = OrderSerializer(order, many=True)
        return JsonResponse(order_serializer.data, safe=False)
    elif request.method == 'POST':
        order_data = JSONParser().parse(request)
        print(order_data)
        order_serializer = OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            order_obj = order_serializer.save()
            create_task_from_order(order_id=order_obj.order_id,
                                   store_id=order_data['store_id'],
                                   customer_id=order_data['customer_id'])
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add!", safe=False)
    elif request.method == 'PUT':
        order_data = JSONParser().parse(request)
        order = Order.objects.get(order_id=order_data['order_id'])
        order_serializer = OrderSerializer(order, data=order_data)
        if order_serializer.is_valid():
            order_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed To Update!", safe=False)
    elif request.method == 'DELETE':
        order = Order.objects.get(order_id=id)
        order.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def get_cart_id(request):
    try:
        customer_id = request.GET.get('customer_id')
        cart = Cart.objects.get(customer=customer_id)
        return HttpResponse(cart.cart_id)
    except Cart.DoesNotExist:
        return None


@csrf_exempt
def CurrentItemStoreApi(request):
    if request.method == 'GET':
        item_id = request.GET.get('item_id')
        if item_id:
            item = Item.objects.get(item_id=item_id)
            store = Store.objects.get(item=item_id)
            store_id = store.store_id
            return JsonResponse(store_id, safe=False)
        else:
            return JsonResponse("Missing item_id parameter", safe=False)
    else:
        return JsonResponse("Method not allowed", status=405)


@csrf_exempt
def CurrentOrdersApi(request):
    if request.method == 'GET':
        customer_id = request.GET.get('customer_id')
        if customer_id:
            customer = Customer.objects.get(customer_id=customer_id)
            orders = Order.objects.filter(customer_id=customer)
            order_ids = [order.order_id for order in orders]
            return JsonResponse(order_ids, safe=False)
        else:
            return JsonResponse("Missing customer_id parameter", safe=False)
    else:
        return JsonResponse("Method not allowed", status=405)


@csrf_exempt
def get_cart_items(request):
    try:
        customer_id = request.GET.get('customer')
        cart = Cart.objects.get(customer_id=customer_id)
        cart_items = cart.itemsincart.all()
        item_ids = [item.item_id for item in cart_items]
        return JsonResponse({'cart_items': item_ids}, status=200)
    except Cart.DoesNotExist:
        return JsonResponse({'error': 'Cart not found'}, status=404)


@csrf_exempt
def get_item_data(request):
    try:
        item_id = request.GET.get('item_id')
        item = Item.objects.get(item_id=item_id)
        serializer = ItemSerializer(item)
        return JsonResponse(serializer.data, status=200)
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item not found'}, status=404)


@csrf_exempt
def remove_cart_item(request):
    if request.method == 'POST':
        try:
            customer_id = request.GET.get('customer')
            item_id = request.GET.get('item')
            # Retrieve the cart for the customer
            cart = Cart.objects.get(customer_id=customer_id)

            # Remove the item from the cart
            cart.itemsincart.remove(item_id)
            cart.save()

            return JsonResponse({'success': True, 'message': 'Item removed from cart successfully.'})
        except Cart.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Cart not found.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})

    return JsonResponse({'success': False, 'message': 'Invalid request method.'})


@csrf_exempt
def update_location(request):
    if request.method == 'POST':
        driver_data = JSONParser().parse(request)
        driver_id = driver_data['driver_id']
        latitude = driver_data['latitude']
        longitude = driver_data['longitude']
        Driver.objects.filter(driver_id=driver_id).update(
            latitude=latitude, longitude=longitude)
        update_driver_zone(driver_id=driver_id,
                           latitude=float(latitude), longitude=float(longitude))

        return JsonResponse({'message': 'Location data saved successfully'})
    return JsonResponse({'message': 'Invalid request method'})


@csrf_exempt
def get_orders_by_customer(request):
    try:
        customer_id = request.GET.get('customer_id')
        orders = Order.objects.filter(customer_id=customer_id)
        order_data = []
        for order in orders:
            items_ordered = order.items_ordered.all()
            items_data = []
            for item in items_ordered:
                items_data.append({
                    'item_id': item.item_id,
                    'description': item.description,
                    # Add any other fields you want to include for each item
                })
            order_data.append({
                'order_id': order.order_id,
                'destination_latitude': order.destination_latitude,
                'destination_longitude': order.destination_longitude,
                'store_id': order.store_id.store_id,
                'order_time': order.order_time,
                'items_ordered': items_data,
            })
        return JsonResponse({'orders': order_data})
    except Exception as e:
        return JsonResponse({'error': str(e)})


@csrf_exempt
def get_store_name(request):
    try:
        store_id = request.GET.get('store_id')
        store = Store.objects.get(store_id=store_id)
        store_name = store.store_name
        latitude = store.latitude
        longitude = store.longitude
        return JsonResponse({'store_name': store_name,'latitude':latitude,'longitude':longitude})
    except Store.DoesNotExist:
        return JsonResponse({'error': 'Store not found'})
    except Exception as e:
        return JsonResponse({'error': str(e)})


@csrf_exempt
def accept_task(request):
    '''Task was accepted by the driver'''
    if request.method == 'POST':
        task_data = json.loads(request.body)
        print("Task data:", task_data)
        task_id, driver_id = task_data['task_id'], task_data['driver_id']
        latitude, longitude = task_data['latitude'], task_data['longitude']
        driver_zone = get_zone_from_lat_long(latitude, longitude)
        print("im here")
        driver_obj = Driver.objects.get(driver_id=driver_id)
        task_obj = Task.objects.get(task_id=task_id)
        Task.objects.filter(task_id=task_id).update(driver_id=driver_obj)

        task_manager = get_task_manager()
        print(task_manager)
        task_manager["TLV"][driver_zone].remove(task_obj)
        cache.set('task_manager', task_manager)
        return HttpResponse('Task was successfully accepted')
    else:
        return HttpResponse('Invalid request method')


@csrf_exempt
def complete_task(request):
    if request.method == 'DELETE':
        task_data = json.loads(request.body)
        print(task_data)
        task_id = task_data['task_id']
        print(task_id)
        task_obj = Task.objects.get(task_id=task_id)
        print(task_obj)
        task_zone = task_obj.zone
        Task.objects.filter(task_id=task_id).update(
            completed=True
        )
        return HttpResponse('Task completed')
    else:
        return HttpResponse('Invalid request method')


@csrf_exempt
def check_tasks_for_driver(request):
    if request.method == 'GET':
        latitude = request.GET.get('latitude')
        longitude = request.GET.get('longitude')
        driver_zone = get_zone_from_lat_long(latitude, longitude)
        task_manager = get_task_manager()
        print("TASK MANAGER: ", task_manager)
        print("DRIVER ZONE:", driver_zone)
        tasks_in_driver_zone = task_manager["TLV"][driver_zone]
        print("TASKS", tasks_in_driver_zone)
        if (len(tasks_in_driver_zone) > 0):
            print("THERE ARE TASKS")
            task = tasks_in_driver_zone.pop()
            tasks_in_driver_zone.add(task)
            cache.set("task_manager", task_manager)
            print(task.task_id, task.fromAddress)
            return JsonResponse({
                "task_id": task.task_id,
                "fromAddress": task.fromAddress,
                "toAddress": task.toAddress,
            })
        print("NO TASKS")
        return HttpResponse("No Tasks")
    return HttpResponse("invalid request method")