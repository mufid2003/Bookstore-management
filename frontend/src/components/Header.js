import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)' }}>
      <Toolbar>
        {/* Left side options */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}
        >
          Your Bookstore
        </Typography>

        {/* Additional Options */}
        <Button color="inherit" sx={{ color: 'white' }}>
          Home
        </Button>
        <Button color="inherit" sx={{ color: 'white' }}>
          Books
        </Button>
        <Button color="inherit" sx={{ color: 'white' }}>
          Gallery
        </Button>

        {/* Conditional rendering of Login/Logout buttons */}
        {user_id ? (
          <Button
            onClick={handleLogout}
            sx={{
              backgroundColor: '#4CAF50',
              color: 'white',
              borderRadius: 5,
              padding: '10px 20px',
              marginLeft: 10,
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button
              sx={{
                backgroundColor: '#4CAF50',
                color: 'white',
                borderRadius: 5,
                padding: '10px 20px',
                marginLeft: 10,
                '&:hover': {
                  backgroundColor: '#45a049',
                },
              }}
            >
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;