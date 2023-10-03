import pytz
from django.db import utils
from django.contrib.auth import authenticate
from rest_framework import views
from utils import mixins
from utils.utils import get_tokens_for_user
from .models import CustomUser


utc = pytz.UTC


class LoginApi(views.APIView, mixins.HttpResponseMixin):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return self.error_response(message="Must Provide user id and password")
        user: CustomUser = authenticate(username=username, password=password)
        if not user:
            return self.error_response(message="Invalid Credentials")
        tokens = get_tokens_for_user(user=user)
        if user.is_teacher:
            user_type = "tcr"
        elif user.is_staff:
            user_type = "adn"
        else:
            user_type = "std"
        data = {
            "id": user.id,
            "username": user.username,
            "user_type": user_type,
            "access_token": tokens.get("access_token"),
            "refresh_token": tokens.get("refresh_token"),
        }
        return self.success_response(message="Login success", data=data)


class RegisterApi(views.APIView, mixins.HttpResponseMixin):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        password2 = request.data.get("password2")
        if not username or not password:
            return self.error_response(message="Must Provide username and password")
        if password != password2:
            return self.error_response(message="Passwords do not match")
        try:
            CustomUser.objects.create_user(password=password, username=username)
        except utils.IntegrityError as e:
            return self.error_response(
                message=f"User with this username already exists"
            )

        return self.success_response(
            message="Registration successful",
        )
