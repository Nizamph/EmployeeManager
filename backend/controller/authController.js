const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Complete the form and submit');
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    res.send({ ErrorMessage: 'user already exist' });
    throw new Error('User is already exist');
  }

  const usersData = await User.create({
    name: name,
    email: email,
    password: password,
  });

  // console.log('usersData', usersData);

  if (usersData) {
    res.status(201);
    res.json({
      userId: usersData._id,
      name: usersData.name,
      email: usersData.email,
      token: generateToken(usersData._id),
    });
  } else {
    res.status(400);
    throw new Error('registration failed');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('email', email);
  console.log('password', password);
  const userExist = await User.findOne({ email });
  console.log('existedUser', userExist);
  if (userExist && (await userExist.matchPassword(password))) {
    console.log('find the user');
    res.json({
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(400);
    res.send({ ErrorMessage: 'userNot found please regiester first' });
    throw new Error('userNot found please regiester first');
  }
});

module.exports = { RegisterUser, authUser };
