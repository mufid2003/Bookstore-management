import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, Add as AddIcon } from '@mui/icons-material';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formValues, setFormValues] = useState({
    user_id: null,
    items: [],
    amount: 0,
    status: 'pending',
  });

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching orders: ${response.status}`);
        }

        const data = await response.json();
        // Ensure that data.orders is an array before setting the state
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        alert('Error fetching orders:', error.message)
      }
    };

    fetchOrders();
  }, [API_URL, token]);

  const handleOpenViewDialog = (order) => {
    setEditingOrder(order);
    setFormValues({
      user_id: order ? order.user_id : null,
      items: order ? order.items : [],
      amount: order ? order.amount : 0,
      status: order ? order.status : 'pending',
    });
    setOpenViewDialog(true);
  };

  const handleOpenAddUpdateDialog = (order) => {
    setEditingOrder(order);
    setFormValues({
      user_id: order ? order.user_id : null,
      items: order ? order.items : [],
      amount: order ? order.amount : 0,
      status: order ? order.status : 'pending',
    });
    setOpenAddUpdateDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleCloseAddUpdateDialog = () => {
    setOpenAddUpdateDialog(false);
  };

  const handleFormChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormValues((prevFormValues) => {
      const updatedItems = [...prevFormValues.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      return {
        ...prevFormValues,
        items: updatedItems,
      };
    });
  };

  const handleAddItem = () => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      items: [
        ...prevFormValues.items,
        {
          book_id: '',
          quantity: 0,
          price: 0,
        },
      ],
    }));
  };

  const handleUpdateOrder = () => {
    console.log(formValues)
    // Calculate total amount
    const totalAmount = formValues.items.reduce((total, item) => {
      const itemQuantity = parseInt(item.quantity, 10); // convert quantity to a number
      const itemPrice = parseFloat(item.price); // convert price to a number
      return total + (itemQuantity * itemPrice);
    }, 0);

    // Update formValues with the new total amount
    const updatedFormValues = {
      ...formValues,
      amount: totalAmount,
    };

    // Function to update formValues
    setFormValues(updatedFormValues);
  
    if (true) {
      console.log(formValues.amount)
    }
    axios
      .put(`${API_URL}/orders/${editingOrder._id}`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const updatedOrders = orders.map((order) =>
            order._id === editingOrder._id ? { ...order, ...formValues } : order
          );
          setOrders(updatedOrders);
          setOpenSnackbar(true);
          handleCloseAddUpdateDialog();
        } else {
          console.error('Error updating order:', response.status);
          alert('Error updating order:', response.status)
        }
      })
      .catch((error) => {
        console.error('Error updating order:', error)
        alert('Error updating order:', error)
      });
  };

  const handleDeleteOrder = (orderId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this order?');

    if (!isConfirmed) {
      return;
    }

    axios
      .delete(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const updatedOrders = orders.filter((order) => order._id !== orderId);
          setOrders(updatedOrders);
          setOpenSnackbar(true);
        } else {
          console.error('Error deleting order:', response.status);
          alert('Error deleting order:', response.status)
        }
      })
      .catch((error) => {
        console.error('Error deleting order:', error)
        alert('Error deleting order:', error)
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Order Management
      </Typography>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Order ID</TableCell> */}
              <TableCell>User</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View Details</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                {/* <TableCell>{order._id}</TableCell> */}
                <TableCell>{order.user_id ? order.user_id.name : 'N/A'}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenViewDialog(order)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenAddUpdateDialog(order)}>
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleDeleteOrder(order._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle>View Order Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Typography>User: {formValues.user_id ? formValues.user_id.name : 'N/A'}</Typography>
          <Typography>Email: {formValues.user_id ? formValues.user_id.email : 'N/A'}</Typography>
          <Typography>Amount: {formValues.amount}</Typography>
          <Typography>Status: {formValues.status}</Typography>

          {formValues.items.map((item) => (
            <div key={item._id}>
              <Typography variant="h6" gutterBottom>
                Item Details
              </Typography>
              <Typography>Book: {item.book_id.title}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: {item.price}</Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddUpdateDialog} onClose={handleCloseAddUpdateDialog}>
        <DialogTitle>{editingOrder ? 'Update Order' : 'Add Order'}</DialogTitle>
        <DialogContent>
          {/* <TextField
            id="user_id"
            label="User ID"
            fullWidth
            margin="normal"
            value={formValues.user_id ? formValues.user_id : ''}
            onChange={(e) => handleFormChange('user_id', e.target.value)}
            disabled={true}
          /> */}

          {formValues.items.map((item, index) => (
            <div key={index}>
              <TextField
                id={`book_id_${index}`}
                label={`Book ID ${index + 1}`}
                fullWidth
                margin="normal"
                value={item.book_id ? item.book_id._id : ''}
                onChange={(e) => handleItemChange(index, 'book_id', e.target.value)}
                disabled={true}
              />
              <TextField
                id={`quantity_${index}`}
                label={`Quantity ${index + 1}`}
                fullWidth
                margin="normal"
                type="number"
                value={item.quantity ? item.quantity : ''}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              />
              <TextField
                id={`price_${index}`}
                label={`Price ${index + 1}`}
                fullWidth
                margin="normal"
                type="number"
                value={item.price ? item.price : ''}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              />
            </div>
          ))}

          <Button variant="outlined" color="primary" onClick={handleAddItem}>
            Add Item
          </Button>

          <TextField
            id="amount"
            label="Amount"
            fullWidth
            margin="normal"
            type="number"
            value={formValues.amount ? formValues.amount : ''}
            onChange={(e) => handleFormChange('amount', e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              label="status"
              value={formValues.status ? formValues.status : ''}
              onChange={(e) => handleFormChange('status', e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="out for delivery">Out for Delivery</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              {/* Add more statuses as needed */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddUpdateDialog} color="primary">
            Cancel
          </Button>
          {editingOrder && (
            <Button onClick={handleUpdateOrder} color="primary">
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Order Updated/Deleted Successfully"
        action={<Button color="inherit" size="small" onClick={handleSnackbarClose}>Close</Button>}
      />
    </div>
  );
};

export default OrderManagement;
