import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  padding: theme.spacing(8, 0, 4),
  marginTop: 'auto',
  position: 'relative',
  width: '100vw',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
    animation: 'gradient 3s ease infinite',
    backgroundSize: '200% 200%',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
}));

const FooterContainer = styled(Container)(({ theme }) => ({
  maxWidth: '100% !important',
  padding: theme.spacing(0, 4),
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  fontSize: '1.2rem',
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-8px',
    width: '40px',
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    transition: 'all 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#b3b3b3',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  position: 'relative',
  paddingLeft: '0',
  '&:hover': {
    color: '#ffffff',
    paddingLeft: '8px',
    '& .arrow-icon': {
      opacity: 1,
      transform: 'translateX(4px)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: '#6366f1',
      boxShadow: '0 0 8px #6366f1',
    },
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#b3b3b3',
  marginRight: theme.spacing(1),
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(4px)',
  '&:hover': {
    color: '#ffffff',
    transform: 'translateY(-3px) rotate(8deg)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#b3b3b3',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1.5),
    fontSize: '1.2rem',
    color: '#6366f1',
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    color: '#ffffff',
    transform: 'translateX(4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1)',
    },
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: '#333333',
  margin: theme.spacing(4, 0),
  height: '1px',
  opacity: 0.5,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '0%',
    top: 0,
    width: '100px',
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1, transparent)',
  },
}));

const BottomBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(1),
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <FooterWrapper>
      <FooterContainer>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">Vibeyy</FooterTitle>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#b3b3b3', 
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Your one-stop destination for discovering and booking amazing events.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Facebook" arrow>
                <SocialIcon size="small">
                  <FacebookIcon />
                </SocialIcon>
              </Tooltip>
              <Tooltip title="Twitter" arrow>
                <SocialIcon size="small">
                  <TwitterIcon />
                </SocialIcon>
              </Tooltip>
              <Tooltip title="Instagram" arrow>
                <SocialIcon size="small">
                  <InstagramIcon />
                </SocialIcon>
              </Tooltip>
              <Tooltip title="LinkedIn" arrow>
                <SocialIcon size="small">
                  <LinkedInIcon />
                </SocialIcon>
              </Tooltip>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">Quick Links</FooterTitle>
            <FooterLink href="/events">
              Events
              <ArrowForwardIcon className="arrow-icon" sx={{ ml: 1, opacity: 0, transition: 'all 0.3s ease' }} />
            </FooterLink>
            <FooterLink href="/about">
              About Us
              <ArrowForwardIcon className="arrow-icon" sx={{ ml: 1, opacity: 0, transition: 'all 0.3s ease' }} />
            </FooterLink>
            <FooterLink href="/contact">
              Contact
              <ArrowForwardIcon className="arrow-icon" sx={{ ml: 1, opacity: 0, transition: 'all 0.3s ease' }} />
            </FooterLink>
            <FooterLink href="/faq">
              FAQ
              <ArrowForwardIcon className="arrow-icon" sx={{ ml: 1, opacity: 0, transition: 'all 0.3s ease' }} />
            </FooterLink>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">Categories</FooterTitle>
            <FooterLink href="/events?category=music">
              Music Events
              <ArrowForwardIcon className="arrow-icon" sx={{ ml: 1, opacity: 0, transition: 'all 0.3s ease' }} />
            </FooterLink>
            <FooterLink href="/events?category=tech">
              Tech Conferences
              <ArrowForwardIcon className="arrow-icon" sx={{ ml: 1, opacity: 0, transition: 'all 0.3s ease' }} />
            </FooterLink>
            <FooterLink href="/events?category=food">
              Food & Wine
              <ArrowForwardIcon className="arrow-icon" sx={{ ml: 1, opacity: 0, transition: 'all 0.3s ease' }} />
            </FooterLink>
            <FooterLink href="/events?category=art">
              Art Exhibitions
              <ArrowForwardIcon className="arrow-icon" sx={{ ml: 1, opacity: 0, transition: 'all 0.3s ease' }} />
            </FooterLink>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">Contact Us</FooterTitle>
            <ContactInfo>
              <EmailIcon />
              <Typography variant="body2">support@vibeyy.com</Typography>
            </ContactInfo>
            <ContactInfo>
              <PhoneIcon />
              <Typography variant="body2">+1 (555) 123-4567</Typography>
            </ContactInfo>
            <ContactInfo>
              <LocationOnIcon />
              <Typography variant="body2">
                123 Event Street, City, Country
              </Typography>
            </ContactInfo>
          </Grid>
        </Grid>

        <StyledDivider />

        {/* Bottom Bar */}
        <BottomBar>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#b3b3b3',
              fontWeight: 500,
            }}
          >
            © {new Date().getFullYear()} Vibeyy. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
          </Box>
        </BottomBar>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer; 