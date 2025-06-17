import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <span className="text-8xl font-bold text-orange-500">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button variant="primary" icon={<Home size={20} />}>
              Go Home
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="outline" icon={<Search size={20} />}>
              Search Recipes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;