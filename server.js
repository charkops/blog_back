const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const Sequelize = require('sequelize');
const dbConfig = require('./config/database.config');

const PORT = 3003;

// Config Body-parser
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Config morgan
app.use(morgan('dev'));

// Config cors, NOTE (@charkops, @SGA): This ofc should NOT be in a production build,
// however for the sake of time (and my sanity) i am going to use it in this 'test' app
app.use(cors());

// DB 
// NOTE (@charkops): Move this to its own module
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT
});
sequelize.sync({
  force: true
}).then(() => {
  console.log('Successfully Synced to DB');
}).catch((error) => {
  console.log('Could not connect to DB');
});

// Server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});