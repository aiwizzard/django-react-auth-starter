from django.urls import path
from . import views


urlpatterns = [
    path('login/', view=views.LoginApi.as_view()),
    path('register/', view=views.RegisterApi.as_view()),
]