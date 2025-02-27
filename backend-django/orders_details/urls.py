from django.urls import path
from .views import OrderDetailsListCreateAPIView, OrderDetailsDetailAPIView, OrderDetailsPublicAPIView, OrderDetailsPublicCreateAPIView, OrderDetailsPublicRetrieveAPIView

urlpatterns = [
    path('', OrderDetailsListCreateAPIView.as_view(), name='order-details-list-create'),
    path('<int:pk>/', OrderDetailsDetailAPIView.as_view(), name='order-details-detail'),
    path('public/order-details/<int:order_id>/', OrderDetailsPublicRetrieveAPIView.as_view(), name='order-details-public'),
    path('public/order-details/', OrderDetailsPublicCreateAPIView.as_view(), name='order-details-create'),  # ✅ POST para crear detalles
]
