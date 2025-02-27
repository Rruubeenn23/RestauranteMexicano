from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Plato, Categoria
from .serializers import PlatoSerializer, CategoriaSerializer

class PlatoListCreateAPIView(APIView):
    def get(self, request):
        platos = Plato.objects.all()
        serializer = PlatoSerializer(platos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PlatoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class PlatosPorCategoriaAPIView(APIView):
    def get(self, request, categoria):
        platos = Plato.objects.filter(categoria=categoria)
        serializer = PlatoSerializer(platos, many=True)
        return Response(serializer.data)


class PlatoDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Plato.objects.get(pk=pk)
        except Plato.DoesNotExist:
            return None

    def get(self, request, pk):
        plato = self.get_object(pk)
        if not plato:
            return Response({"error": "Plato no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PlatoSerializer(plato)
        return Response(serializer.data)

    def put(self, request, pk):
        plato = self.get_object(pk)
        if not plato:
            return Response({"error": "Plato no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PlatoSerializer(plato, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        plato = self.get_object(pk)
        if not plato:
            return Response({"error": "Plato no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        plato.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CategoriaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class PlatosDisponiblesAPIView(APIView):
    def get(self, request):
        platos = Plato.objects.filter(disponibilidad=True)
        serializer = PlatoSerializer(platos, many=True)
        return Response(serializer.data)
