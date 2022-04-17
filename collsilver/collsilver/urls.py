from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from landing import views

urlpatterns = [
    path('', views.index, name='index'),
]
