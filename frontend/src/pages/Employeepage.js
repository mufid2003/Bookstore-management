import React, { useEffect, useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import UpdateIcon from '@mui/icons-material/Update';
import { Link } from 'react-router-dom'


export default function Employeepage() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
    
      setBooks(res.data);
    }).catch(e => {
      console.log(e);
    })
  }, []);

  const handleDelete = async (bookId) => {
    try {
      // Dummy delete logic (replace with actual delete logic)

      const isConfirmed = window.confirm('Are you sure you want to delete this book?');

      if (isConfirmed) {
        // Implement your delete logic here
        axios.delete(`${process.env.REACT_APP_API_URL}/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
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
    <div style={{ margin: '20px' }}>
      <Link to="/addbook">
        <Button variant="contained" color="success">
          Add Book
        </Button>
      </Link>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
        <TableHead>
  <TableRow style={{ backgroundColor: '#2196f3', color: 'white' }}>
    <TableCell style={{ fontWeight: 'bold' }}>Title</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>Author</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>Genre</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>ISBN</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>Update</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
  </TableRow>
</TableHead>

          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book._id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#e1f5fe', // Light blue color on hover
                  },
                }}
              >
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.ISBN}</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>${book.price}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                  <Link to={`/updatebook/${book._id}`}>
                    <Tooltip title="Update" arrow>
                      <IconButton color="primary">
                        <UpdateIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete" arrow>
                    <IconButton onClick={() => handleDelete(book._id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
