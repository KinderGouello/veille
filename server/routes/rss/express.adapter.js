const express = require('express');
const router = express.Router();

const rssList = require('./list');
const rssAddGet = require('./add.get');
const rssAddPost = require('./add.post');

router.get('/', rssList);
router.get('/add', rssAddGet);
router.post('/add', rssAddPost);

module.exports = router;