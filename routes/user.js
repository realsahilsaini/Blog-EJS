const express = require('express');
const userRouter = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

userRouter.get('/signup', (req, res) => {
  res.render('signup');
});

userRouter.post('/signup', async (req, res) => {
  const {firstName, lastName, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  await newUser.save();

  return res.redirect('/user/signin');
});

userRouter.get('/signin', (req, res) => {
  res.render('signin');
});


userRouter.post('/signin', async (req, res) => {
  const {email, password} = req.body;

  const {passwordMatched, user} = await UserModel.matchPassword(email, password);


  if(!passwordMatched){
    return res.status(400).send('Invalid credentials');
  }

  console.log(user);


    res.redirect('/');
  
});



module.exports = userRouter;