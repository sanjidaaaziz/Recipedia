import axios from "axios";
import { Recipe, SearchParams } from "../types";

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;
const USER_ID = import.meta.env.VITE_EDAMAM_USER_ID;
const BASE_URL = "https://api.edamam.com/api/recipes/v2";

export const searchRecipes = async (
  params: SearchParams
): Promise<Recipe[]> => {
  try {
    const { query, diet, cuisineType, mealType } = params;

    if (!query || query.trim() === "") {
      throw new Error("Query parameter is required and cannot be empty");
    }

    const requestParams: Record<string, any> = {
      type: "public",
      q: query,
      app_id: APP_ID,
      app_key: APP_KEY,
      from: 0,
      to: 10,
    };

    if (diet && diet.length > 0) requestParams.diet = diet[0];
    if (cuisineType && cuisineType.length > 0)
      requestParams.cuisineType = cuisineType[0];
    if (mealType && mealType.length > 0) requestParams.mealType = mealType[0];

    const response = await axios.get(BASE_URL, {
      params: requestParams,
      headers: {
        "Edamam-Account-User": USER_ID,
      },
    });

    const recipes: Recipe[] = response.data.hits.map((hit: any) => {
      const r = hit.recipe;
      return {
        id: r.uri,
        title: r.label,
        image: r.image,
        summary: "", // Edamam doesn't include summary
        instructions: "", // Edamam doesn't include instructions directly
        ingredients: r.ingredientLines,
        yield: r.yield,
        totalNutrients: r.totalNutrients,
      };
    });

    return recipes;
  } catch (error: any) {
    console.error(
      "Error searching recipes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getRecipeByUri = async (uri: string): Promise<Recipe> => {
  try {
    const encodedUri = encodeURIComponent(uri);

    const response = await axios.get(`${BASE_URL}/${encodedUri}`, {
      params: {
        type: "public",
        app_id: APP_ID,
        app_key: APP_KEY,
      },
      headers: {
        "Edamam-Account-User": USER_ID,
      },
    });

    const r = response.data.recipe;

    const recipe: Recipe = {
      id: r.uri,
      title: r.label,
      image: r.image,
      summary: "",
      instructions: "",
      ingredients: r.ingredientLines,
      yield: r.yield,
      totalNutrients: r.totalNutrients,
    };

    return recipe;
  } catch (error: any) {
    console.error(
      "Error fetching recipe by URI:",
      error.response?.data || error.message
    );
    throw error;
  }
};
