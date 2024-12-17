import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Del = () => {
  // --------------------------- Limit to 6 -------------------------
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataFromUser, setDataFromUser] = useState([
    "Portuguese Custard Tart",
    "Pavlova (Australian Dessert)",
    "Chaat",
    "Samosa",
    "Falafel (Middle Eastern Chickpea Fritters)",
    "Classic Tacos al Pastor",
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
        console.log("Error", error);
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

  return (
    <div className="main-del">
      <div class="sec4-image">
        <div class="image">
          <img src="/4-img/cooking.png" alt="" />
        </div>
      </div>
      <div class="del-recipes">
        <div class="heading">
          <h1>Try These Delicious Recipes Today</h1>
        </div>
        <div class="info">
          <p>
            Discover a variety of mouth-watering recipes that are easy to make
            and sure to delight your taste buds. Whether you're looking for
            quick meals, hearty dinners, or decadent desserts, you'll find
            inspiration for your next culinary creation. Dive in and start
            cooking today!
          </p>
          <p></p>
        </div>
      </div>
      <div class="recipes-del">
        {/* <div class="rec" id="item-1">
          <div class="rec-image">
            <img src="/4-img/Rec-1.jpg" alt="" />
          </div>
          <h1>Recipe 1</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
            adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic
            suscipit!
          </p>
          <div class="left-btn">
            <button id="seeRecipe">
              Check Recipe{" "}
              <div class="btn-image">
                <img src="4-img/top-right.png" alt="" />
              </div>
            </button>
          </div>
        </div>
        <div class="rec" id="item-2">
          <div class="rec-image">
            <img src="/4-img/Rec-2.jpg" alt="" />
          </div>
          <h1>Recipe 2</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
            adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic
            suscipit!
          </p>
          <div class="left-btn">
            <button id="seeRecipe">
              Check Recipe{" "}
              <div class="btn-image">
                <img src="4-img/top-right.png" alt="" />
              </div>
            </button>
          </div>
        </div>
        <div class="rec" id="item-3">
          <div class="rec-image">
            <img src="/4-img/Rec-3.jpg" alt="" />
          </div>
          <h1>Recipe 3</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
            adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic
            suscipit!
          </p>
          <div class="left-btn">
            <button id="seeRecipe">
              Check Recipe{" "}
              <div class="btn-image">
                <img src="4-img/top-right.png" alt="" />
              </div>
            </button>
          </div>
        </div>
        <div class="rec" id="item-4">
          <div class="rec-image">
            <img src="/4-img/Rec-4.jpg" alt="" />
          </div>
          <h1>Recipe 4</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
            adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic
            suscipit!
          </p>
          <div class="left-btn">
            <button id="seeRecipe">
              Check Recipe{" "}
              <div class="btn-image">
                <img src="4-img/top-right.png" alt="" />
              </div>
            </button>
          </div>
        </div>
        <div class="rec" id="item-5">
          <div class="rec-image">
            <img src="/4-img/Rec-5.jpg" alt="" />
          </div>
          <h1>Recipe 5</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
            adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic
            suscipit!
          </p>
          <div class="left-btn">
            <button id="seeRecipe">
              Check Recipe{" "}
              <div class="btn-image">
                <img src="4-img/top-right.png" alt="" />
              </div>
            </button>
          </div>
        </div>
        <div class="rec" id="item-6">
          <div class="rec-image">
            <img src="./4-img/Rec-6.jpg" alt="" />
          </div>
          <h1>Recipe 6</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
            adipisci debitis nesciunt. Enim provident a culpa, nihil omnis hic
            suscipit!
          </p>
          <div class="left-btn">
            <button id="seeRecipe">
              Check Recipe{" "}
              <div class="btn-image">
                <img src="4-img/top-right.png" alt="" />
              </div>
            </button>
          </div>
        </div> */}

        {filteredData.length > 0 ? (
          filteredData.map((recipe, index) => (
            <div className="rec" id={`item-${index + 1}`}>
              <img
                src={`http://localhost:4000/uploads/${recipe.image}`}
                alt={`${recipe.title}`}
              />

              <h1>{recipe.title}</h1>
              <p>{recipe.description}</p>
              <div
                class="left-btn"
                onClick={() => navigate(`/user/recipe/${recipe._id}`)}
              >
                <button id="seeRecipe">
                  Check Recipe{" "}
                  <div class="btn-image">
                    <img src="4-img/top-right.png" alt="" />
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

export default Del;
