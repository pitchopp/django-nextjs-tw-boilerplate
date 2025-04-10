from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from .emails import blacklist
from post_office import mail
from rest_framework.serializers import ValidationError
from urllib.parse import urljoin


class AccountAdapter(DefaultAccountAdapter):
    def __init__(self, *args, emails_blacklist=None, **kwargs):
        if emails_blacklist is not None:
            self.emails_blacklist = emails_blacklist
        else:
            self.emails_blacklist = blacklist
        super().__init__(*args, **kwargs)

    def get_email_verification_redirect_url(self, email_address):
        return urljoin(settings.WEBSITE_URL, "/auth/login?verified=true")

    def clean_email(self, email):
        if not settings.DEBUG and email.split("@")[1] in self.emails_blacklist:
            raise ValidationError(
                "Ce fournisseur de messagerie n'est pas accepté. Veuillez utiliser une autre adresse de messagerie."
            )
        return super().clean_email(email)

    def send_mail(self, template_prefix, email, context):
        msg = self.render_mail(
            template_prefix=template_prefix, email=email, context=context
        )
        mail.send(
            sender=msg.from_email,
            recipients=msg.to,
            subject=msg.subject,
            html_message=msg.body,
            headers=msg.extra_headers,
            priority="now",
        )
