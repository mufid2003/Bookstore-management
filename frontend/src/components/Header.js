import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (based on token)
    const userToken = localStorage.getItem('token');
    if (userToken) {
      const storedUserName = localStorage.getItem('username');
      setUserName(storedUserName);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    // Update state to reflect the user is logged out
    setIsLoggedIn(false);
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

        {/* Display user name if logged in */}
        {isLoggedIn && (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', marginRight: 10 }}>
            Welcome, {userName}!
          </Typography>
        )}

        {/* New button/link for Orders */}
        {isLoggedIn && (
          <Link to="/orders" style={{ textDecoration: 'none' }}>
            <Button
              color="inherit"
              sx={{
                color: 'white',
                borderRadius: 5,
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
              }}
            >
              Orders
            </Button>
          </Link>
        )}

        {/* Conditional rendering of Login/Logout buttons */}
        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            sx={{
              backgroundColor: '#4CAF50',
              color: 'white',
              borderRadius: 5,
              padding: '10px 20px',
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
