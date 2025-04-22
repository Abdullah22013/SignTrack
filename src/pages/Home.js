import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Footer from '../components/Footer';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '24px',
  padding: '10px 24px',
  textTransform: 'none',
  fontSize: '16px',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  color: 'white',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/WhatsApp Image 2025-04-22 at 12.40.40_f427b15e.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: -1,
  },
}));

const VideoContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.spacing(1),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'info' });
  const [processedVideoUrl, setProcessedVideoUrl] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleGetStarted = () => {
    navigate('/account');
  };

  const handleStartProcessing = () => {
    // This method is no longer used in the new implementation
  };

  const handleFileUpload = async (event) => {
    // This method is no longer used in the new implementation
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <HeroSection>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  fontWeight: 'bold'
                }}
              >
                Revolutionize Your Dashcam Footage with AI Traffic Sign Detection
              </Typography>
              <Typography 
                variant="h5" 
                paragraph
                sx={{ 
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  mb: 3
                }}
              >
                Smart traffic sign detection powered by AI. Identify and analyze road signs in real-time from your dashcam footage.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  mt: 2,
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  fontSize: '1.1rem',
                  padding: '12px 30px',
                }}
              >
                Get Started
              </Button>

              {processedVideoUrl && (
                <VideoContainer>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                    Processed Video
                  </Typography>
                  <video
                    controls
                    width="100%"
                    src={processedVideoUrl}
                    style={{ borderRadius: '8px' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </VideoContainer>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add hero image here */}
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Why Choose Our Platform
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            Experience the next generation of video processing technology
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <SpeedIcon color="primary" sx={{ fontSize: 56, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Lightning Fast
                  </Typography>
                  <Typography color="text.secondary">
                    Process your videos in real-time with our optimized algorithms
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <SecurityIcon color="primary" sx={{ fontSize: 56, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Secure Processing
                  </Typography>
                  <Typography color="text.secondary">
                    Your content is protected with enterprise-grade security
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <AnalyticsIcon color="primary" sx={{ fontSize: 56, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Advanced Analytics
                  </Typography>
                  <Typography color="text.secondary">
                    Get detailed insights about your processed videos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Mission & Vision Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Our Mission & Vision
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                At SignTrack, we are dedicated to improving road safety and navigation efficiency. Our innovative technology empowers users to detect and catalog traffic signs in real-time, ensuring safer journeys for everyone.
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    92 %
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    We aim to achieve a 92% detection rate of traffic signs, enhancing user awareness and preparedness on the road.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Potential for scalability 
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Our system is designed to grow with your needs, capable of processing multiple video streams and adapting to various traffic environments worldwide.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    10 values
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Our core values include Innovation, Safety, and User-Centric design, guiding us in every project we undertake.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    3 team members
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Our dedicated team of passionate students are all about making roads safer through technology and innovation.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/mission.jpg"
                alt="Team working on traffic safety solutions"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h2" fontWeight="bold">92%</Typography>
              <Typography variant="h6">Processing Accuracy</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h2" fontWeight="bold">24/7</Typography>
              <Typography variant="h6">Available Support</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h2" fontWeight="bold">5000ms</Typography>
              <Typography variant="h6">Processing Speed</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Replace the old Footer with the new Footer component */}
      <Footer />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home; 