from django.urls import path
from .views import (
    CategoriaListCreateAPIView,
    PlatoListCreateAPIView,
    PlatoDetailAPIView,
    PlatosDisponiblesAPIView,
    PlatosPorCategoriaAPIView
)

urlpatterns = [
    path('categorias/', CategoriaListCreateAPIView.as_view(), name='categoria-list-create'),
    path('platos/', PlatoListCreateAPIView.as_view(), name='plato-list-create'),
    path('platos/<int:pk>/', PlatoDetailAPIView.as_view(), name='plato-detail'),
    path('platos/disponibles/', PlatosDisponiblesAPIView.as_view(), name='platos-disponibles'),
    path('platos/categoria/<int:categoria>/', PlatosPorCategoriaAPIView.as_view(), name='platos-por-categoria'),
]
