const userService = require("../services/user.service");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

/* ******************************************************************************* */
//@desc    create user / register user
//@route   POST /api/users/create
//@access  public
const createUser = asyncHandler(async (req, res) => {
  const userBody = req.body;

  if (!userBody.name || !userBody.email || !userBody.password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  // check if user exists
  const userExists = await userService.getUser(userBody.email);
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //hash password
  const hashedPassword = await bycrypt.hash(userBody.password, 12);
  const user = await userService.createUser({
    ...userBody,
    password: hashedPassword,
  });
  if (!user) {
    res.status(400);
    throw new Error("Invalid data");
  }
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    tokem: generateToken(user._id),
  });
});

/* ******************************************************************************* */

//@desc    Authenticate user
//@route   POST /api/users/login
//@access  public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUser(email);
  const matchedPassword = await bycrypt.compare(password, user.password);
  if (!user || !matchedPassword) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  res.status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    tokem: generateToken(user._id),
  });
});

/* ******************************************************************************* */

//@desc    get users
//@route   GET /api/users/me
//@access  private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await userService.findUserById(req.user.id);
  res.status(200).send({ _id, name, email });
});

/* ******************************************************************************* */

//@desc    update user
//@route   PUT /api/users/create
//@access  public
const updateUser = asyncHandler(async (req, res) => {
  const userID = req.params.id;
  const userBody = req.body;
  const user = await userService.updateUser(userID, userBody);
  res.status(201).send(user);
});

/* ******************************************************************************* */

//@desc    delete user
//@route   POST /api/users/create
//@access  public
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await userService.deleteUser(userId);
  res.status(201).send(user);
});

/* ******************************************************************************* */

// Generate JWT

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = { createUser, loginUser, getUser, updateUser, deleteUser };
