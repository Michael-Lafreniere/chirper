const express = require('express');
const assert = require('assert');
const bcrypt = require('bcryptjs');
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

app.use(express.json());

connectToDB();

app.post('/create-user', async (req, res) => {
  const email = `SELECT * FROM user WHERE email_addr='${req.body.email}'`;
  const exists = await queryDB(email);
  if (exists[0] === undefined) {
    try {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = `INSERT INTO user (passwd, email_addr, phone_num, display_name, name, dob, location) VALUES ('${hashedPass}', '${req.body.email}', '${req.body.phone_num}', '${req.body.display_name}', '${req.body.name}', '${req.body.dob}', '${req.body.location}');`;
      await queryDB(newUser);
      req.setTimeout(0);
      res.status(201).send();
    } catch {
      res.status(500).send();
    }
  } else {
    res.send('already exists.');
  }
});

app.post('/user-login', async (req, res) => {
  const email = req.body.email;
  const query = `SELECT * FROM user WHERE email_addr='${email}';`;
  const results = await queryDB(query);
  if (results[0] !== undefined) {
    const { passwd } = results[0];

    try {
      bcrypt.compare(req.body.password, passwd, (err, result) => {
        if (result) {
          const user = { name: 'Mike' };
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          refreshTokens.push(refreshToken);
          res.json({ accessToken, refreshToken });
        } else {
          res.status(401).send(`Invalid email or password.`);
        }
      });
    } catch {
      res.status(500).send('Failed.');
    }
  } else {
    res.send('Invalid email or password.');
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
