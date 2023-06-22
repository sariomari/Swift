from playground.shared_data import CITY_INFORMATION_MAP
from playground.models import Driver


def update_driver_zone(driver_id, latitude, longitude):
    current_driver_city = Driver.objects.get(driver_id=driver_id).area
    current_driver_zone = Driver.objects.get(driver_id=driver_id).zone
    new_driver_zone = get_zone_from_lat_long(
        latitude=latitude, longitude=longitude)

    if current_driver_zone != new_driver_zone:
        drivers_in_city = CITY_INFORMATION_MAP[current_driver_city]
        drivers_in_current_zone = drivers_in_city[current_driver_zone]
        drivers_in_new_zone = drivers_in_city[new_driver_zone]

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
        return zone1
    elif _is_in_Zone(latitude, longitude, zone2):
        return zone2
    elif _is_in_Zone(latitude, longitude, zone3):
        return zone3
    return Exception("Not in correct delivery area")


def _is_in_Zone(lat, long, zone):
    if lat <= zone["maxLatitude"] and lat >= zone["minLatitude"] and long <= zone["maxLongitude"] and long >= zone["minLongitude"]:
        return True
    return False


def authorizeOrder(userID, userLocation, storeLocation, items):
    """ Check if store is open, user credit card is working
    and that there are delivery drivers to deliver

    """
    pass


def sendOrderNow(userID, user_location, store_location, items):
    user_lat, user_long = user_location["latitude"], user_location["longitude"]
    store_lat, store_long = store_location["latitude"], store_location["longitude"]

    store_city = get_city(store_lat, store_long)
    store_zone = get_zone_from_lat_long(store_lat, store_long)

    drivers_in_city = CITY_INFORMATION_MAP[store_city][0]
    drivers_in_zone = drivers_in_city[store_zone]

    for driver_id in drivers_in_zone:
        assign_task_to_driver(driver_id, user_lat, user_long,
                              store_lat, store_long, items)


def get_city(latitude, longitude):
    return "TLV"


def assign_task_to_driver(driver_id, user_location, store_location, items):
    pass
