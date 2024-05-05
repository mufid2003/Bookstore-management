import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();

  // State variables for managing UI state
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('customer');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  // Validation state
  const [nameError, setNameError] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset previous errors
    setNameError(false);
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);

    // Validation logic
    let isValid = true;

    if (isSignUp && name.trim() === '') {
      setNameError(true);
      isValid = false;
    }

    if (username.trim() === '') {
      setUsernameError(true);
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError(true);
      isValid = false;
    }

    if (isSignUp && email.trim() === '') {
      setEmailError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Continue with form submission
    try {
      let response;
      let endpoint;

      if (isSignUp) {
        endpoint = `${process.env.REACT_APP_API_URL}/users`;
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, username, password, email, role }),
        });
      } else {
        endpoint = `${process.env.REACT_APP_API_URL}/login`;
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
      }

      if (response.ok) {
        if (isSignUp) {
          if (response.status === 201) {
            // Registration successful
            setSuccessMessage('Sign up successful! Please sign in.');
            setShowSuccessMessage(true);
            setIsSignUp(false); // Switch to sign-in mode
          } else {
            const responseData = await response.json();
            alert(responseData.message);
          }
        } else {
          if (response.status === 200) {
            // Login successful
            const responseData = await response.json();
            localStorage.setItem('user_id', responseData.user._id);
            localStorage.setItem('username', responseData.user.username);
            localStorage.setItem('role', responseData.user.role);
            localStorage.setItem('token', responseData.token);
            if (responseData.user.role === 'customer') {
              navigate('/customer');
            } else if (responseData.user.role === 'employee') {
              navigate('/employee');
            } else if (responseData.user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/');
            }
          }
        }
      } else {
        console.error('Request failed');
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error during request:', error.message);
      alert('Error during request');
    }
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setShowSuccessMessage(false); // Hide success message on sign-up click
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    setShowSuccessMessage(false); // Hide success message on sign-in click
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Typography>
            {showSuccessMessage && (
              <Typography component="p" variant="body2" color="success" sx={{ mt: 2 }}>
                {successMessage}
              </Typography>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {isSignUp && (
                <TextField
                  error={nameError}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  helperText={nameError ? 'Name is required' : ''}
                />
              )}
              <TextField
                error={usernameError}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                helperText={usernameError ? 'Username is required' : ''}
              />
              <TextField
                error={passwordError}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText={passwordError ? 'Password is required' : ''}
              />
              {isSignUp && (
                <TextField
                  error={emailError}
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={emailError ? 'Email is required' : ''}
                />
              )}
              {isSignUp && (
                <TextField
                  margin="normal"
                  select
                  fullWidth
                  name="role"
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </TextField>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
              <Grid container>
                <Grid item>
                  {isSignUp ? (
                    <Link onClick={handleSignInClick} variant="body2">
                      Already have an account? Sign In
                    </Link>
                  ) : (
                    <Link onClick={handleSignUpClick} variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;

