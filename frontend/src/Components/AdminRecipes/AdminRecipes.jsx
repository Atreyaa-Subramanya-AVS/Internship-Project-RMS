import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import OnlyAdminNav from "../OnlyAdminNav/OnlyAdminNav";
import "./style.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const AdminRecipes = () => {
  const [data, setData] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const handleEditClick = (recipeId) => {
    navigate(`/admin/update/${recipeId}`);
  };

  const dltRecipe = async (id) => {
    try {
      const deleteRecipe = await axios.delete(
        `http://localhost:4000/api/deleterecipe/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (deleteRecipe.data.success) {
        toast.success("Recipe Successfully Deleted.");
      } else {
        toast.error("A Problem Occurred while deleting the Recipe.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to Delete.");
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/getrecipe");

        if (res.data.success) {
          setData(res.data.recipes);
          console.log(data);
        } else {
          toast.error("Problem occurred while fetching recipes..!!");
        }
      } catch (err) {
        toast.error("Problem occurred while fetching recipes...!!");
        console.error(err);
      }
    };

    fetchRecipes();
  }, [shouldFetch]);

  const fetchData = async (val) => {
    try {
      const response = await fetch("http://localhost:4000/api/getrecipe");
      const json = await response.json();

      console.log("API Response:", json);

      const recipes = json.recipes || [];

      const results = recipes.filter((recipe) => {
        return (
          val &&
          recipe &&
          recipe.title &&
          recipe.title.toLowerCase().includes(val.toLowerCase())
        );
      });

      console.log("Filtered Results:", results);
      setFilteredData(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleFilteredDataClick = (id) => {
    navigate(`/admin/update/${id}`);
  };

  return (
    <div className="main-recipe-route">
      <Toaster position="top-center" reverseOrder={false} />
      <OnlyAdminNav />
      <div className="recipe-route-search">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          onChange={(e) => handleChange(e.target.value)}
        />
        <button>
          <div className="recipe-route-search-button">
            <img src="/Recipe-img/search.png" alt="" />
          </div>
          <span>Search...</span>
        </button>
      </div>
      <div className="results-list">
        {filteredData.length > 0
          ? filteredData.map((item) => (
              <div
                key={item._id}
                className="recipe-item"
                onClick={() => handleFilteredDataClick(item._id)}
              >
                <h3>{item.title}</h3>
              </div>
            ))
          : ""}
      </div>
      <div className="recipe-route">
        {/* <div className="recipe-route-card">
            <div className="recipe-route-image">
                <img src="/2-img/masonry-7.jpg" alt="" />
            </div>
            <h3 className="recipe-route-title">Rice Payasam</h3>
            <p className="recipe-route-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa maxime sunt recusandae aperiam numquam dolores eum nisi doloribus quibusdam dicta.
            </p>
            <div className="recipe-card-bottom">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/Recipe-img/clock.png" alt="" />
                <p className="recipe-route-cook">20 minutes</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/Recipe-img/serving.png" alt="" />
                <p className="recipe-route-servings">4 people</p>
                </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <button className="adminRecipes-btn" style={{marginLeft:'6.5rem'}}>
                    Edit Recipe <img src="" alt="" />
                </button>
                <button className="adminRecipes-btn" style={{marginLeft:'-5rem'}}>
                    Delete Recipe <img src="" alt="" />
                </button>
            </div>
        </div>
        <div className="recipe-route-card">
            <div className="recipe-route-image">
                <img src="/2-img/masonry-7.jpg" alt="" />
            </div>
            <h3 className="recipe-route-title">Rice Payasam</h3>
            <p className="recipe-route-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa maxime sunt recusandae aperiam numquam dolores eum nisi doloribus quibusdam dicta.
            </p>
            <div className="recipe-card-bottom">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/Recipe-img/clock.png" alt="" />
                <p className="recipe-route-cook">20 minutes</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/Recipe-img/serving.png" alt="" />
                <p className="recipe-route-servings">4 people</p>
                </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <button className="adminRecipes-btn" style={{marginLeft:'6.5rem'}}>
                    Edit Recipe <img src="" alt="" />
                </button>
                <button className="adminRecipes-btn" style={{marginLeft:'-5rem'}}>
                    Delete Recipe <img src="" alt="" />
                </button>
            </div>
        </div> */}
        {data.length > 0 ? (
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
                  style={{ height: "500px" }}
                />
              </div>
              <h3 className="recipe-route-title">{recipe.title}</h3>
              <p className="recipe-rote-desc" style={{ textAlign: "center" }}>
                {recipe.description}
              </p>
              <div className="recipe-card-bottom">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src="/Recipe-img/clock.png" alt="" />
                  <p className="recipe-route-cook">{recipe.cookTime} minutes</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src="/Recipe-img/serving.png" alt="" />
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
                onClick={() => handleEditClick(recipe._id)}
              >
                <button
                  className="adminRecipes-btn"
                  style={{
                    marginLeft: "8rem",
                    width: "9rem",
                    paddingLeft: "2rem",
                  }}
                >
                  Edit Recipe
                </button>
                <button
                  className="adminRecipes-btn"
                  style={{
                    marginLeft: "-7rem",
                    width: "11rem",
                    paddingLeft: "2.7rem",
                  }}
                  onClick={() => dltRecipe(recipe._id)}
                >
                  Delete Recipe <img src="" alt="" />
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

export default AdminRecipes;
