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
  RATE_MSG_PER,
  RATE_TIME_BETWEEN_MSGS
} = process.env;

// Verify we have all the data from the .env file we need:
assert(NODE_ENV, 'NODE_ENV value not found in .env file.');
assert(HOST, 'HOST value not found in .env file.');
assert(PORT, 'PORT value not found in .env file.');
assert(RATE_MSG_PER, 'RATE_MSG_PER value not found in .env file.');
assert(
  RATE_TIME_BETWEEN_MSGS,
  'RATE_TIME_BETWEEN_MSG value not found in .env file.'
);

//
// Setup the express server:
//
//app.set('view engine', 'ejs');
app.use(cors());
// if (NODE_ENV === 'production') {
//   app.set(express.static(path.join(__dirname, '/client/build')));
// } else {
//   const p = path.join(__dirname, '/client/public/');
//   console.log(p);
//   app.set(express.static(p));
// }
app.use(express.json());

//
// Establish a connection to the DB:
//
connectToDB();

//
// Get chrips, for those not logged in to see latest 'trending' chirps:
//
app.get('/chirp', async (req, res) => {
  const query = 'SELECT * FROM chirps LIMIT 25';
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
    data.content &&
    data.content.toString().trim() !== '' &&
    data.user_id &&
    data.user_id.toString().trim() !== ''
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

app.post('/chirp', authenticateToken, async (req, res) => {
  if (isValidChirp(req.body)) {
    const chirp = {
      content: filter.clean(req.body.content.toString()),
      reply_to: req.body.reply_to,
      user_id: req.body.user_id,
      image: req.body.image.toString(),
      image1: req.body.image1.toString(),
      image2: req.body.image2.toString(),
      image3: req.body.image3.toString()
    };

    const newChirp = `INSERT INTO chirps (content, reply_to, user_id) VALUES ('${chirp.content}', '${chirp.reply_to}', '${chirp.user_id}');`;
    await queryDB(newChirp);

    req.setTimeout(0);
    res.status(200).json(chirp);
  } else {
    res.status(422).send({ message: 'Improperly formatted chrip' });
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
