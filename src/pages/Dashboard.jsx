import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  CardMedia,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuthContext } from '../context/AuthContext';
import { userOperations } from '../lib/supabaseClient';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import SellIcon from '@mui/icons-material/Sell';

const DashboardContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`dashboard-tabpanel-${index}`}
    aria-labelledby={`dashboard-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const mockTickets = [
  {
    id: 1,
    eventName: 'Summer Music Festival 2024',
    date: '2024-07-15',
    time: '18:00',
    location: 'Central Park, NY',
    price: 89.99,
    status: 'active',
    quantity: 2,
    image: 'https://source.unsplash.com/random/800x600/?concert',
  },
  {
    id: 2,
    eventName: 'Tech Conference 2024',
    date: '2024-08-20',
    time: '09:00',
    location: 'Convention Center, SF',
    price: 199.99,
    status: 'pending',
    quantity: 1,
    image: 'https://source.unsplash.com/random/800x600/?technology',
  },
  {
    id: 3,
    eventName: 'Food & Wine Festival',
    date: '2024-09-10',
    time: '12:00',
    location: 'Riverside Gardens',
    price: 149.99,
    status: 'sold',
    quantity: 3,
    image: 'https://source.unsplash.com/random/800x600/?food',
  },
];

const mockEvents = [
  {
    id: 1,
    title: 'Summer Music Festival 2024',
    date: '2024-07-15',
    time: '18:00',
    location: 'Central Park, NY',
    price: 89.99,
    category: 'Music',
    attendees: 250,
    status: 'active',
    image: 'https://source.unsplash.com/random/800x600/?concert',
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    date: '2024-08-20',
    time: '09:00',
    location: 'Convention Center, SF',
    price: 199.99,
    category: 'Technology',
    attendees: 500,
    status: 'upcoming',
    image: 'https://source.unsplash.com/random/800x600/?technology',
  },
  {
    id: 3,
    title: 'Food & Wine Festival',
    date: '2024-09-10',
    time: '12:00',
    location: 'Riverside Gardens',
    price: 149.99,
    category: 'Food & Drink',
    attendees: 300,
    status: 'draft',
    image: 'https://source.unsplash.com/random/800x600/?food',
  },
];

const mockStats = {
  totalEvents: 12,
  activeEvents: 5,
  totalTickets: 45,
  soldTickets: 28,
  revenue: 5240.50,
  upcomingEvents: 7,
};

const categories = [
  'Music',
  'Technology',
  'Food & Drink',
  'Sports',
  'Arts & Culture',
  'Business',
  'Education',
  'Other'
];

const Dashboard = () => {
  const { user, loading: authLoading, isSignedIn } = useAuthContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [userTickets, setUserTickets] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    category: '',
    image: '',
  });
  const [openSellDialog, setOpenSellDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [sellForm, setSellForm] = useState({
    price: '',
    description: '',
  });

  useEffect(() => {
    if (!authLoading && !isSignedIn) {
      navigate('/sign-in');
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, authLoading, isSignedIn, navigate]);

  const fetchUserData = async () => {
    if (!user) {
      setError('User is not logged in');
      return;
    }

    try {
      setLoading(true);
      const [tickets, events] = await Promise.all([
        userOperations.getUserTickets(user.id),
        userOperations.getUserEvents(user.id),
      ]);
      setUserTickets(tickets);
      setUserEvents(events);
    } catch (err) {
      setError('Failed to fetch user data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEventSubmit = async () => {
    try {
      await userOperations.createEvent(
        {
          ...eventForm,
          created_at: new Date().toISOString(),
        },
        user.id
      );
      setOpenEventDialog(false);
      setEventForm({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        image: '',
      });
      fetchUserData();
    } catch (err) {
      setError('Failed to create event');
      console.error(err);
    }
  };

  const handleEventDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await userOperations.deleteEvent(eventId);
        fetchUserData();
      } catch (err) {
        setError('Failed to delete event');
        console.error(err);
      }
    }
  };

  const handleSellTicket = (ticket) => {
    setSelectedTicket(ticket);
    setSellForm({
      price: ticket.price.toString(),
      description: '',
    });
    setOpenSellDialog(true);
  };

  const handleSellSubmit = async () => {
    try {
      // Here you would typically:
      // 1. Create a new listing in your marketplace
      // 2. Update the ticket status to 'for_sale'
      // 3. Update the ticket price to the new selling price
      
      // For now, we'll just close the dialog and show a success message
      setOpenSellDialog(false);
      setSelectedTicket(null);
      setSellForm({
        price: '',
        description: '',
      });
      // You would call your Supabase function here to handle the sale
      // await userOperations.sellTicket(selectedTicket.id, sellForm);
    } catch (err) {
      setError('Failed to list ticket for sale');
      console.error(err);
    }
  };

  const renderStats = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon sx={{ color: '#6366f1', mr: 1 }} />
              <Typography variant="h6">Total Events</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
              {mockStats.totalEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockStats.activeEvents} active events
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ConfirmationNumberIcon sx={{ color: '#6366f1', mr: 1 }} />
              <Typography variant="h6">Tickets</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
              {mockStats.totalTickets}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockStats.soldTickets} tickets sold
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon sx={{ color: '#6366f1', mr: 1 }} />
              <Typography variant="h6">Revenue</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
              ₹{mockStats.revenue.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This month
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <UpcomingIcon sx={{ color: '#6366f1', mr: 1 }} />
              <Typography variant="h6">Upcoming</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
              {mockStats.upcomingEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Next 30 days
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );

  const renderTickets = () => (
    <Grid container spacing={3}>
      {mockTickets.map((ticket) => (
        <Grid item xs={12} sm={6} md={4} key={ticket.id}>
          <StyledCard>
            <CardMedia
              component="img"
              height="140"
              image={ticket.image}
              alt={ticket.eventName}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {ticket.eventName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {ticket.date} at {ticket.time}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {ticket.location}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="primary">
                  ₹{ticket.price}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {ticket.status === 'active' && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SellIcon />}
                      onClick={() => handleSellTicket(ticket)}
                    >
                      Sell
                    </Button>
                  )}
                  <Chip
                    label={ticket.status}
                    color={ticket.status === 'active' ? 'success' : ticket.status === 'pending' ? 'warning' : 'default'}
                    size="small"
                  />
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}

      <Dialog open={openSellDialog} onClose={() => setOpenSellDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Sell Ticket</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedTicket.eventName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedTicket.date} at {selectedTicket.time}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Selling Price (₹)"
                  type="number"
                  value={sellForm.price}
                  onChange={(e) => setSellForm({ ...sellForm, price: e.target.value })}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={sellForm.description}
                  onChange={(e) => setSellForm({ ...sellForm, description: e.target.value })}
                  placeholder="Add any details about the ticket or reason for selling..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSellDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSellSubmit} 
            variant="contained"
            disabled={!sellForm.price || sellForm.price <= 0}
          >
            List for Sale
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );

  const renderEvents = () => {
    const filteredEvents = selectedCategory === 'all'
      ? mockEvents
      : mockEvents.filter(event => event.category === selectedCategory);

    const conductingEvents = filteredEvents.filter(event => event.status === 'active');
    const attendingEvents = filteredEvents.filter(event => event.status === 'upcoming');

    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{ height: 40 }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenEventDialog(true)}
          >
            Create Event
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Events I'm Conducting
        </Typography>
        <Grid container spacing={3}>
          {conductingEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {event.date} at {event.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {event.location}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ₹{event.price}
                    </Typography>
                    <Box>
                      <IconButton size="small" onClick={() => handleEventDelete(event.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <Chip
                        label={event.status}
                        color={event.status === 'active' ? 'success' : event.status === 'upcoming' ? 'warning' : 'default'}
                        size="small"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Events I'm Attending
        </Typography>
        <Grid container spacing={3}>
          {attendingEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {event.date} at {event.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {event.location}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ₹{event.price}
                    </Typography>
                    <Chip
                      label={event.status}
                      color={event.status === 'active' ? 'success' : event.status === 'upcoming' ? 'warning' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openEventDialog} onClose={() => setOpenEventDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={eventForm.price}
                  onChange={(e) => setEventForm({ ...eventForm, price: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={eventForm.category}
                    label="Category"
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  value={eventForm.image}
                  onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEventDialog(false)}>Cancel</Button>
            <Button onClick={handleEventSubmit} variant="contained">
              Create Event
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  if (authLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <DashboardContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {renderStats()}

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab icon={<ConfirmationNumberIcon />} label="My Tickets" />
        <Tab icon={<EventIcon />} label="My Events" />
        <Tab icon={<PersonIcon />} label="Profile" />
      </Tabs>

      <TabPanel value={activeTab} index={0}>
        {renderTickets()}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {renderEvents()}
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Name: {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  User ID: {user.id}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </TabPanel>
    </DashboardContainer>
  );
};

export default Dashboard;