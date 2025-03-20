import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { userOperations } from '../lib/supabaseClient';
import { useAuthContext } from '../context/AuthContext';

const CheckoutContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 2),
  },
}));

const OrderSummary = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const PaymentForm = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
}));

const steps = ['Order Summary', 'Payment Details', 'Confirmation'];

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get event details from location state
  const event = location.state?.event || {
    title: 'Sample Event',
    date: '2024-12-31',
    time: '7:00 PM',
    location: 'Sample Location',
    price: '$99.99',
    quantity: 1,
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create ticket in Supabase
      await userOperations.createTicket({
        event_id: event.id,
        clerk_user_id: user.id,
        quantity: event.quantity,
        total_price: event.price * event.quantity,
        created_at: new Date().toISOString(),
      });

      setActiveStep(2);
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const renderOrderSummary = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.date} at {event.time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.location}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Quantity</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" align="right">
            {event.quantity}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Price per ticket</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" align="right">
            {event.price}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right">
            ${(parseFloat(event.price.replace('$', '')) * event.quantity).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentForm = () => (
    <Box component="form" onSubmit={handlePayment}>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handlePaymentInputChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Cardholder Name"
            name="cardName"
            value={paymentDetails.cardName}
            onChange={handlePaymentInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            fullWidth
            label="Expiry Date"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handlePaymentInputChange}
            placeholder="MM/YY"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            fullWidth
            label="CVV"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handlePaymentInputChange}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderConfirmation = () => (
    <Box textAlign="center">
      <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Thank you for your purchase. Your tickets have been confirmed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/events')}
        sx={{ mt: 2 }}
      >
        View My Tickets
      </Button>
    </Box>
  );

  return (
    <CheckoutContainer maxWidth="lg">
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {activeStep === 0 && renderOrderSummary()}
          {activeStep === 1 && renderPaymentForm()}
          {activeStep === 2 && renderConfirmation()}
        </Grid>

        <Grid item xs={12} md={4}>
          <PaymentForm>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LockIcon sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="subtitle1">
                Secure Payment
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your payment information is encrypted and secure.
            </Typography>
            <Divider sx={{ my: 2 }} />
            {activeStep === 0 && (
              <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                startIcon={<CreditCardIcon />}
              >
                Proceed to Payment
              </Button>
            )}
            {activeStep === 1 && (
              <>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ mb: 2 }}
                >
                  Back
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handlePayment}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <CreditCardIcon />}
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </Button>
              </>
            )}
          </PaymentForm>
        </Grid>
      </Grid>
    </CheckoutContainer>
  );
};

export default Checkout; 