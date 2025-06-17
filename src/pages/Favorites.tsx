import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, BookmarkX } from "lucide-react";
import { RootState } from "../store";
import RecipeCard from "../components/recipe/RecipeCard";
import Button from "../components/common/Button";

const Favorites: React.FC = () => {
  const { recipes } = useSelector((state: RootState) => state.favorites);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Heart size={24} className="text-red-500 mr-3" />
            <h1 className="text-3xl font-bold">Your Favorite Recipes</h1>
          </div>
          <p className="text-gray-600">
            Access your saved recipes anytime, even offline. Your favorites are
            stored locally on your device.
          </p>
        </div>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <BookmarkX size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You haven't saved any recipes to your favorites yet. Browse
              recipes and click the heart icon to add them here.
            </p>
            <Link to="/search">
              <div className="flex justify-center mt-6">
                <Button variant="primary">Discover Recipes</Button>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
