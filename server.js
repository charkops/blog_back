const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

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


// Server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});