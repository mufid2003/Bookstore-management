import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Viewcart() {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity,setSeverity]=useState("success")

  useEffect(() => {
    fetchCartDetails();
  }, [])

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    // Navigate to /orders
    navigate('/orders');
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.bookDetails.price * item.quantity, 0);
  };

  const fetchCartDetails = async () => {
    try {

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Adjust content type based on your API requirements
      };

      let res = await fetch(`${process.env.REACT_APP_API_URL}/cart/${id}`, {
        headers: headers,
      })
      let data = await res.json();
      setCart(data.booksWithQuantity);
    }
    catch (error) {
      console.error('Error fetching cart details:', error);
    }
  }

  const handleQuantityChange = async (id, quant, change) => {

    try {
      if(quant+change > 0){
        let userId = localStorage.getItem('user_id');
        await axios.put(`${process.env.REACT_APP_API_URL}/cart/${userId}/${id}`, { qt: quant + change }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
        });
      }
      

      // Assuming the API response includes the updated cart details
      fetchCartDetails();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert(error)

      // Handle errors here (e.g., show an error message to the user)
    }
  };

  //function to delete the book from cart
  const handleDelete = async (bookId) => {
    try {

      let userId = localStorage.getItem('user_id');

      const isConfirmed = window.confirm('Are you sure you want to delete this book from cart?');

      if (isConfirmed) {
        // Implement your delete logic here
        axios.delete(`${process.env.REACT_APP_API_URL}/cart/${userId}/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
          alert('Book removed from cart successfully'); // You can replace this with your actual success message
          setCart((prevBooks) => prevBooks.filter((book) => book.bookDetails._id !== bookId));
        }).catch(e => {
          console.log(e);
          alert(e)
        })

      }
      // Simulate a delete by filtering out the deleted book from the local state
    } catch (error) {
      console.error('Error deleting book:', error.message);
      alert(error.message)
    }
  };

  const handleOrder = async () => {
      /*
      Bug 11 (round 1)
      checking if cart is empth than order should not be placed
      */
    if (cart.length === 0) {
      // Cart is empty, display a message or take appropriate action
      alert('Your cart is empty. Please add items to your cart before placing an order.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to Place the order.');
    if (isConfirmed) {
      try {
        let userId = localStorage.getItem('user_id');
        // Create the order payload based on the cartDetails state
        const orderPayload = {
          user_id: userId,
          items: cart.map((item) => ({
            book_id: item.bookDetails._id,
            quantity: item.quantity,
            price: item.bookDetails.price,
          })),
          status: 'pending',
        };

        // Make a POST request to the add order API
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, orderPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        if(response.ok){
          setSnackbarOpen(true);
          setSeverity("success")
        }else{
          alert("Can not place order")
        }
        
       
      } catch (error) {
        console.error('Error placing order:', error);
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div>
      <TableContainer component={Paper} style={{ margin: '20px auto', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '1000px' }}>
        <Table style={{ minWidth: '650px', borderCollapse: 'separate', borderSpacing: '0 15px' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#333' }}>Title</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#333' }}>Author</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#333' }}>Price</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#333' }}>Quantity</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#333' }}>Total</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#333' }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={item.bookDetails._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <TableCell>{item.bookDetails.title}</TableCell>
                <TableCell>{item.bookDetails.author}</TableCell>
                <TableCell>${item.bookDetails.price}</TableCell>
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => handleQuantityChange(item.bookDetails._id, item.quantity, -1)}
                    style={{ backgroundColor: '#FFCDD2', marginRight: '8px', padding: '8px', borderRadius: '4px' }}
                  >
                    <RemoveIcon style={{ color: '#E57373' }} />
                  </IconButton>
                  <Typography variant="body1" component="span" style={{ fontWeight: 'bold', color: '#333', margin: '10px 5px' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(item.bookDetails._id, item.quantity, 1)}
                    style={{ backgroundColor: '#C8E6C9', marginLeft: '8px', padding: '8px', borderRadius: '4px' }}
                  >
                    <AddIcon style={{ color: '#81C784' }} />
                  </IconButton>
                </TableCell>

                <TableCell style={{ color: '#333' }}>${item.bookDetails.price * item.quantity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(item.bookDetails._id)} color="secondary">
                    <DeleteIcon style={{ color: '#757575' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>

      {/* Total Amount */}
      <Container style={{ padding: '20px', textAlign: 'right' }}>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Total Amount: ${calculateTotalAmount()}
        </Typography>
      </Container>

      <Container style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOrder}
          style={{ marginTop: '20px', padding: '10px 30px' }}
        >
          Place Order
        </Button>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Order placed successfully.
        </MuiAlert>
      </Snackbar>
    </div>
  )
}
