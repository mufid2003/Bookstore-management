import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Viewcart() {
  const { id } = useParams();
  const [cart, setCart] = useState([]);

  useEffect(() => {    
    fetchCartDetails();
  }, [])


  const fetchCartDetails = async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/cart/${id}`)
      let data = await res.json();
      setCart(data.booksWithQuantity);
    }
    catch (error) {
      console.error('Error fetching cart details:', error);
    }
  }

  const handleQuantityChange = async (id, quant, change) => {

    try {
      let userId = localStorage.getItem('user_id');
      await axios.put(`${process.env.REACT_APP_API_URL}/cart/${userId}/${id}`, { qt: quant + change }).then(res=>{
      });

      // Assuming the API response includes the updated cart details
      fetchCartDetails();
    } catch (error) {
      console.error('Error updating quantity:', error);

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
          axios.delete(`${process.env.REACT_APP_API_URL}/cart/${userId}/${bookId}`).then(res => {
            alert('Book removed from cart successfully'); // You can replace this with your actual success message
            setCart((prevBooks) => prevBooks.filter((book) => book.bookDetails._id !== bookId));
          }).catch(e => {
            console.log(e);
          })
  
        }
        // Simulate a delete by filtering out the deleted book from the local state
      } catch (error) {
        console.error('Error deleting book:', error.message);
      }
    };

    const handleOrder = async () => {
      const isConfirmed = window.confirm('Are you sure you want to Place the order.');
        if(isConfirmed){
          console.log("Order Placed.")
          console.log(cart);
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, orderPayload);
      
            // Assuming the API response includes the newly created order details
            console.log('Order placed:', response.data);
          } catch (error) {
            console.error('Error placing order:', error);
          }
        }
    }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
        
          <TableBody>
          {cart.map((item) => (
            <TableRow key={item.bookDetails._id}>
              <TableCell>{item.bookDetails.title}</TableCell>
              <TableCell>{item.bookDetails.author}</TableCell>
              <TableCell>${item.bookDetails.price}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleQuantityChange(item.bookDetails._id, item.quantity, -1)}>-</Button>
                {item.quantity}
                <Button variant="outlined" onClick={() => handleQuantityChange(item.bookDetails._id, item.quantity,1)}>+</Button>
              </TableCell>
              <TableCell>${item.bookDetails.price * item.quantity}</TableCell>
              <TableCell>
                  <IconButton onClick={() => handleDelete(item.bookDetails._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <Container>
        <Button variant="contained" color="primary" fullWidth onClick={handleOrder}>
          Place Order
        </Button>
      </Container>

    </div>
  )
}
