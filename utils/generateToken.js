const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


function generateToken(user){
  const payload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role
  }

  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}


module.exports = generateToken;


