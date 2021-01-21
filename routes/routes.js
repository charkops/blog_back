const jwtcontroller = require('../controllers/jwt.controller');
const dbcontroller = require('../controllers/db.controller');

module.exports = (app) => {
  app.get('/users', (req, res) => {
    res.status(200).send({
      message: 'Hello ?'
    });
  });

  app.post('/users/login', jwtcontroller.login);

  app.get('/blogs/:blog_id', dbcontroller.getBlog);
  app.get('/categories', dbcontroller.getCategories);
};