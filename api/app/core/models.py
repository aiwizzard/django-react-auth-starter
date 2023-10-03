import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils.translation import gettext as _


def user_directory_path(instance, filename):
    return f"group_{instance.username}/{filename}"


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)

    email = models.EmailField(unique=True, db_index=True)
    profile_pic = models.ImageField(
        verbose_name=_("Profile Picture"),
        upload_to=user_directory_path,
        blank=True,
        null=True,
    )
    is_teacher = models.BooleanField(
        _("teacher status"),
        default=False,
        help_text=_("Designates whether the user can log into this teacher site."),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "custom_user"
        verbose_name = "User"
        verbose_name_plural = "Users"

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
