# Generated by Django 5.1.5 on 2025-02-24 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Plato",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=100)),
                ("descripcion", models.TextField()),
                ("precio", models.DecimalField(decimal_places=2, max_digits=6)),
                ("disponibilidad", models.BooleanField(default=True)),
                (
                    "categoria",
                    models.CharField(
                        choices=[
                            ("primer_plato", "Primer Plato"),
                            ("segundo_plato", "Segundo Plato"),
                            ("postre", "Postre"),
                            ("bebida", "Bebida"),
                        ],
                        max_length=20,
                    ),
                ),
            ],
        ),
    ]
