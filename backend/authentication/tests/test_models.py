import pytest
from authentication.models import User


@pytest.mark.django_db
def test_user_creation():

    user = User.objects.create_user(
        username="testusername", email="test@email.com", password="password"
    )
    assert user.email in str(user)
