import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete, FilterList } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees/';

const DEPARTMENTS = [
  { value: 'IT', label: 'Information Technology' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'FIN', label: 'Finance' },
  { value: 'MKT', label: 'Marketing' },
  { value: 'OPS', label: 'Operations' },
];

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filters, setFilters] = useState({
    department: '',
    isActive: true,
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: '',
    position: '',
    hire_date: '',
    salary: '',
    phone: '',
    is_active: true,
  });

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const fetchEmployees = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.department) params.append('department', filters.department);
      if (filters.isActive !== null) params.append('is_active', filters.isActive);
      
      const response = await axios.get(`${API_URL}?${params.toString()}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEmployee) {
        await axios.put(`${API_URL}${selectedEmployee.id}/`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setOpen(false);
      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const resetForm = () => {
    setSelectedEmployee(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      department: '',
      position: '',
      hire_date: '',
      salary: '',
      phone: '',
      is_active: true,
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Employees
        </Typography>
        <Box>
          <IconButton onClick={() => setFilterOpen(true)}>
            <FilterList />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
          >
            Add Employee
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {employee.first_name} {employee.last_name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {employee.position}
                </Typography>
                <Chip
                  label={employee.department_display}
                  size="small"
                  color="primary"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" component="p">
                  Email: {employee.email}
                </Typography>
                <Typography variant="body2" component="p">
                  Phone: {employee.phone}
                </Typography>
                <Typography variant="body2" component="p">
                  Salary: ${employee.salary}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => handleEdit(employee)} size="small">
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(employee.id)}
                    size="small"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Employee Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    label="Department"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <MenuItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Position"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Hire Date"
                  type="date"
                  value={formData.hire_date}
                  onChange={(e) =>
                    setFormData({ ...formData, hire_date: e.target.value })
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedEmployee ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Filter Employees</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
              label="Department"
            >
              <MenuItem value="">All Departments</MenuItem>
              {DEPARTMENTS.map((dept) => (
                <MenuItem key={dept.value} value={dept.value}>
                  {dept.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.isActive}
              onChange={(e) =>
                setFilters({ ...filters, isActive: e.target.value })
              }
              label="Status"
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterOpen(false)}>Close</Button>
          <Button
            onClick={() => {
              setFilters({ department: '', isActive: true });
              setFilterOpen(false);
            }}
            color="primary"
          >
            Reset Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EmployeeList;
