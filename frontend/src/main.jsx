import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
// import App from './App'
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Masonry from "./Components/Masonry-2/Masonry";
import Feat from "./Components/Feat-3/Feat";
import Del from "./Components/Del-4/Del";
import Recipes from "./Components/Recipes/Recipes";
import OnlyNav from "./Components/Onlynav/OnlyNav";
import Footer from "./Components/Footer/Footer";
import Loading from "./Components/Loading/Loading";
import LoadingFull from "./Components/LoadingFull/LoadingFull";
import { useLocation } from "react-router-dom";
import AskAI from "./Components/AskAI/AskAI";
import Nav from "./Components/Nav/Nav";
import Auth from "./Components/Auth-0/Auth";
import AdminPortal from "./Components/AdminPortal/AdminPortal";
import AdminRecipes from "./Components/AdminRecipes/AdminRecipes";
import AddRecipe from "./Components/AddRecipe/AddRecipe";
import EditRecipe from "./Components/EditRecipe/EditRecipe";
import RecipeContent from "./Components/RecipeContent/RecipeContent";
import RecipesByIngredients from "./Components/RecipesByIngredients/RecipesByIngredients";
import ProtectedAdminRoute from "./Components/ProtectedRoutes/ProtectedAdminRoute";
import ProtectedUserRoute from "./Components/ProtectedRoutes/ProtectedUserRoute";
import HomeVideo from "./Components/HomeVideo/HomeVideo";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingFull />
      ) : (
        <div>
          <Nav />
          <HomeVideo />
          <Masonry />
          <Feat />
          <Del />
          <Footer />
        </div>
      )}
    </>
  );
};

const RecipesPage = () => {
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  const location = useLocation();

  return (
    <div className="RecipesApp">
      <OnlyNav />
      <Recipes />
      {/* <Footer /> */}
      {/* <OnlyNav />
      {isLoadingRecipes && location.pathname === '/recipes' ? <Loading /> : <div>
      <Recipes />
      <Footer />
      </div> } */}
    </div>
  );
};

const AskAIPage = () => {
  return (
    <div className="AskAIApp">
      <OnlyNav />
      <AskAI />
      {/* <Footer /> */}
    </div>
  );
};

const RecipesByIngredientsPage = () => {
  return (
    <div className="RecipesByIngredientsApp">
      <OnlyNav />
      <RecipesByIngredients />
      {/* <Footer /> */}
    </div>
  );
};

/* ---------------- Private Routing ---------------------------- */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<ProtectedUserRoute />}>
          <Route path="/user" element={<Home />} />
          <Route path="/user/recipes" element={<RecipesPage />} />
          <Route
            path="/user/recipesbyingredients"
            element={<RecipesByIngredientsPage />}
          />
          <Route path="/user/AskAI" element={<AskAIPage />} />
          <Route path="/user/recipe/:id" element={<RecipeContent />} />
        </Route>
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin/add" element={<AddRecipe />} />
          <Route path="/admin/adminrecipes" element={<AdminRecipes />} />
          <Route path="/admin/update/:id" element={<EditRecipe />} />
        </Route>
      </Routes>
      {/* <Route path="/" element={<Auth />} />
        <Route path="/user" element={<ProtectedUserRoute><Home /></ProtectedUserRoute>} />
        <Route path="/user/recipes" element={<ProtectedUserRoute><RecipesPage /></ProtectedUserRoute>} />
        <Route path="/user/recipesbyingredients" element={<ProtectedUserRoute><RecipesByIngredientsPage /></ProtectedUserRoute>} />
        <Route path="/user/AskAI" element={<ProtectedUserRoute><AskAIPage /></ProtectedUserRoute>} />
        <Route path="/user/recipe/:id" element={<ProtectedUserRoute><RecipeContent /></ProtectedUserRoute>} />
        <Route path="/admin" element={<ProtectedAdminRoute><AdminPortal /></ProtectedAdminRoute>} />
        <Route path="/admin/add" element={<ProtectedAdminRoute><AddRecipe /></ProtectedAdminRoute>} />
        <Route path="/admin/adminrecipes" element={<ProtectedAdminRoute><AdminRecipes /></ProtectedAdminRoute>} />
        <Route path="/admin/update/:id" element={<ProtectedAdminRoute><EditRecipe /></ProtectedAdminRoute>} /> */}
    </BrowserRouter>
  </React.StrictMode>
);
