const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const connectToMongoDB = require('./models/connectDB');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const checkForAuthenticationCookie = require('./middlewares/authentication');
const PORT = process.env.PORT || 3000;


const BlogModel = require('./models/blog');



connectToMongoDB();

app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());;
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(checkForAuthenticationCookie('token'))


app.get('/', async (req, res) => {

  const allBlogs = await BlogModel.find({}).sort('-createdAt').populate('createdBy');


  res.render('home', {
    user: req.user,
    blogs: allBlogs
  });
});





app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}`);  
})