import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

  useEffect(() => {
    // Fetch book details using bookId
    axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  const handleUpdate = async () => {
    // Implement update logic here
    try {
      // Send updated book details to the server
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/books/${id}`,
        book,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Book updated successfully:', response.data);

      // Redirect to the book details page or any other page
    } catch (error) {
      console.error('Error updating book:', error);
      // Handle the error, show a message, etc.
    }
  };
  return (
    <div>
      <div>
        <h2>Update Book</h2>
        <form>
          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="title"
              label="Title"
              variant="filled"
              fullWidth
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="author"
              label="Author"
              variant="filled"
              fullWidth
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="genre"
              label="Genre"
              variant="filled"
              fullWidth
              value={book.genre}
              onChange={(e) => setBook({ ...book, genre: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="ISBN"
              label="ISBN"
              variant="filled"
              fullWidth
              value={book.ISBN}
              onChange={(e) => setBook({ ...book, ISBN: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="quantity"
              label="Quantity"
              variant="filled"
              fullWidth
              type="number"
              value={book.quantity}
              onChange={(e) => setBook({ ...book, quantity: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="price"
              label="Price"
              variant="filled"
              fullWidth
              type="number"
              value={book.price}
              onChange={(e) => setBook({ ...book, price: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="description"
              label="Description"
              variant="filled"
              fullWidth
              multiline
              rows={4}
              value={book.description}
              onChange={(e) => setBook({ ...book, description: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="publishdate"
              label="Publish Date"
              variant="filled"
              fullWidth
              type="date"
              value={book.publishdate}
              onChange={(e) => setBook({ ...book, publishdate: e.target.value })}
            />
          </div>

          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Book
          </Button>
        </form>
      </div>
    </div>
  )
}
