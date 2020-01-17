const assert = require('assert');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

assert(
  ACCESS_TOKEN_SECRET,
  'ACCESS_TOKEN_SECRET value not found in .env file.'
);
assert(
  REFRESH_TOKEN_SECRET,
  'REFRESH_TOKEN_SECRET value not found in .env file.'
);

exports.authenticateToken = (req, res, next) => {
  // console.log('authenticateToken(), headers:', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      console.log('authenticateToken()', err);
      return res.sendStatus(403);
    }
    req.data = data;
    console.log('verified');
    next();
  });
};

exports.verifyRefreshToken = (token, fn) => {
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, fn);
};

exports.generateAccessToken = data => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
};

exports.generateRefreshToken = data => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
};
