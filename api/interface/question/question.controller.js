const models = require('../../model/question/Question');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');

// exports.showByQuestion = (req,res) => {
//   const questionSeq = req.params.questionSeq || '';
//
//   if(!questionSeq.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionSeq" , req:questionSeq});
//   }
//
//   return models.Question.findOne({
//     where: {questionSeq: questionSeq}
//   }).then(question => {
//       if (!question){
//         return res.status(404).json({error:systemMessage.search.targetMissing});
//       }
//       return res.json(question);
//     }).catch(function (err) {
//         return res.status(500).json(err);
//     });
// };
//
// exports.showByUser = (req,res) => {
//   const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';
//
//   if(!applyUserId.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
//   }
//
//   return models.Question.findAll({
//     where: {createUserId:applyUserId}
//     ,order: [['createDatetime', 'DESC']]
//   }).then(question => {
//       if (!question){
//         return res.status(404).json({error:systemMessage.search.targetMissing});
//       }
//       return res.json(question);
//   }).catch(function (err) {
//       return res.status(500).json(err);
//   });
// };
//
// exports.index = (req,res) => {
//   //추후 내가 쓴 문의사항만 보여주도록 변경 필요, 인증정보 나오면
//     return models.Question.findAll()
//     .then(questions => res.json(questions))
//     .catch(function (err) {
//         return res.status(500).json(err);
//     });
// };
//
// exports.show = (req,res) => {
//   const questionSeq = req.params.questionSeq || '';
//   const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';
//
//   if(!questionSeq.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionSeq" , req:questionSeq});
//   }
//
//   if(!applyUserId.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
//   }
//
//   return models.Question.findOne({
//     where: {questionSeq: questionSeq, createUserId:applyUserId}
//   }).then(question => {
//       if (!question){
//         return res.status(404).json({error:systemMessage.search.targetMissing});
//       }
//       return res.json(question);
//     }).catch(function (err) {
//         return res.status(500).json(err);
//     });
// };
//
// exports.destroy = (req, res) => {
//   const questionSeq = req.params.questionSeq || '';
//
//   if(!questionSeq.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionSeq" , req:questionSeq});
//   }
//
//   return models.Question.findOne({
//     where: {questionSeq: questionSeq}
//   }).then((question)=>{
//     if(question == null){
//       return res.status(404).json(systemMessage.search.targetMissing);
//     }else{
//       return models.Question.destroy({
//         where: {questionSeq: questionSeq}
//       }).then(() => res.status(200).json(systemMessage.delete.success))
//       .catch(function (err) {
//             return res.status(500).json(err);
//       });
//     }
//   })
// };
//
// exports.create = (req,res) => {
//   const questionType = req.body.questionType || '';
//   const questionTitle = req.body.questionTitle || '';
//   const questionContent = req.body.questionContent || '';
//   const applyUserId = req.body.applyUserId || '';
//
//   if(!questionType.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionType" , req:questionType});
//   }
//
//   if(!questionTitle.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionTitle" , req:questionTitle});
//   }
//
//   if(!questionContent.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionContent" , req:questionContent});
//   }
//
//   if(!applyUserId.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
//   }
//
//   return models.Question.create({
//     //  questionEmail: questionEmail,
//     //  questionPhone: questionPhone,
//       questionType: questionType,
//       questionTitle: questionTitle,
//       questionContent: questionContent,
//       createUserId: applyUserId,
//       updateUserId: applyUserId
//   }).then((question) => res.status(201).json(question))
//   .catch(function (err) {
//       return res.status(500).json(err)
//   });
// };
//
// exports.update = (req,res) => {
//   const questionSeq = req.params.questionSeq || '';
//   const questionType = req.body.questionType || '';
//   const questionTitle = req.body.questionTitle || '';
//   const questionContent = req.body.questionContent || '';
//   const applyUserId = req.body.applyUserId || '';
//
//   if(!questionType.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionType" , req:questionType});
//   }
//
//   if(!questionTitle.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionTitle" , req:questionTitle});
//   }
//
//   if(!questionContent.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "questionContent" , req:questionContent});
//   }
//
//   if(!applyUserId.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
//   }
//
//   const newDate = new Date()
//   const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
//
//   return models.Question.update({
//   //  questionEmail: questionEmail,
//   //  questionPhone: questionPhone,
//     questionType: questionType,
//     questionTitle: questionTitle,
//     questionContent: questionContent,
//     updateUserId: applyUserId,
//     updateDatetime: time
//   } , {
//        where: {questionSeq: questionSeq}
//   }).then(()=>{
//       return models.Question.findOne({
//         where: {questionSeq: questionSeq}
//      });
//    }).then((question) => {
//      if(question == null) {
//        return res.status(404).json(systemMessage.search.targetMissing)
//      }else{
//       return res.status(200).json(question)
//      }
//     })
//    .catch(function (err) {
//        return res.status(500).json(err)
//    });
// };
