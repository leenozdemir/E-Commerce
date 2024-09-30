import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { MailOutline, Lock, PersonOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      
      // Check if response is OK
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Unable to register. Please try again.");
        return;
      }
      
      // Log the response for debugging
      const data = await response.json();
      console.log("Response from server:", data); // Log the entire response
      
      const { token } = data; // Destructure token from response
      
      // Call login function and navigate to login page
      login(email, token);
      navigate("/login"); // Navigate to login page after successful signup
    } catch (err) {
      console.error("Error during signup:", err); // Log any errors
      setError("An error occurred. Please try again.");
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          maxWidth: '430px',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
          padding: '30px',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: '27px',
            fontWeight: 600,
            position: 'relative',
            marginBottom: '30px',
            display: 'inline-block',
          }}
        >
          Signup
          <Box
            component="span"
            sx={{
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: '3px',
              width: '30px',
              backgroundColor: '#e7f2fd',
              borderRadius: '25px',
              marginTop: '5px',
            }}
          />
        </Typography>
        
        <Box>
          {/* First Name Field */}
          <Box sx={{ position: 'relative', marginBottom: '20px' }}>
            <TextField
              inputRef={firstNameRef}
              placeholder="First Name"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderBottom: '2px solid #ccc',
                  fontSize: '16px',
                },
              }}
              variant="standard"
            />
          </Box>
          
          {/* Last Name Field */}
          <Box sx={{ position: 'relative', marginBottom: '20px' }}>
            <TextField
              inputRef={lastNameRef}
              placeholder="Last Name"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderBottom: '2px solid #ccc',
                  fontSize: '16px',
                },
              }}
              variant="standard"
            />
          </Box>
          
          {/* Email Field */}
          <Box sx={{ position: 'relative', marginBottom: '20px' }}>
            <TextField
              inputRef={emailRef}
              placeholder="Email"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderBottom: '2px solid #ccc',
                  fontSize: '16px',
                },
              }}
              variant="standard"
            />
          </Box>
          
          {/* Password Field */}
          <Box sx={{ position: 'relative', marginBottom: '20px' }}>
            <TextField
              inputRef={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderBottom: '2px solid #ccc',
                  fontSize: '16px',
                },
              }}
              variant="standard"
            />
          </Box>
          
          {/* Signup Button */}
          <Box sx={{ marginBottom: '20px' }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#375180',
                color: '#fff',
                fontSize: '17px',
                fontWeight: 500,
                letterSpacing: '1px',
                borderRadius: '6px',
                padding: '10px 0',
                '&:hover': {
                  backgroundColor: '#2e456e',
                },
              }}
            >
              Signup
            </Button>
          </Box>
          
          {/* Error Message */}
          {error && (
            <Typography sx={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
              {error}
            </Typography>
          )}
          
          {/* Login Link */}
          <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
            <Typography variant="body2" sx={{ fontSize: '14px', color: '#333' }}>
              Already a member?{' '}
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: '#375180',
                  textTransform: 'none',
                  padding: 0,
                  fontSize: '14px',
                }}
              >
                Login Now
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
