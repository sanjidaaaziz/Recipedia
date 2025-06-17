import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Clock,
  Users,
  Link as LinkIcon,
  Heart,
  Calendar,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
} from "lucide-react";
import Button from "../components/common/Button";
import NutritionInfo from "../components/recipe/NutritionInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

const RecipeDetails: React.FC = () => {
  const location = useLocation();
  const recipe = location.state?.recipe;

  const [addedToMealPlan, setAddedToMealPlan] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.recipes);
  const isFavorite = favorites.some((fav) => fav.id === recipe?.id);

  const handleFavoriteToggle = () => {
    if (!recipe) return;
    if (isFavorite) {
      dispatch(removeFavorite(recipe.id));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  const handleAddToMealPlan = () => {
    setAddedToMealPlan(true);
    setTimeout(() => setAddedToMealPlan(false), 3000);
  };

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
          <AlertCircle size={32} className="mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-2">Recipe Not Found</h2>
          <p className="mb-4">
            We couldn't find the recipe. Please go back and try again.
          </p>
          <Link to="/search" className="text-orange-500 hover:underline">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="pt-20 pb-16 min-h-screen bg-gray-50">
  //     {addedToMealPlan && (
  //       <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
  //         <CheckCircle size={20} className="mr-2" />
  //         Recipe added to meal planner!
  //       </div>
  //     )}

  //     <div className="container mx-auto px-4">
  //       <Link
  //         to="/search"
  //         className="inline-flex items-center text-orange-500 hover:underline mb-6"
  //       >
  //         <ArrowLeft size={20} className="mr-2" />
  //         Back to search results
  //       </Link>

  //       {/* Header */}
  //       <div className="relative rounded-xl overflow-hidden mb-8">
  //         <div className="absolute inset-0">
  //           <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
  //           <img
  //             src={recipe.image}
  //             alt={recipe.title}
  //             className="w-full h-full object-cover"
  //           />
  //         </div>
  //         <div className="relative p-8 md:p-12 text-white">
  //           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
  //             {recipe.title}
  //           </h1>
  //           <div className="flex flex-wrap items-center gap-6 mb-6">
  //             <div className="flex items-center">
  //               <ShoppingCart size={20} className="mr-2" />
  //               <span>Ingredients: {recipe.ingredients?.length ?? "N/A"}</span>
  //             </div>
  //             <div className="flex items-center">
  //               <Users size={20} className="mr-2" />
  //               <span>Servings: {recipe.yield ?? "N/A"}</span>
  //             </div>
  //           </div>
  //           <div className="flex flex-wrap gap-3">
  //             <Button
  //               onClick={handleFavoriteToggle}
  //               variant={isFavorite ? "secondary" : "primary"}
  //               className="rounded-full px-6 py-2 text-sm shadow-md"
  //               icon={
  //                 <Heart size={18} className={isFavorite ? "fill-white" : ""} />
  //               }
  //             >
  //               {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
  //             </Button>
  //             {/* <Button
  //               onClick={handleAddToMealPlan}
  //               variant="outline"
  //               icon={<Calendar size={20} />}
  //             >
  //               Add to Meal Plan
  //             </Button> */}
  //           </div>
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  //         {/* Ingredients */}
  //         {/* <div className="lg:col-span-2 space-y-8">
  //           <div className="bg-white rounded-lg shadow-md p-6">
  //             <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
  //             <ul className="space-y-2">
  //               {recipe.ingredients.map((ingredient: string, index: number) => (
  //                 <li key={index} className="flex items-baseline">
  //                   <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
  //                   <span>{ingredient}</span>
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         </div> */}
  //         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
  //           <h2 className="text-2xl font-bold mb-5 text-gray-800">
  //             Ingredients
  //           </h2>
  //           <ul className="space-y-3">
  //             {recipe.ingredients.map((ingredient: string, index: number) => (
  //               <li key={index} className="flex items-start">
  //                 <span className="w-2 h-2 mt-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
  //                 <span className="text-gray-700 leading-relaxed">
  //                   {ingredient}
  //                 </span>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>

  //         {/* Nutrition Info */}
  //         <div>
  //           <NutritionInfo recipe={recipe} />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      {addedToMealPlan && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle size={20} className="mr-2" />
          Recipe added to meal planner!
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Link */}
        <Link
          to="/search"
          className="inline-flex items-center text-orange-500 hover:underline mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to search results
        </Link>

        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden mb-12 h-[400px] shadow-xl">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
          <div className="relative z-10 p-8 md:p-12 text-white h-full flex flex-col justify-end">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-xl">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center">
                <ShoppingCart size={20} className="mr-2" />
                <span>Ingredients: {recipe.ingredients?.length ?? "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Users size={20} className="mr-2" />
                <span>Servings: {recipe.yield ?? "N/A"}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleFavoriteToggle}
                variant={isFavorite ? "secondary" : "primary"}
                className="rounded-full px-6 py-2 text-sm shadow-md"
                icon={
                  <Heart size={18} className={isFavorite ? "fill-white" : ""} />
                }
              >
                {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
              </Button>
            </div>
          </div>
        </div>

        {/* Grid: Ingredients + Nutrition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
          {/* Ingredients Box */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-800 leading-relaxed">
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition Info Box */}
          {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
              Nutrition Information
            </h2>
            <NutritionInfo recipe={recipe} />
          </div> */}
          <div>
            <NutritionInfo recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
