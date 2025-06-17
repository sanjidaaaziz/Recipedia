import React from "react";
import { Recipe } from "../../types";

interface NutritionInfoProps {
  recipe: Recipe;
}

const NutritionInfo: React.FC<NutritionInfoProps> = ({ recipe }) => {
  // Common nutrients to display
  const keyNutrients = [
    { id: "ENERC_KCAL", label: "Calories", unit: "kcal" },
    { id: "PROCNT", label: "Protein", unit: "g" },
    { id: "FAT", label: "Fat", unit: "g" },
    { id: "FASAT", label: "Saturated Fat", unit: "g" },
    { id: "CHOCDF", label: "Carbs", unit: "g" },
    { id: "FIBTG", label: "Fiber", unit: "g" },
    { id: "SUGAR", label: "Sugar", unit: "g" },
    { id: "NA", label: "Sodium", unit: "mg" },
  ];

  // Calculate per serving values
  const servings = recipe.yield || 1;

  const calculatePerServing = (nutrient: any) => {
    if (!nutrient) return "N/A";
    return (nutrient.quantity / servings).toFixed(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
      <h3 className="text-2xl font-bold mb-5 text-gray-800 text-center">
        Nutrition Facts
      </h3>
      <p className="text-sm text-gray-500 mb-4">Amount per serving</p>

      <div className="space-y-3">
        {keyNutrients.map((nutrient) => {
          const nutrientData = recipe.totalNutrients[nutrient.id];
          return (
            <div
              key={nutrient.id}
              className="flex justify-between items-center py-2 border-b border-gray-100"
            >
              <span className="font-medium">{nutrient.label}</span>
              <span>
                {nutrientData
                  ? `${calculatePerServing(nutrientData)} ${nutrient.unit}`
                  : "N/A"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          * Percent Daily Values are based on a 2000 calorie diet.
        </p>
      </div>
    </div>
  );
};

export default NutritionInfo;
