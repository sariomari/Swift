from django.shortcuts import render
from django.http import JsonResponse
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
