import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useCart } from "../context/Cart/CartContext";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
}

export default function ProductCard({ _id, title, image, price }: Props) {
  const { addItemToCart } = useCart();

  return (
    <Grid item xs={120} sm={60} md={40}> {/* Adjusted sizes for responsiveness */}
      <Card sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: 200,
            objectFit: "contain",
            padding: 2,
          }}
        />
        <CardContent>
          <Typography gutterBottom   sx={{ fontSize: "1.1rem" }}  component="div"> {/* Reduced title size */}
            {title}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "1.1rem", color:"red"}}>
            {price} $
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#375180",
              borderRadius: "50px",
              padding: "6px 18px",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#2e456e",
              },
            }}
            onClick={() =>{
              console.log("Adding product ID:", _id); // Check if _id is valid
              addItemToCart(_id);
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}