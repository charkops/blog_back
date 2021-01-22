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

  app.post('/categories', dbcontroller.getCategories);

  // Get all post belonging to a specific category
  // app.get('/posts/:category_id', dbcontroller.getPostsFromCategory);

  app.get('/posts/:post_id', dbcontroller.getPost);
};