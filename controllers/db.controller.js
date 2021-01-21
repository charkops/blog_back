
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