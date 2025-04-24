import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
  LinearProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { styled } from '@mui/material/styles';
import Footer from '../components/Footer';

const AVAILABLE_LABELS = [
  'Green Light',
  'Red Light',
  'Speed Limit 10',
  'Speed Limit 100',
  'Speed Limit 110',
  'Speed Limit 120',
  'Speed Limit 20',
  'Speed Limit 30',
  'Speed Limit 40',
  'Speed Limit 50',
  'Speed Limit 60',
  'Speed Limit 70',
  'Speed Limit 80',
  'Speed Limit 90',
  'Stop'
];

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

const LabelSelectionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  maxHeight: '400px',
  overflowY: 'auto',
}));

const ComparisonDialog = ({ open, onClose, suggestedLabels, detectedLabels }) => {
  const allLabels = [...new Set([...suggestedLabels, ...detectedLabels])];
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Label Comparison Results</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>Results Summary:</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Suggested Labels:</Typography>
              {suggestedLabels.map(label => (
                <Typography 
                  key={label} 
                  color={detectedLabels.includes(label) ? 'success.main' : 'error.main'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  • {label} {detectedLabels.includes(label) && '✓'}
                </Typography>
              ))}
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Detected Labels:</Typography>
              {detectedLabels.map(label => (
                <Typography 
                  key={label} 
                  color={suggestedLabels.includes(label) ? 'success.main' : 'text.primary'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  • {label} {suggestedLabels.includes(label) ? '✓' : ''}
                </Typography>
              ))}
            </Paper>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const VideoPlayer = ({ videoFilename }) => {
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
  const [activeStep, setActiveStep] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [resultVideo, setResultVideo] = useState(null);
  const [processedVideoFilename, setProcessedVideoFilename] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedLabels, setSelectedLabels] = useState({});
  const [detectedLabels, setDetectedLabels] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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
          if (data.detected_labels) {
            setDetectedLabels(data.detected_labels);
          }
        }
      }
    } catch (error) {
      console.error('Error loading latest video:', error);
    }
  };

  const handleLabelChange = (label) => {
    setSelectedLabels(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleNext = () => {
    if (activeStep === 0 && Object.values(selectedLabels).some(v => v)) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
    setSelectedFile(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadAndProcess = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('suggested_labels', JSON.stringify(
        Object.entries(selectedLabels)
          .filter(([_, selected]) => selected)
          .map(([label]) => label)
      ));

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

      setProcessedVideoFilename(data.filename);
      if (data.detected_labels) {
        setDetectedLabels(data.detected_labels);
      }
      setProcessing(true);
      
    } catch (error) {
      console.error('Error processing video:', error);
      setUploading(false);
      setProcessing(false);
    }
  };

  useEffect(() => {
    let progressInterval;
    if (processing && progress < 100) {
      progressInterval = setInterval(() => {
        setProgress(currentProgress => {
          const randomIncrement = Math.floor(Math.random() * 20) + 1;
          const newProgress = Math.min(currentProgress + randomIncrement, 99);
          if (currentProgress >= 95) {
            return 100;
          }
          return newProgress;
        });
      }, 1000);

      const finalTimer = setTimeout(() => {
        setProgress(100);
        setProcessing(false);
        // Show comparison dialog
        setShowComparison(true);
      }, 10000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(finalTimer);
      };
    }
  }, [processing]);

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

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            <Step>
              <StepLabel>Select Expected Labels</StepLabel>
            </Step>
            <Step>
              <StepLabel>Upload and Process Video</StepLabel>
            </Step>
          </Stepper>

          {activeStep === 0 ? (
            <LabelSelectionContainer elevation={3}>
              <Typography variant="h6" gutterBottom>
                Select the labels you expect to see in the video:
              </Typography>
              <FormGroup>
                {AVAILABLE_LABELS.map((label) => (
                  <FormControlLabel
                    key={label}
                    control={
                      <Checkbox
                        checked={selectedLabels[label] || false}
                        onChange={() => handleLabelChange(label)}
                      />
                    }
                    label={label}
                  />
                ))}
              </FormGroup>
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!Object.values(selectedLabels).some(v => v)}
                >
                  Next
                </Button>
              </Box>
            </LabelSelectionContainer>
          ) : (
            <UploadContainer elevation={3}>
              <Typography variant="h5" gutterBottom>
                Upload Video for Processing
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ mr: 2 }}
                >
                  Back to Label Selection
                </Button>
              </Box>
              <input
                type="file"
                accept="video/mp4"
                onChange={handleFileSelect}
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
                  Select Video
                </Button>
              </label>

              {selectedFile && !uploading && !processing && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    Selected file: {selectedFile.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUploadAndProcess}
                  >
                    Process Video
                  </Button>
                </Box>
              )}
              
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
          )}

          {(resultVideo || processedVideoFilename) && (
            <VideoContainer elevation={3}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Processed Video Result
              </Typography>
              <VideoPlayer videoFilename={processedVideoFilename || resultVideo} />
              
              {processedVideoFilename && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudDownloadIcon />}
                    onClick={handleDownload}
                    sx={{ mr: 2 }}
                  >
                    Download Video
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setShowComparison(true)}
                  >
                    View Label Comparison
                  </Button>
                </Box>
              )}
            </VideoContainer>
          )}

          <ComparisonDialog
            open={showComparison}
            onClose={() => setShowComparison(false)}
            suggestedLabels={Object.entries(selectedLabels)
              .filter(([_, selected]) => selected)
              .map(([label]) => label)}
            detectedLabels={detectedLabels}
          />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Account; 