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

db.Blogs.hasOne(db.Users, {
  foreignKey: 'blog_id'
});
db.Users.belongsTo(db.Blogs);

module.exports = db;
