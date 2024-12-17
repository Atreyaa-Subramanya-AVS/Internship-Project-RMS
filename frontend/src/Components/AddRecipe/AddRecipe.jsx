import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "./style.css";
import OnlyAdminNav from "../OnlyAdminNav/OnlyAdminNav";

const AddRecipe = () => {
  const [numberOfSteps, setNumberOfSteps] = useState(0);
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
  const [file, setFile] = useState(null);

  const [value, setValue] = useState({
    title: "",
    description: "",
    steps: [],
    cookTime: 0,
    servings: 0,
    ingredients: [],
    image: "",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setValue((prevState) => ({
      ...prevState,
      image: selectedFile ? URL.createObjectURL(selectedFile) : "",
    }));
  };

  const handleStepsChange = (e) => {
    const stepsCount = parseInt(e.target.value) || "";
    setNumberOfSteps(stepsCount);
    setValue((prevState) => ({
      ...prevState,
      steps: Array.from({ length: stepsCount }, (_, index) => ({
        stepNumber: index + 1,
        procedure: prevState.steps[index]
          ? prevState.steps[index].procedure
          : "",
      })),
    }));
  };

  const handleStepProcedureChange = (index, e) => {
    const newSteps = [...value.steps];
    newSteps[index].procedure = e.target.value;
    setValue((prevState) => ({ ...prevState, steps: newSteps }));
  };

  const handleIngredientsChange = (e) => {
    const ingredientsCount = parseInt(e.target.value) || "x`";
    setNumberOfIngredients(ingredientsCount);
    setValue((prevState) => ({
      ...prevState,
      ingredients: Array.from({ length: ingredientsCount }, (_, index) => ({
        name: prevState.ingredients[index]
          ? prevState.ingredients[index].name
          : "",
        quantity: prevState.ingredients[index]
          ? prevState.ingredients[index].quantity
          : "",
      })),
    }));
  };

  const handleIngredientChange = (index, e, field) => {
    const newIngredients = [...value.ingredients];
    newIngredients[index][field] = e.target.value;
    setValue((prevState) => ({ ...prevState, ingredients: newIngredients }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("description", value.description);
      formData.append("steps", JSON.stringify(value.steps));
      formData.append("cookTime", value.cookTime);
      formData.append("servings", value.servings);
      formData.append("ingredients", JSON.stringify(value.ingredients));
      if (file) {
        formData.append("image", file);
      }

      const response = await axios.post(
        "http://localhost:4000/api/createrecipe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Recipe Successfully Added!");
        console.log(response.data.newRecipe);
      } else {
        toast.error("Failed to add recipe.");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      }
      toast.error("An error occurred while adding the recipe.");
    }
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [file]);

  return (
    <div className="main-add">
      <OnlyAdminNav />
      <div className="container">
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <h1>Add Recipe</h1>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={value.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              value={value.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="steps">Procedure:</label>
            <label>Enter No. of Steps:</label>
            <input
              type="number"
              value={numberOfSteps}
              name="steps"
              onChange={handleStepsChange}
              id="steps"
            />
            <div className="steps-info-prod">
              {[...Array(numberOfSteps)].map((_, index) => (
                <div className="step-container" key={index}>
                  <span className="step-label">Step {index + 1}:</span>
                  <input
                    type="text"
                    name={`step-${index + 1}`}
                    id={`step-${index + 1}`}
                    placeholder={`Step ${index + 1}`}
                    style={{ marginLeft: "30px" }}
                    value={value.steps[index]?.procedure || ""}
                    onChange={(e) => handleStepProcedureChange(index, e)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cookTime">Cook Time (minutes):</label>
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              value={value.cookTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Servings:</label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={value.servings}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients:</label>
            <label>Enter No. of Ingredients:</label>
            <input
              type="number"
              value={numberOfIngredients}
              min="1"
              onChange={handleIngredientsChange}
              id="ingredients"
            />
            <div className="ingredient-grid">
              {[...Array(numberOfIngredients)].map((_, index) => (
                <div className="ingredient-info" key={index}>
                  <div className="ingred-name">
                    <label htmlFor={`name-${index + 1}`}>
                      Item {index + 1}:
                    </label>
                    <input
                      type="text"
                      name={`name-${index + 1}`}
                      id={`name-${index + 1}`}
                      value={value.ingredients[index]?.name || ""}
                      onChange={(e) => handleIngredientChange(index, e, "name")}
                    />
                  </div>
                  <div className="ingred-qty">
                    <label htmlFor={`qty-${index + 1}`}>Qty:</label>
                    <input
                      type="text"
                      name={`qty-${index + 1}`}
                      id={`qty-${index + 1}`}
                      style={{ width: "5rem" }}
                      value={value.ingredients[index]?.quantity || ""}
                      onChange={(e) =>
                        handleIngredientChange(index, e, "quantity")
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group file-inp">
            <label htmlFor="img1" className="custom-file-input">
              Upload Image 1
            </label>
            <input
              type="file"
              id="img1"
              name="img1"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="file-name">
              {file ? `Selected file: ${file.name}` : "No file selected"}
            </p>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="img-preview"
                style={{ width: "300px", height: "300px" }}
              />
            )}
          </div>
          <input type="submit" value="Add Recipe" id="add-r" />
          <Toaster position="top-center" reverseOrder={false} />
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
