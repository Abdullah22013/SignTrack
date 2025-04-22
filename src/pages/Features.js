import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import StorageIcon from '@mui/icons-material/Storage';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import WarningIcon from '@mui/icons-material/Warning';
import StopIcon from '@mui/icons-material/Stop';
import TrafficIcon from '@mui/icons-material/Traffic';
import BlockIcon from '@mui/icons-material/Block';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SchoolIcon from '@mui/icons-material/School';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import Footer from '../components/Footer';

const Features = () => {
  const features = [
    {
      icon: <VideoSettingsIcon sx={{ fontSize: 56 }} />,
      title: 'Advanced Processing',
      description: 'State-of-the-art video processing algorithms for optimal results'
    },
    {
      icon: <StorageIcon sx={{ fontSize: 56 }} />,
      title: 'Secure Storage',
      description: 'Your processed videos are stored securely and easily accessible'
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 56 }} />,
      title: 'Detailed Analytics',
      description: 'Comprehensive analytics and insights for your processed content'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 56 }} />,
      title: 'Enterprise Security',
      description: 'Industry-leading security measures to protect your data'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 56 }} />,
      title: 'Real-time Processing',
      description: 'Lightning-fast processing speeds for immediate results'
    },
    {
      icon: <CloudUploadIcon sx={{ fontSize: 56 }} />,
      title: 'Easy Integration',
      description: 'Seamlessly integrate with your existing workflow'
    }
  ];

  const trafficSigns = [
    {
      icon: <StopIcon sx={{ color: 'error.main', fontSize: 40 }} />,
      title: 'Stop Sign',
      description: 'Come to a complete stop and proceed only when safe. Always stop behind the white line if present.'
    },
    {
      icon: <TrafficIcon sx={{ color: 'warning.main', fontSize: 40 }} />,
      title: 'Traffic Signal',
      description: 'Red means stop, yellow means prepare to stop, green means proceed with caution.'
    },
    {
      icon: <WarningIcon sx={{ color: 'warning.main', fontSize: 40 }} />,
      title: 'Warning Signs',
      description: 'Yellow diamond-shaped signs warn of upcoming hazards or changes in road conditions.'
    },
    {
      icon: <BlockIcon sx={{ color: 'error.main', fontSize: 40 }} />,
      title: 'Do Not Enter',
      description: 'Indicates areas where vehicles are not allowed to enter or access is restricted.'
    },
    {
      icon: <ArrowForwardIcon sx={{ color: 'info.main', fontSize: 40 }} />,
      title: 'Directional Signs',
      description: 'Blue or green signs indicating directions, routes, and destinations.'
    },
    {
      icon: <NotInterestedIcon sx={{ color: 'error.main', fontSize: 40 }} />,
      title: 'No Pedestrian Crossing',
      description: 'Indicates areas where pedestrian crossing is prohibited for safety reasons.'
    },
    {
      icon: <DirectionsWalkIcon sx={{ color: 'success.main', fontSize: 40 }} />,
      title: 'Pedestrian Crossing',
      description: 'Designated areas for pedestrians to safely cross the road. Drivers must yield to pedestrians.'
    },
    {
      icon: <SchoolIcon sx={{ color: 'warning.main', fontSize: 40 }} />,
      title: 'School Zone',
      description: 'Indicates proximity to a school. Reduce speed and watch for children.'
    },
    {
      icon: <ReportProblemIcon sx={{ color: 'error.main', fontSize: 40 }} />,
      title: 'No Overtaking',
      description: 'Prohibits passing or overtaking other vehicles in this zone.'
    },
    {
      icon: <PriorityHighIcon sx={{ color: 'warning.main', fontSize: 40 }} />,
      title: 'Yield',
      description: 'Give right of way to other traffic or pedestrians before proceeding.'
    },
    {
      icon: <CallMergeIcon sx={{ color: 'info.main', fontSize: 40 }} />,
      title: 'Merge',
      description: 'Indicates lanes merging ahead. Be prepared to adjust speed and position.'
    }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 12,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/traffic.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.6,
            zIndex: 0,
          }
        }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              textAlign="center" 
              gutterBottom
              sx={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontWeight: 'bold'
              }}
            >
              Traffic Safety Features
            </Typography>
            <Typography 
              variant="h5" 
              textAlign="center" 
              sx={{ 
                mb: 4, 
                maxWidth: '800px', 
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              Understanding traffic signs and signals is crucial for road safety
            </Typography>
          </Container>
        </Box>

        {/* Traffic Signs Awareness Section */}
        <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom textAlign="center">
              Traffic Signs and Safety
            </Typography>
            <Typography variant="body1" paragraph textAlign="center" sx={{ mb: 6 }}>
              Traffic signs and signals are essential components of road safety that help regulate traffic flow and prevent accidents. 
              Understanding and following these signs is crucial for all road users.
            </Typography>
            
            <Grid container spacing={3}>
              {trafficSigns.map((sign, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ mr: 2 }}>{sign.icon}</Box>
                        <Typography variant="h6">
                          {sign.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {sign.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', fontWeight: 'bold' }}>
              Remember: Traffic signs are designed to keep everyone safe. Always stay alert and follow traffic rules.
            </Typography>
          </Container>
        </Box>

        {/* Main Features Grid */}
        <Container maxWidth="lg">
          <Box sx={{ py: 8 }}>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Container>
      <Footer />
    </Box>
  );
};

export default Features; 