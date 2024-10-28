const validateToken = require('../utils/validateToken');

function checkForAuthenticationCookie(cookieName) {

  return (req, res, next) => {
    if (!req.cookies[cookieName]) {
      return next();
    } 

    try{
      const userPayload = validateToken(req.cookies[cookieName]);
      req.user = userPayload;
    }catch(err){
      console.log(err);
    }

    return next();
  }
  
}


module.exports = checkForAuthenticationCookie;