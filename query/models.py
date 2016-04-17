from django.db import models

CATEGORIES = (  
    ('LAB', 'labor'),
    ('CAR', 'cars'),
    ('TRU', 'trucks'),
    ('WRI', 'writing'),
)
LOCATIONS = (  
    ('BRO', 'Bronx'),
    ('BRK', 'Brooklyn'),
    ('QNS', 'Queens'),
    ('MAN', 'Manhattan'),
    ('STN', 'Staten Island'),
)

class PostAd(models.Model):  
    name        = models.CharField(max_length=50)
    email       = models.EmailField()
    gist        = models.CharField(max_length=50)
    category    = models.CharField(max_length=3, choices=CATEGORIES)
    location    = models.CharField(max_length=3, choices=LOCATIONS)
    description = models.TextField(max_length=300)
    expire      = models.DateField()