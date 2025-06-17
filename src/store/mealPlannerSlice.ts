import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealPlannerState, Recipe } from "../types";

// Load meal plan from localStorage if available
const loadMealPlan = () => {
  const storedPlan = localStorage.getItem("mealPlan");
  return storedPlan ? JSON.parse(storedPlan) : {};
};

const initialState: MealPlannerState = {
  plan: loadMealPlan(),
  groceryList: [],
};

interface AddMealPayload {
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  recipe: Recipe;
}

interface RemoveMealPayload {
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

const mealPlannerSlice = createSlice({
  name: "mealPlanner",
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<AddMealPayload>) => {
      const { date, mealType, recipe } = action.payload;

      if (!state.plan[date]) {
        state.plan[date] = {};
      }

      state.plan[date][mealType] = recipe;

      // Save to localStorage
      localStorage.setItem("mealPlan", JSON.stringify(state.plan));
    },
    removeMeal: (state, action: PayloadAction<RemoveMealPayload>) => {
      const { date, mealType } = action.payload;

      if (state.plan[date] && state.plan[date][mealType]) {
        delete state.plan[date][mealType];

        // If no meals left for this date, remove the date entry
        if (Object.keys(state.plan[date]).length === 0) {
          delete state.plan[date];
        }

        // Save to localStorage
        localStorage.setItem("mealPlan", JSON.stringify(state.plan));
      }
    },
    generateGroceryList: (state) => {
      const ingredientMap = new Map<string, number>();

      // Collect all ingredients from all meals in the plan
      Object.values(state.plan).forEach((meals) => {
        Object.values(meals).forEach((recipe: Recipe | undefined) => {
          if (recipe) {
            recipe.ingredients.forEach((ingredient) => {
              const key = `${ingredient.food} (${ingredient.measure})`;
              const currentQuantity = ingredientMap.get(key) || 0;
              ingredientMap.set(key, currentQuantity + ingredient.quantity);
            });
          }
        });
      });

      // Convert the map to a formatted list
      state.groceryList = Array.from(ingredientMap.entries()).map(
        ([item, quantity]) => `${quantity.toFixed(2)} ${item}`
      );
    },
    clearGroceryList: (state) => {
      state.groceryList = [];
    },
  },
});

export const { addMeal, removeMeal, generateGroceryList, clearGroceryList } =
  mealPlannerSlice.actions;
export default mealPlannerSlice.reducer;
