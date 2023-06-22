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
    favorite_stores = models.ManyToManyField('Store', related_name='favorited_by', blank=True)


class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    store_name = models.CharField(max_length=100, default='')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    area = models.CharField(max_length=100, default='')
    zone = models.CharField(max_length=100, default='')
    picpath = models.CharField(max_length=100, default='')


class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100, default='')
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    picture1 =models.CharField(max_length=500, default='')
    picture2 = models.CharField(max_length=500, default='')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, default=1)

class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)
    itemsincart = models.ManyToManyField(Item)

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    destination_latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    destination_longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    items_ordered = models.ManyToManyField(Item)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)

class Driver(models.Model):
    driver_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    driver_username = models.CharField(max_length=100, default='')
    driver_password = models.CharField(max_length=100, default='')
    email = models.EmailField(default='')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    area = models.CharField(max_length=100, default='')
    zone = models.CharField(max_length=100, default='')
    order_id = models.ForeignKey(Order, on_delete=models.SET_NULL,default=None , null=True)

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    driver_id = models.ForeignKey(
        Driver, on_delete=models.CASCADE, default=None)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)
    timestamp = models.TimeField(auto_now_add=True)