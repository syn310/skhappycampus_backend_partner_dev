const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./question.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// router.get('/', controller.index);
//
// router.get('/question/:questionSeq', controller.showByQuestion);
//
// router.get('/user', refreshController.refresh, controller.showByUser);
//
// router.get('/:questionSeq', refreshController.refresh, controller.show);
//
// router.delete('/:questionSeq', controller.destroy);
//
// router.post('/', refreshController.refresh, controller.create);
//
// router.put('/:questionSeq', controller.update);

module.exports = router;
