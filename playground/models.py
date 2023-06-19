from django.db import models

class User:
    def __init__(self, user_id, first_name, last_name, location):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.location = location
        
    def get_location(self):
        return self.location
    
    def update_location(self, new_location):
        # insert location to DB
        # ...
        self.location = new_location
    
class Driver:
    def __init__(self, driver_id, first_name, last_name, delivery_area, delivery_zone, location):
        self.user_id = driver_id
        self.first_name = first_name
        self.last_name = last_name
        self.location = location
        self.delivery_area = delivery_area
        self.delivery_zone = delivery_zone
    
    def get_location(self):
        return self.location
    
    def get_delivery_zone(self):
        return self.delivery_zone
    
    def update_delivery_zone(self, new_zone):
        """ This method updates the delivery zone to new_zone
            be careful that another function translates from location to zone
        """
        self.delivery_zone = new_zone
        
    def update_location(self, new_location):
        # insert location to DB
        # ...
        self.location = new_location
