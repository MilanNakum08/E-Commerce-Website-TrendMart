// const express=require('express')
// const colors=require("colors")
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"; //es6 syntax
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// configure Dotenv
dotenv.config();

// database configuration
connectDB();

// es module fix
const __filename =fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
// rest object
const app = express();

//middlewares : morgan for logging HTTP requests and express.json for parsing JSON request bodies.
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
//app.use() method is used to mount middleware functions
app.use("/api/v1/auth", authRoutes); //any routes defined in authRoutes will be accessible under the /api/v1/auth prefix.
//In Express.js, a router is a mechanism to handle different HTTP requests at different URL paths.
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//static files
app.use(express.static(path.join(__dirname, "./client/build"))); // use build folder from client -configure

//rest  api -- is a software architectural style for designing networked applications.

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to E commerce Website...</h1>");
// });

app.get("*", function (req, res) {
  // access
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//PORT
const PORT = process.env.PORT || 8080;

//run listen
//This line starts an Express.js server listening on the specified port (PORT).
//When a client makes a request to this port, Express.js will handle it according to the defined routes and middleware.
app.listen(PORT, () => {
  console.log(
    `server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
