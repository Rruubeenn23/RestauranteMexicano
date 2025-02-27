from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Pedido
from .serializers import PedidoSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Pedido
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny  # ✅ Permitir acceso sin autenticación

class PedidoPublicAPIView(APIView):
    permission_classes = [AllowAny]  # ✅ Permitir acceso sin autenticación

    def get(self, request, cliente_id, *args, **kwargs):
        """
        Obtiene todos los pedidos de un cliente específico sin necesidad de autenticación.
        """
        pedidos = Pedido.objects.filter(cliente_id=cliente_id)  # Filtrar por cliente
        if not pedidos.exists():
            return Response({"error": "No se encontraron pedidos para este cliente"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PedidoSerializer(pedidos, many=True)  # Serializar múltiples pedidos
        return Response(serializer.data, status=status.HTTP_200_OK)


class PedidoViewSet(viewsets.ModelViewSet):
    """
    API para listar, crear, actualizar y eliminar pedidos.
    """
    queryset = Pedido.objects.all()  # ✅ Agregar queryset para evitar error
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filtra los pedidos:
        - Si el usuario es gerente, ve todos los pedidos.
        - Si el usuario es cliente, solo ve los suyos.
        """
        if self.request.user.rol == "gerente":
            return Pedido.objects.all()
        return Pedido.objects.filter(cliente=self.request.user)

    def destroy(self, request, *args, **kwargs):
        """
        Permite a los gerentes cancelar pedidos.
        """
        pedido = self.get_object()
        if request.user.rol != "gerente":
            return Response({"error": "No tienes permiso para cancelar pedidos"}, status=status.HTTP_403_FORBIDDEN)
        pedido.delete()
        return Response({"message": "Pedido cancelado correctamente"}, status=status.HTTP_200_OK)


class PedidoDetailAPIView(APIView):
    def delete(self, request, pk, *args, **kwargs):
        """
        Eliminar un pedido específico.
        """
        pedido = get_object_or_404(Pedido, pk=pk)
        pedido.delete()
        return Response({"message": "Pedido eliminado correctamente"}, status=status.HTTP_204_NO_CONTENT)

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