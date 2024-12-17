// import express from "express";
// import multer from "multer";
// import path from "path";
// import {
//   CreateRecipe,
//   GetRecipe,
//   UpdateRecipe,
//   DeleteRecipe,
// } from "../controller/RecipeController.js";
// import { fileURLToPath } from "url";

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.resolve();

// // Ensure the uploads directory exists
// import fs from "fs";
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // Serve static files from 'uploads' directory
// router.use('/uploads', express.static(uploadDir));

// // Create recipe with image upload
// router.post('/createrecipe', upload.single('image'), CreateRecipe);

// // Read recipes
// router.get('/getrecipe', GetRecipe);

// // Update recipe
// router.put('/updaterecipe/:id', upload.single('image'), UpdateRecipe);

// // Delete recipe
// router.delete('/deleterecipe/:id', DeleteRecipe);

// export default router;


import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  CreateRecipe,
  GetRecipe,
  getRecipeContent,
  getRecipesByIngredients,
  UpdateRecipe,
  DeleteRecipe,
} from "../controller/RecipeController.js";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use uploadDir here
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static files from 'uploads' directory
router.use('/uploads', express.static(uploadDir));

// Define routes
router.post('/createrecipe', upload.single('image'), CreateRecipe);
router.get('/getrecipe', GetRecipe);
router.post('/recipesByIngredients', getRecipesByIngredients);

router.put('/updaterecipe/:id', upload.single('image'), UpdateRecipe);
router.delete('/deleterecipe/:id', DeleteRecipe);
router.get('/recipe/:id',getRecipeContent);

export default router;
