const jwt = require('jsonwebtoken');

// If login is successfull, we should return a user object
// With the email and the jwt token attached
exports.login = (req, res) => {

  res.status(200).send({
    message: 'successfull ?'
  });
};