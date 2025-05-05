from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    department_display = serializers.CharField(source='get_department_display', read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'first_name', 'last_name', 'email', 'department', 
                 'department_display', 'position', 'hire_date', 'salary', 
                 'phone', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
