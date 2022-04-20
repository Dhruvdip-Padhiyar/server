const asyncHandler = require("express-async-handler");
const goalService = require("../services/goal.service");
const userService = require("../services/user.service");

/* ************************************************************************** */

//@desc    get goals
//@route   GET /api/goals
//@access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalService.getGoals({ user: req.user.id });
  res.status(200).json(goals);
});

/* ************************************************************************** */

//@desc    set goals
//@route   POST /api/goals/create
//@access  Private
const createGoals = asyncHandler(async (req, res) => {
  const goal = await goalService.createGoal({
    text: req.body.text,
    user: req.user.id,
  });
  if (!goal) {
    res.status(400);
    throw new Error("Goal is required");
  }
  res.status(201).json(goal);
});

/* ************************************************************************** */

//@desc    update goal
//@route   GET /api/goals/goal/:id
//@access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const user = await userService.findUserById(req.user.id);
  const goal = await goalService.updateGoal(goalId, req.body);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  //match goal user to logged in user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(goal);
});

/* ************************************************************************** */

//@desc    delete goal
//@route   DELETE /api/goals/goal/:id
//@access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const user = await userService.findUserById(req.user.id);
  const goal = await goalService.deleteGoal(goalId);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //match goal user to logged in user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(goal);
});

module.exports = { getGoals, createGoals, updateGoal, deleteGoal };
