from django.urls import path, include

urlpatterns = [
    # needed for drf_spectacular to discover api routes
    path("", include("api.urls")),
]
