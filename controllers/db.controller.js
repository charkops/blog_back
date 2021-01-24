
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

function grabCategories(blog_id) {
  return db.Categories.findAll({
    where: {
      blog_id
    }
  });
}

// Return all categories belonging to one blog
// NOTE (@charkops): Refactor using grabCategories
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

function grabPost(post_id) {
  return db.Posts.findOne({
    where: {
      post_id
    }
  });
}

// NOTE (@charkops, @SGA): I apologize in advance for this code mess,
// got a bit frustrated with errors so i had to result in this async - await hell :-(
// I promise i clean up when i get the time :)
exports.getPostsFromCategory = async (req, res) => {
  // Is the user authorized for this ?

  let posts = [];

  // Get the category id, then get every post_id belonging to this specific category_id
  // Get said post from db, put it in an array ('posts') and send it back
  const category_id = req.params.category_id;
  await db.CategoryPosts.findAll({
    where: { category_id }
  }).then(async catposts => {
    for (let catpost of catposts) {
      const post_id = catpost.post_id;
      await grabPost(post_id)
      .then(post => {
        posts.push(post);
      }).catch(err => {
        res.send({
          message: 'An error occured while retrieving posts'
        });
        return;
      })
    }
  }).catch(err => {
    console.log('An error occured while retrieving posts (category_id)');
    res.send({
      message: 'An error occured while retrieving posts (category_id)'
    })
    return;
  })

  res.send({
    posts
  })
  return;
};

// Return a single post from db
exports.getPost = (req, res) => {

  // Is user authorized for this operation ?


  // For now he is
  const post_id = req.params.post_id;
  if (!post_id) {
    res.status(400).send({
      message: 'No post_id provided'
    });
    return;
  }

  grabPost(post_id)
  .then(post => {
    res.send({ post });
    return;
  })
  .catch(err => {
    console.log('An error occured while retrieving post');
    console.log(err);
    res.status(500).send({
      message: 'An error occured while retrieving post'
    });
    return;
  });
};

// Returns all posts from a blog
// NOTE (@charkops): Refactor this, as well as getPostsFromCategory to use the same function
exports.getAllPosts = async (req, res) => {
  // Is user authorized for this req ?

  // For now he is
  const blog_id = req.params.blog_id;
  if (!blog_id) {
    res.status(400).send({
      message: 'No blog_id provided'
    });
    return;
  }

  // Get all categories for blog_id
  grabCategories(blog_id)
  .then(async categories => { 
    // For each category get posts belonging to that category
    let posts = [];
    for (let category of categories) {
      const category_id = category.category_id;
      
      await db.CategoryPosts.findAll({
        where: { category_id }
      }).then(async catposts => {
        for (let catpost of catposts) {
          const post_id = catpost.post_id;
          await grabPost(post_id)
          .then(post => {
            posts.push(post);
          })
        }
      }).catch(err => {
        res.send({
          message: 'An error occured while retrieving posts (getAllPosts)'
        })
        return;
      });
    }

    res.send({
      posts
    })
    return;
  })
  .catch(err => {
    console.log('Something went wrong when retrieving categories')
    console.log(err);
    res.status(500).send({
      message: 'An error occured while retrieving categories from db (getAllPosts)'
    });
    return;
  })
};

// Returns the category with specific category_id
exports.getCategory = (req, res) => {
  // NOTE (@charkops): Is user authorized for this req ?
  // This req should be available to everybody right ?

  const category_id = req.params.category_id;
  if (!category_id) {
    res.status(400).send({
      message: 'No category_id provided'
    });
    return;
  }

  // Grab category from db
  db.Categories.findOne({
    where: { category_id }
  })
  .then(category => {
    res.send({
      category
    })
    return;
  })
  .catch(err => {
    console.log('An error occured while trying to retrieve category from db');
    console.log(err);
    res.status(500).send({
      message: 'An error occured while trying to retrieve category from db'
    });
    return;
  })
};

exports.createPost = (req, res) => {
  // NOTE (@charkops): Is user authorized for this req ?

  // For now he is
  // Extract info from body
  const category_id = req.body.category_id;
  if (!category_id) {
    res.status(400).send({
      message: 'No category_id found in body'
    });
    return;
  }

  const title = req.body.title;
  if (!title) {
    res.status(400).send({
      message: 'No title found in body'
    });
    return;
  }

  const content = req.body.content;
  if (!content) {
    res.status(400).send({
      message: 'No content found in body'
    });
    return;
  }

  // Actually create post
  // Create post entry
  db.Posts.create({
    title,
    content
  })
  .then(post => {
    if (post) {
      // Create categoryPost entry
      // NOTE (@charkops): Should also check for this success
      db.CategoryPosts.create({
        category_id,
        post_id: post.post_id
      });
      res.send({ post });
      return;
    } else {
      res.status(500).send({
        message: 'Could not create post'
      });
      return; 
    }
  });
};

// Deletes a post
exports.deletePost = async (req, res) => {

  // Is user authorized for this req ?

  // For now he is 

  // Get post_id from params
  const post_id = req.params.post_id;
  console.log(req.params)
  if (!post_id) {
    res.status(404).send({
      message: 'No post_id found in params'
    });
    return;  
  }

  // Find categories this post belongs to
  let categories_id = [];
  await db.CategoryPosts.findAll({
    where: {
      post_id
    }
  }).then(cateposts => {
    for (let catpost of cateposts) {
      categories_id.push(catpost.category_id);
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send({
      message: 'Could not delete post'
    });
  });

  // For each category, delete post
  for (let category_id of categories_id) {
    db.CategoryPosts.destroy({
      where: {
        category_id,
        post_id
      }
    }).then(info => {
      // Also delete post
      db.Posts.destroy({
        where: {
          post_id
        }
      })
      .then(mess => {
        res.status(200).send({
          message: mess | 'ok'
        });
        return;
      })
      .catch(err => {
        console.log('An error occured while deleting post (categoriespost)');
        console.log(err);
        res.status(500).send({
          message: 'An error occured while deleting post (categoriespost)'
        });
      });
    })
    .catch(err => {
      console.log('An error occured while deleting post');
      console.log(err);
      res.status(500).send({
        message: 'An error occured while deleting post'
      });
      return;
    });
  }
}