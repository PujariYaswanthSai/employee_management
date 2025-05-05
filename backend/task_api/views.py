from django.shortcuts import render
from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer

# Create your views here.

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    
    def get_queryset(self):
        queryset = Employee.objects.all()
        department = self.request.query_params.get('department', None)
        is_active = self.request.query_params.get('is_active', None)
        
        if department:
            queryset = queryset.filter(department=department)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active == 'true')
            
        return queryset
