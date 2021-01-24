
module.exports = basicAuth;

const jwtcontroller = require('../controllers/jwt.controller');

// Basic authentication middleware
async function basicAuth (req, res, next) {
  // Check for header
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'Missing authorization header'
    });
  }

  // Verify auth credentials
  const token = req.headers.authorization.split(' ')[1];
  if (!jwtcontroller.verifyToken(token)) {
    return res.status(401).send({
      message: 'User is not authorized for this action'
    });
  }

  next();
}