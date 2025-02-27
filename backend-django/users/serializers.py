from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'nombre', 'direccion', 'numero_telefono', 'password', 'rol']

    def create(self, validated_data):
        password = validated_data.pop('password')
        rol = validated_data.get('rol', 'usuario')

        # Crea el usuario usando el manager
        user = CustomUser.objects.create_user(password=password, **validated_data)

        # Configura is_staff si el rol es 'gerente'
        if rol == 'gerente':
            user.is_staff = True
            user.save()

        return user
