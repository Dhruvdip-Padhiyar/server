const asyncHandler = require("express-async-handler");
const goalService = require("../services/goal.service");

//@desc    get goals
//@route   GET /api/goals
//@access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalService.getGoals();
  res.status(200).json(goals);
});

//@desc    set goals
//@route   POST /api/goals/create
//@access  Private
const createGoals = asyncHandler(async (req, res) => {
  const goalBody = req.body;
  const goal = await goalService.createGoal(goalBody);

  if (!goalBody) {
    res.status(400);
    throw new Error("Goal is required");
  }
  res.status(201).json(goal);
});

//@desc    update goal
//@route   GET /api/goals/goal/:id
//@access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await goalService.updateGoal(goalId, req.body);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  res.status(200).json(goal);
});

//@desc    delete goal
//@route   DELETE /api/goals/goal/:id
//@access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await goalService.deleteGoal(goalId);
  res.status(200).json(goal);
});

module.exports = { getGoals, createGoals, updateGoal, deleteGoal };
