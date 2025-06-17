import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import MealPlanner from "./pages/MealPlanner";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <Search />
              </Layout>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <Layout>
                <RecipeDetails />
              </Layout>
            }
          />
          <Route
            path="/favorites"
            element={
              <Layout>
                <Favorites />
              </Layout>
            }
          />
          <Route
            path="/meal-planner"
            element={
              <Layout>
                <MealPlanner />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
