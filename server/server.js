const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const corsConfig = {
  origin: true,
  credentials: true,
};

const app = express();
// Enable cross-origin resource sharing
app.use(cors(corsConfig));
// Parse request bodies as JSON
app.use(bodyParser.json());

// Mount routes
app.use(routes);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
