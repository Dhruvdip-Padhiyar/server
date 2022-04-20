const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const goalRoutes = require("./routes/goal.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", goalRoutes);
app.use("/", userRoutes);

//error handling
app.use(errorHandler);
//console.log("************", errorHandler);
//server listen

const server = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.cyan.bold);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
