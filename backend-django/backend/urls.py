"""
URL configuration for backend project.

The urlpatterns list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    
Add an import:  from my_app import views
Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    
Add an import:  from other_app.views import Home
Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    
Import the include() function: from django.urls import include, path
Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('menu.urls')),  # Incluir URLs de la app
    path('order/', include('order.urls')),
    path('api/', include('reservations.urls')),  # API disponible en /api/reservations/

    path('', include('users.urls')),
    path('', include('order.urls')),
    path('', include('orders_details.urls')),
    # path('auth/', include('rest_framework.urls')),
    path('api/usuarios/', include('users.urls')),
    # path('auth/', include('rest_framework.urls')),
    path('', include('order.urls')),
    path('api/', include('reservations.urls')),  # API disponible en /api/reservations/   

    path('api/', include('reservations.urls')),  # API disponible en /api/reservations/
    ]


