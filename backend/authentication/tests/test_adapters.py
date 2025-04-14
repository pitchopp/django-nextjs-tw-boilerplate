import pytest
from django.core.mail import EmailMessage
from post_office.models import Email, STATUS, PRIORITY
from authentication.adapters import AccountAdapter
from rest_framework import serializers


def test_get_email_verification_redirect_url(account_adapter):
    email_address = "test@example.com"
    expected_url = "http://testserver/auth/login?verified=true"

    assert (
        account_adapter.get_email_verification_redirect_url(email_address)
        == expected_url
    )


def test_clean_email_valid(account_adapter):
    valid_email = "user@valid.com"

    # Should return the valid email without errors
    cleaned_email = account_adapter.clean_email(valid_email)
    assert cleaned_email == valid_email


def test_clean_email_blacklisted(account_adapter):
    blacklisted_email = "user@spam.com"
    # Should raise ValidationError for blacklisted email when not in DEBUG mode
    with pytest.raises(serializers.ValidationError) as excinfo:
        account_adapter.clean_email(blacklisted_email)
    assert "Ce fournisseur de messagerie n'est pas accepté." in str(excinfo.value)


def test_clean_email_debug_mode(account_adapter, monkeypatch):
    # Patch settings to enable DEBUG mode
    monkeypatch.setattr("django.conf.settings.DEBUG", True)
    blacklisted_email = "user@spam.com"
    assert account_adapter.clean_email(blacklisted_email) == blacklisted_email


def test_adapter_default_blacklist():
    adapter = AccountAdapter()
    assert adapter.emails_blacklist is not None
    assert len(adapter.emails_blacklist) > 0


@pytest.mark.django_db
def test_send_mail(account_adapter, monkeypatch):
    email = "test@example.com"
    monkeypatch.setattr(
        account_adapter,
        "render_mail",
        lambda *args, **kwargs: EmailMessage(
            subject="Test email", body=f"{kwargs['context']['user']}", to=[email]
        ),
    )
    # Prepare the parameters for sending mail
    template_prefix = "account/email/email_verification"
    context = {"user": "testuser"}

    # Call the send_mail method
    account_adapter.send_mail(template_prefix, email, context)

    # Check if the email was sent
    assert Email.objects.count() == 1
    obj = Email.objects.first()
    assert obj.from_email == "default@email.com"
    assert obj.to == [email]
    assert obj.subject == "Test email"
    assert obj.html_message == "testuser"
    assert obj.status == STATUS.sent
    assert obj.priority == PRIORITY.now
