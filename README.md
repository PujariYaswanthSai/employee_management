# Employee Management System

A full-stack web application for managing employee data, built with React and Django.

## Features

- Add, edit, and delete employee records
- Filter employees by department and status
- Modern Material-UI interface
- Secure admin panel
- RESTful API endpoints

## Technology Stack

### Frontend
- React
- Material-UI
- Axios for API calls

### Backend
- Django
- Django REST Framework
- SQLite database (configurable for MySQL)

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `.\venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run migrations:
   ```
   python manage.py migrate
   ```
6. Create admin user:
   ```
   python manage.py createsuperuser
   ```
7. Start the server:
   ```
   python manage.py runserver 8080
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/employees/
- Admin Interface: http://localhost:8080/admin

## API Endpoints
- GET /api/employees/ - List all employees
- POST /api/employees/ - Create new employee
- GET /api/employees/{id}/ - Retrieve employee
- PUT /api/employees/{id}/ - Update employee
- DELETE /api/employees/{id}/ - Delete employee

## Filtering
- By Department: /api/employees/?department=IT
- By Status: /api/employees/?is_active=true
