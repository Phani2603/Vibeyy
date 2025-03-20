import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ background: 'transparent',borderRadius: '30px', boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: '#ffffff',
              textDecoration: 'none',
              background: 'linear-gradient(to right,rgb(164, 74, 203),rgb(162, 25, 189))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'sticky',
              top: '20px',
              zIndex: 1000,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '30px',
              padding: '8px 16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            VIBEYY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/"
              sx={{ my: 2, color: '#ffffff', display: 'block' }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/categories"
              sx={{ my: 2, color: '#ffffff', display: 'block' }}
            >
              Categories
            </Button>
            <Button
              component={Link}
              to="/sign-in"
              sx={{ my: 2, color: '#ffffff', display: 'block' }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/sign-up"
              sx={{ my: 2, color: '#ffffff', display: 'block' }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 