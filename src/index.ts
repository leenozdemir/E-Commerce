import express from "express";
import mongoose from "mongoose";
import userRoute from "./router/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./router/productRoute";

const app = express();
const port = 3001;

// Seed the products to database
seedInitialProducts();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Failed to connect!", err));

  app.use("/user", userRoute);
  app.use("/product", productRoute);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});