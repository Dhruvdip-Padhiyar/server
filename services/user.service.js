const userModel = require("../models/userModel");

/* ************************************************************************** */

const createUser = async (userBody) => {
  const user = userModel.create(userBody);
  return user;
};

/* ************************************************************************** */

const getUser = async (email) => {
  const filter = {
    email: email,
  };
  const user = userModel.findOne(filter);
  return user;
};
const findUserById = async (id) => {
  const user = userModel.findById(id).select("-password");
  return user;
};

/* ************************************************************************** */

const updateUser = async (userid, userBody) => {
  const filter = {
    _id: userid,
  };

  const user = await userModel.findOneAndUpdate(filter, userBody, {
    new: true,
  });
  return user;
};

/* ************************************************************************** */

const deleteUser = async (userid) => {
  const user = userModel.findByIdAndDelete(userid);
  return user;
};

/* ************************************************************************** */

module.exports = { createUser, getUser, findUserById, updateUser, deleteUser };
