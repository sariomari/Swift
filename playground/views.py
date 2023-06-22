from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from playground.models import Customer, Store, Item, Order, Driver
from playground.serializers import CustomerSerializer, StoreSerializer, ItemSerializer, DriverSerializer, TaskSerializer
from django.core.files.storage import default_storage
from playground.driver_utils import update_driver_zone


@csrf_exempt
def CustomerApi(request, id=0):
    if request.method == 'GET':
        customers = Customer.objects.all()
        customer_serializer = CustomerSerializer(customers, many=True)
        return JsonResponse(customer_serializer.data, safe=False)
    elif request.method == 'POST':
        customer_data = JSONParser().parse(request)
        customer_serializer = CustomerSerializer(data=customer_data)
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
        return JsonResponse("Deleted Successfully", safe=False)


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
def ItemApi(request, id=0):
    if request.method == 'GET':
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
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def SaveFile(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)


@csrf_exempt
@api_view(['POST'])
def create_driver(request):
    if request.method == 'POST':
        driver_serializer = DriverSerializer(data=request.data)
        if driver_serializer.is_valid():
            driver_serializer.save()
            return Response("Added Successfully", safe=False)
        return Response("Failed to update driver", safe=False)

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
        driver_id = request.POST.get('driver_id')
        latitude = request.POST.get('latitude')
        longitude = request.POST.get('longitude')

        Driver.objects.filter(driver_id=driver_id).update(
            latitude=latitude, longitude=longitude)
        update_driver_zone(driver_id=driver_id,
                           latitude=latitude, longitude=longitude)

        return JsonResponse({'message': 'Location data saved successfully'})
    return JsonResponse({'message': 'Invalid request method'})


# def check_for_new_tasks(request):
#     if request.method != 'GET':
#         return JsonResponse({'message': 'Invalid request method'})
#     driver_id = request.GET.get('driver_id')
#     driver_obj = Driver.objects.get(driver_id=driver_id)
#     area, zone = driver_obj.area, driver_obj.zone
