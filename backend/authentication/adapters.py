from allauth.account.adapter import DefaultAccountAdapter
from django import forms
from django.conf import settings
from .emails import blacklist

class AccountAdapter(DefaultAccountAdapter):
    def get_email_verification_redirect_url(self, email_address):
        return f'{settings.WEBSITE_URL}/auth/login?verified=true'
    
    def clean_email(self, email):
        if not settings.DEBUG and email.split('@')[1] in blacklist:
            raise forms.ValidationError("Ce fournisseur de messagerie n'est pas accepté. Veuillez utiliser une autre adresse de messagerie.")
        return super().clean_email(email)
