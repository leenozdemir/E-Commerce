import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/Cart/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import FavoritesPage from "./pages/FavoritesPage";
import FavoritesProvider from "./context/Favorites/FavoritesProvider";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import React from "react";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
            <Route 
                path="/" 
                element={
                  <>
                    <Banner /> 
                    <HomePage />
                    <Footer />
                  </>
                } 
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
          </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
