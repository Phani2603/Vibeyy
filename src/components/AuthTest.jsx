import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Box, Typography, Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

function AuthTest() {
  const { currentUser, loading, isSignedIn } = useAuthContext();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Authentication Status
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Loading: {loading ? 'Yes' : 'No'}</Typography>
        <Typography>Signed In: {isSignedIn ? 'Yes' : 'No'}</Typography>
        {currentUser ? (
          <>
            <Typography>User ID: {currentUser.id}</Typography>
            <Typography>Name: {currentUser.firstName} {currentUser.lastName}</Typography>
            <Typography>Email: {currentUser.email}</Typography>
          </>
        ) : (
          <Typography>No user data available</Typography>
        )}
      </Box>
    </Paper>
  );
}

export default AuthTest;