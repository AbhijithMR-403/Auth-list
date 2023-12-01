from django.urls import path
from . import views
from .views import RegisterView, RetrieveUserView, LoginView


urlpatterns = [
  path('register', RegisterView.as_view()),
  path('', RetrieveUserView.as_view()),
  path('login', LoginView.as_view(), name="login"),
  path('hello-world', views.hello_world.as_view(), name='hello_world'),
  path('home/', views.HomeView.as_view(), name='home'),
  path('logout/', views.LogoutView.as_view(), name ='logout')
]