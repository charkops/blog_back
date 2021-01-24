const jwtcontroller = require('../controllers/jwt.controller');
const dbcontroller = require('../controllers/db.controller');

const basicAuth = require('../middlewares/auth.middleware');

module.exports = (app) => {

  // User login, returns the currentUser with the jwt token attached
  app.post('/users/login', jwtcontroller.login);

  // User authentication for all the rest
  app.use(basicAuth);

  // DEPRECATED(@charkops): Honestly, we can remove this
  app.post('/users/validate', jwtcontroller.validateUser);

  // Returns the blog with blod_id
  app.get('/blogs/:blog_id', dbcontroller.getBlog);

  // Returns a category
  app.get('/categories/:category_id', dbcontroller.getCategory);  
  app.post('/categories', dbcontroller.getCategories);

  // Get all post belonging to a specific category
  // Standalone getter
  // NOTE (@charkops): Check up on REST best practices, this doesn't feel right
  app.get('/postsFromCategory/:category_id', dbcontroller.getPostsFromCategory);

  // Returns a post with a specific post_id
  app.get('/posts/:post_id', dbcontroller.getPost);
  
  // Create new post
  app.post('/posts', dbcontroller.createPost);
  // Delete a post
  app.delete('/posts/:post_id', dbcontroller.deletePost);

  // Get all posts in blog with blog_id
  // TODO (@charkops): Limit to 10 posts with descending date order
  app.get('/posts/all/:blog_id', dbcontroller.getAllPosts);
};