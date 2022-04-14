const asyncHandler = require("express-async-handler");

//@desc    get goals
//@route   GET /api/goals
//@access  Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
});

//@desc    set goals
//@route   POST /api/goals/create
//@access  Private
const setGoals = asyncHandler(async (req, res) => {
  const goal = req.body.text;

  if (!goal) {
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
  res.status(200).json({ message: "Update goal" });
});

//@desc    delete goal
//@route   DELETE /api/goals/goal/:id
//@access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  res.status(200).json({ message: "Delete goal" });
});

module.exports = { getGoals, setGoals, updateGoal, deleteGoal };
