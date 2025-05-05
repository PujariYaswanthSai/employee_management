import React, { useState, useEffect } from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks/';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editTask, setEditTask] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newTask);
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}${editTask.id}/`, editTask);
      setOpen(false);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleToggle = async (task) => {
    try {
      await axios.put(`${API_URL}${task.id}/`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Task
          </Button>
        </form>
      </Box>

      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggle(task)}
            />
            <ListItemText
              primary={task.title}
              secondary={task.description}
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEdit(task)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Task Title"
            value={editTask?.title || ''}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={editTask?.description || ''}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TaskList;
