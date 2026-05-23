from django.urls import path
from . import views

urlpatterns = [
    path('entries/', views.get_entries),
    path('entries/add/', views.post_entry),
]