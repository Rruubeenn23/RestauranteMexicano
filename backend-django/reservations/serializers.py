from rest_framework import serializers
from .models import Reserva

class ReservationSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source='cliente.username', read_only=True)
    
    class Meta:
        model = Reserva
        fields = ['id', 'cliente', 'cliente_nombre', 'fecha_hora', 'numero_personas', 'comentarios', 'estado']
from .models import Reserva

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ['mesa', 'nombre_cliente', 'personas', 'fecha_hora']

        fields = '__all__'

