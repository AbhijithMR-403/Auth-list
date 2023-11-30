from django.urls import path
from .views import RegisterView, RetrieveUserView, LoginView


urlpatterns = [
  path('register', RegisterView.as_view()),
  path('', RetrieveUserView.as_view()),
  path('login', LoginView.as_view(), name="login"),
]