import pytest


@pytest.fixture(autouse=True)
def set_settings(monkeypatch, settings):
    """Patch settings for testing."""
    monkeypatch.setattr(settings, "DEBUG", False)
