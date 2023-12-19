import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  styled
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));


const BooksManagement = () => {
  const token = localStorage.getItem('token');
  const [books, setBooks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    genre: '',
    ISBN: '',
    quantity: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    // Fetch books from the API endpoint when the component mounts
    axios.get(`${process.env.REACT_APP_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleOpenDialog = (book) => {
    setEditingBook(book);
    setFormValues({
      title: book ? book.title : '',
      author: book ? book.author : '',
      genre: book ? book.genre : '',
      ISBN: book ? book.ISBN : '',
      quantity: book ? book.quantity : '',
      price: book ? book.price : '',
      description: book ? book.description : '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingBook(null);
    setFormValues({
      title: '',
      author: '',
      genre: '',
      ISBN: '',
      quantity: '',
      price: '',
      description: '',
    });
    setOpenDialog(false);
  };

  const handleUpdateBook = () => {
    // Update the book in the API
    axios.put(`${process.env.REACT_APP_API_URL}/books/${editingBook._id}`, formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Update the book in the state
        const updatedBooks = books.map((book) =>
          book._id === editingBook._id ? { ...book, ...response.data } : book
        );
        setBooks(updatedBooks);

        // Show success alert
        setSnackbarMessage('Book Updated Successfully');
        setOpenSnackbar(true);

        handleCloseDialog();
      })
      .catch(error => console.error('Error updating book:', error));
  };

  const handleAddBook = () => {
    // Add a new book to the API
    axios.post(`${process.env.REACT_APP_API_URL}/books`, formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Add the new book to the state
        setBooks([...books, response.data]);

        // Show success alert
        setSnackbarMessage('Book Added Successfully');
        setOpenSnackbar(true);

        handleCloseDialog();
      })
      .catch(error => console.error('Error adding book:', error));
  };

  const handleDeleteBook = (bookId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?');

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the deletion
    }

    // Delete the book from the API
    axios.delete(`${process.env.REACT_APP_API_URL}/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          // Delete the book from the state
          const updatedBooks = books.filter((book) => book.id !== bookId);
          setBooks(updatedBooks);

          // Show success alert
          setSnackbarMessage('Book Deleted Successfully');
          setOpenSnackbar(true);
        } else {
          console.error('Error deleting book:', response.status);
        }
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Book Management
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpenDialog(null)}>
        Add Book
      </Button>

      <StyledTableContainer component={Paper}>
        <Table style={{ marginTop: '20px', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.ISBN}</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                  <Button
                    style={{
                      backgroundColor: '#1976D2', // Blue color, you can customize this
                      color: '#fff', // White text color
                      border: 'none',
                      borderRadius: '4px', // Rounded corners
                      padding: '8px 16px', // Adjust padding as needed
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s ease-in-out',
                      textDecoration: 'none',
                      '&:hover': {
                        backgroundColor: '#1565C0', // Darker blue color on hover, you can customize this
                      },
                    }}
                    onClick={() => handleOpenDialog(book)}
                  >
                    Update
                  </Button>


                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleDeleteBook(book._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingBook ? 'Update Book' : 'Add Book'}</DialogTitle>
        <DialogContent>
          <TextField id="title" label="Title" fullWidth margin="normal" value={formValues.title} onChange={handleFormChange} />
          <TextField id="author" label="Author" fullWidth margin="normal" value={formValues.author} onChange={handleFormChange} />
          <TextField id="genre" label="Genre" fullWidth margin="normal" value={formValues.genre} onChange={handleFormChange} />
          <TextField id="ISBN" label="ISBN" fullWidth margin="normal" value={formValues.ISBN} onChange={handleFormChange} />
          <TextField id="quantity" label="Quantity" fullWidth margin="normal" value={formValues.quantity} onChange={handleFormChange} />
          <TextField id="price" label="Price" fullWidth margin="normal" value={formValues.price} onChange={handleFormChange} />
          <TextField id="description" label="Description" fullWidth multiline rows={4} margin="normal" value={formValues.description} onChange={handleFormChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={editingBook ? handleUpdateBook : handleAddBook} color="primary">
            {editingBook ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={<Button color="inherit" size="small" onClick={handleSnackbarClose}>Close</Button>}
      />
    </div>
  );
};

export default BooksManagement;
