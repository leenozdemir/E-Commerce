import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard"; // Adjust path if necessary
import { Product } from "../types/Product"; // Adjust path if necessary
import { BASE_URL } from "../constants/baseUrl"; // Adjust path if necessary

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5" color="error">
          Something went wrong, please try again!
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}> {/* Adjust maxWidth to lg for larger page width */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}> {/* 4 per row on md screens */}
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
      <Box mb={4} /> {/* Add margin bottom to create space after products */}
    </Container>
  );
};

export default HomePage;

