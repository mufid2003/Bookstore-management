import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Userpage() {

  // Filter books based on the search term
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  let user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  let navigate = useNavigate();


  const handleViewCart = () => {
    // Navigate to the /cart/userid route
    user_id = localStorage.getItem('user_id');
    navigate(`/cart/${user_id}`);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      setBooks(res.data);
      setFilteredBooks(res.data);
    }).catch(e => {
      console.log(e);
    })
  }, []);

  // Function to handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  };


  // Function to handle adding a book to the cart
  const addToCart = (book) => {
    // Implement your logic to add the book to the cart
    let userId = localStorage.getItem('user_id');

    try {
      axios.post(`${process.env.REACT_APP_API_URL}/addtocart/${userId}/cart/${book._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        alert(res.data.message);
      })
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
  };
  return (
    <div>
      {/* Search Bar */}
      <Container>
        <TextField
          label="Search Books"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Container>

      {/* List of Books */}
      <Container>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredBooks.map((book) => (
            <Card key={book.ISBN} style={{ margin: '10px', minWidth: '200px' }}>
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{book.author}</Typography>
                <Typography variant="body2" color="textSecondary">{book.description}</Typography>
                <Typography variant="body2" color="textSecondary">Price: ${book.price}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => addToCart(book)}>Add to Cart</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>

      {/* View Cart */}
      <Container>
        <Button variant="contained" color="primary" fullWidth onClick={handleViewCart}>
          View Cart
        </Button>
      </Container>
    </div>
  )
}
