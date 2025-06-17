import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, Search } from "lucide-react";
import { RootState } from "../store";
import MealCalendar from "../components/mealPlanner/MealCalendar";
import GroceryList from "../components/mealPlanner/GroceryList";
import Button from "../components/common/Button";

const MealPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"calendar" | "groceries">(
    "calendar"
  );
  const favorites = useSelector((state: RootState) => state.favorites.recipes);

  // return (
  //   <div className="pt-20 pb-16 min-h-screen bg-gray-50">
  //     <div className="container mx-auto px-4">
  //       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
  //         <div className="flex items-center mb-4">
  //           <Calendar size={24} className="text-orange-500 mr-3" />
  //           <h1 className="text-3xl font-bold">Weekly Meal Planner</h1>
  //         </div>
  //         <p className="text-gray-600">
  //           Plan your meals for the week and generate a shopping list with all
  //           the ingredients you'll need.
  //         </p>
  //       </div>

  //       {/* Tabs */}
  //       <div className="bg-white rounded-lg shadow-md mb-8">
  //         <div className="flex border-b">
  //           <button
  //             className={`flex-1 py-3 text-center font-medium ${
  //               activeTab === "calendar"
  //                 ? "text-orange-500 border-b-2 border-orange-500"
  //                 : "text-gray-500 hover:text-orange-500"
  //             }`}
  //             onClick={() => setActiveTab("calendar")}
  //           >
  //             Meal Calendar
  //           </button>
  //           <button
  //             className={`flex-1 py-3 text-center font-medium ${
  //               activeTab === "groceries"
  //                 ? "text-orange-500 border-b-2 border-orange-500"
  //                 : "text-gray-500 hover:text-orange-500"
  //             }`}
  //             onClick={() => setActiveTab("groceries")}
  //           >
  //             Grocery List
  //           </button>
  //         </div>
  //       </div>

  //       {/* Main Content */}
  //       {favorites.length === 0 ? (
  //         <div className="text-center py-16 bg-white rounded-lg shadow-md">
  //           <Search size={64} className="mx-auto text-gray-300 mb-4" />
  //           <h2 className="text-2xl font-bold mb-2">No Saved Recipes</h2>
  //           <p className="text-gray-600 max-w-md mx-auto mb-6">
  //             You need to save some recipes to your favorites before you can add
  //             them to your meal plan.
  //           </p>
  //           <Link to="/search">
  //             <div className="flex justify-center mt-6">
  //               <Button variant="primary">Find Recipes</Button>
  //             </div>
  //           </Link>
  //         </div>
  //       ) : activeTab === "calendar" ? (
  //         <MealCalendar recipes={favorites} />
  //       ) : (
  //         <GroceryList />
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <div className="flex items-center space-x-4 mb-3">
            <Calendar size={28} className="text-orange-500" />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Weekly Meal Planner
            </h1>
          </div>
          <p className="text-gray-600 max-w-xl leading-relaxed text-lg">
            Plan your meals for the week and generate a shopping list with all
            the ingredients you'll need.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-10 overflow-hidden">
          <div className="flex border-b border-gray-200 select-none">
            {["calendar", "groceries"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-4 text-center font-semibold transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-orange-600 border-b-4 border-orange-600 bg-orange-50"
                    : "text-gray-500 hover:text-orange-500"
                }`}
                onClick={() => setActiveTab(tab)}
                aria-selected={activeTab === tab}
                role="tab"
              >
                {tab === "calendar" ? "Meal Calendar" : "Grocery List"}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md py-20 px-10 text-center max-w-xl mx-auto">
            <Search size={72} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              No Saved Recipes
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Save your favorite recipes first to add them to your meal plan.
            </p>
            <Link to="/search" className="inline-block">
              <Button
                variant="primary"
                className="px-10 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                Find Recipes
              </Button>
            </Link>
          </div>
        ) : activeTab === "calendar" ? (
          <MealCalendar recipes={favorites} />
        ) : (
          <GroceryList />
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
