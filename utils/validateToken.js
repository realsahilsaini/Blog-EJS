const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


function validateToken(token){

  const payload = jwt.verify(token, SECRET_KEY);

  return payload;
}


module.exports = validateToken;





