const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./faq.controller');
const refreshController = require('../login/login.controller');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', refreshController.refresh, controller.index);

router.get('/:faqSeq', controller.show);

// router.delete('/:faqSeq', controller.destroy);

// router.post('/', controller.create);

// router.put('/:faqSeq', controller.update);

module.exports = router;
