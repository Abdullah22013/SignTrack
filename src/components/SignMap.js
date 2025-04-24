import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const SignMap = ({ signLocations }) => {
  const mapWidth = 600;
  const mapHeight = 400;
  
  // Calculate the bounds for better visualization
  const minX = Math.min(...signLocations.map(loc => loc.x));
  const maxX = Math.max(...signLocations.map(loc => loc.x));
  const minY = Math.min(...signLocations.map(loc => loc.y));
  const maxY = Math.max(...signLocations.map(loc => loc.y));
  
  // Scale factors to fit all points on the map
  const xScale = (mapWidth - 60) / (maxX - minX || 1);
  const yScale = (mapHeight - 60) / (maxY - minY || 1);
  
  // Function to transform coordinates to fit the map
  const transformCoord = (x, y) => ({
    x: 30 + (x - minX) * xScale,
    y: 30 + (y - minY) * yScale
  });
  
  // Draw path between points
  const points = signLocations.map(loc => {
    const transformed = transformCoord(loc.x, loc.y);
    return `${transformed.x},${transformed.y}`;
  }).join(' ');

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Traffic Sign Locations
      </Typography>
      <Box sx={{ position: 'relative', width: mapWidth, height: mapHeight, border: '1px solid #ccc', margin: 'auto' }}>
        <svg width={mapWidth} height={mapHeight}>
          {/* Draw the path line */}
          <polyline
            points={points}
            fill="none"
            stroke="#2196f3"
            strokeWidth="2"
          />
          
          {/* Draw points and labels */}
          {signLocations.map((loc, index) => {
            const transformed = transformCoord(loc.x, loc.y);
            return (
              <g key={index}>
                <circle
                  cx={transformed.x}
                  cy={transformed.y}
                  r="6"
                  fill="#f44336"
                />
                <text
                  x={transformed.x + 10}
                  y={transformed.y - 10}
                  fontSize="12"
                  fill="#000"
                >
                  {loc.label}
                </text>
                <text
                  x={transformed.x + 10}
                  y={transformed.y + 5}
                  fontSize="10"
                  fill="#666"
                >
                  ({loc.x.toFixed(1)}, {loc.y.toFixed(1)})
                </text>
              </g>
            );
          })}
        </svg>
      </Box>
    </Paper>
  );
};

export default SignMap; 