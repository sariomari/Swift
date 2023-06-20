"""
URL configuration for swiftbackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
#from django.conf.urls import url,include
from django.urls import include, re_path

#from playground.views import send_order, update_driver_zone

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^', include('playground.urls')),
    #url(r'^',include('playground.urls'))
    #path('api/send-order/', send_order, name='send_order'),
    #path('api/update_driver_zone', update_driver_zone, name='update_driver_zone')
]
