import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth, useClerk } from '@clerk/clerk-react';
import { userOperations } from '../lib/supabaseClient';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          // Create or get user in Supabase
          const supabaseUser = await userOperations.createOrGetUser(user);
          
          setCurrentUser({
            ...user,
            supabaseId: supabaseUser.id // Store the Supabase user ID
          });
        } catch (error) {
          console.error('Error setting up user:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    };

    setupUser();
  }, [isLoaded, isSignedIn, user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user: currentUser,
    loading: loading || !isLoaded,
    isSignedIn,
    signOut: handleSignOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 