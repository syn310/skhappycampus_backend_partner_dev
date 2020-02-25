const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./companyRecruit.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:serialNumber', refreshController.refresh, controller.index);

router.get('/:serialNumber/:companyId', refreshController.refresh, controller.show);

router.post('/:serialNumber/:companyId', refreshController.refresh, controller.create);

router.put('/:serialNumber/:companyId', refreshController.refresh, controller.update);

router.delete('/:serialNumber/:companyId', refreshController.refresh, controller.delete);

module.exports = router;
