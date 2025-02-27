from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, LogoutAPIView, RegisterAPIView, LoginAPIView, ClienteDetailAPIView  # ✅ Importar correctamente

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('usuarios/<int:pk>/', ClienteDetailAPIView.as_view(), name='cliente-detail'),  # ✅ RUTA CORRECTA
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]
