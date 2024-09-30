import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoutIcon from "@mui/icons-material/Logout"; // Import Logout Icon
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../context/Auth/AuthContext";
import { Badge, Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";
import { useFavorites } from "../context/Favorites/FavoritesContext"; // Import FavoritesContext

function Navbar() {
  const {isAuthenticated, logout } = useAuth(); // Fetch firstName from AuthContext
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorites(); // Access favorite items from context
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search input

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout(); // Call logout function
    navigate("/"); // Redirect to home page
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleFavorites = () => {
    navigate("/favorites");
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform search operation using searchTerm
    console.log(searchTerm); // Replace this with actual search logic
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#375180' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AdbIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  TechNest
                </Typography>
              </Box>
            </Button>

            {/* Centered Search Input */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mx: 2 }}>
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    width: '400px', // Increased width for a longer search input
                    height: '40px', // Adjusted height for shorter length
                    borderRadius: '20px',
                    bgcolor: 'background.paper',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                      '& fieldset': {
                        borderColor: 'transparent', // Set border color to transparent
                      },
                      '&:hover fieldset': {
                        borderColor: '#ddd', // Change border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ddd', // Change border color when focused
                      },
                    },
                    '& .MuiInputBase-input': {
                      padding: '10px 14px', // Adjust padding to better fit the input
                      fontSize: '14px', // Font size for the input text
                    },
                  }}
                />
              </form>
            </Box>

            <Box
              gap={1} // Reduced space between icons and buttons
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              {/* Favorites Icon */}
              <IconButton aria-label="favorites" onClick={handleFavorites}>
                <Badge badgeContent={favoriteItems.length} color="secondary">
                  <FavoriteIcon sx={{ color: "#ffffff" }} />
                </Badge>
              </IconButton>

              {/* Cart Icon */}
              <IconButton aria-label="cart" onClick={handleCart}>
                <Badge badgeContent={cartItems.length} sx={{ '& .MuiBadge-badge': { backgroundColor: '#743e7d', color: 'white' } }}>
                  <ShoppingCart sx={{ color: "#ffffff" }} />
                </Badge>
              </IconButton>

              {isAuthenticated ? (
                <Grid container alignItems="center">
                  {/* Logout Icon */}
                  <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                    <LogoutIcon sx={{ color: "#ffffff" }} />
                  </IconButton>
                </Grid>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleSignIn}
                    sx={{ marginRight: 1, color: 'white', borderColor: 'white' }} // White color for text and border
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/register")} // Navigate to Register page
                    sx={{ color: 'white', borderColor: 'white' }} // White color for text and border
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
