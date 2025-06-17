# 🍳 Recipedia

A modern recipe finder web application built with React, TypeScript, and Redux. Discover delicious recipes based on ingredients, dietary preferences, and meal planning needs.

## Live Link

🔗

## 🚀 Features

- 🔍 **Ingredient-Based Search**: Search for recipes by entering one or multiple ingredients
- 📄 **Search Results**: Browse recipe cards with images, titles, and brief descriptions
- 📖 **Recipe Details**: View full recipe instructions, ingredients, and more
- 🌿 **Dietary Filters**: Filter recipes by dietary preferences (vegan, keto, gluten-free, etc.)
- 🍎 **Nutritional Information**: See macronutrient breakdowns for each recipe
- ❤️ **Favorites**: Save and manage your favorite recipes with local persistence
- 🗓 **Meal Planner**: Plan your meals for the week and generate grocery lists
- 📱 **Responsive Design**: Optimized for desktops, tablets, and mobile devices

## 🛠 Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Styling**: Tailwind CSS, Material-UI
- **Icons**: Lucide React
- **API Integration**: [Edamam Recipe API](https://developer.edamam.com/)
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## 🏃‍♂ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/recipedia.git
cd recipedia
```

### 2. Install Dependencies

```bash
npm install
```

### 3. API Setup

To fetch recipes from the [Edamam Recipe API](https://developer.edamam.com/), you'll need to set up your API credentials:

Create a free developer account on Edamam.

Get your Application ID and Application Key.

Create a .env file in the root of your project and add the following:

```bash
VITE_EDAMAM_APP_ID=your_app_id_here
VITE_EDAMAM_APP_KEY=your_app_key_here
```

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and visit

```bash
http://localhost:5173
```

## 📦 Project Structure

src/
├── components/ # Reusable UI components
│ ├── common/ # Shared components (Button, Loader, etc.)
│ ├── layout/ # Layout elements (Header, Footer)
│ ├── mealPlanner/ # Components related to meal planning
│ └── recipe/ # Recipe display and interaction components
├── pages/ # Page components (Home, RecipeDetails, etc.)
├── services/ # API interaction services
├── store/ # Redux store and feature slices
├── types/ # TypeScript type definitions
└── App.tsx # Root component

## 🔑 Key Components

- _RecipeCard_: Displays recipe preview with image and basic info
- _RecipeFilters_: Handles dietary and cuisine-based filtering
- _MealCalendar_: Weekly meal planning interface
- _GroceryList_: Auto-generated grocery list from planned meals
- _NutritionInfo_: Displays recipe nutritional information

## 🔄 State Management

Managed via Redux Toolkit, including:

- Recipe search results
- Favorite recipes (persisted with localStorage)
- Meal planning data
- Global UI states

## 🎨 Styling

- Utility-first design using Tailwind CSS
- Modular, reusable styled components
- Smooth responsive layout

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add your message'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request with a clear description of your changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
