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
    re_path(r'update_location/([0-9]+)$', views.update_location)
    #url(r'^customer$',views.CustomerApi),
    #url(r'^customer/([0-9]+)$',views.CustomerApi)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)