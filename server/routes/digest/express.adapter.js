const express = require('express');
const router = express.Router();

const digestIndex = require('./index');
const digestAdd = require('./add');

router.get('/', digestIndex);
router.post('/:digestId/add/:itemId', digestAdd);

module.exports = router;