#from django.conf.urls import url
from playground import views
from django.urls import include, re_path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns =[
    re_path(r'^customer$',views.CustomerApi),
    re_path(r'^customer/([0-9]+)$',views.CustomerApi),
    re_path(r'^store$',views.StoreApi),
    re_path(r'^store/([0-9]+)$',views.StoreApi),
    re_path(r'^item$',views.ItemApi),
    re_path(r'^item/([0-9]+)$',views.ItemApi),
    re_path(r'^item/savefile',views.SaveFile),
    re_path(r'^cart$',views.CartApi),
    re_path(r'^cart/([0-9]+)$',views.CartApi),
    re_path(r'^customer/login$', views.login_view, name='login'),
    re_path(r'^order$', views.OrderApi),
    re_path(r'^order/([0-9]+)$', views.OrderApi),
    re_path(r'^order/current$', views.CurrentOrdersApi),
    re_path(r'^store/get_store_name$', views.get_store_name, name='get_store_name'),
    re_path(r'^cart/get_cart_id$', views.get_cart_id, name='get_cart_id'),
    re_path(r'^check_tasks_for_driver$', views.check_tasks_for_driver, name='check_tasks_for_driver'),
    re_path(r'^accept_task', views.accept_task, name='accept_task'),
    re_path(r'^complete_task', views.complete_task, name='complete_task'),
    re_path(r'^order/get_orders_by_customer$', views.get_orders_by_customer, name='get_orders_by_customer'),
    re_path(r'^item/current$', views.CurrentItemStoreApi),
    re_path(r'^item/get_store_items$', views.get_store_items, name='get_store_items'),
    re_path(r'cart/get_cart_items$', views.get_cart_items, name='get_cart_items'),
    re_path(r'item/get_item_data$', views.get_item_data, name='get_item_data'),
    re_path(r'cart/remove_cart_item$', views.remove_cart_item, name='remove_cart_item'),
    re_path(r'^update_location$', views.update_location),
    re_path(r'^driver$', views.DriverApi),
    re_path(r'^item/get_store_by_item_id$', views.get_store_by_item_id, name='get_store_by_item_id'),
    re_path(r'^driver/([0-9]+)$', views.DriverApi),
    #url(r'^customer$',views.CustomerApi),
    #url(r'^customer/([0-9]+)$',views.CustomerApi)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)