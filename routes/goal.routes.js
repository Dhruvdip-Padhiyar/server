const express = require("express");
const route = express.Router();

const goalController = require("../controllers/goal.controller");
const { protect } = require("../middleware/authMiddleware");

const basePath = "/api/v1/goals";

route.get(`${basePath}/all`, protect, goalController.getGoals);
route.post(`${basePath}/create`, protect, goalController.createGoals);
route.put(`${basePath}/update/:id`, protect, goalController.updateGoal);
route.delete(`${basePath}/delete/:id`, protect, goalController.deleteGoal);

module.exports = route;
