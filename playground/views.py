from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse

from playground.models import Customer,Store,Item,Order,Driver
from playground.serializers import CustomerSerializer ,StoreSerializer,ItemSerializer
from django.core.files.storage import default_storage
 
@csrf_exempt 
def CustomerApi(request,id=0):
    if request.method=='GET':
        customers = Customer.objects.all()
        customer_serializer=CustomerSerializer(customers,many=True)
        return JsonResponse(customer_serializer.data,safe=False)
    elif request.method=='POST':
        customer_data=JSONParser().parse(request)
        customer_serializer=CustomerSerializer(data=customer_data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed To Add!",safe=False)  
    elif request.method=='PUT':
        customer_data=JSONParser().parse(request)
        customer=Customer.objects.get(customer_id=customer_data['customer_id'] )
        customer_serializer=CustomerSerializer(customer,data=customer_data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed To Update!",safe=False)
    elif request.method=='DELETE':
        customer=Customer.objects.get(customer_id=id )
        customer.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    elif request.method == 'FAVORITE_STORES':
        customer_id = id
        customer = Customer.objects.get(customer_id=customer_id)
        favorite_stores = customer.favorite_stores.all()
        store_serializer = StoreSerializer(favorite_stores, many=True)
        return JsonResponse(store_serializer.data, safe=False)

    


@csrf_exempt 
def StoreApi(request,id=0):
    if request.method=='GET':
        stores = Store.objects.all()
        store_serializer=StoreSerializer(stores,many=True)
        return JsonResponse(store_serializer.data,safe=False)
    elif request.method=='POST':
        store_data=JSONParser().parse(request)
        store_serializer=StoreSerializer(data=store_data)
        if store_serializer.is_valid():
            store_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed To Add!",safe=False)  
    elif request.method=='PUT':
        store_data=JSONParser().parse(request)
        store=Store.objects.get(store_id=store_data['store_id'] )
        store_serializer=StoreSerializer(store,data=store_data)
        if store_serializer.is_valid():
            store_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed To Update!",safe=False)
    elif request.method=='DELETE':
        store=Store.objects.get(store_id=id )
        store.delete()
        return JsonResponse("Deleted Successfully",safe=False)
   
@csrf_exempt 
def ItemApi(request,id=0):
    if request.method=='GET':
        items = Item.objects.all()
        item_serializer=ItemSerializer(items,many=True)
        return JsonResponse(item_serializer.data,safe=False)
    elif request.method=='POST':
        item_data=JSONParser().parse(request)
        item_serializer=ItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed To Add!",safe=False)  
    elif request.method=='PUT':
        item_data=JSONParser().parse(request)
        item=Item.objects.get(item_id=item_data['item_id'] )
        item_serializer=ItemSerializer(item,data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed To Update!",safe=False)
    elif request.method=='DELETE':
        item=Item.objects.get(item_id=id )
        item.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt 
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)

""" 

from orders import authorizeOrder, sendOrderNow, getZone
from shared_data import TLV_DRIVERS

def update_driver_zone(request):
    # Get driver info
    driver_id = request.GET.get('user_id')
    driver_lat = request.GET.get('latitude')
    driver_long = request.GET.get('longitude')
    current_zone = request.GET.get('current_zone')
    
    # New driver zone
    new_zone = getZone(driver_lat, driver_long)
    
    # Get the drivers in old, new zones
    drivers_in_current_zone = TLV_DRIVERS[current_zone]
    drivers_in_new_zone = TLV_DRIVERS[new_zone]
    
    # Update drivers in zones
    if new_zone != current_zone:
        drivers_in_current_zone.pop(driver_id)
        drivers_in_new_zone.append(driver_id)
        
        

def send_order(request):
    # Access the request data
    user_id = request.GET.get('userID')
    user_location = request.GET.get('userLocation')
    store_location = request.GET.get('storeLocation')
    items = request.GET.get('items')
    
    user_lat, user_long = user_location["latitude"], user_location["longitude"]
    store_lat, store_long = store_location["latitude"], store_location["longitude"]

    # Process the data
    try:
        authorizeOrder(user_id, user_location, store_location, items)
    except Exception:
        print("Error occured while processing order.")
        
    sendOrderNow(user_id, user_location, store_location, items)
    
    

    # Return a JSON response
    return JsonResponse({'message': 'Order received successfully'})
"""