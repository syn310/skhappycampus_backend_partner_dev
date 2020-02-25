const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./menu.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controller.index);
router.get('/quick', controller.quickMenu);

module.exports = router;
