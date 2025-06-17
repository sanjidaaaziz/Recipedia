import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../common/Button';

interface RecipeFiltersProps {
  onApplyFilters: (filters: {
    diet: string[];
    health: string[];
    mealType: string[];
    cuisineType: string[];
  }) => void;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    diet: [] as string[],
    health: [] as string[],
    mealType: [] as string[],
    cuisineType: [] as string[],
  });

  const [expandedSections, setExpandedSections] = useState({
    diet: true,
    health: false,
    mealType: false,
    cuisineType: false,
  });

  const dietOptions = ['balanced', 'high-protein', 'low-carb', 'low-fat'];
  const healthOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto-friendly', 'paleo'];
  const mealTypeOptions = ['breakfast', 'lunch', 'dinner', 'snack'];
  const cuisineTypeOptions = ['american', 'asian', 'italian', 'french', 'mediterranean', 'mexican', 'indian'];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return {
        ...prev,
        [category]: updatedCategory,
      };
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      diet: [],
      health: [],
      mealType: [],
      cuisineType: [],
    });
    onApplyFilters({
      diet: [],
      health: [],
      mealType: [],
      cuisineType: [],
    });
  };

  const renderFilterSection = (
    title: string,
    category: keyof typeof filters,
    options: string[],
    isExpanded: boolean
  ) => (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full font-medium text-left py-2 border-b"
        onClick={() => toggleSection(category)}
      >
        <span>{title}</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      {isExpanded && (
        <div className="pt-2 pb-1">
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <label
                key={option}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  filters[category].includes(option)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters[category].includes(option)}
                  onChange={() => handleFilterChange(category, option)}
                />
                {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Filter size={18} className="mr-2 text-orange-500" />
          Filters
        </h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-orange-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {renderFilterSection('Diet', 'diet', dietOptions, expandedSections.diet)}
      {renderFilterSection('Health', 'health', healthOptions, expandedSections.health)}
      {renderFilterSection('Meal Type', 'mealType', mealTypeOptions, expandedSections.mealType)}
      {renderFilterSection('Cuisine', 'cuisineType', cuisineTypeOptions, expandedSections.cuisineType)}

      <Button
        onClick={handleApplyFilters}
        variant="primary"
        fullWidth
        className="mt-4"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default RecipeFilters;