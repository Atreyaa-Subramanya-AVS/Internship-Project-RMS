import RecipeModel from "../models/Recipe.js";

const CreateRecipe = async (req, res) => {
  try {

    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const { title, description, steps, cookTime, servings, ingredients } = req.body;
    const image = req.file ? req.file.filename : null;

    const newRecipe = new RecipeModel({
      title,
      description,
      steps: JSON.parse(steps), // Assuming steps are sent as a JSON string
      cookTime,
      servings,
      ingredients: JSON.parse(ingredients), // Assuming ingredients are sent as a JSON string
      image,
    });

    await newRecipe.save();
    res.status(200).json({
      success: true,
      message: "Recipe created successfully",
      newRecipe,
    });
  } catch (error) {
    console.log("Error in CreateRecipe:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const GetRecipe = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    if (!recipes) {
      return res
        .status(404)
        .json({ success: false, message: "Recipes not found" });
    }
    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRecipeContent = async (req,res) =>{
  try{
    const recipeId = req.params.id;
    const recipe = await RecipeModel.findById(recipeId)

    if(!recipe){
      return res
        .status(404)
        .json({success: false,message:"Recipe Not Found..."})
    }
    res.status(200).json({success: true,recipe})
  }catch (error)
  {
    console.log(error)
    res.status(500).json({success: false,message:"Internal Server error"})
  }
}

const getRecipesByIngredients = async (req, res) => {
  try {
    const userIngredientsString = req.body.ingredients;
    const userIngredientsArray = userIngredientsString.split(',').map(ingredient => ingredient.trim());

    const query = {
      $expr: {
        $gte: [ // Check if the first value is greater than or equal to the second value
          {
            $size: { // Count the number of elements in the filtered array
              $filter: { // Filter the ingredients array
                input: "$ingredients", // The array to filter
                as: "ingredient", // Alias for each element in the array
                cond: { $in: ["$$ingredient.name", userIngredientsArray] } // Condition to match the ingredient name with the user's list
              }
            }
          },
          1 // The minimum number of matching ingredients required
        ]
      }
    };

    const recipes = await RecipeModel.find(query);
    // if (!recipes.length) {
    //   return res.status(404).json({ success: true, message: "No recipes found" });
    // }

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.error("Error in getRecipesByIngredients:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const UpdateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { title, description, steps, cookTime, servings, ingredients } = req.body;
    console.log(req.body)

    // If there is a file, include its path in the update
    const updateFields = {
      title,
      description,
      cookTime, 
      servings,
      steps: steps ? JSON.parse(steps) : undefined,
      ingredients: ingredients ? JSON.parse(ingredients) : undefined,
    };

    if (req.file) {
      updateFields.image = req.file.filename;
    }

    // Update the recipe in the database
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId, { $set: updateFields }, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      updatedRecipe,
    });
  } catch (error) {
    console.log('Update error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const DeleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { CreateRecipe, GetRecipe, getRecipeContent, getRecipesByIngredients ,UpdateRecipe, DeleteRecipe };
