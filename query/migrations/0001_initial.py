# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-17 08:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PostAd',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('gist', models.CharField(max_length=50)),
                ('category', models.CharField(choices=[(b'LAB', b'labor'), (b'CAR', b'cars'), (b'TRU', b'trucks'), (b'WRI', b'writing')], max_length=3)),
                ('location', models.CharField(choices=[(b'BRO', b'Bronx'), (b'BRK', b'Brooklyn'), (b'QNS', b'Queens'), (b'MAN', b'Manhattan'), (b'STN', b'Staten Island')], max_length=3)),
                ('description', models.TextField(max_length=300)),
                ('expire', models.DateField()),
            ],
        ),
    ]