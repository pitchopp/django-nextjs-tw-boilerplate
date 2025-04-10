from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from import_export.admin import ImportExportModelAdmin
from rest_framework.authtoken.models import TokenProxy
from django.contrib.auth.models import Group
from django_celery_beat.models import (
    ClockedSchedule,
    PeriodicTask,
    IntervalSchedule,
    CrontabSchedule,
    SolarSchedule,
)

admin.site.unregister(TokenProxy)
admin.site.unregister(Group)
admin.site.unregister(ClockedSchedule)
admin.site.unregister(CrontabSchedule)
admin.site.unregister(IntervalSchedule)
admin.site.unregister(PeriodicTask)
admin.site.unregister(SolarSchedule)

User = get_user_model()


class UserAdmin(BaseUserAdmin, ImportExportModelAdmin): ...


admin.site.register(User, UserAdmin)
