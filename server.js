const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");

const goalRoutes = require("./routes/goal.routes");

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", goalRoutes);

//error handling
app.use(errorHandler);

//server listen

const server = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

server();
