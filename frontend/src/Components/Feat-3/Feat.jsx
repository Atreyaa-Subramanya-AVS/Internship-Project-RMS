import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Feat = () => {
  // ------------------------------ Limit to 4 -----------------------------
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataFromUser, setDataFromUser] = useState([
    "Gazpacho (Refreshing Tomato Soup)",
    "Jamón Ibérico (Iberian Ham and Bread)",
    "Biryani",
    "Chinese Soup Dumplings",
  ]); /*-------Note: Write your prefered choices here (inside the array) */
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/getrecipe");

        if (res.data.success) {
          setData(res.data.recipes);
        } else {
          toast.error("Problem occurred while fetching recipes...!");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter((recipe) =>
        dataFromUser.includes(recipe.title)
      );
      setFilteredData(filtered);
    }
  }, [dataFromUser, data]);

  const difficulty = ["Beginner", "Intermediate", "Intermediate", "Advanced"];

  return (
    <div className="main-feat">
      <div class="feat-recipes">
        <div class="image">
          <img src="/3-img/chef.png" alt="" />
        </div>
        <h1>Featured Recipes</h1>
        <div class="info">
          <p>
            Discover a curated selection of our most popular and highly rated
            recipes. From quick weeknight dinners to indulgent desserts, our
            featured recipes are sure to inspire your next meal.
          </p>
          <p></p>
        </div>
      </div>
      <div class="recipes">
        {/* <div class="rec-item" id="rec-item-1">
                <div className="rec-img">
                    <img src="/3-img/img-1.jpg" alt="" loading='lazy'/>
                </div>
                <h2>Beginner</h2>
                <h1>Recipe 1</h1>
                <p style={{fontSize:'clamp(0.8rem,1rem + 1vw,1.3rem)'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic suscipit!</p>
                <div class="left-btn-feat">
                    <button id="seeRecipe">Check Recipe <div class="btn-image">
                        <img src="/4-img/top-right.png" alt="" />
                    </div></button>
                </div>
            </div>
            <div class="rec-item" id="rec-item-2">
                <div className="rec-img">
                    <img src="/3-img/img-2.jpg" alt="" loading='lazy'/>
                </div>
                <h2>Intermediate</h2>
                <h1>Recipe 2</h1>
                <p style={{fontSize:'clamp(0.8rem,1rem + 1vw,1.3rem)'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic suscipit!</p>
                <div class="left-btn-feat">
                    <button id="seeRecipe">Check Recipe <div class="btn-image">
                        <img src="/4-img/top-right.png" alt="" />
                    </div></button>
                </div>
            </div>
            <div class="rec-item" id="rec-item-3">
                <div className="rec-img">
                    <img src="/3-img/img-3.jpg" alt="" loading='lazy'/>
                </div>
                <h2>Intermediate</h2>
                <h1>Recipe 3</h1>
                <p style={{fontSize:'clamp(0.8rem,1rem + 1vw,1.3rem)'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic suscipit!</p>
                <div class="left-btn-feat">
                    <button id="seeRecipe">Check Recipe <div class="btn-image">
                        <img src="/4-img/top-right.png" alt="" />
                    </div></button>
                </div>
            </div>
            <div class="rec-item" id="rec-item-4">
                <div className="rec-img">
                    <img src="/3-img/img-4.jpg" alt="" loading='lazy'/>
                </div>
                <h2>Advanced</h2>
                <h1>Recipe 4</h1>
                <p style={{fontSize:'clamp(0.8rem,1rem + 1vw,1.3rem)'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic suscipit!</p>
                <div class="left-btn-feat">
                    <button id="seeRecipe">Check Recipe <div class="btn-image">
                        <img src="/4-img/top-right.png" alt="" />
                    </div></button>
                </div>   
            </div> */}

        {filteredData.length > 0 ? (
          filteredData.map((recipe, index) => (
            <div
              className="rec-item"
              id={`rec-item-${index + 1}`}
              key={recipe._id}
            >
              <div className="rec-img">
                <img
                  src={`http://localhost:4000/uploads/${recipe.image}`}
                  alt={`${recipe.title}`}
                />
              </div>
              <h2>{difficulty[index]}</h2>
              <h1 style={{ marginTop: "1rem" }}>{recipe.title}</h1>
              <p
                style={{
                  fontSize: "clamp(0.8rem,1rem + 1vw,1.3rem)",
                  marginTop: "1.5rem",
                }}
              >
                {recipe.description}
              </p>
              <div
                class="left-btn-feat"
                onClick={() => navigate(`/user/recipe/${recipe._id}`)}
              >
                <button id="seeRecipe">
                  Check Recipe{" "}
                  <div class="btn-image">
                    <img src="/4-img/top-right.png" alt="" />
                  </div>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Recipes Found.</p>
        )}
      </div>
    </div>
  );
};

export default Feat;
