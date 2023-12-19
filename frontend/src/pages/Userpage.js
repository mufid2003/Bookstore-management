import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, Card, CardContent, CardActions, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Userpage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      setBooks(res.data);
      setFilteredBooks(res.data);
      setLoading(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    });
  }, [token]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const addToCart = async (book) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/addtocart/${user_id}/cart/${book._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding book to cart:', error.message);
    }
  };

  const handleViewCart = () => {
    navigate(`/cart/${user_id}`);
  };

  const placeholderImageUrl = 'https://source.unsplash.com/random?bookcover';

  return (
    <Container>
      {/* Search Bar */}
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* List of Books */}
      <Grid container spacing={2}>
        {loading ? (
          <CircularProgress style={{ margin: 'auto' }} />
        ) : (
          filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.ISBN}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <img
                  src={book.image ? `data:${book.image.contentType};base64,${book.image.data.toString('base64')}` : placeholderImageUrl}
                  alt={book.title}
                  style={{ width: '100%', height: '350px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                />
                <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
                  <Typography variant="h6" style={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>{book.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: '8px', fontStyle: 'italic' }}>{book.author}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{ marginBottom: '8px' }}>{book.description}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{ marginBottom: '8px', fontWeight: 'bold' }}>Price: ${book.price}</Typography>
                  <div style={{ flex: 1 }} />
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => addToCart(book)}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>



            </Grid>
          ))
        )}
      </Grid>

      {/* View Cart */}
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleViewCart}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            borderRadius: '5px',
            padding: '14px',
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#1565C0',
            },
          }}
        >
          View Cart
        </Button>
      </Container>


    </Container>
  );
}
