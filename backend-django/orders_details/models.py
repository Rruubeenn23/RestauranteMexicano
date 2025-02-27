from django.db import models
from order.models import Pedido

class OrderDetails(models.Model):
    order = models.ForeignKey(Pedido, related_name='order_details', on_delete=models.CASCADE)
    plato = models.ForeignKey('menu.Plato', on_delete=models.CASCADE)  # ✅ Guardar el ID del plato
    order = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="order_details")
    plato_nombre = models.CharField(max_length=255)  # ✅ Guardamos el nombre en lugar del ID
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        self.total = self.cantidad * self.precio_unitario  # ✅ Calcular total automáticamente
        super().save(*args, **kwargs)



    def __str__(self):
        return f"Order {self.order.id} - {self.plato.nombre} x {self.cantidad}"
