const express = require("express");
const route = express.Router();

const userController = require("../controllers/user.controller");
const { protect } = require("../middleware/authMiddleware");

const basePath = "/api/v1/users";

route.get(`${basePath}/user`, protect, userController.getUser);
route.post(`${basePath}/create`, userController.createUser);
route.post(`${basePath}/login`, userController.loginUser);
route.put(`${basePath}/update/:id`, userController.updateUser);
route.delete(`${basePath}/delete/:id`, userController.deleteUser);

module.exports = route;
