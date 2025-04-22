import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Footer from '../components/Footer';

const HowItWorks = () => {
  const steps = [
    {
      label: 'Upload Your Video',
      description: 'Simply drag and drop your video file or click to browse. We support all major video formats.',
      icon: <CloudUploadIcon sx={{ fontSize: 40 }} />
    },
    {
      label: 'Video Processing',
      description: 'Advanced AI-powered video processing to detect traffic signs using Yolov8 model and various network layers.',
      icon: <SettingsIcon sx={{ fontSize: 40 }} />
    },
    {
      label: 'Get Results',
      description: 'Receive your processed video with detailed analytics and download options.',
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />
    }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Box sx={{ flex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0
          }
        }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              textAlign="center"
              sx={{ 
                fontWeight: 'bold',
                mb: 4
              }}
            >
              How It Works
            </Typography>
            <Typography 
              variant="h5" 
              textAlign="center"
              sx={{ mb: 6 }}
            >
              Our simple three-step process makes video processing effortless
            </Typography>
          </Container>
        </Box>

        {/* Process Steps */}
        <Container maxWidth="lg">
          <Box sx={{ py: 8 }}>
            <Grid container spacing={4}>
              {steps.map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {step.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom>
                        {step.label}
                      </Typography>
                      <Typography color="text.secondary">
                        {step.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default HowItWorks; 