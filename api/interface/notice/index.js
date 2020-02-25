const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./notice.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//공지사항 리스트 조회
router.get('/', refreshController.refresh, controller.index);

//공지사항 상세조회
// router.get('/:noticeSeq', refreshController.refresh, controller.show);

module.exports = router;
