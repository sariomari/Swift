from playground.shared_data import CITY_INFORMATION_MAP, get_task_manager
from playground.models import Driver, Customer, Store, Task, Order
from geopy.geocoders import Nominatim
from django.core.cache import cache


def update_driver_zone(driver_id, latitude, longitude):
    current_driver_city = Driver.objects.get(driver_id=driver_id).area
    current_driver_zone = Driver.objects.get(driver_id=driver_id).zone
    new_driver_zone = get_zone_from_lat_long(
        latitude=latitude, longitude=longitude)
    drivers_in_city = CITY_INFORMATION_MAP[current_driver_city][0]
    drivers_in_new_zone = drivers_in_city[new_driver_zone]

    print(new_driver_zone)

    print(f"current zone: {current_driver_zone}\n new_zone: {new_driver_zone}")

    # driver is online and still in the same zone
    if current_driver_zone == new_driver_zone:
        return

    # driver was offline, first update is now
    elif not current_driver_zone:
        drivers_in_new_zone = drivers_in_city[new_driver_zone]
        drivers_in_new_zone.add(driver_id)

    # driver has moved zones
    elif current_driver_zone != new_driver_zone:
        drivers_in_current_zone = drivers_in_city[current_driver_zone]
        drivers_in_current_zone.remove(driver_id)
        drivers_in_new_zone.add(driver_id)

    Driver.objects.filter(driver_id=driver_id).update(
        latitude=latitude,
        longitude=longitude,
        zone=new_driver_zone,
    )


def get_zone_from_lat_long(latitude, longitude):
    city = get_city(latitude, longitude)
    zones = CITY_INFORMATION_MAP[city][1]
    zone1, zone2, zone3 = zones["zone1Bounds"], zones["zone2Bounds"], zones["zone3Bounds"]
    if _is_in_Zone(latitude, longitude, zone1):
        return "ZONE1"
    elif _is_in_Zone(latitude, longitude, zone2):
        return "ZONE2"
    elif _is_in_Zone(latitude, longitude, zone3):
        return "ZONE3"
    return Exception("Not in correct delivery area")


def _is_in_Zone(lat, long, zone):
    lat, long = float(lat), float(long)
    if lat <= zone["maxLatitude"] and lat >= zone["minLatitude"] and long <= zone["maxLongitude"] and long >= zone["minLongitude"]:
        return True
    return False


def authorizeOrder(user_id, userLocation, store_id, items):
    """ Check if store is open, user credit card is working
    and that there are delivery drivers to deliver

    """
    try:
        Customer.objects.get(customer_id=user_id)
    except Exception:
        print("Customer not found")
        return False
    try:
        Store.objects.get(store_id=store_id)
    except Exception:
        print("Store not found")
        return False
    return True


def sendOrderNow(userID, user_location, store_location, items):
    user_lat, user_long = user_location["latitude"], user_location["longitude"]
    store_lat, store_long = store_location["latitude"], store_location["longitude"]

    store_city = get_city(store_lat, store_long)
    store_zone = get_zone_from_lat_long(store_lat, store_long)

    drivers_in_city = CITY_INFORMATION_MAP[store_city][0]
    drivers_in_zone = drivers_in_city[store_zone]


def create_task_from_order(order_id, store_id, customer_id):
    customer_obj = Customer.objects.get(customer_id=customer_id)
    store_obj = Store.objects.get(store_id=store_id)
    order_obj = Order.objects.get(order_id=order_id)

    store_id = store_id
    store_zone = get_zone_from_lat_long(
        store_obj.latitude, store_obj.longitude)
    print(store_zone)

    geolocator = Nominatim(user_agent="swift_app")
    fromAddress = geolocator.reverse(
        [str(store_obj.latitude), str(store_obj.longitude)])
    toAddress = geolocator.reverse(
        [str(customer_obj.latitude), str(customer_obj.longitude)])

    print(fromAddress, toAddress)
    new_task = Task.objects.create(
        store_id=store_obj,
        order_id=order_obj,
        fromAddress="Dov Gruner",
        toAddress="Shlomo Ben Yosef",
    )
    task_manager = get_task_manager()
    task_manager["TLV"][store_zone].add(new_task)
    cache.set("task_manager", task_manager)
    print("ALL TASKS:", task_manager)
    new_task.save()


def get_address_from_lat_long(latitude, longitude):
    return "Dov Gruner 17"


def get_city(latitude, longitude):
    return "TLV"
