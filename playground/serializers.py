from rest_framework import serializers
from playground.models import Customer, Store, Item, Order, Driver, Task


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('customer_id', 'first_name', 'last_name', 'username', 'password',
                  'phone_number', 'email', 'latitude', 'longitude', 'favorite_stores')


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('store_id', 'store_name', 'latitude',
                  'longitude', 'Area', 'Zone')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('item_id', 'description', 'price',
                  'quantity', 'picture1', 'picture2', 'store')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('order_id', 'customer_id', 'items_ordered', 'store_id')


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ('driver_id', 'first_name', 'last_name', 'driver_username',
                  'driver_password', 'latitude', 'longitude', 'area', 'zone', 'order_id')


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('task_id', 'store_id', 'driver_id',
                  'order_id', 'active', 'timestamp')
