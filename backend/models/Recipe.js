import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    steps: [
      {
        stepNumber: { type: Number, required: true },
        procedure: { type: String, required: true },
      },
    ],
    cookTime: { type: Number, required: true }, // in minutes
    servings: { type: Number, required: true },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    image: { type: String },
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model("Recipes", recipeSchema);

export default RecipeModel;
