import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import { styled } from '@mui/material/styles';

const TicketCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const TicketQR = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

const TicketBooking = ({ event, onClose }) => {
  const [ticketType, setTicketType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [ticketDetails, setTicketDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [showTicket, setShowTicket] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);

  const ticketTypes = [
    { id: 'regular', name: 'Regular', price: 49.99 },
    { id: 'vip', name: 'VIP', price: 199.99 },
    { id: 'premium', name: 'Premium', price: 149.99 },
  ];

  const generateTicketId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TKT-${timestamp}-${random}`;
  };

  const generateTicket = () => {
    const selectedTicket = ticketTypes.find(t => t.id === ticketType);
    const ticketId = generateTicketId();
    
    const ticket = {
      id: ticketId,
      eventName: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      ticketType: selectedTicket.name,
      price: selectedTicket.price,
      quantity: quantity,
      customerName: ticketDetails.name,
      customerEmail: ticketDetails.email,
      customerPhone: ticketDetails.phone,
      purchaseDate: new Date().toISOString(),
      qrCode: ticketId,
    };

    setGeneratedTicket(ticket);
    setShowTicket(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateTicket();
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Book Tickets for {event.title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {!showTicket ? (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Ticket Type</InputLabel>
                  <Select
                    value={ticketType}
                    onChange={(e) => setTicketType(e.target.value)}
                    label="Ticket Type"
                    required
                  >
                    {ticketTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name} - ${type.price}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  inputProps={{ min: 1 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={ticketDetails.name}
                  onChange={(e) => setTicketDetails({ ...ticketDetails, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={ticketDetails.email}
                  onChange={(e) => setTicketDetails({ ...ticketDetails, email: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={ticketDetails.phone}
                  onChange={(e) => setTicketDetails({ ...ticketDetails, phone: e.target.value })}
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#ffffff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  },
                }}
              >
                Generate Ticket
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <TicketCard>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                      {generatedTicket.eventName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {generatedTicket.eventDate} at {generatedTicket.eventTime}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {generatedTicket.eventLocation}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Ticket Details
                    </Typography>
                    <Typography variant="body2">
                      Type: {generatedTicket.ticketType}
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {generatedTicket.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Total Price: ${(generatedTicket.price * generatedTicket.quantity).toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      Ticket ID: {generatedTicket.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TicketQR>
                      <QRCodeSVG
                        value={generatedTicket.qrCode}
                        size={200}
                        level="H"
                        includeMargin={true}
                        imageSettings={{
                          src: "/logo.png",
                          x: undefined,
                          y: undefined,
                          height: 24,
                          width: 24,
                          excavate: true,
                        }}
                      />
                    </TicketQR>
                  </Grid>
                </Grid>
              </CardContent>
            </TicketCard>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setShowTicket(false)}
              >
                Book Another Ticket
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  // Here you would typically implement the download/print functionality
                  window.print();
                }}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#ffffff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  },
                }}
              >
                Download Ticket
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketBooking; 