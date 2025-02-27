from django.contrib import admin
from .models import Reserva

class ReservationAdmin(admin.ModelAdmin):
    list_display = ('mesa', 'nombre_cliente', 'personas', 'fecha_hora')
    list_filter = ('mesa',)  # Puedes filtrar por mesa o cualquier otro campo existente
