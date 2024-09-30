import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useFavorites } from "../context/Favorites/FavoritesContext";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favoriteItems, removeItemFromFavorites, clearFavorites } = useFavorites();
  const navigate = useNavigate();

  const handleRemoveItem = (productId: string) => {
    removeItemFromFavorites(productId);
  };

  const handleViewItem = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const renderFavoriteItems = () => (
    <Box display="flex" flexDirection="column" gap={4}>
      {favoriteItems.map((item) => (
        <Box
          key={item.productId}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            border: 1,
            borderColor: "#f2f2f2",
            borderRadius: 5,
            padding: 1,
          }}
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            <img src={item.image} width={50} />
            <Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>{item.unitPrice} EGP</Typography>
              <Button onClick={() => handleRemoveItem(item.productId)}>
                Remove from Favorites
              </Button>
            </Box>
          </Box>
          <Button variant="contained" onClick={() => handleViewItem(item.productId)}>
            View Item
          </Button>
        </Box>
      ))}
    </Box>
  );

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">My Favorites</Typography>
        <Button onClick={() => clearFavorites()}>Clear Favorites</Button>
      </Box>
      {favoriteItems.length ? (
        renderFavoriteItems()
      ) : (
        <Typography>
          You have no favorite items. Start browsing and add your favorite products!
        </Typography>
      )}
    </Container>
  );
};

export default FavoritesPage;
