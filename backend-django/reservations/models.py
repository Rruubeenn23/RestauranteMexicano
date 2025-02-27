from django.db import models
from django.contrib.auth.models import User
from users.models import CustomUser

class Reserva(models.Model):
    mesa = models.CharField(max_length=100)
    nombre_cliente = models.CharField(max_length=100)
    personas = models.IntegerField()
    fecha_hora = models.DateTimeField()

    def __str__(self):
        return f"Reserva en {self.mesa} para {self.personas} personas, cliente: {self.nombre_cliente} el {self.fecha_hora}"
        return f"Reserva de {self.cliente.nombre} el {self.fecha_hora}"
