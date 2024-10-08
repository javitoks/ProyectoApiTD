const verifyToken = (req, res, next) => {
  const token = req.header.authorization;
  next();
};

module.exports = verifyToken;