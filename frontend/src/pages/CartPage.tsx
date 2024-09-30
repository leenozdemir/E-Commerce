import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider"; // For dividing sections
import Paper from "@mui/material/Paper"; // For side section styling
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return; // Prevent decrementing below 1
    }
    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const renderCartItems = () => (
    <Box display="flex" flexDirection="column" gap={2} sx={{ flex: 1 }}>
      {cartItems.map((item) => (
        <Box
          key={item.productId}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            border: 1,
            borderColor: "#e0e0e0",
            borderRadius: 2,
            padding: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            mb: 2,
            position: "relative", // Allow positioning of the remove button
            height: "100px", // Increased height for product card
          }}
        >
          <Button
            onClick={() => handleRemoveItem(item.productId)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "black",
              minWidth: "30px",
              "&:hover": { opacity: 0.8 },
            }}
          >
            X
          </Button>
          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <img
              src={item.image}
              width={80}
              height={80}
              alt={item.title}
              style={{ borderRadius: "8px" }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                {item.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {item.unitPrice.toFixed(2)} TL
              </Typography>
            </Box>
          </Box>

          {/* Fixed position for quantity buttons */}
          <Box display="flex" alignItems="center" sx={{ width: "100px" }}>
            <ButtonGroup size="small">
              <Button
                onClick={() => handleQuantity(item.productId, item.quantity - 1)}
                sx={{
                  minWidth: "30px",
                  border: "none", // Remove border
                  backgroundColor: "#e0e0e0", // Background color for button
                  color: "#000", // Text color
                }}
              >
                -
              </Button>
              <Typography variant="body1" sx={{ paddingX: 1 }}>
                {item.quantity}
              </Typography>
              <Button
                onClick={() => handleQuantity(item.productId, item.quantity + 1)}
                sx={{
                  minWidth: "30px",
                  border: "none", // Remove border
                  backgroundColor: "#e0e0e0", // Background color for button
                  color: "#000", // Text color
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-end">
            {/* The total amount is kept at the same place below */}
            <Typography variant="subtitle1">
              Total: {(item.quantity * item.unitPrice).toFixed(2)} TL
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4">Shopping Cart</Typography>
        <Button
          onClick={clearCart}
          sx={{
            backgroundColor: "#375180",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#2e456e",
            },
          }}
        >
          Clear Cart
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {/* Cart Items Section */}
        {cartItems.length ? (
          <>
            {renderCartItems()}

            {/* Cart Summary Section */}
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                minWidth: "250px",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Summary
              </Typography>
              <Divider />
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Subtotal:</Typography>
                <Typography variant="h6">{totalAmount.toFixed(2)} TL</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h5">Total: {totalAmount.toFixed(2)} TL</Typography>
              </Box>

              <Button
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  backgroundColor: "#375180", // Same color as Clear Cart
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#2e456e",
                  },
                  mt: 2,
                }}
              >
                Checkout
              </Button>
            </Paper>
          </>
        ) : (
          <Typography>Your cart is empty. Add items to proceed.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;

