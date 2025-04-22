import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
  borderTop: '1px solid #e0e0e0',
}));

const FooterComponent = () => {
  return (
    <Footer>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          {/* Navigation Links */}
          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            justifyContent: 'center',
            mb: { xs: 2, md: 0 }
          }}>
            <StyledLink to="/about">About SignTrack</StyledLink>
            <StyledLink to="/features">Features</StyledLink>
            <StyledLink to="/how-it-works">How It Works</StyledLink>
          </Box>

          {/* Legal Links */}
          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            justifyContent: 'center',
            mb: { xs: 2, md: 0 }
          }}>
            <StyledLink to="/terms">Terms and Conditions</StyledLink>
            <StyledLink to="/privacy">Privacy Policy</StyledLink>
          </Box>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Copyright © {new Date().getFullYear()} SignTrack. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Footer>
  );
};

export default FooterComponent; 