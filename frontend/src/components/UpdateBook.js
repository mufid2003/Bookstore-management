import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Container, Snackbar, Alert, AlertTitle } from '@mui/material';

export default function UpdateBook() {
  const { id } = useParams();

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    ISBN: '',
    quantity: 0,
    price: 0,
    description: '',
    publishdate: null,
  });
  const token = localStorage.getItem('token');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch book details using bookId
    axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setBook(response.data);
    })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        alert('Error fetching book details:', error)
      });
  }, [id]);

  const handleUpdate = async () => {
    // Implement update logic here
    try {
      // Send updated book details to the server
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/books/${id}`,
        book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      if (response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/employee');
        }, 2000);
      }
      else{
        const responseData = await response.json();
        alert(responseData.message)
      }

      // Redirect to the book details page or any other page
    } catch (error) {
      console.error('Error updating book:', error);
      // Handle the error, show a message, etc.
    }
  };

  const handleCloseSnackbar = () => {
    setIsSuccess(false);
  };


  return (
    <div>
      <Container component="div" maxWidth="md" sx={{ marginTop: '40px' }}>
        <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
          Update Book
        </Typography>
        <Snackbar
          open={isSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            <AlertTitle>Success</AlertTitle>
            Book updated successfully!
          </Alert>
        </Snackbar>
        <form>
          <TextField
            id="title"
            label="Title"
            variant="filled"
            fullWidth
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            id="author"
            label="Author"
            variant="filled"
            fullWidth
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            id="genre"
            label="Genre"
            variant="filled"
            fullWidth
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            id="ISBN"
            label="ISBN"
            variant="filled"
            fullWidth
            value={book.ISBN}
            onChange={(e) => setBook({ ...book, ISBN: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            id="quantity"
            label="Quantity"
            variant="filled"
            fullWidth
            type="number"
            value={book.quantity}
            onChange={(e) => setBook({ ...book, quantity: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            id="price"
            label="Price"
            variant="filled"
            fullWidth
            type="number"
            value={book.price}
            onChange={(e) => setBook({ ...book, price: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            id="description"
            label="Description"
            variant="filled"
            fullWidth
            multiline
            rows={4}
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            id="publishdate"
            label="Publish Date"
            variant="filled"
            fullWidth
            type="date"
            value={book.publishdate}
            onChange={(e) => setBook({ ...book, publishdate: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />

          <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ marginTop: '16px' }}>
            Update Book
          </Button>
        </form>
      </Container>
    </div>
  )
}
