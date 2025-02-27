from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicReservaView
router = DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('public-reservas/', PublicReservaView.as_view(), name='public-reservas'),  # Nueva vista pública
]
