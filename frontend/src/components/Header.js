import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const updateUserInfo = () => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      const storedUserName = localStorage.getItem('username');
      const storedRole = localStorage.getItem('role');
      setUserName(storedUserName);
      setRole(storedRole);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    updateUserInfo();
  }, []);


  // Use useEffect to listen for changes in the route
  useEffect(() => {
    // Check if the user is logged in when the route changes
    updateUserInfo();
    if(role === 'admin'){
      navigate('/admin');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
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
        {isLoggedIn && (role === 'customer') && (
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
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
                Home
              </Button>
              <Link to="/customer" style={{ textDecoration: 'none' }}>
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
                  Books
                </Button>
              </Link>
            </Link>
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
          </div>

        )}

        {/*options for employee*/}
        {/* New button/link for Orders */}
        {isLoggedIn && (role === 'employee') && (
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
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
                Home
              </Button>
              <Link to="/employee" style={{ textDecoration: 'none' }}>
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
                  Books
                </Button>
              </Link>
            </Link>
          </div>

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
