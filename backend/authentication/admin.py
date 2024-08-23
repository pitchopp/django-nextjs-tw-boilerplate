from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {'fields': ('photo', 'phone', 'address')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {'fields': ('photo', 'phone', 'address')}),
    )
    list_display = BaseUserAdmin.list_display + ('phone', 'address')
    search_fields = BaseUserAdmin.search_fields + ('phone', 'address')

admin.site.register(User, UserAdmin)

fields = User._meta.get_fields()
