from django.urls import include, path

from landing import views

urlpatterns = [
    path('', views.index, name='index'),
]
