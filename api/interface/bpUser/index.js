const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./bpUser.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/dupleCheck/:userId', controller.dupleCheck);

router.post('/', controller.create);

router.put('/changePassword', refreshController.refresh, controller.changePassword);

router.get('/userList/:companyId', /* refreshController.refresh, */ controller.showUser);

router.put('/registPermit/:companyId', refreshController.refresh, controller.registPermit);

module.exports = router;
