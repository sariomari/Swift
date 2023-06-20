from django.db import models

class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    username = models.CharField(max_length=100, default='')
    password = models.CharField(max_length=100, default='')
    phone_number = models.CharField(max_length=20, default='')
    email = models.EmailField(default='')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)

class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    store_name = models.CharField(max_length=100, default='')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    Area = models.CharField(max_length=100, default='')
    Zone = models.CharField(max_length=100, default='')

class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100, default='')
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    picture1 = models.ImageField(upload_to='item_pictures', null=True)
    picture2 = models.ImageField(upload_to='item_pictures', null=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, default=1)

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    items_ordered = models.ManyToManyField(Item)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)

class Driver(models.Model):
    driver_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    driver_username = models.CharField(max_length=100, default='')
    driver_password = models.CharField(max_length=100, default='')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
