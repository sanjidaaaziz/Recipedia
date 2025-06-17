export interface Recipe {
  id: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrients: { [key: string]: Nutrient };
}

export interface Ingredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
}

export interface Nutrient {
  label: string;
  quantity: number;
  unit: string;
}

export interface SearchParams {
  query: string;
  diet?: string[];
  health?: string[];
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
}

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
  searchParams: SearchParams;
}

export interface FavoritesState {
  recipes: Recipe[];
}

export interface MealPlan {
  [date: string]: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snack?: Recipe;
  };
}

export interface MealPlannerState {
  plan: MealPlan;
  groceryList: string[];
}

export interface RootState {
  recipes: RecipeState;
  favorites: FavoritesState;
  mealPlanner: MealPlannerState;
}