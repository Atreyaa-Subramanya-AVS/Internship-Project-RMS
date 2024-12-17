import React, { useState, useEffect } from "react";
import "./style.css";
import { run } from "./Gem";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const AskAI = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [resultFromAI, setResultFromAI] = useState("");
  const [dataFromAI, setDataFromAI] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await run(textareaValue);
      console.log(res);
      const cleanedData = res.split(",").map((item) => item.trim());
      setResultFromAI(res);
      setDataFromAI(cleanedData);
      console.log(cleanedData);

      // Ensure loading persists for 4200ms
      setTimeout(() => {
        setIsLoading(false);
      }, 4200);
    } catch (error) {
      console.log("Error:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 4200);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/getrecipe");

        if (res.data.success) {
          setData(res.data.recipes);
        } else {
          toast.error("Problem occurred while fetching recipes..!");
        }
      } catch (err) {
        toast.error("Problem occurred while fetching recipes..!");
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (dataFromAI.length > 0) {
      const filtered = data.filter((recipe) =>
        dataFromAI.includes(recipe.title)
      );
      setFilteredData(filtered);
    }
  }, [dataFromAI, data]);

  return (
    <>
      <div className="main-AI">
        <div className="main-ai-route">
          <div className="ai-route-search">
            <div className="ai-input">
              <textarea
                onChange={handleChange}
                value={textareaValue}
              ></textarea>
            </div>
            <div className="ai-search">
              <button onClick={handleClick}>
                <div className="recipe-route-search-button">
                  <img src="/AI-img/ai.png" alt="" />
                </div>
                <span>Ask AI..</span>
              </button>
            </div>
          </div>
        </div>
        <div className="recipe-route">
          {isLoading ? (
            <div className="loading-effect">
              <Loading />
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((recipe) => (
              <div className="recipe-route-card" key={recipe._id}>
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
                    <p className="recipe-route-cook">
                      {recipe.cookTime} minutes
                    </p>
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
            <p
              style={{
                textAlign: "center",
                position: "relative",
                left: "100%",
              }}
            >
              Type your Question and take suggestions from Gemini-1.5.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AskAI;
