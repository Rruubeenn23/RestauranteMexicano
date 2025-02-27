from rest_framework import serializers
from .models import OrderDetails
from menu.models import Plato  # Asegúrate de importar el modelo Plato

class OrderDetailsSerializer(serializers.ModelSerializer):
    plato_nombre = serializers.CharField(source="plato.nombre", read_only=True)  # ✅ Devuelve el nombre del plato

    class Meta:
        model = OrderDetails
        fields = ['id', 'order', 'plato', 'plato_nombre', 'cantidad', 'precio_unitario', 'total']  # ✅ Mantén solo UNA definición de Meta
