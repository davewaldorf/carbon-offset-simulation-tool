const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 4000;

// Configure CORS
const corsConfig = {
  origin: true,
  credentials: true,
};

// Enable cross-origin resource sharing
app.use(cors(corsConfig));

// Parse request bodies as JSON
app.use(bodyParser.json());

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuidv4(); // use UUIDs for session IDs
  },
  sameSite: true,
  store: new session.MemoryStore(),
  secret: 'carbon',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } // session expires after 1 hour (in milliseconds)
}));

app.use((req, res, next) => {
  res.cookie('sid', req.sessionID, {
    maxAge: 3600000,
  });
  next();
})

// Mount routes
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
