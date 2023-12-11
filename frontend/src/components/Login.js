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
import { useNavigate  } from 'react-router-dom';

function Login() {

  let navigate = useNavigate();

  const [isSignUp, setIsSignUp] = React.useState(false);
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('customer');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      let endpoint;

      if (isSignUp) {
        endpoint = 'http://localhost:5000/api/users';
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, username, password, email, role }),
        });
      } else {
        endpoint = 'http://localhost:5000/api/login';
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
      }

      if (response.ok) {
        console.log('Request successful');

        if (isSignUp) {
          if (response.status === 201) {
            // Registration successful
            console.log('User registered successfully');
            navigate('/'); // Redirect to the main page after successful registration
          }
        } else {
          if (response.status === 200) {
            // Login successful
            console.log('Login successful');
            navigate('/');  // Redirect to the main page after successful login
          }
        }
      } else {
        console.error('Request failed');
      }
    } catch (error) {
      console.error('Error during request:', error.message);
    }
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {isSignUp && (
                <TextField
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
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
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
              />
              {isSignUp && (
                <TextField
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
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
