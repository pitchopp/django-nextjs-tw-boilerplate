from allauth.account.adapter import DefaultAccountAdapter
from django import forms
from django.conf import settings
from .emails import blacklist
from post_office import mail


class AccountAdapter(DefaultAccountAdapter):
    def get_email_verification_redirect_url(self, email_address):
        return f"{settings.WEBSITE_URL}/auth/login?verified=true"

    def clean_email(self, email):
        if not settings.DEBUG and email.split("@")[1] in blacklist:
            raise forms.ValidationError(
                "Ce fournisseur de messagerie n'est pas accepté. Veuillez utiliser une autre adresse de messagerie."
            )
        return super().clean_email(email)

    def send_mail(self, template_prefix, email, context):
        msg = self.render_mail(template_prefix, email, context)
        mail.send(
            sender=msg.from_email,
            recipients=msg.to,
            subject=msg.subject,
            html_message=msg.body,
            headers=msg.extra_headers,
            priority="now",
        )
