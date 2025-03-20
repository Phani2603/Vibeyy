import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Link,
} from '@mui/material';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  const navigate = useNavigate();

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
          Sign in
        </Typography>
        <SignIn 
          routing="path" 
          path="/login"
          signUpUrl="/signup"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
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

export default Login; 