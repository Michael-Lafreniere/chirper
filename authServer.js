const express = require('express');
const assert = require('assert');
const bcrypt = require('bcryptjs');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
require('dotenv').config();

const { connectToDB, queryDB } = require('./dbAccess');

const {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken
} = require('./authHelpers');

const app = express();

let refreshTokens = [];
let users = [
  {
    username: 'Mike',
    password: '12345'
  }
];

const {
  NODE_ENV,
  AUTH_HOST,
  AUTH_PORT,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD,
  RATE_MSG_PER,
  RATE_TIME_BETWEEN_MSGS
} = process.env;

// Verify we have all the data from the .env file we need:
assert(NODE_ENV, 'NODE_ENV value not found in .env file.');
assert(AUTH_HOST, 'HOST value not found in .env file.');
assert(AUTH_PORT, 'PORT value not found in .env file.');
assert(SQL_SERVER, 'SQL_SERVER value not found in .env file.');
assert(SQL_DATABASE, 'SQL_DATABASE value not found in .env file.');
assert(SQL_USER, 'SQL_USER value not found in .env file.');
assert(SQL_PASSWORD, 'SQL_PASSWORD value not found in .env file.');
assert(RATE_MSG_PER, 'RATE_MSG_PER value not found in .env file.');
assert(
  RATE_TIME_BETWEEN_MSGS,
  'RATE_TIME_BETWEEN_MSG value not found in .env file.'
);

app.use(cors());
app.use(express.json());

connectToDB();

app.post('/create-user', async (req, res) => {
  const email = `SELECT * FROM user WHERE email_addr='${req.body.email}'`;
  const exists = await queryDB(email);
  if (exists[0] === undefined) {
    try {
      // console.log(req.body);
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const convertedDate = new Date(req.body.dob)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      const newUser = `INSERT INTO user (passwd, email_addr, phone_num, display_name, name, dob, location, handle) VALUES ('${hashedPass}', '${req.body.email}', '${req.body.phone_num}', '${req.body.display_name}', '${req.body.name}', '${convertedDate}', '${req.body.location}', '${req.body.handle}');`;
      const rows = await queryDB(newUser);

      req.setTimeout(0);
      // if (result !== null && result.ResultSetHeader.insertId > 0) {
      console.log('new user created:', req.body.handle);
      res.status(201).send({ message: 'successful' });
      // } else {
      //   console.log('Failed to create new user.');
      //   req.send({ message: result });
      // }
    } catch (error) {
      // console.log('The error:', error);
      res.status(500).send({ message: 'internal error.', error });
    }
  } else {
    res.send({ message: 'already exists.' });
  }
});

app.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  if (email !== undefined || email !== null) {
    try {
      const query = `SELECT * FROM user WHERE email_addr='${email}';`;
      const results = await queryDB(query);
      if (results[0] === undefined) res.send({ message: 'does not exist' });
      else res.send({ message: 'exists' });
    } catch {
      res.status(500).send({ message: 'Improperly formatted request.' });
    }
  }
});

app.get('/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  if (handle !== undefined) {
    try {
      const query = `SELECT * FROM user WHERE handle='${handle}';`;
      const results = await queryDB(query);
      if (results[0] === undefined) res.send({ message: 'does not exist' });
      else res.send({ message: 'exists' });
    } catch {
      res.status(500).send({ message: 'Improperly formatted request.' });
    }
  }
});

app.post('/user-login', async (req, res) => {
  let { account, password } = req.body;
  let accountType = 'email_addr';
  if (account && account[0] === '@') {
    accountType = 'handle';
    account = account.substr(1);
  }
  console.log(account, password);
  const query = `SELECT * FROM user WHERE ${accountType}='${account}';`;
  const results = await queryDB(query);
  if (results[0] !== undefined) {
    const { passwd } = results[0];

    try {
      bcrypt.compare(password, passwd, (err, result) => {
        if (result) {
          const user = {
            id: results[0].uid,
            handle: results[0].handle,
            displayName: results[0].display_name,
            userImage: results[0].user_image,
            userSince: results[0].created_on,
            totalChirps: results[0].total_chirps,
            verified: results[0].acct_verified
          };
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          refreshTokens.push(refreshToken);
          res.json({ message: 'successful', accessToken, refreshToken, user });
          // res.cookie('token', token, { httpOnly: true })
          //   .sendStatus(200);
        } else {
          console.log('Could not retrieve data');
          res.status(401).send({ message: 'Could not retrieve data' });
        }
      });
    } catch {
      console.log('failed.');
      res.status(500).send('Failed.');
    }
  } else {
    console.log('Incorrect email or password.');
    res.send({ message: 'Incorrect email or password.' });
  }
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  verifyRefreshToken(refreshTokens, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204);
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
app.listen(AUTH_PORT, AUTH_HOST, () => {
  console.log(`authServer listening on ${AUTH_HOST}:${AUTH_PORT}`);
});
