const models = require('../../model/recruitNotice/RecruitNotice');
const querySequelize = require('../../model/models.js');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');

exports.index = (req,res) => {
  return models.RecruitNotice.findAll()
  .then(recruitNotices => res.json(recruitNotices))
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};

exports.show = (req,res) => {
  const serialNumber = req.params.serialNumber || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }


  return models.RecruitNotice.findOne({
    where: {
      serialNumber: serialNumber
    }
  }).then(recruitNotice => {
      if (!recruitNotice){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(recruitNotice);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
  };

// exports.destroy = (req, res) => {
//   const serialNumber = req.params.serialNumber || '';
//
//   if(!serialNumber.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
//   }
//
//   return models.RecruitNotice.findOne({
//     where: {
//       serialNumber: serialNumber
//     }
//   }).then((recruitNotice)=>{
//     if(recruitNotice == null){
//       return res.status(404).json(systemMessage.search.targetMissing);
//     }else{
//       return models.RecruitNotice.destroy({
//         where: {
//           serialNumber: serialNumber
//         }
//       }).then(() => res.status(200).json(systemMessage.delete.success))
//       .catch(function (err) {
//             return res.status(500).json(err);
//       });
//     }
//   })
// };

exports.create = (req,res) => {
  const serialNumber = req.body.serialNumber || '';
  const noticeName = req.body.noticeName || '';
  const noticeStartDatetime = commonUtil.transDateFormat(req.body.noticeStartDatetime) || '';
  const noticeEndDatetime = commonUtil.transDateFormat(req.body.noticeEndDatetime) || '';
  const studyStartDate = commonUtil.transDateFormat(req.body.studyStartDate) || '';
  const studyEndDate = commonUtil.transDateFormat(req.body.studyEndDate) || '';
  const internStartDate = commonUtil.transDateFormat(req.body.internStartDate) || '';
  const internEndDate = commonUtil.transDateFormat(req.body.internEndDate) || '';
  const noticeStatus = req.body.noticeStatus || '';
  const noticeImagePath = req.body.noticeImagePath || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!noticeName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeName" , req:noticeName});
  }

  if(!noticeStartDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStartDatetime" , req:noticeStartDatetime});
  }

  if(!noticeEndDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeEndDatetime" , req:noticeEndDatetime});
  }

  if(!noticeStatus.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStatus" , req:noticeStatus});
  }

  return models.RecruitNotice.create({
    serialNumber : serialNumber,
    noticeName : noticeName,
    noticeStartDatetime : noticeStartDatetime,
    noticeEndDatetime : noticeEndDatetime,
    studyStartDate : studyStartDate,
    studyEndDate : studyEndDate,
    internStartDate : internStartDate,
    internEndDate : internEndDate,
    noticeStatus : noticeStatus,
    noticeImagePath : noticeImagePath,
    createUserId : createUserId,
    updateUserId : updateUserId
  }).then((recruitNotice) => res.status(201).json(recruitNotice))
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};


/** 원성식 추가 20190605 회사별 공고목록 가져오기 */
exports.noticeList = (req,res) => {
  const companyId = req.params.companyId || '';

  //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>    " + companyId)
  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId" , req:companyId});
  }

  const query = 
          "select " +
            "sn.serial_number as serialNumber, " +
            "sn.notice_name as noticeName, " +
            "sn.notice_start_datetime as noticeStartDatetime, " +
            "sn.notice_end_datetime as noticeEndDatetime, " +
            "sn.document_result_date as documentResultDate, " +
            "sn.interview_result_date as interviewResultDate, " +
            "sn.notice_status as noticeStatus, " +
            "sn.description as description, " +
            "sn.notice_image_path as noticeImagePath " +
          "from sv_companies sc, " +
               "sv_company_recruits sr, " +
               "sv_recruit_notices sn " +
          "where sc.company_id = sr.company_id " +
          "and sr.serial_number = sn.serial_number " +
          "and sc.company_id =:companyId " +
          "and sn.delete_yn = 'N' " +
          "order by sn.create_datetime desc ";

    return querySequelize.query(query, {
      type: querySequelize.QueryTypes.RAW,
      replacements: { companyId: companyId}
    }).spread(function(results){
      return res.status(200).json(results);
    }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
    });

  };

/** 원성식 추가 20190605 회사 and 공고별 회사지원자 가져오기 */
exports.applyList = (req,res) => {
  const companyId = req.params.companyId || '';
  const serialNumber = req.params.serialNumber || '';

  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId" , req:companyId});
  }
  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  const query = 
            "select " +
              "sa.serial_number as serialNumber, " +
              "sa.apply_user_id as applyUserId, " +
              "sa.apply_birth as applyBirth, " +
              "sa.apply_name as applyName, " +
            "case when sc.apply_user_id = sa.apply_user_id and sc.first_company =:companyId " +
                 "then '1지망' " +
                 "when sc.apply_user_id = sa.apply_user_id and sc.second_company =:companyId " +
                 "then '2지망' " +
                 "else '3지망' end as priority, " +
          " (select school_name " +
              " from sv_apply_educations se "  +
              "where se.apply_user_id = sa.apply_user_id " +
              "and se.serial_number = su.serial_number " +
              "and se.education_seq = ( select max(education_seq) from sv_apply_educations where apply_user_id = sa.apply_user_id ) " +
            ") as applySchool, " +
            "su.document_status as documentStatus, " +
            "su.interview_status as interviewStatus, " +
            "su.final_status as finalStatus, " +
            "'' as changeYn " + 
            "from sv_applies sa, "  +
                "sv_apply_user_company_statuses su, " +
                "sv_apply_company_choices sc " +
            "where su.company_id =:companyId " +
            "and su.serial_number =:serialNumber " +
            "and su.serial_number = sc.serial_number " +
            "and su.serial_number = sa.serial_number " +
            "and sa.apply_user_id = sc.apply_user_id " +
            "and su.apply_user_id = sa.apply_user_id " +
            "and (sc.first_company =:companyId or sc.second_company =:companyId or sc.third_company =:companyId) " +
            "group by sa.apply_user_id " +
            "order by sa.create_datetime desc " ;
  

    return querySequelize.query(query, {
      type: querySequelize.QueryTypes.RAW,
      replacements: { companyId: companyId, serialNumber: serialNumber }
    }).spread(function(results){
      return res.status(200).json(results);
    }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
    });

  };
/** 회사ID에 따른 공고 리스트 조회 */
exports.recruitNoticeByCompany = (req,res) => {
  const companyId = req.params.companyId || '';

  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId" , req:companyId});
  }

  const query = 
        "select " +
          "sn.serial_number as serialNumber, " +
          "sn.notice_name as noticeName, " +
          "sn.notice_start_datetime as noticeStartDatetime, " +
          "sn.notice_end_datetime as noticeEndDatetime, " +
          "sn.document_result_date as documentResultDate, " +
          "sn.interview_result_date as interviewResultDate, " +
          "sn.notice_status as noticeStatus, " +
          "sn.description as description, " +
          "sn.notice_image_path as noticeImagePath, " +
          "if((SELECT COUNT(*) FROM sv_company_recruits where serial_number = sn.serial_number  AND company_id =:companyId) >=1, TRUE, FALSE)  AS inYn "+
        "from sv_recruit_notices sn " +
        "where exists (select 1 from sv_recruit_notices where serial_number = sn.serial_number and delete_yn = 'N')" +
        "order by sn.create_datetime desc ";

  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.RAW,
    replacements: { companyId: companyId}
  }).spread(function(results){
    return res.status(200).json(results);
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json(err);
  });

};
  

// exports.update = (req,res) => {
//   const serialNumber = req.params.serialNumber || '';
//   const noticeName = req.body.noticeName || '';
//   const noticeStartDatetime = req.body.noticeStartDatetime || '';
//   const noticeEndDatetime = req.body.noticeEndDatetime || '';
//   const studyStartDate = req.body.studyStartDate || '';
//   const studyEndDate = req.body.studyEndDate || '';
//   const internStartDate = req.body.internStartDate || '';
//   const internEndDate = req.body.internEndDate || '';
//   const noticeStatus = req.body.noticeStatus || '';
//   const noticeImagePath = req.body.noticeImagePath || '';
//   const createUserId = req.body.createUserId || '';
//   const updateUserId = req.body.updateUserId || '';
//
//   if(!serialNumber.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
//   }
//
//   if(!noticeName.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeName" , req:noticeName});
//   }
//
//   if(!noticeStartDatetime.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStartDatetime" , req:noticeStartDatetime});
//   }
//
//   if(!noticeEndDatetime.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeEndDatetime" , req:noticeEndDatetime});
//   }
//
//   if(!noticeStatus.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStatus" , req:noticeStatus});
//   }
//
//   const newDate = new Date()
//   const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
//
//   return models.RecruitNotice.update({
//     noticeName : noticeName,
//     noticeStartDatetime : noticeStartDatetime,
//     noticeEndDatetime : noticeEndDatetime,
//     studyStartDate : studyStartDate,
//     studyEndDate : studyEndDate,
//     internStartDate : internStartDate,
//     internEndDate : internEndDate,
//     noticeStatus : noticeStatus,
//     noticeImagePath : noticeImagePath,
//     createUserId : createUserId,
//     updateUserId : updateUserId,
//     updateDatetime: time
//   } , {
//     where: {
//       serialNumber: serialNumber,
//     }
//   }).then(()=>{
//       return models.RecruitNotice.findOne({
//         where: {
//           serialNumber: serialNumber
//         }
//      });
//    }).then((recruitNotice) => {
//      if(recruitNotice == null) {
//        return res.status(404).json(systemMessage.search.targetMissing);
//      }else{
//        return res.status(200).json(recruitNotice);
//      }
//     })
//    .catch(function (err) {
//        return res.status(500).json(err);
//    });
// };
