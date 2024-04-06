import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Snackbar } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { InputLabel, Select, MenuItem } from '@mui/material';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    username: '',
    email: '',
    role: 'customer', // Default role
  });

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const handleOpenDialog = (user) => {
    setEditingUser(user);
    setFormValues({
      name: user ? user.name : '',
      username: user ? user.username : '',
      email: user ? user.email : '',
      role: user ? user.role : 'customer',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingUser(null);
    setFormValues({
      name: '',
      username: '',
      email: '',
      role: 'customer',
    });
    setOpenDialog(false);
  };

  const handleUpdateUser = () => {
    // Update the user in the API
    axios.put(`${API_URL}/users/${editingUser._id}`, formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          // Update the user in the state
          const updatedUsers = users.map((user) =>
            user._id === editingUser._id ? { ...user, ...formValues } : user
          );
          setUsers(updatedUsers);

          // Show success alert
          setOpenSnackbar(true);

          handleCloseDialog();
        } else {
          console.error('Error updating user:', response.status)
          alert('Error updating user:', response.status);
        }
      })
      .catch(error => {
        console.error('Error updating user:', error)
        alert('Error updating user:', error)
      });
  };

  const handleAddUser = () => {
    // Add a new user to the API
    axios.post(`${API_URL}/users`, formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 201) {
          // Add a new user to the state
          const newUser = { ...response.data, totalOrders: 0, status: 'active' };
          setUsers([...users, newUser]);

          // Show success alert
          setOpenSnackbar(true);

          handleCloseDialog();
        } else {
          console.error('Error adding user:', response.status)
          alert('Error adding user:', response.status);
        }
      })
      .catch(error => {
        console.error('Error adding user:', error)
        alert('Error adding user:', error)
      });
  };

  const handleDeleteUser = (userId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the deletion
    }

    // Delete the user from the API
    axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          // Delete the user from the state
          const updatedUsers = users.filter((user) => user._id !== userId);
          setUsers(updatedUsers);

          // Show success alert
          setOpenSnackbar(true);
        } else {
          console.error('Error deleting user:', response.status);
          alert('Error deleting user:', response.status);
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error)
        alert('Error deleting user:', error)
      });
  };

  // const handleFormChange = (event) => {
  //   const { id, value } = event.target;
  //   setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  // };
  const handleFormChange = (event) => {
    const { id, value } = event.target;

    // Handle role separately
    if (id === 'role') {
      setFormValues((prevValues) => ({ ...prevValues, role: value }));
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    // Fetch users from the API and update the state
    axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [API_URL]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpenDialog(null)}>
        Add User
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total Orders</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.orders.length}</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenDialog(user)}>
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleDeleteUser(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingUser ? 'Update User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField id="name" label="Name" fullWidth margin="normal" value={formValues.name} onChange={handleFormChange} />
          <TextField id="username" label="Username" fullWidth margin="normal" value={formValues.username} onChange={handleFormChange} />
          <TextField id="email" label="Email" fullWidth margin="normal" value={formValues.email} onChange={handleFormChange} />

          {/* Conditionally render the password field for adding a user */}
          {editingUser === null && (
            <TextField
              id="password"
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              value={formValues.password}
              onChange={handleFormChange}
            />
          )}

          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={formValues.role}
            label="Role"
            fullWidth
            margin="normal"
            onChange={handleFormChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={editingUser ? handleUpdateUser : handleAddUser} color="primary">
            {editingUser ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="User Updated/Added/Deleted Successfully"
        action={<Button color="inherit" size="small" onClick={handleSnackbarClose}>Close</Button>}
      />
    </div>
  );
};

export default UserManagement;
