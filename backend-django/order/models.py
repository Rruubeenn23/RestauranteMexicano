from django.conf import settings  # ✅ Importamos settings para usar AUTH_USER_MODEL
from django.db import models
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.urls import path
from django.contrib.auth.models import User
from django.conf import settings

# MODELOS
class Pedido(models.Model):
    ESTADO_CHOICES = [
        ('en_proceso', 'En Proceso'),
        ('enviado', 'Enviado'),
        ('entregado', 'Entregado'),
        ('cancelado', 'Cancelado'),
    ]

    id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pedidos')  # ✅ Ahora apunta a CustomUser
    fecha_hora = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='en_proceso')  # Corrige el default
    direccion_envio = models.TextField()

    def __str__(self):
        return f'Pedido {self.id} - {self.cliente.email}'  # Cambié username a email (porque en CustomUser usas email)
    
# SERIALIZERS
class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

# VISTAS PERSONALIZADAS
class PedidoListCreateAPIView(APIView):
    def get(self, request):
        pedidos = Pedido.objects.all()
        serializer = PedidoSerializer(pedidos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PedidoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# URLS
urlpatterns = [
    path('api/pedidos/', PedidoListCreateAPIView.as_view(), name='pedido-list-create')
]