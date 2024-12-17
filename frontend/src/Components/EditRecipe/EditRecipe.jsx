import React , {useState , useEffect} from 'react'
import './style.css'
import { useParams ,useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast'

const EditRecipe = () => {
    const { id } = useParams();
    const [hasReloaded, setHasReloaded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    {console.log(id)}
    const [recipe, setRecipe] = useState({
      title: '',
      description: '',
      cook_time: '',
      servings: '',
      steps: [],
      ingredients: [],
    });
    const [updatedRecipe, setUpdatedRecipe] = useState({
      title: recipe.title,
      description: recipe.description,
      cook_time: recipe.cook_time,
      servings: recipe.servings,
      steps: recipe.steps,
      ingredients: recipe.ingredients,
    });
    // console.log(updatedRecipe)
    const [numberOfSteps, setNumberOfSteps] = useState();
    const [numberOfIngredients, setNumberOfIngredients] = useState();
    const [file, setFile] = useState(null);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handleStepsChange = (e) => {
      const value = parseInt(e.target.value)|| "";
      setNumberOfSteps(value >= 0 ? value : 0); // Ensure value is at least 1
    };
  
    const handleIngredientsChange = (e) => {
      const value = parseInt(e.target.value) || "";
      setNumberOfIngredients(value >= 0 ? value : ""); // Ensure value is at least 1
    };

    const handleUpdatedTitleChange = (e) =>{
      setUpdatedRecipe({...updatedRecipe,title: e.target.value})
    }

    const handleUpdatedDescriptionChange = (e) =>{
      setUpdatedRecipe({...updatedRecipe,description:e.target.value})
    }

    const handleUpdatedStepChange = (index, value) => {
      const updatedSteps = [...updatedRecipe.steps];
      updatedSteps[index] = { ...updatedSteps[index], procedure: value };
      setUpdatedRecipe({ ...updatedRecipe, steps: updatedSteps });
    };

    const handleUpdatedCookTimeChange = (e) =>{
      setUpdatedRecipe({...updatedRecipe,cook_time:e.target.value})
    }

    const handleUpdatedServingsChange = (e) =>{
      setUpdatedRecipe({...updatedRecipe,servings: e.target.value})
    }

    const handleIngredientChange = (index, field, value) => {
      const updatedIngredients = [...updatedRecipe.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
      setUpdatedRecipe({ ...updatedRecipe, ingredients: updatedIngredients });
    };

    useEffect(() => {
      return () => {
        if (file) {
          URL.revokeObjectURL(file);
        }
      };
    }, [file]);
    

    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/recipe/${id}`);
          if (response.data.success) {
            const fetchedRecipe = response.data.recipe;
            // console.log(fetchedRecipe)
            setRecipe(fetchedRecipe);
            setUpdatedRecipe(fetchedRecipe)
            setNumberOfSteps(fetchedRecipe.steps.length);
            setNumberOfIngredients(fetchedRecipe.ingredients.length);
            setFile(fetchedRecipe.image)
          }
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };
  
      fetchRecipe();
    }, [id]);
    // {console.log(file)}

    useEffect(() => {
      if (!hasReloaded) {
        setHasReloaded(true);
        const timer = setTimeout(() => {
          navigate(location.pathname, { replace: true });
        }, 100);
  
        return () => clearTimeout(timer);
      }
    }, [hasReloaded, location.pathname, navigate]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('title', updatedRecipe.title);
        formData.append('description', updatedRecipe.description);
        formData.append('cook_time', updatedRecipe.cook_time);
        formData.append('servings', updatedRecipe.servings);
        formData.append('steps', JSON.stringify(updatedRecipe.steps));
        formData.append('ingredients', JSON.stringify(updatedRecipe.ingredients));
        
        if (file) {
          formData.append('image', file);
        }
        
        // const encodedId = encodeURIComponent(id);
        console.log('Submitting to:', `http://localhost:4000/api/updaterecipe/${id}`);

        const response = await axios.put(`http://localhost:4000/api/updaterecipe/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        if (response.data.success) {
          console.log('Recipe updated successfully:', response.data.updatedRecipe);
          toast.success("Updated Successfully..!!")
        }
      } catch (error) {
        console.error('Error updating recipe:', error);
        toast.error("Error Occurred while Updating the Recipe.")
      }
    };
  
    return (
        <div className="main-edit">
          <Toaster position='top-center' reverseOrder={false}/>
        <div className="container">
      <form method="post" encType="multipart/form-data">
        <h1>Edit Recipe</h1>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required defaultValue={recipe.title} onChange={handleUpdatedTitleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <div className="steps-info">
            <input type="text" name="description" id="description" defaultValue={recipe.description} onChange={handleUpdatedDescriptionChange}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="procedure">Procedure:</label>
          <div className="procedure-steps">
            <label>Enter No. of Steps:</label>
            <input
              type="number"
              value={numberOfSteps}
              
              onChange={handleStepsChange}
              id="steps"
            />
          </div>
          <div className="steps-info-prod">
            {[...Array(numberOfSteps)].map((_, index) => (
              <div className="step-container" key={index}>
                <span className="step-label">Step {index + 1}:</span>
                <input
                  type="text"
                  name={`step-${index + 1}`}
                  id={`step-${index + 1}`}
                  placeholder={`Step ${index + 1}`}
                  style={{ marginLeft: '30px' }}
                  defaultValue={recipe.steps[index]?.procedure}
                  onChange={(e) => handleUpdatedStepChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cook_time">Cook Time (minutes):</label>
          <input type="number" id="cook_time" name="cook_time" required defaultValue={recipe.cookTime} onChange={handleUpdatedCookTimeChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="servings">Servings:</label>
          <input type="number" id="servings" name="servings" required defaultValue={recipe.servings} onChange={handleUpdatedServingsChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <div className="ingredient-number">
            <label>Enter No. of Ingredients:</label>
            <input
              type="number"
              value={numberOfIngredients}
              min="1"
              onChange={handleIngredientsChange}
              id="ingred"
            />
          </div>
          <div className="ingredient-grid">
            {[...Array(numberOfIngredients)].map((_, index) => (
              <div className="ingredient-info" key={index}>
                <div className="ingred-name">
                  <label htmlFor={`name-${index + 1}`}>Item {index + 1}:</label>
                  <input type="text" name={`name-${index + 1}`} id={`name-${index + 1}`} defaultValue={recipe.ingredients[index]?.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}/>
                </div>
                <div className="ingred-qty">
                  <label htmlFor={`qty-${index + 1}`}>Qty:</label>
                  <input type="text" name={`qty-${index + 1}`} id={`qty-${index + 1}`} style={{ width: '5rem' }} defaultValue={recipe.ingredients[index]?.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group file-inp">
          <label htmlFor="img1" className="custom-file-input">Upload Image 1</label>
          <input type="file" id="img1" name="img1" accept="image/*" onChange={handleFileChange} />
          <p className="file-name">{file ? `Selected file: ${file}` : 'No file selected'}</p>
          {/* {file && <img src={URL.createObjectURL(file)} alt="Preview" className="img-preview" style={{ width: '300px', height: '300px' }} />} */}
          {file && <img src={`http://localhost:4000/uploads/${recipe.image}`} alt={recipe.title} className='img-preview' style={{width:'300px',height:'300px'}}/>}
        </div>
        <input type="submit" value="update Recipe" id="add-r" onClick={handleSubmit}/>
      </form>
    </div>
    {console.log(updatedRecipe)}
    </div>
    );
}

export default EditRecipe