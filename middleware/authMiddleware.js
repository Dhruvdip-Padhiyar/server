const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //veryfy token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user form tokem
      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No token provided");
  }
});

module.exports = { protect };
