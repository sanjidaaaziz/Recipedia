import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CookingPot, Heart, Calendar, Search, Menu, X } from "lucide-react";
import { setSearchParams } from "../../store/recipeSlice";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     dispatch(setSearchParams({ query: searchQuery }));
  //     if (location.pathname !== "/search") {
  //       window.location.href = "/search";
  //     }
  //   }
  // };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      dispatch(setSearchParams({ query: trimmedQuery }));

      const queryString = `?query=${encodeURIComponent(trimmedQuery)}`;

      if (location.pathname === "/search") {
        // Update the URL without reloading
        window.history.pushState(null, "", `/search${queryString}`);
        // Trigger effect manually
        dispatch(fetchRecipes({ ...filters, query: trimmedQuery }) as any);
      } else {
        // Navigate to search page with query
        window.location.href = `/search${queryString}`;
      }
    } //else {
    //alert("Please enter a search term");
    //}
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white shadow-md"
      } py-3`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <CookingPot size={28} className="text-orange-500 mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Recipedia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-28">
            <Link
              to="/search"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium"
            >
              <Search size={18} />
              Recipes
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium"
            >
              <Heart size={18} />
              Favorites
            </Link>
            <Link
              to="/meal-planner"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium"
            >
              <Calendar size={18} />
              Meal Planner
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 pl-10 pr-4 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-orange-500 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 px-6 py-6 bg-white shadow-lg rounded-lg border border-gray-100 flex flex-col items-center space-y-6 transition-all duration-300">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 pl-10 pr-4 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </form>

            {/* Menu Links */}
            <Link
              to="/search"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-semibold text-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search size={20} />
              Recipes
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-semibold text-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart size={20} />
              Favorites
            </Link>
            <Link
              to="/meal-planner"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-semibold text-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calendar size={20} />
              Meal Planner
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
