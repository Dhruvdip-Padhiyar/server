const goalModel = require("../models/goal.model");

const createGoal = async (goalBody) => {
  const goal = goalModel.create(goalBody);
  return goal;
};

const getGoals = async (user) => {
  const goal = goalModel.find(user);
  return goal;
};

const updateGoal = async (goalId, goalBody) => {
  const filter = {
    _id: goalId,
  };

  const goal = await goalModel.findOneAndUpdate(filter, goalBody, {
    new: true,
  });
  return goal;
};

const deleteGoal = async (goalId) => {
  const goal = goalModel.findByIdAndDelete(goalId);
  return goal;
};

module.exports = { createGoal, getGoals, updateGoal, deleteGoal };
