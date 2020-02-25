const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./recruitNotice.controller');
const refreshController = require('../login/login.controller');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controller.index);

router.get('/:serialNumber', controller.show);


/** 회사ID에 따른 공고 리스트 조회 */
router.get('/recruitNoticeByCompany/:companyId', refreshController.refresh, controller.recruitNoticeByCompany);


/** 원성식 추가 20190605 회사별 공고목록 가져오기 */
router.get('/companyNotice/:companyId', refreshController.refresh, controller.noticeList);

/** 원성식 추가 20190605 회사 + 공고별 지원자 목록 가져오기 */
router.get('/applyList/:serialNumber/:companyId', refreshController.refresh, controller.applyList);

// router.delete('/:serialNumber', controller.destroy);

// router.post('/', controller.create);

// router.put('/:serialNumber', controller.update);

module.exports = router;
