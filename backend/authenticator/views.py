import json
from rest_framework.exceptions import AuthenticationFailed, ParseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserCreateSerializer, UserDetailsUpdateSerializer, UserSerializer, AdminUserSerializer
from .models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UserProfile
from rest_framework.generics import ListCreateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from rest_framework.filters import SearchFilter
from django.conf import settings
# from rest_framework_simplejwt.authentication import JWTAuthentication


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        print(serializer)
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)
        print(user)
        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']

        except KeyError:
            raise ParseError('All Fields Are Required')

        if not CustomUser.objects.filter(email=email).exists():
            raise AuthenticationFailed('Invalid Email Address')

        if not CustomUser.objects.filter(email=email, is_active=True).exists():
            raise AuthenticationFailed(
                'You are blocked by admin ! Please contact admin')

        user = authenticate(username=email, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid Password')
        login(request, user)
        refresh = RefreshToken.for_user(user)
        refresh["first_name"] = str(user.first_name)
        print(str(refresh), "\n\n\n", str(refresh.access_token))
        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': user.is_superuser,
        }

        return Response(content, status=status.HTTP_200_OK)


class hello_world(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))

        email = data.get('email')
        user = CustomUser.objects.get(email=email)
        data = UserSerializer(user).data

        try:
            profile_pic = user.User_Profile.profile_pic
            data['profile_pic'] = request.build_absolute_uri(
                '/')[:-1]+profile_pic.url
        except:
            profile_pic = ''
            data['profile_pic'] = ''

        content = data
        return Response(content)


class HomeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        content = {
            'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserDetailsUpdate(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get_or_create(user=request.user)[0]
        user_update_details_serializer = UserDetailsUpdateSerializer(
            user_profile, data=request.data, partial=True
        )
        if user_update_details_serializer.is_valid():

            user_update_details_serializer.save()
            return Response(user_update_details_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', user_update_details_serializer.errors)
            return Response(user_update_details_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AdminUserSerializer
    lookup_field = 'id'
