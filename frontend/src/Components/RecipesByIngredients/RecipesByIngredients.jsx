import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const RecipesByIngredients = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve input from local storage on component mount
    const savedInput = localStorage.getItem("userInput");
    if (savedInput) {
      setInput(savedInput);
    }
  }, []);

  useEffect(() => {
    // Save input to local storage whenever it changes
    localStorage.setItem("userInput", input);
  }, [input]);

  const fetchRecipes = async (e) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/recipesByIngredients",
        { ingredients: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success && res.data.recipes.length) {
        setData(res.data.recipes);
        console.log("Recipes Data:", res.data.recipes);
      } else {
        setTimeout(() => {
          toast.error("No Recipes Found..!");
        }, 2600);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2600);
    } catch (err) {
      toast.error("Problem occurred while fetching recipes..!");
      console.error(err);
      setTimeout(() => {
        setIsLoading(false);
      }, 2600);
    }
  };

  return (
    <div className="main-RecipeByIngred-route">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="recipe-route-search">
        <input
          type="text"
          placeholder="Enter Ingredients Here...(',' separated)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={fetchRecipes}>
          <div className="recipe-route-search-button">
            <img src="/Recipe-img/search.png" alt="Search" />
          </div>
          <span>Search...</span>
        </button>
      </div>
      <div className="recipe-route">
        {isLoading ? (
          <div className="loading-effect">
            <Loading />
          </div>
        ) : data.length > 0 ? (
          data.map((recipe, index) => (
            <div
              className="recipe-route-card"
              key={recipe._id}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="recipe-route-image">
                <img
                  src={`http://localhost:4000/uploads/${recipe.image}`}
                  alt={recipe.title}
                />
              </div>
              <h3 className="recipe-route-title">{recipe.title}</h3>
              <p className="recipe-route-desc">{recipe.description}</p>
              <div className="recipe-card-bottom">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src="/Recipe-img/clock.png" alt="Clock" />
                  <p className="recipe-route-cook">{recipe.cookTime} minutes</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src="/Recipe-img/serving.png" alt="Serving" />
                  <p className="recipe-route-servings">
                    {recipe.servings} people
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className="recipe-route-button"
                  onClick={() => navigate(`/user/recipe/${recipe._id}`)}
                >
                  Check Recipe{" "}
                  <img src="/Recipe-img/top-right.png" alt="Arrow" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-recipebyIngred">
            <p
              style={{
                textAlign: "center",
                position: "relative",
                left: "100%",
              }}
            >
              Get Recipes Based on what you have..!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesByIngredients;
