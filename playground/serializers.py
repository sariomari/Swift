from rest_framework import serializers
from playground.models import Customer,Store,Item,Order,Driver

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields=('customer_id','first_name','last_name','username','password','phone_number','email','latitude','longitude')   

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model=Store
        fields=('store_id','store_name','latitude','longitude','Area','Zone')   


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item
        fields=('item_id','description','price','quantity','picture1','picture2','store')   
