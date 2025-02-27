# Proyecto Restaurante

Este proyecto es una aplicación web para la gestión de un restaurante. Cuenta con un **backend en Django** y un **frontend en Angular**.

## Arquitectura General

El sistema sigue una arquitectura **cliente-servidor** donde:

- **Backend:** Basado en Django REST Framework, proporciona una API para gestionar menús, pedidos, reservaciones y usuarios.
- **Frontend:** Desarrollado en Angular, consume la API del backend.

Estructura del proyecto:
```
ProyectoRestaurante/
├── backend-django/    # Backend en Django
│   ├── backend/       # Configuración general del proyecto
│   ├── menu/          # Gestión del menú
│   ├── order/         # Gestión de pedidos
│   ├── orders_details/ # Detalles de los pedidos
│   ├── reservations/  # Gestión de reservaciones
│   ├── users/         # Gestión de usuarios
├── frontend/          # Frontend en Angular
```

## Descripción de la API

El backend expone varios endpoints organizados en diferentes módulos:

### Menú

- `GET /menu/categorias/` → Lista todas las categorías de platos.
- `GET /menu/platos/` → Lista todos los platos.
- `POST /menu/platos/` → Crea un nuevo plato.
- `GET /menu/platos/disponibles/` → Obtiene los platos disponibles.
- `GET /menu/platos/categoria/{categoria_id}/` → Obtiene los platos de una categoría.

### Pedidos

- `GET /order/pedidos/` → Lista todos los pedidos.
- `POST /order/pedidos/` → Crea un nuevo pedido.
- `GET /order/pedidos/{pedido_id}/` → Obtiene detalles de un pedido específico.
- `GET /order/public/pedidos/{cliente_id}/` → Obtiene los pedidos de un cliente sin autenticación.

### Detalles del Pedido

- `GET /orders_details/` → Lista los detalles de todos los pedidos.
- `POST /orders_details/` → Crea un nuevo detalle de pedido.

### Reservaciones

- `GET /reservations/public-reservas/` → Lista todas las reservaciones.
- `POST /reservations/public-reservas/` → Crea una nueva reservación.

### Usuarios

- `POST /users/register/` → Registra un nuevo usuario.
- `POST /users/login/` → Inicia sesión y devuelve un token.
- `POST /users/logout/` → Cierra sesión.
- `GET /users/usuarios/{user_id}/` → Obtiene detalles de un usuario.

## Instalación y Ejecución

### Requisitos

#### Backend

- Python 3.8+
- Django 4+
- Django REST Framework
- SQLite (o PostgreSQL si se configura)

#### Frontend

- Node.js 16+
- Angular CLI

### Instalación

#### Backend

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/ProyectoRestaurante.git
   cd ProyectoRestaurante/backend-django
   ```

2. Crear un entorno virtual:
   ```bash
   python -m venv env
   source env/bin/activate  # En Windows: env\Scriptsctivate
   ```

3. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Aplicar migraciones:
   ```bash
   python manage.py migrate
   ```

5. Crear un superusuario:
   ```bash
   python manage.py createsuperuser
   ```

6. Iniciar el servidor:
   ```bash
   python manage.py runserver
   ```

El backend estará disponible en `http://127.0.0.1:8000/`.

#### Frontend

1. Moverse al directorio del frontend:
   ```bash
   cd ProyectoRestaurante/frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```

El frontend estará disponible en `http://localhost:4200/`.
