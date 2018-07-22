require('ignore-styles');

require('babel-register')({
  ignore: [/(node_modules)/],
  presets: ['es2015', 'react-app']
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./lib/db');
const bodyParser = require('body-parser');
const rss = require('./routes/rss/express.adapter');
const digest = require('./routes/digest/express.adapter');
const serverRenderer = require('./middleware/renderer');

const port = process.env.PORT || 9000;
const app = express();
const router = express.Router();

db.connect();

router.use('*', serverRenderer.default);
router.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(cors());
app.use('/digest', digest);
app.use(router);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'pug');
// app.use('/rss', rss);

app.listen(port, () => {
  console.log('Server listening on port :', port);
});