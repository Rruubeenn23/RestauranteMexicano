from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, nombre, password=None, rol='usuario', **extra_fields):
        if not email:
            raise ValueError('El correo electrónico es obligatorio')
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', rol == 'gerente')  # Solo los gerentes son staff

        user = self.model(email=email, nombre=nombre, rol=rol, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nombre, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, nombre, password, rol='gerente', **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLES = [
        ('usuario', 'Usuario'),
        ('gerente', 'Gerente'),
    ]

    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=255)
    direccion = models.TextField(blank=True, null=True)
    numero_telefono = models.CharField(max_length=15, blank=True, null=True)
    rol = models.CharField(max_length=50, choices=ROLES, default='usuario')
    is_active = models.BooleanField(default=True)  # Puede iniciar sesión
    is_staff = models.BooleanField(default=False)  # Puede acceder al panel/admin

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre']

    def __str__(self):
        return self.email
