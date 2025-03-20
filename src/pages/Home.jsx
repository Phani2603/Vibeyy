import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SecurityIcon from '@mui/icons-material/Security';
import AddIcon from '@mui/icons-material/Add';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate } from 'react-router-dom';

const HeroWrapper = styled(Box)(() => ({
  position: 'relative',
  minHeight: '100vh',
  width: '100vw',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100")',
    backgroundSize: '100vw 100vh',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    objectFit: 'cover',
    imageRendering: 'crisp-edges',
    opacity: 0.5,
    zIndex: 1,
    transform: 'scale(1.1)',
    filter: 'blur(0.2px)',
  },
}));

const HeroContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '100% !important',
  padding: theme.spacing(0, 4),
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const HeroContent = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  color: '#ffffff',
  maxWidth: '800px',
  margin: '0 auto',
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 800,
  marginBottom: theme.spacing(5),
  background: 'linear-gradient(135deg, #ffffff 0%, #b3b3b3 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: '#b3b3b3',
  marginBottom: theme.spacing(6),
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(6),
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    color: '#ffffff',
    height: '56px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: '#b3b3b3',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#b3b3b3',
    '&.Mui-focused': {
      color: '#6366f1',
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: '#ffffff',
  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
  transition: 'all 0.3s ease',
  minWidth: '140px',
  height: '56px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(6),
  marginTop: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: '#ffffff',
  '& .MuiSvgIcon-root': {
    color: '#6366f1',
    fontSize: '2.5rem',
    marginBottom: theme.spacing(1),
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #ffffff 0%, #b3b3b3 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(0.5),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: '#b3b3b3',
  fontSize: '1rem',
  fontWeight: 500,
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
}));

const EventImage = styled(CardMedia)(({ theme }) => ({
  height: '240px',
  position: 'relative',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
  },
}));

const EventChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: '16px',
  right: '16px',
  zIndex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  borderRadius: '8px',
  padding: '4px 12px',
  '& .MuiChip-label': {
    fontWeight: 600,
    fontSize: '0.875rem',
  },
}));

const EventInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#6b7280',
  marginTop: '8px',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#6366f1',
  },
}));

// Update the format price function to use dollars
const formatPrice = (price) => {
  if (typeof price === 'string' && price.startsWith('$')) {
    return price;
  }
  return `$${parseFloat(price).toFixed(2)}`;
};

// Styled Components
const MainContainer = styled(Container)(({ theme }) => ({
  maxWidth: '100% !important',
  padding: theme.spacing(8, 4),
  background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 2),
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(6),
  padding: theme.spacing(0, 2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -16,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: -16,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '24px',
    background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  color: '#6366f1',
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#4f46e5',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    transform: 'translateX(4px)',
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'translateX(4px)',
  },
}));

const EventsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .MuiGrid-item': {
    display: 'flex',
  },
}));

const FeaturesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 4),
  background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 2),
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
  },
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#6b7280',
  textAlign: 'center',
  maxWidth: '300px',
}));

// Add categories data
const categories = [
  { id: 1, name: 'Music', icon: '🎵', count: 150 },
  { id: 2, name: 'Technology', icon: '💻', count: 200 },
  { id: 3, name: 'Food & Drink', icon: '🍽️', count: 100 },
  { id: 4, name: 'Arts & Culture', icon: '🎨', count: 80 },
  { id: 5, name: 'Business', icon: '💼', count: 120 },
  { id: 6, name: 'Health & Wellness', icon: '🧘', count: 90 },
  { id: 7, name: 'Sports', icon: '⚽', count: 110 },
  { id: 8, name: 'Education', icon: '📚', count: 70 },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  // Define featured events first
  const featuredEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      date: 'July 15, 2024',
      time: '2:00 PM',
      location: 'Central Park',
      attendees: 500,
      category: 'Music',
      price: '$49.99',
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      date: 'August 5, 2024',
      time: '9:00 AM',
      location: 'Convention Center',
      attendees: 1000,
      category: 'Technology',
      price: '$199.99',
    },
    {
      id: 3,
      title: 'Food & Wine Festival',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      date: 'September 1, 2024',
      time: '12:00 PM',
      location: 'Riverside Gardens',
      attendees: 300,
      category: 'Food',
      price: '$79.99',
    }
  ];

  // Then define all events
  const allEvents = [
    ...featuredEvents,
    {
      id: 4,
      title: 'International Film Festival',
      date: 'September 10-15, 2024',
      time: '6:00 PM',
      location: 'Grand Theater, Los Angeles',
      attendees: 200,
      category: 'Arts & Culture',
      price: '$129.99',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 5,
      title: 'Business Innovation Summit',
      date: 'October 3-4, 2024',
      time: '10:00 AM',
      location: 'Grand Hotel, Boston',
      attendees: 2000,
      category: 'Business',
      price: '$149.99',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 6,
      title: 'Wellness Retreat Weekend',
      date: 'May 18-19, 2024',
      time: '8:00 AM',
      location: 'Mountain Resort, Denver',
      attendees: 150,
      category: 'Health & Wellness',
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    }
  ];

  // Set initial filtered events
  useEffect(() => {
    setFilteredEvents(allEvents);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredEvents(allEvents);
      return;
    }
    
    const filtered = allEvents.filter(event => 
      event.title.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term) ||
      event.category.toLowerCase().includes(term) ||
      event.date.toLowerCase().includes(term) ||
      event.time.toLowerCase().includes(term)
    );
    
    setFilteredEvents(filtered);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <Box>
      <HeroWrapper>
        <HeroContainer>
          <HeroContent>
            <Fade in timeout={1000}>
              <div>
                <HeroTitle variant="h1">
                  Discover Amazing Events Near You
                </HeroTitle>
                <HeroSubtitle>
                  Find and book tickets for the best events in your area. From concerts to conferences, we've got you covered.
                </HeroSubtitle>
              </div>
            </Fade>

            <Slide direction="up" in timeout={1000} style={{ transitionDelay: '300ms' }}>
              <div>
                <SearchBox>
                  <StyledTextField
                    fullWidth
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ActionButton onClick={handleSearchSubmit}>
                    Search
                    <ArrowForwardIcon sx={{ ml: 1 }} />
                  </ActionButton>
                </SearchBox>

                <StatsBox>
                  <StatItem>
                    <CalendarTodayIcon />
                    <StatNumber>500+</StatNumber>
                    <StatLabel>Events Monthly</StatLabel>
                  </StatItem>
                  <StatItem>
                    <LocationOnIcon />
                    <StatNumber>50+</StatNumber>
                    <StatLabel>Cities</StatLabel>
                  </StatItem>
                  <StatItem>
                    <CategoryIcon />
                    <StatNumber>20+</StatNumber>
                    <StatLabel>Categories</StatLabel>
                  </StatItem>
                </StatsBox>
              </div>
            </Slide>
          </HeroContent>
        </HeroContainer>
      </HeroWrapper>

      <MainContainer>
        <SectionHeader>
          <SectionTitle variant="h2">
            Featured Events
          </SectionTitle>
          <ViewAllButton 
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/events')}
          >
            View All Events
          </ViewAllButton>
        </SectionHeader>

        <EventsGrid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <EventCard>
                <EventImage
                  image={event.image}
                  title={event.title}
                >
                  <EventChip label={event.category} />
                </EventImage>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: '#1f2937',
                      mb: 2,
                    }}
                  >
                    {event.title}
                  </Typography>
                  <EventInfo>
                    <CalendarTodayIcon fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.date}</Typography>
                  </EventInfo>
                  <EventInfo>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.time}</Typography>
                  </EventInfo>
                  <EventInfo>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.location}</Typography>
                  </EventInfo>
                  <EventInfo>
                    <PeopleIcon fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.attendees} attendees</Typography>
                  </EventInfo>
                  <Box 
                    sx={{ 
                      mt: 3, 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      pt: 2,
                      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      sx={{ 
                        fontWeight: 700,
                        fontSize: '1.25rem',
                      }}
                    >
                      {formatPrice(event.price)}
                    </Typography>
                    <Button 
                      variant="contained" 
                      sx={{ 
                        borderRadius: '12px',
                        padding: '8px 24px',
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
                        },
                      }}
                      onClick={() => navigate('/checkout', { 
                        state: { 
                          event: {
                            ...event,
                            quantity: 1
                          }
                        } 
                      })}
                    >
                      Get Tickets
                    </Button>
                  </Box>
                </CardContent>
              </EventCard>
            </Grid>
          ))}
        </EventsGrid>
      </MainContainer>

      <FeaturesSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: 8,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose Vibeyy?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  marginBottom: 2,
                }}>
                  <IconButton sx={{ color: '#fff' }}>
                    <ThumbUpIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
                <FeatureTitle>Easy Event Discovery</FeatureTitle>
                <FeatureDescription>
                  Find the perfect events with our advanced search and filtering options. Browse by category, location, or date.
                </FeatureDescription>
                <Box sx={{ mt: 2 }}>
                  <IconButton color="primary">
                    <SearchIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <LocationOnIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <CalendarTodayIcon />
                  </IconButton>
                </Box>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  marginBottom: 2,
                }}>
                  <IconButton sx={{ color: '#fff' }}>
                    <SecurityIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
                <FeatureTitle>Secure Booking</FeatureTitle>
                <FeatureDescription>
                  Book with confidence using our secure payment system. Your transactions are protected with industry-standard encryption.
                </FeatureDescription>
                <Box sx={{ mt: 2 }}>
                  <IconButton color="primary">
                    <ShareIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <BookmarkIcon />
                  </IconButton>
                </Box>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  marginBottom: 2,
                }}>
                  <IconButton sx={{ color: '#fff' }}>
                    <AddIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
                <FeatureTitle>Host Your Event</FeatureTitle>
                <FeatureDescription>
                  Create and manage your own events with our comprehensive event hosting platform. Reach thousands of potential attendees.
                </FeatureDescription>
                <Box sx={{ mt: 2 }}>
                  <IconButton color="primary">
                    <StarIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <NotificationsIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <PersonIcon />
                  </IconButton>
                </Box>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                  marginBottom: 2,
                }}>
                  <IconButton sx={{ color: '#fff' }}>
                    <StorefrontIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
                <FeatureTitle>Ticket Marketplace</FeatureTitle>
                <FeatureDescription>
                  Buy and sell tickets safely through our verified marketplace. Get the best deals on resale tickets with buyer protection.
                </FeatureDescription>
                <Box sx={{ mt: 2 }}>
                  <IconButton color="primary">
                    <LocalOfferIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <SecurityIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <ShareIcon />
                  </IconButton>
                </Box>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                  marginBottom: 2,
                }}>
                  <IconButton sx={{ color: '#fff' }}>
                    <AutoAwesomeIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
                <FeatureTitle>Drip Recommender</FeatureTitle>
                <FeatureDescription>
                  Get personalized event recommendations based on your interests and past attendance. Never miss an event you'll love.
                </FeatureDescription>
                <Box sx={{ mt: 2 }}>
                  <IconButton color="primary">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <BookmarkIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <StarIcon />
                  </IconButton>
                </Box>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  marginBottom: 2,
                }}>
                  <IconButton sx={{ color: '#fff' }}>
                    <SmartToyIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
                <FeatureTitle>AI Event Assistant</FeatureTitle>
                <FeatureDescription>
                  Get instant help with our AI-powered event assistant. Find events, get recommendations, and manage bookings effortlessly.
                </FeatureDescription>
                <Box sx={{ mt: 2 }}>
                  <IconButton color="primary">
                    <ChatIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <HelpIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <SmartToyIcon />
                  </IconButton>
                </Box>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </FeaturesSection>
    </Box>
  );
};

export default Home; 