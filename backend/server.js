// import express from "express";
// import dbCon from "./utlis/db.js";
// import dotenv from "dotenv";
// import cors from "cors";
// import routers from "./routes/route.js";

// dotenv.config();
// const app = express();

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// dbCon();
// app.use(express.json());
// // app.use(cors());

// app.use("/api", routers);
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from this origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
//   credentials: true, // Allow credentials if needed
// }));

// app.use('/uploads', express.static('uploads'));

// app.listen(process.env.PORT, () => {
//   console.log("running");
// });


import express from "express";
import dbCon from "./utlis/db.js";
import dotenv from "dotenv";
import cors from "cors";
import routers from "./routes/route.js";

dotenv.config();
const app = express();

// Database connection
dbCon();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use("/api", routers);

app.use('/uploads', express.static('uploads'));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
