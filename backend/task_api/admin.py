from django.contrib import admin
from .models import Employee

# Register your models here.

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'department', 'position', 'salary', 'is_active')
    list_filter = ('department', 'is_active')
    search_fields = ('first_name', 'last_name', 'email', 'position')
    ordering = ('-created_at',)
