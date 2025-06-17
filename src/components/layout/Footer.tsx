import React from "react";
import { Link } from "react-router-dom";
import {
  CookingPot,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <CookingPot size={24} className="text-orange-500 mr-2" />
              <span className="text-xl font-bold">Recipedia</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Discover delicious recipes for every occasion, dietary preference,
              and skill level.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Recipe Search
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/meal-planner"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Meal Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Diet
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Health
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Meal Type
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cuisine Type
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">Have questions or feedback?</p>
            <a
              href="mailto:info@recipedia.com"
              className="text-orange-500 hover:text-orange-400"
            >
              info@recipedia.com
            </a>
            <p className="text-gray-400 mt-4">
              Subscribe to our newsletter for weekly recipe inspiration.
            </p>
            <form className="mt-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Sanjida Aziz. All rights reserved.
          </p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            {" • "}
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
