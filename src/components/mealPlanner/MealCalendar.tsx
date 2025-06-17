import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, addDays, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { RootState } from "../../store";
import { Recipe } from "../../types";
import { addMeal, removeMeal } from "../../store/mealPlannerSlice";
import Button from "../common/Button";

interface MealCalendarProps {
  recipes: Recipe[];
}

const MealCalendar: React.FC<MealCalendarProps> = ({ recipes }) => {
  const dispatch = useDispatch();
  const mealPlan = useSelector((state: RootState) => state.mealPlanner.plan);
  const [startDate, setStartDate] = useState(startOfWeek(new Date()));
  const [showMealSelector, setShowMealSelector] = useState<{
    date: string;
    mealType: "breakfast" | "lunch" | "dinner" | "snack";
  } | null>(null);

  // Generate the week days
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startDate, index);
    return {
      date,
      formattedDate: format(date, "yyyy-MM-dd"),
      dayOfWeek: format(date, "EEE"),
      dayOfMonth: format(date, "d"),
    };
  });

  const mealTypes = [
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
    { id: "snack", label: "Snack" },
  ];

  const handlePreviousWeek = () => {
    setStartDate(addDays(startDate, -7));
  };

  const handleNextWeek = () => {
    setStartDate(addDays(startDate, 7));
  };

  const handleMealSelect = (
    date: string,
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
  ) => {
    setShowMealSelector({ date, mealType });
  };

  const handleAddMeal = (recipe: Recipe) => {
    if (showMealSelector) {
      dispatch(
        addMeal({
          date: showMealSelector.date,
          mealType: showMealSelector.mealType,
          recipe,
        })
      );
      setShowMealSelector(null);
    }
  };

  const handleRemoveMeal = (
    date: string,
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
  ) => {
    dispatch(removeMeal({ date, mealType }));
  };

  const getMealForDateAndType = (date: string, mealType: string) => {
    return mealPlan[date]?.[
      mealType as "breakfast" | "lunch" | "dinner" | "snack"
    ];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-orange-500 text-white flex justify-between items-center">
        <button
          onClick={handlePreviousWeek}
          className="p-1 rounded-full hover:bg-orange-600"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold">
          {format(startDate, "MMMM d")} -{" "}
          {format(addDays(startDate, 6), "MMMM d, yyyy")}
        </h3>
        <button
          onClick={handleNextWeek}
          className="p-1 rounded-full hover:bg-orange-600"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 w-24 text-left text-gray-600"></th>
              {weekDays.map((day) => (
                <th
                  key={day.formattedDate}
                  className="p-3 text-center font-medium"
                >
                  <div className="text-gray-600">{day.dayOfWeek}</div>
                  <div className="text-xl">{day.dayOfMonth}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map((mealType) => (
              <tr key={mealType.id} className="border-b border-gray-100">
                <td className="p-3 text-left font-medium text-gray-700">
                  {mealType.label}
                </td>
                {weekDays.map((day) => {
                  const meal = getMealForDateAndType(
                    day.formattedDate,
                    mealType.id
                  );

                  return (
                    <td
                      key={`${day.formattedDate}-${mealType.id}`}
                      className="p-2 border-l border-gray-100"
                    >
                      {meal ? (
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-800 truncate">
                            {meal.label}
                          </div>
                          <div className="flex mt-2 justify-between">
                            <Link
                              to={`/recipe/${encodeURIComponent(meal.id)}`}
                              state={{ recipe: meal }}
                              className="text-xs text-orange-500 hover:underline"
                            >
                              View
                            </Link>
                            <button
                              onClick={() =>
                                handleRemoveMeal(
                                  day.formattedDate,
                                  mealType.id as any
                                )
                              }
                              className="text-xs text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleMealSelect(
                              day.formattedDate,
                              mealType.id as any
                            )
                          }
                          className="w-full h-16 flex items-center justify-center text-gray-400 rounded-lg border-2 border-dashed border-gray-200 hover:border-orange-300 hover:text-orange-500 transition-colors"
                        >
                          <Plus size={20} />
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Meal Selector Modal */}
      {showMealSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">
                Select{" "}
                {showMealSelector.mealType.charAt(0).toUpperCase() +
                  showMealSelector.mealType.slice(1)}{" "}
                for {format(new Date(showMealSelector.date), "EEEE, MMMM d")}
              </h3>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="p-3 border rounded-lg hover:bg-orange-50 cursor-pointer"
                      onClick={() => handleAddMeal(recipe)}
                    >
                      <div className="flex items-center">
                        <img
                          src={recipe.image}
                          alt={recipe.label}
                          className="w-16 h-16 rounded-md object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{recipe.label}</h4>
                          <p className="text-sm text-gray-500">
                            {recipe.totalTime > 0
                              ? `${recipe.totalTime} min • `
                              : ""}
                            {recipe.yield} servings
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 p-4 text-center text-gray-500">
                    No recipes available. Please search and save some recipes
                    first.
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowMealSelector(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCalendar;
