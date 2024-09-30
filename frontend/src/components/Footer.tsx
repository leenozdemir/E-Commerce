import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { Twitter as XIcon } from '@mui/icons-material'; // Placeholder for X (formerly Twitter) icon

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', color: '#000', py: 5 }}>
      <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
        {/* Useful Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Useful Links
          </Typography>
          {['Content', 'How it Works', 'Create', 'Explore', 'Terms & Services'].map((text, index) => (
            <Link key={index} href="#" underline="none" sx={linkStyle}>
              {text}
            </Link>
          ))}
        </Grid>

        {/* Community Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Community
          </Typography>
          {['Help Center', 'Partners', 'Suggestions', 'Blog', 'Newsletters'].map((text, index) => (
            <Link key={index} href="#" underline="none" sx={linkStyle}>
              {text}
            </Link>
          ))}
        </Grid>

        {/* Partner Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Partner
          </Typography>
          {['Our Partner', 'Become a Partner'].map((text, index) => (
            <Link key={index} href="#" underline="none" sx={linkStyle}>
              {text}
            </Link>
          ))}
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box
        sx={{
          mt: 2,
          borderTop: '1px solid #ddd',
          pt: 2,
          display: 'flex',
          flexDirection: 'column', // Change to column
          alignItems: 'center', // Center horizontally
        }}
      >
        <Box display="flex" justifyContent="center" sx={{ mb: 2 }}> {/* Added margin below icons */}
          {/* Social Media Links */}
          <IconButton href="https://www.instagram.com" target="_blank" rel="noopener" sx={socialIconStyle}>
            <Instagram />
          </IconButton>
          <IconButton href="https://www.facebook.com" target="_blank" rel="noopener" sx={socialIconStyle}>
            <Facebook />
          </IconButton>
          <IconButton href="https://www.linkedin.com" target="_blank" rel="noopener" sx={socialIconStyle}>
            <LinkedIn />
          </IconButton>
          <IconButton href="https://www.twitter.com" target="_blank" rel="noopener" sx={socialIconStyle}>
            <XIcon /> {/* Placeholder for X (formerly Twitter) */}
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: '#777' }}>
          Copyright © 2022 TechNest. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

// Inline Styles
const linkStyle = {
  display: 'block',
  color: '#555',
  mb: 1,
  fontSize: '14px',
  '&:hover': {
    color: '#000',
    fontWeight: 'bold',
  },
};

const socialIconStyle = {
  color: '#375180',
  '&:hover': {
    color: '#000',
  },
};