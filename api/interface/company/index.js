const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./company.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controller.index);

router.get('/:companyId', controller.show);
router.get('/detail/:companyId', refreshController.refresh , controller.detail);
// router.post('/', controller.create);
// 로그인 붙이면 아래 url이용
router.post('/', refreshController.refresh, controller.create);
router.put('/:companyId', refreshController.refresh,  controller.update);


module.exports = router;
