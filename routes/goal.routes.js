const express = require("express");
const route = express.Router();

const goalController = require("../controllers/goal.controller");

const basePath = "/api/v1/goals";

route.get(`${basePath}/all`, goalController.getGoals);
route.post(`${basePath}/create`, goalController.createGoals);
route.put(`${basePath}/update/:id`, goalController.updateGoal);
route.delete(`${basePath}/delete/:id`, goalController.deleteGoal);

module.exports = route;
