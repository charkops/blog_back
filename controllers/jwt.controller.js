const jwt = require('jsonwebtoken');
const db = require('../controllers/db.controller');
const Users = require('../models/Users.model.js')(db.sequelize, db.Sequelize);

// If login is successfull, we should return a user object
// With the email and the jwt token attached
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    res.status(400).send({
      message: 'email is empty'
    });
    return;
  }

  if (!password) {
    res.status(400).send({
      message: 'password is empty'
    });
    return;
  }

  // Chech if a user exists with the given email,
  // and if it does check for password match
  // We sequelize.escape() to make sure no SQL Injection happens on our watch
  db.sequelize.query('select * from users where email = ' + db.sequelize.escape(email), { model: Users })
  .then(users => {
    for (let user of users) {
      // There shouldn't be more than 1 user with the same email
      // Cause we specify the unique email in registration (well, we don't but we should have if we did implement registration)
      if (user.password == password) {
        res.status(200).send({
          message: 'Success'
        });
        return;
      } else {
        res.status(404).send({
          message: 'Wrong password'
        });
        return;
      }
    }
    // If we reach this point we have an empty query
    res.status(404).send({
      message: `No user found with email: ${email}`
    });
    return;
  })
  .catch(err => {
    console.log('An error occured while quering users');
    console.log(err);
    res.status(404).send({
      message: 'Could not authenticate user'
    });
    return;
  });
};  