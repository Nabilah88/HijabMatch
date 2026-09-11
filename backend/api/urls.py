from django.urls import path
from . views import analyze_user
from .views import recolor_hijab_view
from .views import email_results
from .views import contact_us
from .views import recolor_swatches_view
urlpatterns = [
    path("analyze/", analyze_user),
    path("email-results/", email_results),
    path("contact/", contact_us),
    path("recolor-hijab/", recolor_hijab_view),
    path("recolor-swatches/", recolor_swatches_view),
]