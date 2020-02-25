const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./user.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// router.get('/', controller.index);

router.get('/dupleCheck/:userId', controller.dupleCheck);

// router.get('/:regionCode/:userId', controller.show);
//
// router.delete('/:regionCode/:userId', controller.destroy);
//
router.post('/', controller.create);

router.put('/changePassword', refreshController.refresh, controller.changePassword);

router.get('/userList/:companyId', controller.showUser);

router.put('/registPermit/:companyId', refreshController.refresh, controller.registPermit);

module.exports = router;
