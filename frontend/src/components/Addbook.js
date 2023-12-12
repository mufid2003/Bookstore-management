import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

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

    const handleInputChange = (field) => (event) => {
        setBookData({ ...bookData, [field]: event.target.value });
    };

    const handleAddBook = async () => {
        // Validate bookData or perform additional checks if needed

        // Pass the bookData to the parent component
        try {
            console.log(bookData);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/books`, bookData);

            if (response.status === 201) {
                // Book added successfully, you can perform any additional actions here
                console.log('Book added successfully');
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
        <div>
            <form>
                <div style={{ marginBottom: '16px' }}>
                    <label>Title:</label>
                    <TextField
                        id="title"
                        label="Title"
                        variant="filled"
                        value={bookData.title}
                        onChange={handleInputChange('title')}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label>Author:</label>
                    <TextField
                        id="author"
                        label="Author"
                        variant="filled"
                        value={bookData.author}
                        onChange={handleInputChange('author')}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label>Genre:</label>
                    <TextField
                        id="genre"
                        label="Genre"
                        variant="filled"
                        value={bookData.genre}
                        onChange={handleInputChange('genre')}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label>ISBN:</label>
                    <TextField
                        id="ISBN"
                        label="ISBN"
                        variant="filled"
                        value={bookData.ISBN}
                        onChange={handleInputChange('ISBN')}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label>Quantity:</label>
                    <TextField
                        id="quantity"
                        label="Quantity"
                        variant="filled"
                        value={bookData.quantity}
                        onChange={handleInputChange('quantity')}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label>Price:</label>
                    <TextField
                        id="price"
                        label="Price"
                        variant="filled"
                        value={bookData.price}
                        onChange={handleInputChange('price')}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label>Description:</label>
                    <TextField
                        id="description"
                        label="Description"
                        variant="filled"
                        multiline
                        rows={4}
                        value={bookData.description}
                        onChange={handleInputChange('description')}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label>Publish Date:</label>
                    <TextField
                        id="publishDate"
                        label="Publish Date"
                        variant="filled"
                        type="date"
                        value={bookData.publishDate}
                        onChange={handleInputChange('publishDate')}
                    />
                </div>

                <Button variant="contained" color="primary" onClick={handleAddBook}>
                    Add Book
                </Button>
            </form>

        </div>
    )
}
