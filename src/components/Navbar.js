import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// Add Lobster font import
const lobsterFont = `
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
`;

// Add style tag for font import
const StyleTag = styled('style')({});

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'inherit',
  fontSize: '1.1rem',
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  textTransform: 'none',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 80, // Increased height
  [theme.breakpoints.up('sm')]: {
    height: 90, // Even taller on larger screens
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem', // Increased size for Lobster font
  fontFamily: "'Lobster', cursive",
  fontWeight: 'normal', // Lobster looks better with normal weight
  color: 'white',
  textDecoration: 'none',
  marginRight: theme.spacing(4),
  letterSpacing: '1px', // Added letter spacing
  '&:hover': {
    color: 'white',
  },
}));

const Navbar = () => {
  return (
    <StyledAppBar position="sticky">
      <StyleTag>{lobsterFont}</StyleTag>
      <Container maxWidth="lg">
        <StyledToolbar disableGutters>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <LogoText variant="h4">
                SignTrack
              </LogoText>
            </RouterLink>

            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              alignItems: 'center'
            }}>
              <StyledButton 
                component={RouterLink} 
                to="/"
              >
                Home
              </StyledButton>
              <StyledButton 
                component={RouterLink} 
                to="/features"
              >
                Features
              </StyledButton>
              <StyledButton 
                component={RouterLink} 
                to="/how-it-works"
              >
                How It Works
              </StyledButton>
              <StyledButton 
                component={RouterLink} 
                to="/account"
                variant="contained"
                sx={{ 
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  padding: '12px 28px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                My Account
              </StyledButton>
            </Box>
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar; 