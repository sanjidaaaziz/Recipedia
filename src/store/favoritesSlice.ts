import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, FavoritesState } from '../types';

// Load favorites from localStorage if available
const loadFavorites = (): Recipe[] => {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState: FavoritesState = {
  recipes: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Recipe>) => {
      // Check if recipe already exists in favorites
      if (!state.recipes.some((recipe) => recipe.id === action.payload.id)) {
        state.recipes.push(action.payload);
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(state.recipes));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(state.recipes));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;