import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')
django.setup()

from django.contrib.auth.models import User

username = 'admin'
email = 'admin@example.com'
password = 'admin123'

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print('Superuser created successfully')
else:
    print('Superuser already exists')
