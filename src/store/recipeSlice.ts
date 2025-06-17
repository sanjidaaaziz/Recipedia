import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, RecipeState, SearchParams } from "../types";
import { searchRecipes, getRecipeByUri } from "../services/api"; // ✅ correct Edamam function

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
  searchParams: {
    query: "",
  },
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (params: SearchParams) => {
    return await searchRecipes(params);
  }
);

// ✅ Rename fetchRecipeById to fetchRecipeByUri for clarity
export const fetchRecipeByUri = createAsyncThunk(
  "recipes/fetchRecipeByUri",
  async (uri: string) => {
    return await getRecipeByUri(uri); // ✅ use the correct function
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = action.payload;
    },
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = false;
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipes";
      })

      // ✅ Update for fetchRecipeByUri
      .addCase(fetchRecipeByUri.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipeByUri.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.loading = false;
          state.selectedRecipe = action.payload;
        }
      )
      .addCase(fetchRecipeByUri.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipe";
      });
  },
});

export const { setSearchParams, clearSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
