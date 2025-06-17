import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice';
import favoritesReducer from './favoritesSlice';
import mealPlannerReducer from './mealPlannerSlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    favorites: favoritesReducer,
    mealPlanner: mealPlannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;