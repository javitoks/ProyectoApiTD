const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const token = req.header(authorization) && req.header('Authorization').split(" ")[1]; //revisar bien de que se trata esto
  if (!token) {
    return res.status(404).send('Token requerido');
    
  }
jwt.verify(token, "my_secret_key", (error, decode)=> {
  if(err){
    return res.status(401).send('Token invalido');
  }
  req.user = decode
  next();
})
};

module.exports = verifyToken;