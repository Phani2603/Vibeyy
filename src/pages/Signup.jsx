import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import { SignUp } from '@clerk/clerk-react';

const Signup = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Sign up
        </Typography>
        <SignUp 
          routing="path" 
          path="/signup"
          signInUrl="/login"
          afterSignUpUrl="/dashboard"
          afterSignInUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: {
                width: '100%',
                marginTop: '1rem',
              },
              card: {
                boxShadow: 'none',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Signup; 