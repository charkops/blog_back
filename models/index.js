const dbConfig = require('../config/database.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sync = (forceSync) => {
  return sequelize.sync({
    force: forceSync
  })
};

db.Users = require('./Users.model')(sequelize, Sequelize);
db.Blogs = require('./Blogs.model')(sequelize, Sequelize);
db.Categories = require('./Categories.model')(sequelize, Sequelize);


// Define 1 - 1 relationship between users - blogs
db.Blogs.hasOne(db.Users, {
  foreignKey: 'blog_id'
});
db.Users.belongsTo(db.Blogs);

// Define 1 - many relationship between blogs - categories
db.Blogs.hasMany(db.Categories, {
  foreignKey: 'blog_id'
});


module.exports = db;
