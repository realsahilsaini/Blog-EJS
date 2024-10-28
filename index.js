const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const connectToMongoDB = require('./models/connectDB');
require('dotenv').config();
const userRouter = require('./routes/user');
const PORT = process.env.PORT || 3000;


connectToMongoDB();

app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('home');
});





app.use('/user', userRouter);

app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}`);  
})