from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from users.models import CustomUser
from users.serializers import CustomUserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated  # 🔥 Agrega esta línea
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from users.models import CustomUser
from users.serializers import CustomUserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Sesión cerrada'}, status=status.HTTP_200_OK)



User = get_user_model()

class LoginAPIView(APIView):
    def post(self, request):
        print("🔍 Datos recibidos en Django:", request.data)  # 🔥 Depuración

        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            print("❌ Error: Faltan datos")
            return Response({"error": "Faltan datos"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if user is None:
            print("❌ Error: Usuario no encontrado")
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

        if not check_password(password, user.password):
            print("❌ Error: Credenciales inválidas")
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "email": user.email,
                "nombre": user.nombre,
                "rol": user.rol
            }
        })


class ClienteDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]  # ✅ Requiere autenticación

    def get(self, request, pk, *args, **kwargs):
        cliente = get_object_or_404(CustomUser, pk=pk)  # ✅ Asegura que el usuario existe
        serializer = CustomUserSerializer(cliente)
        return Response(serializer.data)
    
class RegisterAPIView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "nombre": user.nombre,
                    "rol": user.rol  # Guardamos el rol
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]  # Permite acceso público
