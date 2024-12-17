import React,{useState, useEffect} from 'react'
import './style.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

const RecipeContent = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        cook_time: '',
        servings: '',
        steps: [],
        ingredients: [],
      });
      // const numberOfSteps = 7;
      const [numberOfSteps, setNumberOfSteps] = useState();
      const [numberOfIngredients, setNumberOfIngredients] = useState();
      const [file, setFile] = useState(null);
      const [isLoading,setIsLoading] = useState(true)

    // Generate an array of step numbers
    const stepsArray = Array.from({ length: numberOfSteps }, (_, index) => index + 1);
    const ingredientsArray  = Array.from({length: numberOfIngredients}, (_,index) => index + 1)
    
    useEffect(() => {
        const fetchRecipe = async () => {
          setIsLoading(true)
          try {
            const response = await axios.get(`http://localhost:4000/api/recipe/${id}`);
            if (response.data.success) {
              const fetchedRecipe = response.data.recipe;
              console.log(fetchedRecipe)
              setRecipe(fetchedRecipe);
              setNumberOfSteps(fetchedRecipe.steps.length);
              setNumberOfIngredients(fetchedRecipe.ingredients.length);
              setFile(fetchedRecipe.image);

              setTimeout(() => {
                setIsLoading(false)
              },2500)
            }
          } catch (error) {
            console.error('Error fetching recipe:', error);
            setTimeout(() => {
              setIsLoading(false);
            }, 2500);
          }
        };
    
        fetchRecipe();
      }, [id]);

    return (
      <div className="main-ViewRecipe">
        <div className="ViewRecipeContainer">
          {isLoading ? (
            <div className="loading-effect">
              <Loading />
            </div>
          ): (<div className='loading-inside'>
            <div className="ViewRecipeTitle">
            <h1>{recipe.title}</h1>
          </div>
          <div className="ViewRecipeImage">
            <img src={`http://localhost:4000/uploads/${recipe.image}`} alt="" style={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px'}}/>
          </div>
          <div className="ViewRecipeDesc">
            <h2>Description:</h2>
            <p>{recipe.description}</p>
          </div>
          <div className="ViewRecipeDets" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className="ViewRecipeCook">
              <h2>Cook Time:</h2>
              <p>{recipe.cookTime} minutes</p>
            </div>
            <div className="ViewRecipeServe">
              <h2>Servings:</h2>
              <p>{recipe.servings} People</p>
            </div>
          </div>
          <div className="ViewRecipeItems">
            <h1>Ingredients:</h1>
            <div className="ViewRecipeItems-grid">
              {ingredientsArray.map((item,index)=>(
                <div className="ViewRecipeItem" id={`View${item}`} key={item}>
                <p>{recipe.ingredients[index]?.name} - {recipe.ingredients[index]?.quantity}</p>
              </div>
              ))}
            </div>
          </div>
          <div className="ViewRecipeProcedure">
            <h2>Procedure:</h2>
            {stepsArray.map((step,index) => (
          <div key={step} className="ViewRecipeStep" id={`See${step}`}>
            <p>Step {step}: {recipe.steps[index]?.procedure} </p>
          </div>
        ))}
          </div>
            </div>)}
        </div>
      </div>
    )
}

export default RecipeContent