const jwtcontroller = require('../controllers/jwt.controller');

module.exports = (app) => {
  app.get('/users', (req, res) => {
    res.status(200).send({
      message: 'Hello ?'
    });
  });

  app.post('/users/login', jwtcontroller.login);
};