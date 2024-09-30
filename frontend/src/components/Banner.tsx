import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import laptopImage from '/assets/images/laptopWithHand.png'; // Ensure the path is correct

const Banner: React.FC = () => {
  const scrollToSection = () => {
    const section = document.getElementById('laptops-section'); // Ensure this ID matches the target section
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5', // Light gray background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Centering content
        padding: '20px',
        flexDirection: { xs: 'column', md: 'row' }, // Responsive direction
      }}
    >
      <Box 
        sx={{
          flex: 1, 
          padding: { xs: '20px', md: '0' },
          textAlign: 'center', // Centering text within the box
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px'}}> {/* Increased marginBottom */}
          Explore Our Latest Collection of Laptops
        </Typography>
        <Button 
          variant="contained" 
          onClick={scrollToSection} 
          sx={{
            borderRadius: '20px', // Rounded button
            padding: '10px 20px',
            backgroundColor: '#375180',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#2e456e',
            },
          }}
        >
          Shop Now
        </Button>
      </Box>
      <Box
        component="img"
        src={laptopImage}
        alt="Laptop with hand"
        sx={{
          maxWidth: { xs: '80%', md: '40%' }, // Responsive sizing
          height: 'auto',
          display: { xs: 'none', md: 'block' }, // Hide on smaller screens
        }}
      />
    </Box>
  );
};

export default Banner;




