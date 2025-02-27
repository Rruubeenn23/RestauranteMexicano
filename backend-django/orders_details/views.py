from rest_framework import generics
from .models import OrderDetails
from .serializers import OrderDetailsSerializer
from rest_framework.permissions import AllowAny  # ✅ Permitir acceso sin autenticación
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from menu.models import Plato  # Importar el modelo de Plato
from menu.models import Plato  # Importar modelo Plato

class OrderDetailsPublicCreateAPIView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request, *args, **kwargs):
        print("📌 Datos recibidos en Django:", request.data)

        # 🔍 Intentamos obtener el ID del plato
        plato_id = request.data.get("plato")
        if not plato_id:
            return Response({"error": "El campo 'plato' es obligatorio."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            plato = Plato.objects.get(id=plato_id)
        except Plato.DoesNotExist:
            return Response({"error": "El plato con ID {} no existe.".format(plato_id)}, status=status.HTTP_400_BAD_REQUEST)

        # 🔥 Asegurar que `plato` está en los datos validados
        data = request.data.copy()  # Copiamos request.data para modificarlo
        data["plato"] = plato.id  

        serializer = OrderDetailsSerializer(data=data)
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print("📌 Datos recibidos en Django:", request.data)  # 🔥 Ver qué está llegando desde el frontend
        
    permission_classes = [AllowAny]  # ✅ Permitir acceso sin autenticación

    def post(self, request, *args, **kwargs):
        """
        Crea un nuevo detalle de pedido sin necesidad de autenticación.
        """
        serializer = OrderDetailsSerializer(data=request.data)
        if serializer.is_valid():
            print("✅ Datos validados en el serializer:", serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("❌ Errores en validación:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class OrderDetailsPublicAPIView(APIView):
    permission_classes = [AllowAny]  # ✅ Permitir acceso sin autenticación

    def get(self, request, order_id, *args, **kwargs):
        """
        Obtiene todos los detalles de un pedido específico sin necesidad de autenticación.
        """
        detalles = OrderDetails.objects.filter(order_id=order_id)  # Filtrar por pedido
        if not detalles.exists():
            return Response({"error": "No se encontraron detalles para este pedido"}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderDetailsSerializer(detalles, many=True)  # Serializar múltiples detalles
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderDetailsListCreateAPIView(generics.ListCreateAPIView):
    """Listar todos los detalles de pedidos o crear uno nuevo"""
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer

class OrderDetailsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Obtener, actualizar o eliminar un detalle de pedido específico"""
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer

class OrderDetailsPublicRetrieveAPIView(APIView):
    permission_classes = [AllowAny]  # ✅ Acceso sin autenticación

    def get(self, request, order_id, *args, **kwargs):
        """
        Obtener los detalles de un pedido con el nombre del plato.
        """
        detalles = OrderDetails.objects.filter(order_id=order_id)
        serializer = OrderDetailsSerializer(detalles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)