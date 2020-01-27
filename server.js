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

//
// Get chrips, for those not logged in to see latest 'trending' chirps:
//
app.get('/chirp', async (req, res) => {
  const query = 'SELECT * FROM chirps LIMIT 25';
  const results = await queryDB(query);
  res.send(results);
});

//
//
//
app.post('/chirps', async (req, res) => {
  const maxRange = 25;
  let { start, end } = req.body;
  const askedRange = end - start;
  if (askedRange > maxRange) end = maxRange;

  // console.log('/chirps:');

  const hasUser = req.headers.authorization;
  if (hasUser) {
    authenticateToken(req, res, () => {
      // console.log('/chirps - user authenticated...');
    });
  }
  // console.log('/chirps - no user logged in...');
  // const joinQuery =
  //   'SELECT chirps.cid, chirps.content, chirps.num_rechirps, chirps.stars, chirps.reply_to, chirps.num_replies, chirps.created_on, chirps.star1, chirps.star2, chirps.image1, chirps.image2, chirps.image3, chirps.image4, user.display_name, user.handle, user.acct_verified, user.user_image, user.uid FROM chirps INNER JOIN user ON chirps.user_id=user.uid;';
  const query =
    'SELECT chirps.cid, chirps.content, chirps.num_rechirps, chirps.stars, chirps.reply_to, chirps.num_replies, chirps.created_on, chirps.star1, chirps.star2, chirps.image1, chirps.image2, chirps.image3, chirps.image4, user.display_name, user.handle, user.acct_verified, user.user_image, stars.sid FROM chirps INNER JOIN user ON chirps.user_id=user.uid LEFT OUTER JOIN stars ON chirps.user_id=stars.user_id AND chirps.cid=stars.chirp_id;';
  const results = await queryDB(query);
  res.send(results);
});

app.post('/chirp', authenticateToken, async (req, res) => {
  if (isValidChirp(req.body)) {
    const { content } = req.body;
    console.log('content:', content);
    const chirp = {
      content: filter.clean(content.substr(0, 255)),
      reply_to: req.body.reply_to,
      user_id: req.body.user_id,
      image: req.body.image,
      image1: req.body.image1,
      image2: req.body.image2,
      image3: req.body.image3
    };

    const newChirp = `INSERT INTO chirps (content, reply_to, user_id) VALUES ('${chirp.content}', '${chirp.reply_to}', '${chirp.user_id}');`;
    await queryDB(newChirp);

    req.setTimeout(0);
    res.status(200);
  } else {
    res.status(422).send({ message: 'Improperly formatted chrip' });
  }
});

app.post('/star', authenticateToken, async (req, res) => {
  const { chirp_id, user_id } = req.body;

  // Checks to see if the chirp exists.  Need to see if it's
  const chirpQuery = `SELECT * FROM chirps WHERE cid='${chirp_id}';`;
  const chirpExists = await queryDB(chirpQuery);
  if (chirpExists.length > 0) {
    // if the chirp exists, see if we liked it already...
    const starQuery = `SELECT * FROM stars WHERE chirp_id='${chirp_id}' AND user_id='${user_id}';`;
    const results = await queryDB(starQuery);

    if (results.length === 0) {
      // if not, like it and update the chirp's star count...
      const addStar = `INSERT INTO stars (chirp_id, user_id) VALUES (${chirp_id}, ${user_id});`;
      await queryDB(addStar);
      await queryDB(
        `UPDATE chirps SET stars = stars + 1 WHERE cid='${chirp_id}';`
      );
      res.status(200);
    } else {
      // otherwise, remove it and decrease the chirps star count...
      await queryDB(
        `DELETE FROM stars WHERE chirp_id='${chirp_id}' AND user_id='${user_id}';`
      );
      await queryDB(
        `UPDATE chirps SET stars = stars - 1 WHERE cid='${chirp_id}';`
      );
      res.status(200);
    }
  }
  res.status(422).json('error');
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
