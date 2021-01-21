
const db = require('../models');

exports.getBlog = (req, res) => {
  // Is user authorized for this req ?

  // For now he is anyway
  const blog_id = req.params.blog_id;
  db.Blogs.findOne({
    where: { blog_id }
  })
  .then(blog => {
    res.send(blog);
    return;
  })
  .catch(err => {
    res.status(500).send({
      message: 'An error occured while retrieving blog from db'
    });
    return;
  })
};

// Return all categories belonging to one blog
exports.getCategories = (req, res) => {
  // Is user authorized for this req ?

  // For now he is 
  const blog_id = req.body.blog_id;
  if (!blog_id) {
    res.status(400).send({
      message: 'No blog_id provided'
    });
    return;
  }

  const Categories = db.Categories;
  Categories.findAll({
    where: { blog_id }
  })
  .then(categories => {
    res.send(categories);
    return;
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({
      message: 'An error occured while retrieving categories from db'
    });
    return;
  });
};