from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from import_export.admin import ImportExportModelAdmin

User = get_user_model()


class UserAdmin(BaseUserAdmin, ImportExportModelAdmin): ...


admin.site.register(User, UserAdmin)
