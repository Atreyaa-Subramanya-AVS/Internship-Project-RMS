import React, { useState, useEffect } from "react";
import "./style.css";
import rightup from "./right-up.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Masonry = () => {
  // ---------------------------- No Limit -------------------------------
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataFromUser, setDataFromUser] = useState([
    "Butter Chicken",
    "Paneer Tikka",
    "Chinese Soup Dumplings",
    "Tortilla Española (Spanish Omelette)",
    "Paella Valenciana",
    "Creamy Chicken Enchiladas",
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

  return (
    <div className="main">
      <div class="trial-2">
        <h1>
          We have all <span>Types</span> of Recipes
        </h1>
        <p>
          Welcome to our Recipe Book Management System, your gateway to diverse
          culinary delights. From the rich flavors of Indian cuisine to the
          comforting dishes of Italy and the exotic tastes of Asia, we have
          recipes for every palate. Whether you're looking for quick weeknight
          meals or gourmet creations, our collection offers something for
          everyone. Start your culinary adventure with us today!
        </p>
        <div class="svg-container"></div>
      </div>
      <div className="masonry">
        {/* <div className="brick">
          <img src="/2-img/masonry-1.webp" alt="" />
          <h1>Olive-Stuffed Roasted Mini-Pepper Crostini</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            assumenda voluptate temporibus. Atque repellendus neque ea. Adipisci
            dolor quasi alias.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="masonry-route-button">Check Recipe</button>
          </div>
        </div>
        <div className="brick">
          <img src="/2-img/masonry-2.webp" alt="" />
          <h1>Olive-Stuffed Roasted Mini-Pepper Crostini</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            assumenda voluptate temporibus. Atque repellendus neque ea. Adipisci
            dolor quasi alias.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="masonry-route-button">Check Recipe</button>
          </div>
        </div>
        <div className="brick">
          <img src="/2-img/masonry-3.webp" alt="" />
          <h1>Olive-Stuffed Roasted Mini-Pepper Crostini</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            assumenda voluptate temporibus. Atque repellendus neque ea. Adipisci
            dolor quasi alias.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="masonry-route-button">Check Recipe</button>
          </div>
        </div> */}

        {filteredData.length > 0 ? (
          filteredData.map((recipe) => (
            <div className="brick" key={recipe._id}>
              <img
                src={`http://localhost:4000/uploads/${recipe.image}`}
                alt={`${recipe.title}`}
              />

              <h1>{recipe.title}</h1>
              <p>{recipe.description}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => navigate(`/user/recipe/${recipe._id}`)}
              >
                <button className="masonry-route-button">Check Recipe</button>
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

export default Masonry;
