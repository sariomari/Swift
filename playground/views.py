from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from playground.models import Customer,Store,Item,Order,Driver,Cart
from playground.serializers import CustomerSerializer ,StoreSerializer,ItemSerializer,OrderSerializer,CartSerializer,DriverSerializer
from django.core.files.storage import default_storage
from django.contrib.auth import authenticate, login
from django.views.decorators.http import require_POST

from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest

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
        request.session['latitude'] =float(user.latitude)
        request.session['longitude'] = float(user.longitude)
        favorite_stores = list(user.favorite_stores.values())

        return JsonResponse({'message': 'Login Successful', 'customerId': user.customer_id,  'first_name': user.first_name, 'last_name': user.last_name, 'username': user.username
        , 'password': user.password
        , 'phone_number': user.phone_number,'email':user.email
        , 'latitude': user.latitude,'longitude': user.longitude,'favorite_stores':favorite_stores})
    else:
        return JsonResponse({'error': 'Invalid username or password'}, status=401)



@csrf_exempt 
def get_store_items(request):
    store_id = request.GET.get('store_id')  # Assuming the store ID is sent as a query parameter
    if store_id is not None:
        try:
            items = Item.objects.filter(store_id=store_id)
            serializer = ItemSerializer(items, many=True)
            print(serializer.data) 
            return JsonResponse({'items': serializer.data})
        except Item.DoesNotExist:
            return JsonResponse({'error': 'Store not found'}, status=404)
    else:
        return JsonResponse({'error': 'Store ID parameter is missing'}, status=400)
    

@csrf_exempt 
def CustomerApi(request,id=0):
    if request.method=='GET':
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
    elif request.method=='POST':
        customer_data=JSONParser().parse(request)
        customer_serializer=CustomerSerializer(data=customer_data)
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
        return JsonResponse("Deleted Successfully",safe=False)
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
            return JsonResponse("Customer or store not found",status=404)    
   



@csrf_exempt 
def DriverApi(request,id=0):
    if request.method=='GET':
        if id != 0:
            try:
                driver = Driver.objects.get(customer_id=id)
            except Driver.DoesNotExist:
                return JsonResponse({"error": "User does not exist"}, status=404)
            driver_serializer = DriverSerializer(customer)
            driver_data = driver_serializer.data
            del driver_data['driver_id']
            return JsonResponse(driver_data, safe=False)
        else:
            drivers = Driver.objects.all()
            driver_serializer = DriverSerializer(drivers, many=True)
            return JsonResponse(driver_serializer.data, safe=False)
    elif request.method=='POST':
        driver_data=JSONParser().parse(request)
        driver_serializer=DriverSerializer(data=driver_data)
        if driver_serializer.is_valid():
            driver_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed To Add!",safe=False)
    elif request.method=='DELETE':
        driver=Driver.objects.get(driver_id=id )
        driver.delete()
        return JsonResponse("Deleted Successfully",safe=False)







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
def ItemApi(request,id=0):
    if request.method=='GET' and id==0:
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
        return JsonResponse("Deleted Successfully",safe=False)
    
@csrf_exempt 
def CartApi(request,id=0):
    if request.method=='GET' and id==0:
        carts = Cart.objects.all()
        cart_serializer=CartSerializer(carts,many=True)
        return JsonResponse(cart_serializer.data,safe=False)
    elif request.method == 'POST':
        cart_data = JSONParser().parse(request)
        customer_id = cart_data.pop('customer')
        item_ids = cart_data.pop('itemsincart')

        try:
            customer = Customer.objects.get(customer_id=customer_id)
            items = Item.objects.filter(item_id__in=item_ids)
            cart_serializer = CartSerializer(data=cart_data)

            if cart_serializer.is_valid():
                cart = cart_serializer.save(customer=customer)
                cart.itemsincart.set(items)
                return JsonResponse("Added Successfully", safe=False)
            else:
                return JsonResponse(cart_serializer.errors, status=400)

        except Customer.DoesNotExist:
            return JsonResponse("Customer not found", status=404)

        except Item.DoesNotExist:
            return JsonResponse("One or more items not found", status=404)
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
  


@csrf_exempt
def SaveFile(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)

@csrf_exempt 
def OrderApi(request,id=0):
    if request.method=='GET':
        order = Order.objects.all()
        order_serializer=OrderSerializer(order,many=True)
        return JsonResponse(order_serializer.data,safe=False)
    elif request.method=='POST':
        order_data=JSONParser().parse(request)
        order_serializer=OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            order_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed To Add!",safe=False)  
    elif request.method=='PUT':
        order_data=JSONParser().parse(request)
        order=Order.objects.get(order_id=order_data['order_id'] )
        order_serializer=OrderSerializer(order,data=order_data)
        if order_serializer.is_valid():
            order_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed To Update!",safe=False)
    elif request.method=='DELETE':
        order=Order.objects.get(order_id=id )
        order.delete()
        return JsonResponse("Deleted Successfully",safe=False)

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
        return JsonResponse("Method not allowed",status=405)

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
@api_view(['POST'])
def create_task(request):
    if request.method == 'POST':
        task_serializer = TaskSerializer(data=request.data)
        print(task_serializer.get_fields())
        if task_serializer.is_valid():
            print("serializer is valid")
            task_serializer.save()
            return Response("Added Successfully", safe=False)
        print("invalid")
        return Response("Failed to update driver", status=400)
    return Response({'message': 'Invalid request method'}, status=405)

@csrf_exempt
def update_location(request):
    if request.method == 'POST':
        driver_data = JSONParser().parse(request)
        driver_id = driver_data['driver_id']
        latitude = driver_data['latitude']
        longitude = driver_data['longitude']
        print(driver_id, latitude, longitude)
        Driver.objects.filter(driver_id=driver_id).update(
            latitude=latitude, longitude=longitude)
        # update_driver_zone(driver_id=driver_id,
        #                    latitude=latitude, longitude=longitude)

        return JsonResponse({'message': 'Location data saved successfully'})
    return JsonResponse({'message': 'Invalid request method'})
