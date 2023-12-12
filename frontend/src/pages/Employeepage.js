import React, { useEffect, useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default function Employeepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`).then(res => {
      console.log(res);
      setBooks(res.data);
    }).catch(e => {
      console.log(e);
    })
  }, []);

  const handleDelete = async (bookId) => {
    try {
      // Dummy delete logic (replace with actual delete logic)
      console.log('Deleting book with ID:', bookId);

      const isConfirmed = window.confirm('Are you sure you want to delete this book?');

      if (isConfirmed) {
        // Implement your delete logic here
        axios.delete(`${process.env.REACT_APP_API_URL}/books/${bookId}`).then(res => {
          console.log(res.data);
          alert('Book deleted successfully'); // You can replace this with your actual success message
          setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
        }).catch(e => {
          console.log(e);
        })

      }
      // Simulate a delete by filtering out the deleted book from the local state
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
  };
  return (
    <div>
      <Link to='/addbook'>
        <Button variant="contained" color="success">
          Add Book
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table>
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
                  <Link to={`/updatebook/${book._id}`}>
                    <Button variant="contained" color="primary">
                      Update
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(book._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
