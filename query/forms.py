from django import forms  
from .models import PostAd#, DooSomething

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
)

class PostAdForm(forms.ModelForm):  
    error_css_class = 'error'

    category = forms.ChoiceField(choices=CATEGORIES, required=True )
    location = forms.ChoiceField(choices=LOCATIONS, required=True )

    class Meta:
        model = PostAd
        fields = "__all__"

        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'What\'s your name?'}),
            'email': forms.TextInput(attrs={'placeholder': 'john@example.com'}),
            'gist': forms.TextInput(attrs={'placeholder': 'In a few words, I\'m looking for/to...'}),
            'expire': forms.TextInput(attrs={'placeholder': 'MM/DD/YYYY'})
        }