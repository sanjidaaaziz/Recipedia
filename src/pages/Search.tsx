import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchRecipes } from "../store/recipeSlice";
import { RootState } from "../store";
import { Recipe, SearchParams } from "../types";
import RecipeCard from "../components/recipe/RecipeCard";
import RecipeFilters from "../components/recipe/RecipeFilters";
import Loader from "../components/common/Loader";
import { Search as SearchIcon } from "lucide-react";

const Search: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { recipes, loading, error, searchParams } = useSelector(
    (state: RootState) => state.recipes
  );

  const [searchQuery, setSearchQuery] = useState(searchParams.query || "");
  const [filters, setFilters] = useState<SearchParams>({
    query: searchParams.query || "",
    diet: searchParams.diet || [],
    health: searchParams.health || [],
    cuisineType: searchParams.cuisineType || [],
    mealType: searchParams.mealType || [],
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || searchParams.query || "";

    const diet = queryParams.get("diet")
      ? [queryParams.get("diet") as string]
      : searchParams.diet || [];
    const health = queryParams.get("health")
      ? [queryParams.get("health") as string]
      : searchParams.health || [];
    const cuisineType = queryParams.get("cuisineType")
      ? [queryParams.get("cuisineType") as string]
      : searchParams.cuisineType || [];
    const mealType = queryParams.get("mealType")
      ? [queryParams.get("mealType") as string]
      : searchParams.mealType || [];

    const updatedFilters = {
      query,
      diet,
      health,
      cuisineType,
      mealType,
    };

    setFilters(updatedFilters);
    setSearchQuery(query); // input will show exactly what the user typed or empty

    // only dispatch if query is not empty
    if (query.trim() !== "") {
      dispatch(fetchRecipes(updatedFilters) as any);
    }
  }, [location.search, dispatch, searchParams]);

  const isValidQuery = (query: string) => query.trim().length > 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidQuery(searchQuery)) {
      alert("Please enter a search term");
      return;
    }

    const updatedFilters = { ...filters, query: searchQuery };
    setFilters(updatedFilters);
    dispatch(fetchRecipes(updatedFilters) as any);
  };

  const handleApplyFilters = (newFilters: {
    diet: string[];
    health: string[];
    mealType: string[];
    cuisineType: string[];
  }) => {
    const updatedFilters = { ...filters, ...newFilters };

    if (!isValidQuery(updatedFilters.query)) {
      alert("Please enter a search term before applying filters");
      return;
    }

    setFilters(updatedFilters);
    dispatch(fetchRecipes(updatedFilters) as any);
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-5 pl-12 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <SearchIcon
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 px-6 rounded-r-full hover:bg-orange-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            <RecipeFilters onApplyFilters={handleApplyFilters} />
          </div>

          {/* Recipe Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader size="lg" />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
              </div>
            ) : recipes.length > 0 ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {recipes.length} Recipes Found
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe: Recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 inline-flex p-6 rounded-full mb-4">
                  <SearchIcon size={48} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No Recipes Found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {filters.query ||
                  filters.diet?.length ||
                  filters.health?.length ||
                  filters.cuisineType?.length ||
                  filters.mealType?.length
                    ? "Try adjusting your search or filters to find more recipes."
                    : "Start by searching for recipes or applying filters."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
