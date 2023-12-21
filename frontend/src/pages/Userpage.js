import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, Card, CardContent, CardActions, Grid, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Userpage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [loading, setLoading] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [genres, setGenres] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
        setFilteredBooks(res.data);
        setLoading(false);
        const uniqueGenres = [...new Set(res.data.map((book) => book.genre))];
        setGenres(uniqueGenres);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [token]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterBooks(term, filterCriteria, priceRange);
  };

  const filterBooks = (searchTerm, criteria, priceRange) => {
    let filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (criteria === 'genre') {
      filtered = filtered.filter(
        (book) => book.genre.toLowerCase() === priceRange.genre.toLowerCase()
      );
    }

    if (priceRange.min !== '' && priceRange.max !== '') {
      filtered = filtered.filter(
        (book) => book.price >= parseFloat(priceRange.min) && book.price <= parseFloat(priceRange.max)
      );
    } else if (priceRange.min !== '') {
      filtered = filtered.filter((book) => book.price >= parseFloat(priceRange.min));
    } else if (priceRange.max !== '') {
      filtered = filtered.filter((book) => book.price <= parseFloat(priceRange.max));
    }

    setFilteredBooks(filtered);
  };





  const handleFilterChange = (event) => {
    const newCriteria = event.target.value;
    setFilterCriteria(newCriteria);
    setPriceRange({ min: '', max: '' });
  };

  const handlePriceRangeChange = (event, type) => {
    const value = event.target.value;
    setPriceRange((prev) => ({ ...prev, [type]: value }));
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
    <Container style={{ width: '90%', maxWidth: '1400px', margin: '0 auto' }}>
      <Grid container spacing={2}>
        {/* Main Content */}
        <Grid item xs={12} md={9} lg={10}>
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
                <Grid item xs={12} sm={6} md={6} lg={3} key={book.ISBN}>
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
        </Grid>

        {/* Filtering Panel */}
        <Grid item xs={12} md={3} lg={2}>
          <Container style={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Filter Options
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="filter-criteria-label">Filter by</InputLabel>
              <Select
                labelId="filter-criteria-label"
                id="filter-criteria"
                value={filterCriteria}
                onChange={handleFilterChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="genre">Genre</MenuItem>
                {/* Add more filter criteria options based on your data */}
              </Select>
            </FormControl>

            {/* Genre Dropdown */}
            {filterCriteria === 'genre' && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="genre-label">Select Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  value={priceRange.genre}
                  onChange={(e) => handlePriceRangeChange(e, 'genre')}
                >
                  <MenuItem value="">All Genres</MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Price Range */}
            <FormControl fullWidth margin="normal">
              <TextField
                type="number"
                label="Min Price"
                variant="outlined"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange(e, 'min')}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                type="number"
                label="Max Price"
                variant="outlined"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange(e, 'max')}
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => filterBooks(searchTerm, filterCriteria, priceRange)}
              style={{
                marginTop: '10px',
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
              Filter
            </Button>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
