import React from "react";
import { Link } from "react-router-dom";
import { Heart, ExternalLink, ShoppingCart, Users } from "lucide-react";
import { Recipe } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";
import { RootState } from "../../store";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.recipes);
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  // Debugging: log recipe object and label
  console.log("Recipe data:", recipe);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite(recipe.id));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  // Safe truncation of recipe title
  const truncateLabel = (label: string | undefined, maxLength: number = 60) => {
    if (!label) return "No Title Available";
    return label.length > maxLength
      ? `${label.substring(0, maxLength)}...`
      : label;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/recipe/${encodeURIComponent(recipe.id)}`}
        state={{ recipe }}
        className="block h-full"
      >
        <div className="relative">
          <img
            src={
              recipe.image ||
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={recipe.title || "Recipe Image"}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition-colors"
          >
            <Heart
              size={20}
              className={`${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              {truncateLabel(recipe.title)}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.dietLabels?.slice(0, 2).map((label) => (
              <span
                key={label}
                className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
              >
                {label}
              </span>
            ))}
            {recipe.healthLabels?.includes("Vegetarian") && (
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Vegetarian
              </span>
            )}
          </div>

          {/* Updated info section with ingredients count, servings, and calories */}
          <div className="flex items-center text-gray-600 font-semibold text-sm mt-4">
            <div className="flex items-center mr-4">
              <ShoppingCart size={16} className="mr-1" />
              <span>
                {recipe.ingredients?.length
                  ? `${recipe.ingredients.length} ingredients`
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center mr-4">
              <Users size={16} className="mr-1" />
              <span>
                {recipe.yield && recipe.yield > 0
                  ? `${recipe.yield} servings`
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center text-orange-500 font-semibold ml-auto">
              <ExternalLink size={16} className="mr-1" />
              <span className="font-medium">View</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
