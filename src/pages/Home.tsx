import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Search,
  ChevronRight,
  Clock,
  Heart,
  Popcorn,
  Pizza,
  Salad,
  EggFried,
} from "lucide-react";
import { setSearchParams } from "../store/recipeSlice";
import Button from "../components/common/Button";

const popularSearches = [
  "Pasta",
  "Chicken",
  "Vegetarian",
  "Breakfast",
  "Quick Dinner",
  "Pizza",
  "Cheesecake",
  "Healthy",
  "One-Pot Meals",
  "Soup",
  "Salad",
  "Dessert",
  "Smoothie",
  "Seafood",
];

const cuisines = [
  {
    name: "Italian",
    image: "/italian.jpg",
    //"https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Mexican",
    image: "/mexican.jpg",
    //"https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Asian",
    image: "/asian.jpg",
    //"https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Mediterranean",
    image: "/mid.jpg",
    //"https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const mealTypes = [
  { name: "Breakfast", icon: <EggFried size={24} /> },
  { name: "Lunch", icon: <Salad size={24} /> },
  { name: "Dinner", icon: <Pizza size={24} /> },
  { name: "Snack", icon: <Popcorn size={24} /> },
];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setSearchParams({ query: searchQuery }));
      navigate("/search");
    }
  };

  const handlePopularSearch = (query: string) => {
    dispatch(setSearchParams({ query }));
    navigate("/search");
  };

  // const handleCuisineSearch = (cuisine: string) => {
  //   dispatch(
  //     setSearchParams({
  //       query: cuisine.toLowerCase(),
  //       cuisineType: [cuisine.toLowerCase()],
  //     })
  //   );
  //   navigate("/search");
  // };

  const handleCuisineSearch = (cuisine: string) => {
    dispatch(
      setSearchParams({
        query: cuisine.toLowerCase(), // Use cuisine as the actual search query
        cuisineType: [cuisine.toLowerCase()],
      })
    );
    navigate(
      "/search?query=" +
        cuisine.toLowerCase() +
        "&cuisineType=" +
        cuisine.toLowerCase()
    );
  };

  const handleMealTypeSearch = (mealType: string) => {
    const lowerCaseQuery = mealType.toLowerCase();

    dispatch(
      setSearchParams({
        query: lowerCaseQuery,
        mealType: [mealType], // keep Edamam casing
      })
    );
    navigate("/search");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-orange-500 to-orange-600 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img
            //src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            src="/hero.jpg"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px- relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Discover Delicious Recipes
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 opacity-90">
              Find thousands of recipes that match your available ingredients,
              dietary preferences, and meal types.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Enter ingredients or recipe name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 px-6 pr-12 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg text-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                <Search size={24} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Searches Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-orange-600 font-bold mb-2">
              Popular Searches
            </h2>
            <p className="text-gray-600">
              Craving something new? Explore the dishes people are making and
              loving right now across the globe.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto ">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handlePopularSearch(search)}
                className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-orange-50 hover:border-orange-300 hover:text-orange-500 transition-colors shadow-sm"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Cuisine */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">
              Browse by{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                Cuisine
              </span>
            </h2>
            <a
              href="/search"
              className="text-orange-600 font-semibold flex items-center hover:underline"
            >
              See all <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cuisines.map((cuisine, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer relative group"
                onClick={() => handleCuisineSearch(cuisine.name)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{cuisine.name}</h3>
                  <p className="text-sm opacity-90">Explore recipes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Meal Type */}
      <section className="relative py-16 bg-gray-50">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: "url('/meal.jpg')",
          }}
        ></div>

        {/* Overlay to control background opacity and darken/lighten if needed */}
        {/* Optional, if you want to add a color overlay */}
        {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}

        <div className="relative container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Browse by{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Meal Type
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {mealTypes.map((type, index) => (
              <div
                key={index}
                onClick={() => handleMealTypeSearch(type.name)}
                className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-orange-500 mb-4">
                  {type.icon}
                </div>
                <h3 className="font-medium text-lg">{type.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Why Use{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                Recipedia?
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to discover, plan, and
              organize your meals!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-orange-50 rounded-lg">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Discover Recipes</h3>
              <p className="text-gray-600">
                Search thousands of recipes by ingredients, diet, or cuisine
                type.
              </p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Save Favorites</h3>
              <p className="text-gray-600">
                Bookmark your favorite recipes for quick access anytime.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Meal Planning</h3>
              <p className="text-gray-600">
                Plan your weekly meals and generate grocery lists automatically.
              </p>
            </div>
          </div>

          <div className="flex justify-center text-center mt-12">
            <Button
              onClick={() => navigate("/search")}
              variant="primary"
              size="lg"
            >
              Start Exploring Recipes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
