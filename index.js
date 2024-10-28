const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const connectToMongoDB = require('./models/connectDB');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRouter = require('./routes/user');
const checkForAuthenticationCookie = require('./middlewares/authentication');
const PORT = process.env.PORT || 3000;



connectToMongoDB();

app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))


app.get('/', (req, res) => {
  res.render('home', {user: req.user});
});





app.use('/user', userRouter);

app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}`);  
})