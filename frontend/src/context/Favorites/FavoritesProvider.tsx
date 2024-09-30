/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { FavoriteItem } from "../../types/FavoriteItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const FavoritesProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorites.");
        }

        const data = await response.json();
        const mappedFavorites = data.map((item: any) => ({
          productId: item.product._id,
          title: item.product.title,
          image: item.product.image,
          unitPrice: item.product.price,
        }));

        setFavoriteItems(mappedFavorites);
      } catch (error) {
        setError((error as Error).message);
        console.error(error);
      }
    };

    fetchFavorites();
  }, [token]);

  const addItemToFavorites = async (item: FavoriteItem) => {
    try {
      const response = await fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: item.productId }), // Send productId
      });

      if (!response.ok) {
        throw new Error("Failed to add item to favorites.");
      }

      // If successful, update the state
      setFavoriteItems((prevItems) => [...prevItems, item]);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    }
  };

  const removeItemFromFavorites = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/favorites/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from favorites.");
      }

      setFavoriteItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    }
  };

  const clearFavorites = async () => {
    try {
      const response = await fetch(`${BASE_URL}/favorites`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear favorites.");
      }

      setFavoriteItems([]);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        addItemToFavorites,
        removeItemFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;