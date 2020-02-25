const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./serialCode.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// router.get('/', controller.index);
module.exports = router;
