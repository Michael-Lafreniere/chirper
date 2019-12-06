const express = require('express');
const assert = require('assert');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const {
  NODE_ENV,
  HOST,
  PORT,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD,
  RATE_MSG_PER,
  RATE_TIME_BETWEEN_MSGS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
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
assert(
  ACCESS_TOKEN_SECRET,
  'ACCESS_TOKEN_SECRET value not found in .env file.'
);
assert(
  REFRESH_TOKEN_SECRET,
  'REFRESH_TOKEN_SECRET value not found in .env file.'
);

//
// Setup the express server:
//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/public/views'));
app.set('port', PORT);
app.use(cors());
app.use(express.json());

//
// Connect to MySQL DB:
//
const connection = mysql.createConnection({
  host: SQL_SERVER,
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DATABASE
});
// Check the connection:
connection.connect(error => {
  if (error) throw error;
  console.log(`Connected to ${SQL_DATABASE}`);
});

//
// Handle the default route:
//
app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/chirp', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM chirp LIMIT 25';
  connection.query(query, (err, results) => {
    res.json(results);
  });
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

app.post('/chirp', (req, res) => {
  if (isValidChirp(req.body)) {
    const chirp = {
      name: filter.clean(req.body.name.toString()),
      post: filter.clean(req.body.chirp.toString()),
      //ip: req.ip.toString(),
      date: new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    };

    const query = `INSERT INTO chirp (name, post, date) VALUES ('${chirp.name}', '${chirp.post}', '${chirp.date}');`;
    connection.query(query, (err, results) => {
      if (err !== null) {
        console.log('error:', err);
      }
    });

    req.setTimeout(0);
    res.status(200).json(chirp);
  } else {
    res.status(422).send({ message: 'Requires a name and a message.' });
  }
});

app.post('/create-user', async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPass };
    users.push(user);
    req.setTimeout(0);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post('/user-login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name);
  if (user === null) {
    res.status(400).send('Invalid username/password.');
  }

  try {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        const user = { name: 'Mike' };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
      } else {
        res.status(401).send(`Invalid username/password.`);
      }
    });
  } catch {
    res.status(500).send('Failed.');
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
app.listen(app.get('port'), HOST, () => {
  console.log(`tweet-clone listening on ${HOST}:${PORT}`);
});
