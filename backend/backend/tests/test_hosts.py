import pytest
from django_hosts import reverse, patterns, host
from django.conf import settings
from django_hosts.resolvers import get_host
from backend.hosts import host_patterns

@pytest.mark.django_db
def test_host_patterns(client, settings):
    # Set settings if needed
    settings.ROOT_URLCONF = 'backend.urls'

    # Test that each host pattern exists
    default_host = get_host(' ')
    assert default_host.name == ' '

    api_host = get_host('api')
    assert api_host.name == 'api'

    admin_host = get_host('admin')
    assert admin_host.name == 'admin'

@pytest.mark.django_db
def test_reverse_host_patterns_with_empty_urlpatterns(settings, client):
    # Assume we are using empty urlpatterns
    settings.ROOT_URLCONF = 'backend.urls'
    settings.HOST_SCHEME = 'http'  # Default scheme for testing

    # Even with empty urlpatterns, reversing a host should not raise an error

    # Reverse for the default (root) host
    with pytest.raises(Exception):  # Expect an error due to empty urlpatterns
        reverse('index', host=' ')

    # Reverse for 'api' host
    with pytest.raises(Exception):
        reverse('api:index', host='api')

    # Ensure that we can reverse to the admin URL
    admin_url = reverse('admin:index', host='admin')
    assert admin_url == 'http://admin/'  # Django admin default path

    # Check that the admin URL resolves correctly
    response = client.get(admin_url)
    assert response.status_code == 200
