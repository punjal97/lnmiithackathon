from django.http import HttpResponse  
from django.views.generic import FormView  
from .models import PostAd  
from .forms import PostAdForm

class PostAdPage(FormView):  
    template_name = 'post_ad.html'
    success_url = '/awesome/'
    form_class = PostAdForm

    def form_valid(self, form):
        return HttpResponse("Sweeeeeet.")