import pytest
from authentication.adapters import AccountAdapter


@pytest.fixture
def account_adapter():
    """Fixture to provide a fresh instance of the AccountAdapter."""
    adapter = AccountAdapter(emails_blacklist=["spam.com"])
    return adapter


@pytest.fixture(autouse=True)
def set_settings(monkeypatch, settings):
    """Patch settings for testing."""
    monkeypatch.setattr(settings, "DEBUG", False)
    monkeypatch.setattr(settings, "WEBSITE_URL", "http://testserver")
    monkeypatch.setattr(settings, "DEFAULT_FROM_EMAIL", "default@email.com")
    monkeypatch.setattr(settings, "SERVER_EMAIL", "server@email.com")
