# Task Manager - Full Stack CRUD Application

A full-stack task management application built with React, Django, and MySQL.

## Features
- Create, Read, Update, and Delete tasks
- Task status tracking
- User-friendly interface
- RESTful API backend

## Tech Stack
- Frontend: React
- Backend: Django
- Database: MySQL
- API: Django REST Framework

## Project Structure
```
task-manager/
├── frontend/    # React application
└── backend/     # Django application
```

## Setup Instructions

### Backend Setup
1. Create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/Scripts/activate  # Windows
   ```

2. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers mysqlclient
   ```

3. Configure MySQL database in settings.py

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints
- GET /api/tasks/ - List all tasks
- POST /api/tasks/ - Create a new task
- GET /api/tasks/{id}/ - Retrieve a task
- PUT /api/tasks/{id}/ - Update a task
- DELETE /api/tasks/{id}/ - Delete a task
