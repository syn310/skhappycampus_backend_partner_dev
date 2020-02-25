const models = require('../../model/faq/Faq');
const systemMessage = require('../../../config/systemMessage');
require('date-utils');

exports.index = (req,res) => {
    return models.Faq.findAll({
      order: [['faqCategory', 'DESC']]
    })
    .then(faqs => res.json(faqs))
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

exports.show = (req,res) => {
  const faqSeq = req.params.faqSeq || '';

  if(!faqSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqSeq" , req:faqSeq});
  }

  models.Faq.findOne({
    where: {
      faqSeq: faqSeq
    }
  }).then(faq => {
      if (!faq){
        return res.status(404).json({error: systemMessage.search.targetMissing});
      }
      return res.json(faq);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(err)
    });
};

// exports.destroy = (req, res) => {
//   const faqSeq = req.params.faqSeq || '';
//
//   if(!faqSeq.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqSeq" , req:faqSeq});
//   }
//
//   models.Faq.findOne({
//     where: {faqSeq: faqSeq}
//   }).then((faq)=>{
//     if(faq == null){
//       res.status(404).json(systemMessage.search.targetMissing);
//     }else{
//       models.Faq.destroy({
//         where: {faqSeq: faqSeq}
//       }).then(() => res.status(200).json(systemMessage.delete.success))
//       .catch(function (err) {
//             res.status(500).json(err)
//       });
//     }
//   })
// };
//
// exports.create = (req,res) => {
//   const faqCategory = req.body.faqCategory || '';
//   const faqQuestion = req.body.faqQuestion || '';
//   const faqAnswer = req.body.faqAnswer || '';
//
//   if(!faqCategory.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqCategory" , req:faqCategory});
//   }
//
//   if(!faqQuestion.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqQuestion" , req:faqQuestion});
//   }
//
//   if(!faqAnswer.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqAnswer" , req:faqAnswer});
//   }
//
//   models.Faq.create({
//       faqCategory: faqCategory,
//       faqQuestion: faqQuestion,
//       faqAnswer: faqAnswer
//   }).then((faq) => res.status(201).json(faq))
//   .catch(function (err) {
//       res.status(500).json(err)
//   });
// };
//
// exports.update = (req,res) => {
//   const faqSeq = req.params.faqSeq || '';
//   const faqCategory = req.body.faqCategory || '';
//   const faqQuestion = req.body.faqQuestion || '';
//   const faqAnswer = req.body.faqAnswer || '';
//
//   if(!faqSeq.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqSeq" , req:faqSeq});
//   }
//
//   if(!faqCategory.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqCategory" , req:faqCategory});
//   }
//
//   if(!faqQuestion.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqQuestion" , req:faqQuestion});
//   }
//
//   if(!faqAnswer.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqAnswer" , req:faqAnswer});
//   }
//
//   const newDate = new Date()
//   const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
//
//   models.Faq.update({
//       faqCategory: faqCategory,
//       faqQuestion: faqQuestion,
//       faqAnswer: faqAnswer,
//       updateDatetime: time
//   } , {
//         where: {
//           faqSeq: faqSeq
//         }
//   }).then(()=>{
//       return models.Faq.findOne({
//         where: {
//           faqSeq: faqSeq
//         }
//      });
//    }).then((faq) => {
//      if(faq == null) {
//        res.status(404).json(systemMessage.search.targetMissing)
//      }else{
//        res.status(200).json(faq)
//      }
//     })
//    .catch(function (err) {
//        res.status(500).json(err)
//    });
// };
