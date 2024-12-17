import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Recipes = () => {
    const [data, setData] = useState([]);
    const [input,setInput] = useState("")
    const [filteredData,setFilteredData] = useState([])
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get("http://localhost:4000/api/getrecipe");

                if (res.data.success) {
                    setData(res.data.recipes);
                    console.log(data)
                } else {
                    toast.error("Problem occurred while fetching recipes..!");
                }
                setTimeout(() =>{
                    setIsLoading(false)
                },2600)
            } catch (err) {
                toast.error("Problem occurred while fetching recipes..!");
                console.error(err);
                setTimeout(() =>{
                    setIsLoading(false)
                },2600)
            }
        };

        fetchRecipes();
    }, []);

    const fetchData = async (val) => {

        try {
          const response = await fetch("http://localhost:4000/api/getrecipe");
          const json = await response.json();
      
          console.log('API Response:', json);
      
          const recipes = json.recipes || []; 
      
          const results = recipes.filter((recipe) => {
            return val && recipe && recipe.title && recipe.title.toLowerCase().includes(val.toLowerCase());
          });
      
          console.log('Filtered Results:', results);
          setFilteredData(results)
        //   setTimeout(() => {
        //     setIsLoading(false);
        //   }, 2600);
        } catch (error) {
          console.error('Error fetching data:', error);
        //   setTimeout(() => {
        //     setIsLoading(false);
        //   }, 2600);
        }
      };
      
      const handleChange = (value) => {
        setInput(value);
        fetchData(value);
      };


    return (
        <div className="main-recipe-route">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="recipe-route-search">
                <input type="text" placeholder="Search..." onChange={(e) => handleChange(e.target.value)} />
                <button>
                    <div className="recipe-route-search-button">
                        <img src="/Recipe-img/search.png" alt="Search" />
                    </div>
                    <span>Search...</span>
                </button>
            </div>
            <div className="results-list">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item._id} className="recipe-item" onClick={() => handleFilteredDataClick(item._id)}>
              <h3>{item.title}</h3>
            </div>
          ))
        ) : (
          ""
        )}
      </div>
            <div className="recipe-route">
                {isLoading ? (
                    <div className="loading-effect">
                        <Loading/>
                    </div>
                ):data.length > 0 ? (
                    data.map((recipe,index) => (
                        <div className="recipe-route-card" key={recipe._id} style={{animationDelay:`${index * 0.2}s`}}>
                            <div className="recipe-route-image">
                                <img
                                    src={`http://localhost:4000/uploads/${recipe.image}`}
                                    alt={recipe.title}
                                />
                            </div>
                            <h3 className="recipe-route-title">{recipe.title}</h3>
                            <p className="recipe-route-desc">{recipe.description}</p>
                            <div className="recipe-card-bottom">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="/Recipe-img/clock.png" alt="Clock" />
                                    <p className="recipe-route-cook">{recipe.cookTime} minutes</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="/Recipe-img/serving.png" alt="Serving" />
                                    <p className="recipe-route-servings">{recipe.servings} people</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <button className="recipe-route-button" onClick={() => navigate(`/user/recipe/${recipe._id}`)}>
                                    Check Recipe <img src="/Recipe-img/top-right.png" alt="Arrow" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
};

export default Recipes;
