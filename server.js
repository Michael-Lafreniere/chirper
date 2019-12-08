const express = require('express');
const assert = require('assert');
const path = require('path');
//const mysql = require('mysql2');
const cors = require('cors');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { authenticateToken } = require('./authHelpers');
const { connectToDB, queryDB } = require('./dbAccess');

const app = express();
const filter = new Filter();

let users = [
  {
    username: 'Mike',
    title: 'Post 1'
  },
  {
    username: 'Steve',
    title: 'Post 2'
  }
];

const {
  NODE_ENV,
  HOST,
  PORT,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD,
  RATE_MSG_PER,
  RATE_TIME_BETWEEN_MSGS
} = process.env;

// Verify we have all the data from the .env file we need:
assert(NODE_ENV, 'NODE_ENV value not found in .env file.');
assert(HOST, 'HOST value not found in .env file.');
assert(PORT, 'PORT value not found in .env file.');
assert(SQL_SERVER, 'SQL_SERVER value not found in .env file.');
assert(SQL_DATABASE, 'SQL_DATABASE value not found in .env file.');
assert(SQL_USER, 'SQL_USER value not found in .env file.');
assert(SQL_PASSWORD, 'SQL_PASSWORD value not found in .env file.');
assert(RATE_MSG_PER, 'RATE_MSG_PER value not found in .env file.');
assert(
  RATE_TIME_BETWEEN_MSGS,
  'RATE_TIME_BETWEEN_MSG value not found in .env file.'
);

//
// Setup the express server:
//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/public/views'));
app.use(cors());
app.use(express.json());

//
// Connect to MySQL DB:
//
// const connection = mysql.createConnection({
//   host: SQL_SERVER,
//   user: SQL_USER,
//   password: SQL_PASSWORD,
//   database: SQL_DATABASE
// });
// // Check the connection:
// connection.connect(error => {
//   if (error) throw error;
//   console.log(`Connected to ${SQL_DATABASE}`);
// });

connectToDB();

//
// Handle the default route:
//
app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/chirp', async (req, res) => {
  const query = 'SELECT * FROM user LIMIT 25';
  const results = await queryDB(query);
  //const { passwd } = results[0];
  //console.log(passwd);
  res.send(results);
});

app.get('/users', (req, res) => {
  res.send(users);
});

//
// Validates that a Chirp is properly formatted:
//
const isValidChirp = data => {
  if (
    data.name &&
    data.name.toString().trim() !== '' &&
    data.chirp &&
    data.chirp.toString().trim() !== ''
  ) {
    return true;
  }
  return false;
};

//
// Rate limit posts:
//
// app.use(
//   rateLimit({ windowMs: RATE_TIME_BETWEEN_MSGS * 1000, max: RATE_MSG_PER })
// );

app.post('/chirp', authenticateToken, (req, res) => {
  if (isValidChirp(req.body)) {
    const chirp = {
      user_id: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString())
    };

    // const query = `INSERT INTO chirps (name, post) VALUES ('${chirp.name}', '${chirp.post}');`;
    // queryDB(query) => {
    //   if (err !== null) {
    //     console.log('error:', err);
    //   }
    // });

    req.setTimeout(0);
    res.status(200).json(chirp);
  } else {
    res.status(422).send({ message: 'Requires a name and a message.' });
  }
});

//
// Error handing needs to be after routes:
//
app.get('*', function(req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
  err.statusCode = 404;
  err.shouldRedirect = true; //New property on err so that our middleware will redirect
  next(err);
});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err

  if (err.shouldRedirect) {
    res.render('error', { status: err.statusCode, message: err.message }); // Renders a myErrorPage.html for the user
  } else {
    res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
  }
});

//
// Start the server:
//
app.listen(PORT, HOST, () => {
  console.log(`chirpServer listening on ${HOST}:${PORT}`);
});
