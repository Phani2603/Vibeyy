import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  MenuItem,
  Slider,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Button,
  Paper,
  Divider,
  CardActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
  background: '#ffffff',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(5),
  textAlign: 'center',
  color: '#333333',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const FilterSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(6),
  background: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: theme.spacing(1, 2),
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666666',
    '&.Mui-focused': {
      color: '#333333',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#bdbdbd',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#333333',
  },
}));

const FilterButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  padding: theme.spacing(1.5, 3),
  backgroundColor: '#ffffff',
  color: '#333333',
  border: '1px solid #e0e0e0',
  fontSize: '1rem',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#bdbdbd',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: '#666666',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: '#333333',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#bdbdbd',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#333333',
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: '#666666',
  '&.Mui-focused': {
    color: '#333333',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  padding: theme.spacing(1.2, 3),
  fontSize: '1rem',
  fontWeight: 500,
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    borderColor: '#bdbdbd',
  },
}));

const EventImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
  },
}));

const EventChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1,
  background: '#333333',
  color: '#ffffff',
  fontWeight: 500,
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '6px',
  '&:hover': {
    background: '#000000',
  },
}));

const EventContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
}));

const EventInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: '#666666',
  fontSize: '0.95rem',
  marginTop: theme.spacing(1),
  '& .MuiSvgIcon-root': {
    color: '#333333',
    fontSize: '1.2rem',
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  color: '#333333',
  fontWeight: 600,
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
  lineHeight: 1.3,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const CardDescription = styled(Typography)(({ theme }) => ({
  color: '#666666',
  marginBottom: theme.spacing(3),
  lineHeight: 1.6,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const PriceTag = styled(Typography)(({ theme }) => ({
  color: '#333333',
  fontWeight: 600,
  fontSize: '1.2rem',
}));

const ViewButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  borderColor: '#333333',
  color: '#333333',
  padding: '8px 16px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    borderColor: '#000000',
    color: '#000000',
    backgroundColor: '#f5f5f5',
  },
}));

const CardFooter = styled(Box)(({ theme }) => ({
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(2),
  borderTop: '1px solid #e0e0e0',
}));

const NoResultsMessage = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5),
  width: '100%',
}));

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

const Categories = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    location: 'all',
    date: 'all',
    priceRange: [0, 1000], // Updated back to dollars range
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample categories
  const categories = [
    'All Events',
    'Music',
    'Sports',
    'Arts & Culture',
    'Food & Drink',
    'Business',
    'Education',
    'Technology',
    'Community',
    'Other',
  ];

  // Sample locations
  const locations = [
    'All Locations',
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Francisco',
    'San Diego',
    'Dallas',
  ];

  // Sample date options
  const dateOptions = [
    'All Dates',
    'Today',
    'Tomorrow',
    'This Week',
    'This Month',
    'Next Month',
  ];

  useEffect(() => {
    // Simulate API call with setTimeout
    setLoading(true);
    setTimeout(() => {
      const sampleEvents = [
        {
          id: 1,
          title: 'Summer Music Festival',
          category: 'Music',
          location: 'New York',
          date: '2024-07-15',
          price: 89.99, // Reverted to dollars
          attendees: 1200,
          image: 'https://source.unsplash.com/random/800x600/?concert',
          description: 'A day of amazing music featuring top artists from around the world. Join us for an unforgettable experience with performances across multiple stages.',
        },
        {
          id: 2,
          title: 'Tech Conference 2024',
          category: 'Technology',
          location: 'San Francisco',
          date: '2024-08-20',
          price: 299.99, // Reverted to dollars
          attendees: 3500,
          image: 'https://source.unsplash.com/random/800x600/?technology',
          description: 'Annual technology conference with industry experts discussing the latest trends, innovations, and future of technology.',
        },
        {
          id: 3,
          title: 'Food & Wine Festival',
          category: 'Food & Drink',
          location: 'Los Angeles',
          date: '2024-06-30',
          price: 149.99, // Reverted to dollars
          attendees: 850,
          image: 'https://source.unsplash.com/random/800x600/?food',
          description: 'Experience the finest cuisine and wines from around the world. Meet celebrity chefs and enjoy cooking demonstrations.',
        },
        {
          id: 4,
          title: 'Contemporary Art Exhibition',
          category: 'Arts & Culture',
          location: 'Chicago',
          date: '2024-09-10',
          price: 49.99, // Reverted to dollars
          attendees: 500,
          image: 'https://source.unsplash.com/random/800x600/?art',
          description: 'Contemporary art exhibition featuring works from local and international artists, with interactive installations and guided tours.',
        },
        {
          id: 5,
          title: 'World Sports Championship',
          category: 'Sports',
          location: 'Houston',
          date: '2024-08-05',
          price: 199.99, // Reverted to dollars
          attendees: 5000,
          image: 'https://source.unsplash.com/random/800x600/?sports',
          description: 'Annual sports championship featuring top athletes from around the world competing for the prestigious title.',
        },
        {
          id: 6,
          title: 'Business Innovation Summit',
          category: 'Business',
          location: 'Dallas',
          date: '2024-07-25',
          price: 399.99, // Reverted to dollars
          attendees: 1200,
          image: 'https://source.unsplash.com/random/800x600/?business',
          description: 'Network with industry leaders and learn about the latest business trends. Featuring keynote speakers and workshops.',
        },
        {
          id: 7,
          title: 'Educational Workshop Series',
          category: 'Education',
          location: 'Phoenix',
          date: '2024-06-15',
          price: 99.99, // Reverted to dollars
          attendees: 300,
          image: 'https://source.unsplash.com/random/800x600/?education',
          description: 'Series of workshops focused on professional development and lifelong learning, with expert instructors and hands-on activities.',
        },
        {
          id: 8,
          title: 'Community Fundraiser',
          category: 'Community',
          location: 'Philadelphia',
          date: '2024-09-05',
          price: 29.99, // Reverted to dollars
          attendees: 750,
          image: 'https://source.unsplash.com/random/800x600/?community',
          description: 'Join your local community in raising funds for important causes. Features entertainment, food, and activities for all ages.',
        },
      ];
      setEvents(sampleEvents);
      setFilteredEvents(sampleEvents);
      setLoading(false);
    }, 600);
  }, []);

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle real-time search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filters.search) {
        applyFilters();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filters.search]);

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...events];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    // Apply location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(event => event.location === filters.location);
    }

    // Apply date filter
    if (filters.date !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        switch (filters.date) {
          case 'Today':
            return eventDate.toDateString() === today.toDateString();
          case 'Tomorrow':
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return eventDate.toDateString() === tomorrow.toDateString();
          case 'This Week':
            const weekEnd = new Date(today);
            weekEnd.setDate(weekEnd.getDate() + 7);
            return eventDate >= today && eventDate <= weekEnd;
          case 'This Month':
            const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            return eventDate >= today && eventDate <= monthEnd;
          case 'Next Month':
            const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0);
            return eventDate >= nextMonthStart && eventDate <= nextMonthEnd;
          default:
            return true;
        }
      });
    }

    // Apply price range filter
    filtered = filtered.filter(event =>
      event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1]
    );

    setFilteredEvents(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      location: 'all',
      date: 'all',
      priceRange: [0, 1000], // Updated back to dollars range
    });
    setFilteredEvents(events);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <PageContainer maxWidth="lg">
      <PageTitle variant="h1">
        Discover Events
      </PageTitle>

      <FilterSection elevation={0}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <SearchField
            fullWidth
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#666666' }} />
                </InputAdornment>
              ),
            }}
          />
          <FilterButton
            startIcon={<FilterIcon />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </FilterButton>
        </Box>

        {showFilters && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <StyledInputLabel>Category</StyledInputLabel>
                  <StyledSelect
                    value={filters.category}
                    label="Category"
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category === 'All Events' ? 'all' : category}>
                        {category}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <StyledInputLabel>Location</StyledInputLabel>
                  <StyledSelect
                    value={filters.location}
                    label="Location"
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    {locations.map((location) => (
                      <MenuItem key={location} value={location === 'All Locations' ? 'all' : location}>
                        {location}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <StyledInputLabel>Date</StyledInputLabel>
                  <StyledSelect
                    value={filters.date}
                    label="Date"
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                  >
                    {dateOptions.map((date) => (
                      <MenuItem key={date} value={date === 'All Dates' ? 'all' : date}>
                        {date}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ px: 2 }}>
                  <Typography gutterBottom sx={{ color: '#666666' }}>
                    Price Range (${filters.priceRange[0]} - ${filters.priceRange[1]})
                  </Typography>
                  <Slider
                    value={filters.priceRange}
                    onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={10}
                    valueLabelFormat={(value) => `$${value}`}
                    sx={{
                      color: '#333333',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#333333',
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.1)',
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <ActionButton
                variant="contained"
                onClick={applyFilters}
                sx={{
                  backgroundColor: '#333333',
                  '&:hover': {
                    backgroundColor: '#000000',
                  },
                }}
              >
                Apply Filters
              </ActionButton>
              <ActionButton
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={clearFilters}
                sx={{ 
                  color: '#666666',
                  borderColor: '#e0e0e0',
                  '&:hover': {
                    borderColor: '#bdbdbd',
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Clear Filters
              </ActionButton>
            </Box>
          </Box>
        )}
      </FilterSection>

      {loading ? (
        <Box sx={{ textAlign: 'center', padding: 5 }}>
          <Typography variant="h6" color="textSecondary">Loading events...</Typography>
        </Box>
      ) : filteredEvents.length === 0 ? (
        <NoResultsMessage>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            No events found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Try adjusting your filters or search term
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </NoResultsMessage>
      ) : (
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4}>
              <EventCard>
                <EventImage
                  image={event.image}
                  title={event.title}
                >
                  <EventChip label={event.category} />
                </EventImage>
                <EventContent>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription variant="body1">
                    {event.description}
                  </CardDescription>
                  <EventInfo>
                    <LocationIcon />
                    <Typography variant="body2">{event.location}</Typography>
                  </EventInfo>
                  <EventInfo>
                    <CalendarIcon />
                    <Typography variant="body2">
                      {formatDate(event.date)}
                    </Typography>
                  </EventInfo>
                  <EventInfo>
                    <PersonIcon />
                    <Typography variant="body2">
                      {event.attendees.toLocaleString()} attendees
                    </Typography>
                  </EventInfo>
                  <CardFooter>
                    <EventInfo>
                      <MoneyIcon />
                      <Typography variant="h6" color="primary">
                        {formatPrice(event.price)}
                      </Typography>
                    </EventInfo>
                    <ViewButton variant="outlined">
                      View Details
                    </ViewButton>
                  </CardFooter>
                </EventContent>
              </EventCard>
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
};

export default Categories; 