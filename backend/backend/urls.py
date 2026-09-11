"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api import views
from django.conf import settings
from django.conf.urls.static import static


from django.http import HttpResponse

def home(request):
    return HttpResponse("Hijab Finds API is running")

urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("analyze/", views.analyze_user),
    path('api/email-results/', views.email_results),
    path('api/recolor/', views.recolor_hijab_view),
    path('api/recolor-swatches/', views.recolor_swatches_view)
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

