import { createContext, useContext } from "react";
import { FavoriteItem } from "../../types/FavoriteItem";

interface FavoritesContextType {
  favoriteItems: FavoriteItem[];
  addItemToFavorites: (item: FavoriteItem) => void; // Accepts FavoriteItem
  removeItemFromFavorites: (productId: string) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteItems: [],
  addItemToFavorites: () => {},
  removeItemFromFavorites: () => {},
  clearFavorites: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);