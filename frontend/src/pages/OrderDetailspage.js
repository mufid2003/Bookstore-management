import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import axios from 'axios';

const OrderDetailspage = () => {
  const [orders, setOrders] = useState([]);
  const id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getorderbyuser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        });

        setOrders(response.data.orders); // Assuming orders are present in the 'orders' property of the response
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders History
      </Typography>
      {orders.map((order) => (
        <Card key={order._id} style={{ marginBottom: 20 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order ID: {order._id}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Status: {order.status}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Total Amount: ${order.amount.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Items:
            </Typography>
            <Grid container spacing={2}>
              {order.items.map((item) => (
                <Grid item xs={12} md={6} key={item._id}>
                  <Paper style={{ padding: 10 }}>
                    <Typography variant="subtitle1">{item.book_id.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default OrderDetailspage;
