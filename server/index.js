const express = require('express');
const cors = require('cors');
const db = require('./lib/db');
const rss = require('./routes/rss/express.adapter');
const digest = require('./routes/digest/express.adapter');

const port = process.env.PORT || 9000;
const app = express();
const router = express.Router();

db.connect();

app.use(cors());
app.use('/rss', rss);
app.use('/digest', digest);
app.use(router);

app.listen(port, () => {
  console.log('Server listening on port :', port);
});
