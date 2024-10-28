const {Schema} = require('mongoose');
const Model = require('mongoose').model;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  profileImageUrl:  {type: String, default: '/images/profile.jpg'},
  role: {type: String, enum: ["USER", "ADMIN"], default: "USER"}
}, {timestamps: true});





// This is a virtual function that will be used to compare the password entered by the user with the hashed password stored in the database. It will return an object with two properties: passwordMatched and user. The passwordMatched property will be a boolean value that will be true if the password entered by the user matches the hashed password stored in the database, and false otherwise. The user property will be the user object retrieved from the database.
userSchema.static('matchPassword', async function(email, password){
  const user = await this.findOne({email});
  if(!user){
    throw new Error('User Not Found!');
  }
  const passwordMatched = await bcrypt.compare(password, user.password);

  if(!passwordMatched){
    throw new Error('Invalid credentials');
  }

  return {passwordMatched, user};
});



const UserModel = new Model('user', userSchema);


module.exports = UserModel;