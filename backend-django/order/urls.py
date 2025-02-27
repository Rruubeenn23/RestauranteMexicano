from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PedidoViewSet, PedidoDetailAPIView, PedidoListCreateAPIView, PedidoPublicAPIView

router = DefaultRouter()
router.register(r'pedidos', PedidoViewSet, basename='pedido')  # ✅ Agregar basename

urlpatterns = [
    path('', include(router.urls)),
    path('pedidos/<int:pk>/', PedidoDetailAPIView.as_view(), name='pedido-detail'),
    path('api/pedidos/', PedidoListCreateAPIView.as_view(), name='pedido-list-create'),
    path('public/pedidos/<int:cliente_id>/', PedidoPublicAPIView.as_view(), name='pedidos-publicos'),
]
