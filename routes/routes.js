const jwtcontroller = require('../controllers/jwt.controller');
const dbcontroller = require('../controllers/db.controller');

module.exports = (app) => {
  // app.get('/users', (req, res) => {
  //   res.status(200).send({
  //     message: 'Hello ?'
  //   });
  // });

  app.post('/users/login', jwtcontroller.login);

  app.get('/blogs/:blog_id', dbcontroller.getBlog);

  app.get('/categories/:category_id', dbcontroller.getCategory);  
  app.post('/categories', dbcontroller.getCategories);

  // Get all post belonging to a specific category
  // Standalone getter
  // NOTE (@charkops): Check up on REST best practices, this doesn't feel right
  app.get('/postsFromCategory/:category_id', dbcontroller.getPostsFromCategory);

  app.get('/posts/:post_id', dbcontroller.getPost);
  
  // Create new post
  app.post('/posts', dbcontroller.createPost);
  // Delete a post
  app.delete('/posts/:post_id', dbcontroller.deletePost);

  app.get('/posts/all/:blog_id', dbcontroller.getAllPosts);
};