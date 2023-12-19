import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, styled, Snackbar, Alert } from '@mui/material';
import axios from 'axios';


// Custom styled button with enhanced styling
const AddBookButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2), // Adjust the top margin as needed
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.success.dark,
    },
}));


export default function Addbook() {
    const [bookData, setBookData] = useState({
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleInputChange = (field) => (event) => {
        setBookData({ ...bookData, [field]: event.target.value });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleAddBook = async () => {
        // Validate bookData or perform additional checks if needed

        // Pass the bookData to the parent component
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/books`, bookData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                // Book added successfully
                console.log('Book added successfully');
                setSnackbarMessage('Book added successfully!');
                setSnackbarOpen(true);
                // Clear the form after adding the book
                setBookData({
                    title: '',
                    author: '',
                    genre: '',
                    ISBN: '',
                    quantity: 0,
                    price: 0,
                    description: '',
                    publishdate: null,
                });
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };
    return (
        <Container component="div" maxWidth="md" sx={{ marginTop: '40px' }}>
            <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
                Add New Book
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="title"
                            label="Title"
                            variant="filled"
                            fullWidth
                            value={bookData.title}
                            onChange={handleInputChange('title')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="author"
                            label="Author"
                            variant="filled"
                            fullWidth
                            value={bookData.author}
                            onChange={handleInputChange('author')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="genre"
                            label="Genre"
                            variant="filled"
                            fullWidth
                            value={bookData.genre}
                            onChange={handleInputChange('genre')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ISBN"
                            label="ISBN"
                            variant="filled"
                            fullWidth
                            value={bookData.ISBN}
                            onChange={handleInputChange('ISBN')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="quantity"
                            label="Quantity"
                            variant="filled"
                            fullWidth
                            type="number"
                            value={bookData.quantity}
                            onChange={handleInputChange('quantity')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="price"
                            label="Price"
                            variant="filled"
                            fullWidth
                            type="number"
                            value={bookData.price}
                            onChange={handleInputChange('price')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            label="Description"
                            variant="filled"
                            multiline
                            rows={4}
                            fullWidth
                            value={bookData.description}
                            onChange={handleInputChange('description')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="publishDate"
                            label="Publish Date"
                            variant="filled"
                            type="date"
                            fullWidth
                            value={bookData.publishDate}
                            onChange={handleInputChange('publishDate')}
                        />
                    </Grid>
                </Grid>
                <AddBookButton variant="contained" onClick={handleAddBook}>
                    Add Book
                </AddBookButton>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>)
}
