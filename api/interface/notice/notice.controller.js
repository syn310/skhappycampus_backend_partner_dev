const models = require('../../model/notice/Notice');
const systemMessage = require('../../../config/systemMessage');
require('date-utils');

//공지사항 리스트 조회
exports.index = (req,res) => {
    return models.Notice.findAll({
      where:{
        bpYn: "Y",
        deleteYn : "N"
      },
      order: [['noticeSeq', 'DESC']]
    })
    .then(notices => res.json(notices))
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

//공지사항 상세조회
exports.show = (req,res) => {
  const noticeSeq = req.params.noticeSeq || '';

  if(!noticeSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeSeq" , req:noticeSeq});
  }

  models.Notice.findOne({
    where: {
      noticeSeq: noticeSeq,
      bpYn: 'Y'
    }
  }).then(noticeSeq => {
      if (!noticeSeq){
        return res.status(404).json({error: systemMessage.search.targetMissing});
      }
      return res.json(noticeSeq);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(err)
    });
};