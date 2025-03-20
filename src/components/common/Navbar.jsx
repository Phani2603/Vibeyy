import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Bookmark as BookmarkIcon,
  Star as StarIcon,
  SmartToy as SmartToyIcon,
  Home as HomeIcon,
  Event as EventIcon,
  Category as CategoryIcon,
  Dashboard as DashboardIcon,
  ContactMail as ContactMailIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import  './Navbar.css';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '50px',
  color: '#1f2937',
  position: 'sticky',
  top: 25,
  zIndex: theme.zIndex.drawer + 1,
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  cursor: 'pointer',
  marginRight: theme.spacing(4),
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#1f2937',
  fontWeight: 600,
  textTransform: 'none',
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    color: '#6366f1',
  },
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: '#1f2937',
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    color: '#6366f1',
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, signOut } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [cartAnchor, setCartAnchor] = useState(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleCartOpen = (event) => {
    setCartAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchor(null);
    setCartAnchor(null);
  };

  const handleAiAssistantToggle = () => {
    setAiAssistantOpen(!aiAssistantOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
  ];

  return (
    <>
      <StyledAppBar>
        <Toolbar>
          <Logo variant="h6" onClick={() => navigate('/')}>
            Vibeyy
          </Logo>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item) => (
              <NavButton
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                {item.text}
              </NavButton>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Search">
              <IconButtonStyled onClick={() => navigate('/search')}>
                <SearchIcon />
              </IconButtonStyled>
            </Tooltip>

            {user ? (
              <>
                <Tooltip title="Notifications">
                  <IconButtonStyled onClick={handleNotificationsOpen}>
                    <Badge badgeContent={3} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButtonStyled>
                </Tooltip>

                <Tooltip title="Shopping Cart">
                  <IconButtonStyled onClick={handleCartOpen}>
                    <Badge badgeContent={2} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButtonStyled>
                </Tooltip>

                <Tooltip title="AI Assistant">
                  <IconButtonStyled onClick={handleAiAssistantToggle}>
                    <SmartToyIcon />
                  </IconButtonStyled>
                </Tooltip>

                <Tooltip title="Account">
                  <IconButtonStyled onClick={handleProfileMenuOpen}>
                    <Avatar
                      src={user.imageUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButtonStyled>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                    <PersonIcon sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard'); }}>
                    <DashboardIcon sx={{ mr: 1 }} /> Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <LogoutIcon sx={{ mr: 1 }} /> Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <NavButton onClick={() => navigate('/sign-in')}>Sign In</NavButton>
                <NavButton
                  variant="contained"
                  onClick={() => navigate('/sign-up')}
                  sx={{
                    backgroundColor: '#6366f1',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#4f46e5',
                    },
                  }}
                >
                  Sign Up
                </NavButton>
              </>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          New event in your area
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Ticket price dropped
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Event reminder
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          View all notifications
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={cartAnchor}
        open={Boolean(cartAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          Event ticket - $49.99
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          VIP pass - $199.99
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          View cart
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Checkout
        </MenuItem>
      </Menu>

      {/* AI Assistant Chat Window */}
      <Box
        sx={{
          position: 'fixed',
          right: aiAssistantOpen ? 0 : -400,
          top: 0,
          width: 400,
          height: '100vh',
          bgcolor: 'background.paper',
          boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
          transition: 'right 0.3s ease-in-out',
          zIndex: theme.zIndex.drawer,
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SmartToyIcon sx={{ mr: 1, color: '#6366f1' }} />
            <Typography variant="h6">AI Assistant</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Ask me anything about events, tickets, or recommendations!
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          {/* Chat messages would go here */}
          <Typography variant="body2" color="text.secondary">
            Start a conversation by asking a question...
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Navbar; 