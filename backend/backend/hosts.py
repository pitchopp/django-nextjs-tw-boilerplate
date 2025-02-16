from django_hosts import patterns, host
from django.conf import settings

host_patterns = patterns(
    host(r"", settings.ROOT_URLCONF, name=" "),
    host(r"api", "api.urls", name="api"),
    host(r"admin", "backend.admin_urls", name="admin"),
)
