import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import TicketBooking from '../components/TicketBooking';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: '120px',
  paddingBottom: '60px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg,rgba(183, 214, 245, 0.8) 0%, #f1f5f9 100%)',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundImage: `
      radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
    animation: 'gradientMove 15s ease infinite',
  },
  '@keyframes gradientMove': {
    '0%': {
      backgroundPosition: '0% 0%',
    },
    '50%': {
      backgroundPosition: '100% 100%',
    },
    '100%': {
      backgroundPosition: '0% 0%',
    },
  },
}));

const PageHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -16,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    borderRadius: '2px',
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(2),
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#64748b',
  maxWidth: '600px',
  margin: '0 auto',
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: '40px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    },
    '&.Mui-focused': {
      boxShadow: '0 8px 30px rgba(99, 102, 241, 0.15)',
    },
  },
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '24px',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  minWidth: '300px',
  maxWidth: '400px',
  margin: '0 auto',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
}));

const EventImage = styled(CardMedia)(() => ({
  height: '280px',
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
  borderRadius: '12px',
  padding: '6px 16px',
  '& .MuiChip-label': {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: '#1f2937',
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
  '& .MuiSvgIcon-root': {
    fontSize: '1.1rem',
    color: '#6366f1',
  },
}));

const EventRating = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginTop: '8px',
  '& .MuiSvgIcon-root': {
    color: '#f59e0b',
    fontSize: '1.1rem',
  },
}));

const EventDescription = styled(Typography)(({ theme }) => ({
  color: '#6b7280',
  fontSize: '0.95rem',
  lineHeight: 1.6,
  marginTop: '8px',
  marginBottom: '16px',
}));

const EventOrganizer = styled(Typography)(({ theme }) => ({
  color: '#4b5563',
  fontSize: '0.9rem',
  fontWeight: 500,
  marginTop: '8px',
}));

const EventPrice = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#1f2937',
  marginTop: '16px',
}));

const BuyButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: '#ffffff',
  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(99, 102, 241, 0.4)',
  },
}));

// Update the format price function to use dollars
const formatPrice = (price) => {
  if (typeof price === 'string') {
    // If price already has ₹ symbol, return it as is
    if (price.startsWith('₹')) {
      return price;
    }
    // If price is a number string without ₹, add the symbol
    return `₹${parseFloat(price).toFixed(2)}`;
  }
  // If price is a number, add the symbol
  return `₹${price.toFixed(2)}`;
};

// Define initial events data
const initialEvents = [
  {
    id: 1,
    title: 'Summer Music Festival',
    date: 'July 15, 2024',
    time: '2:00 PM',
    location: 'Central Park, New York',
    attendees: 500,
    category: 'Music',
    price: 49.99,
    rating: 4.8,
    reviews: 128,
    organizer: 'Music Productions Inc.',
    image: 'https://assets.grok.com/users/454b9167-18f2-4941-8686-e6bc58750f81/SvgGXPygtVdyMha2-generated_image.jpg',
    description:
      'Experience a day of amazing music featuring top artists from around the world.',
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    date: 'August 20-22, 2024',
    time: '9:00 AM',
    location: 'Convention Center, San Francisco',
    attendees: 1000,
    category: 'Technology',
    price: 199.99,
    rating: 4.9,
    reviews: 256,
    organizer: 'Tech Events Co.',
    image: 'https://assets.grok.com/users/454b9167-18f2-4941-8686-e6bc58750f81/SuY9YMazdgV5TvzR-generated_image.jpg',
    description:
      'Join industry leaders and innovators to discuss the future of technology.',
  },
  {
    id: 3,
    title: 'Food & Tifins Festival',
    date: 'June 5-7, 2024',
    time: '12:00 PM',
    location: 'Riverfront Plaza, Hyderabad',
    attendees: 300,
    category: 'Food & Drink',
    price: 79.99,
    rating: 4.7,
    reviews: 89,
    organizer: 'Foodie Events',
    image: '/images/events/food-festival.jpeg',
    description:
      'Taste the finest cuisine and wine selections from renowned chefs and vineyards.',
  },
  {
    id: 4,
    title: 'International Film Festival',
    date: 'September 10-15, 2024',
    time: '6:00 PM',
    location: 'Grand Theater, Hyderabad',
    attendees: 200,
    category: 'Arts & Culture',
    price: 129.99,
    rating: 4.6,
    reviews: 67,
    organizer: 'Film Society',
    image: 'https://assets.grok.com/users/454b9167-18f2-4941-8686-e6bc58750f81/1jBRBsEITTWKHJZA-generated_image.jpg',
    description:
      'Celebrating cinema from around the world with screenings, talks, and workshops.',
  },
  {
    id: 5,
    title: 'Business Innovation Summit',
    date: 'October 3-4, 2024',
    time: '10:00 AM',
    location: 'Grand Hotel, Hyderabad',
    attendees: 2000,
    category: 'Business',
    price: 149.99,
    rating: 4.9,
    reviews: 312,
    organizer: 'Business Events Ltd.',
    image: '/images/events/business-summit.jpg',
    description:
      'Connect with entrepreneurs and business leaders to explore new ideas and opportunities.',
  },
  {
    id: 6,
    title: 'Wellness Retreat Weekend',
    date: 'May 18-19, 2024',
    time: '8:00 AM',
    location: 'Mountain Resort, Hyderabad',
    attendees: 150,
    category: 'Health & Wellness',
    price: 39.99,
    rating: 4.8,
    reviews: 156,
    organizer: 'Wellness Collective',
    image: '/images/events/wellness-retreat.jpg',
    description:
      'Rejuvenate your mind, body, and spirit with yoga, meditation, and wellness activities.',
  },
];

const Events = () => {
  const [events, setEvents] = useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showTicketBooking, setShowTicketBooking] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredEvents(events);
      return;
    }
    
    const filtered = events.filter(event => 
      event.title.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term) ||
      event.category.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term)
    );
    
    setFilteredEvents(filtered);
  };

  const handleBookTicket = (event) => {
    setSelectedEvent(event);
    setShowTicketBooking(true);
  };

  return (
    <StyledContainer>
      <PageHeader>
        <PageTitle variant="h1">
          Discover Amazing Events
        </PageTitle>
        <PageSubtitle>
          Find and book tickets for the best events in your area. From concerts to conferences, we've got you covered.
        </PageSubtitle>
      </PageHeader>
      
      <SearchBar
        fullWidth
        placeholder="Search events by name, location, or category..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#6366f1' }} />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">Loading events...</Typography>
        </Box>
      ) : filteredEvents.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">No events found matching "{searchTerm}"</Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setFilteredEvents(events);
            }}
          >
            Clear Search
          </Button>
        </Box>
      ) : (
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            justifyContent: 'center',
            width: '100%',
            margin: '0 auto',
            maxWidth: '1400px',
          }}
        >
          {filteredEvents.map((event) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={event.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                minWidth: '300px',
                maxWidth: '400px',
              }}
            >
              <EventCard>
                <EventImage
                  image={event.image}
                  title={event.title}
                >
                  <EventChip label={event.category} />
                </EventImage>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      color: '#1f2937',
                      mb: 2,
                    }}
                  >
                    {event.title}
                  </Typography>

                  <EventDescription>
                    {event.description}
                  </EventDescription>

                  <EventInfo>
                    <CalendarTodayIcon />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.date}</Typography>
                  </EventInfo>
                  {event.time && (
                    <EventInfo>
                      <AccessTimeIcon />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.time}</Typography>
                    </EventInfo>
                  )}
                  <EventInfo>
                    <LocationOnIcon />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.location}</Typography>
                  </EventInfo>
                  {event.attendees && (
                    <EventInfo>
                      <PeopleIcon />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.attendees} attendees</Typography>
                    </EventInfo>
                  )}

                  {event.rating && (
                    <EventRating>
                      <StarIcon />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{event.rating}</Typography>
                      <Typography variant="body2" color="text.secondary">({event.reviews} reviews)</Typography>
                    </EventRating>
                  )}

                  {event.organizer && (
                    <EventOrganizer>
                      Organized by: {event.organizer}
                    </EventOrganizer>
                  )}

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
                    <EventPrice>
                      {formatPrice(event.price)}
                    </EventPrice>
                    <BuyButton
                      onClick={() => handleBookTicket(event)}
                    >
                      Book Ticket
                    </BuyButton>
                  </Box>
                </CardContent>
              </EventCard>
            </Grid>
          ))}
        </Grid>
      )}

      {showTicketBooking && (
        <TicketBooking
          event={selectedEvent}
          onClose={() => {
            setShowTicketBooking(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </StyledContainer>
  );
};

export default Events; 