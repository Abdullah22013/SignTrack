import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
  LinearProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { styled } from '@mui/material/styles';
import Footer from '../components/Footer';

const UploadContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  marginTop: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
}));

const VideoContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  width: '100%',
  maxWidth: '1600px',
  margin: '32px auto',
  '& video': {
    width: '100%',
    maxHeight: '70vh',
    objectFit: 'contain',
  }
}));

const ProcessingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

// VideoPlayer component to display videos from the processed folder
const VideoPlayer = ({ videoFilename }) => {
  // If the videoFilename starts with '/', assume it's a complete path
  // Otherwise, construct the path to the processed folder on the backend
  const videoPath = videoFilename?.startsWith('/') 
    ? videoFilename 
    : `http://localhost:5000/processed/${videoFilename}`;

  if (!videoPath) return null;

  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <video
        controls
        src={videoPath}
        style={{ 
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%',
          maxHeight: '70vh',
          objectFit: 'contain'
        }}
      >
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

const Account = () => {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [resultVideo, setResultVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [processedVideoFilename, setProcessedVideoFilename] = useState(null);

  // Load the latest video when component mounts
  useEffect(() => {
    fetchLatestProcessedVideo();
  }, []);

  const fetchLatestProcessedVideo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/latest-video');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProcessedVideoFilename(data.filename);
        }
      }
    } catch (error) {
      console.error('Error loading latest video:', error);
    }
  };

  useEffect(() => {
    let progressInterval;
    if (processing && progress < 100) {
      progressInterval = setInterval(() => {
        setProgress(currentProgress => {
          // Generate random increment between 1 and 20
          const randomIncrement = Math.floor(Math.random() * 20) + 1;
          // Calculate new progress
          const newProgress = Math.min(currentProgress + randomIncrement, 99);
          // If we're close to 10 seconds (based on interval), allow reaching 100
          if (currentProgress >= 95) {
            return 100;
          }
          return newProgress;
        });
      }, 1000); // Update every second

      // Force completion at exactly 10 seconds
      const finalTimer = setTimeout(() => {
        setProgress(100);
        setResultVideo('/result_out.mp4');
        // Fetch the latest processed video
        fetchLatestProcessedVideo();
        setProcessing(false);
      }, 10000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(finalTimer);
      };
    }
  }, [processing]);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('video', file);

      // Send to backend
      const response = await fetch('http://localhost:5000/api/process-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process video');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to process video');
      }

      // Set the video filename from the processed folder
      setProcessedVideoFilename(data.filename);
      
      // Start processing animation (even though it's already processed)
      setProcessing(true);
      
    } catch (error) {
      console.error('Error processing video:', error);
      setUploading(false);
      setProcessing(false);
    } finally {
      event.target.value = '';
    }
  };

  const handleDownload = async () => {
    if (!processedVideoFilename) return;
    
    try {
      const response = await fetch(`http://localhost:5000/processed/${processedVideoFilename}`);
      if (!response.ok) {
        throw new Error('Failed to download video');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = processedVideoFilename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  const getStatusText = () => {
    if (uploading) return "Uploading video...";
    if (processing) {
      if (progress < 30) return "Initializing processing...";
      if (progress < 60) return "Processing video...";
      if (progress < 90) return "Analyzing results...";
      return "Finalizing...";
    }
    return "Upload Video";
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ py: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom textAlign="center">
            My Account
          </Typography>

          <UploadContainer elevation={3} sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Upload Video for Processing
            </Typography>
            <input
              type="file"
              accept="video/mp4"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="video-upload"
            />
            <label htmlFor="video-upload">
              <Button
                component="span"
                variant="contained"
                size="large"
                disabled={uploading || processing}
                startIcon={(uploading || processing) ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                sx={{ mt: 2 }}
              >
                {getStatusText()}
              </Button>
            </label>
            
            {(uploading || processing) && (
              <Box sx={{ width: '100%', mt: 3 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={processing ? progress : 0} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <ProcessingText variant="body2">
                  {processing ? `Progress: ${progress}%` : 'Uploading...'}
                </ProcessingText>
              </Box>
            )}
          </UploadContainer>

          {(resultVideo || processedVideoFilename) && (
            <VideoContainer elevation={3}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Processed Video Result
              </Typography>
              {/* Use the VideoPlayer component to display the video */}
              <VideoPlayer videoFilename={processedVideoFilename || resultVideo} />
              
              {processedVideoFilename && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudDownloadIcon />}
                    onClick={handleDownload}
                  >
                    Download Video
                  </Button>
                </Box>
              )}
            </VideoContainer>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Account; 