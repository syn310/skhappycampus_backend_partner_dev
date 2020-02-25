const models = require('../../model/companyRecruit/CompanyRecruit');
const systemMessage = require('../../../config/systemMessage');
const querySequelize = require('../../model/models.js');
require('date-utils');

exports.index = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  const applyUserId = req.params.applyUserId || '';

  const query = "select" +
              "    sc.company_id as companyId," +
              "    sc.company_name as companyName," +
              "    sc.company_guide as companyGuide," +
              "    sc.company_url as companyUrl," +
              "    sc.company_address as companyAddress," +
              "    sc.contact_person as contactPerson," +
              "    sc.contact_phone as contactPhone," +
              "    sc.company_type as companyType," +
              "    sc.ideal_type as idealType," +
              "    sc.employee_number as employeeNumber," +
              "    sc.employee_number_date as employeeNumberDate," +
              "    sc.sales," +
              "    sc.sales_date as salesDate," +
              "    sc.average_salary as averageSalary," +
              "    sc.average_salary_date as averageSalaryDate," +
              "    sc.company_logo_url as companyLogoUrl," +
              "    sr.recruit_type as recruitType," +
              "    sr.recruit_seq as recruitSeq," +
              "    sr.recruit_job as recruitJob," +
              "    sr.recruit_number as recruitNumber," +
              "    sr.employ_start_date as employStartDate," +
              "    sr.employ_end_date as employEndDate," +
              "    sr.remark as remark," +
              "    sr.job_detail as jobDetail," +
              "    sr.preference_point as preferencePoint," +
              "    sr.prefer_degree as preferDegree," +
              "    sr.intern_salary as internSalary," +
              "    sr.fulltime_salary as fulltimeSalary," +
              "    sr.workplace as workplace" +
              "    from sv_companies sc, sv_company_recruits sr" +
              "    where sc.company_id = sr.company_id" +
              "    and sr.serial_number =:serialNumber order by company_name asc;";

    return querySequelize.query(query, {
      type: querySequelize.QueryTypes.RAW,
      replacements: { serialNumber:serialNumber}
    }).spread(function(results){
      return res.status(200).json(results);
    }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
    });
};


exports.show = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  // const applyUserId = req.params.applyUserId || '';
  const companyId = req.params.companyId || '';

  const query = "select" +
              "    sc.company_id as companyId," +
              "    sc.company_name as companyName," +
              "    sc.company_guide as companyGuide," +
              "    sc.company_url as companyUrl," +
              "    sc.company_address as companyAddress," +
              "    sc.contact_person as contactPerson," +
              "    sc.contact_phone as contactPhone," +
              "    sc.company_type as companyType," +
              "    sc.ideal_type as idealType," +
              "    sc.employee_number as employeeNumber," +
              "    sc.employee_number_date as employeeNumberDate," +
              "    sc.sales," +
              "    sc.sales_date as salesDate," +
              "    sc.average_salary as averageSalary," +
              "    sc.average_salary_date as averageSalaryDate," +
              "    sc.company_logo_url as companyLogoUrl," +
              "    sr.recruit_type as recruitType," +
              "    sr.recruit_seq as recruitSeq," +
              "    sr.recruit_job as recruitJob," +
              "    sr.recruit_number as recruitNumber," +
              "    sr.employ_start_date as employStartDate," +
              "    sr.employ_end_date as employEndDate," +
              "    sr.remark as remark," +
              "    sr.job_detail as jobDetail," +
              "    sr.preference_point as preferencePoint," +
              "    sr.prefer_degree as preferDegree," +
              "    sr.intern_salary as internSalary," +
              "    sr.fulltime_salary as fulltimeSalary," +
              "    sr.workplace as workplace" +
              "    from sv_companies sc, sv_company_recruits sr" +
              "    where sc.company_id = sr.company_id" +
              "    and sr.serial_number =:serialNumber"+
              "    and sr.company_id =:companyId"
              "    order by company_name asc;";

    return querySequelize.query(query, {
      type: querySequelize.QueryTypes.RAW,
      replacements: { 
        serialNumber:serialNumber,
        companyId: companyId
      }
    }).spread(function(results){
      if (!results.length){
        return res.status(200).json({row: '0'});
      }
      return res.status(200).json(results[0]);
    }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
    });
};


exports.create = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const companyId = req.params.companyId || '';
  const recruitSeq = req.body.recruitSeq || '';
  const recruitJob = req.body.recruitJob || '';
  const recruitNumber = req.body.recruitNumber || 0;
  const jobDetail = req.body.jobDetail || '';
  const preferencePoint = req.body.preferencePoint || '';
  const preferDegree = req.body.preferDegree || '';
  const internSalary = req.body.internSalary || '';
  const fulltimeSalary = req.body.fulltimeSalary || '';
  const workplace = req.body.workplace || '';
  const remark = req.body.workplace || '';
  const createUserId = req.body.createUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }
  if(companyId === null){/** INTEGER */
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId" , req:companyId});
  }
  if(!recruitJob.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "recruitJob" , req:recruitJob});
  }

  if(recruitNumber === null){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "recruitNumber" , req:recruitNumber});
  }
  if(!jobDetail.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "jobDetail" , req:jobDetail});
  }
  if(!preferDegree.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "preferDegree" , req:preferDegree});
  }
  if(!fulltimeSalary.length && !internSalary.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "fulltimeSalary or internSalary" , req:fulltimeSalary});
  }
  if(!workplace.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "workplace" , req:workplace});
  }
  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
  return models.CompanyRecruit.findOne({
    where: {
      serialNumber: serialNumber,
      companyId: companyId,
      recruitSeq : recruitSeq
    }
  }).then(companyRecruit => {
    
      if (!companyRecruit){
        models.CompanyRecruit.create({
            serialNumber: serialNumber,
            companyId: companyId,
            recruitSeq: "1",
            recruitJob: recruitJob,
            recruitNumber: recruitNumber,
            jobDetail: jobDetail,
            preferencePoint: preferencePoint,
            preferDegree: preferDegree,
            internSalary: internSalary,
            fulltimeSalary: fulltimeSalary,
            workplace : workplace,
            remark: remark,
            createUserId: createUserId,
            createDatetime : time
        }).then((companyRecruit) => res.status(201).json(companyRecruit))
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err)
        });
      }else{
        models.CompanyRecruit.create({
            serialNumber: serialNumber,
            companyId: companyId,
            recruitSeq: companyRecruit.recruitSeq +1,
            recruitJob: recruitJob,
            recruitNumber: recruitNumber,
            jobDetail: jobDetail,
            preferencePoint: preferencePoint,
            preferDegree: preferDegree,
            internSalary: internSalary,
            fulltimeSalary: fulltimeSalary,
            workplace : workplace,
            remark: remark,
            createUserId: createUserId,
            createDatetime : time
        }).then((companyRecruit) =>{
          return res.status(201).json(companyRecruit);
        })
        .catch(function (err) {
            console.log(err);
            return res.status(500).json(err)
        });
      }
      // return res.json(companyRecruit);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });

  // models.CompanyRecruit.create({
  //     serialNumber: serialNumber,
  //     companyId: companyId,
  //     recruitJob: recruitJob,
  //     recruitNumber: recruitNumber,
  //     jobDetail: jobDetail,
  //     preferencePoint: preferencePoint,
  //     preferDegree: preferDegree,
  //     internSalary: internSalary,
  //     fulltimeSalary: fulltimeSalary,
  //     workplace : workplace,
  //     createUserId: createUserId,
  //     createDatetime : time
  // }).then((companyRecruit) => res.status(201).json(companyRecruit))
  // .catch(function (err) {
  //     console.log(err);
  //     res.status(500).json(err)
  // });

}
exports.update = (req,res) => {  
  const serialNumber = req.params.serialNumber || '';
  const companyId = req.params.companyId || '';
  const recruitSeq = req.body.recruitSeq || 0;
  const recruitJob = req.body.recruitJob || '';
  const recruitNumber = req.body.recruitNumber || 0;
  const jobDetail = req.body.jobDetail || '';
  const preferencePoint = req.body.preferencePoint || '';
  const preferDegree = req.body.preferDegree || '';
  const internSalary = req.body.internSalary || '';
  const fulltimeSalary = req.body.fulltimeSalary || '';
  const workplace = req.body.workplace || '';
  const remark = req.body.remark || '';
  const updateUserId = req.body.updateUserId || '';
  
  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }
  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId" , req:companyId});
  }
  if(recruitSeq === null){/** INTEGER 타입 */
    return res.status(400).json({error:systemMessage.search.incorrectKey + "recruitSeq" , req:recruitSeq});
  }
  if(!recruitJob.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "recruitJob" , req:recruitJob});
  }
  if(recruitNumber === null){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "recruitNumber" , req:recruitNumber});
  }
  if(!jobDetail.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "jobDetail" , req:jobDetail});
  }
  if(!preferDegree.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "preferDegree" , req:preferDegree});
  }
  if(!fulltimeSalary.length && !internSalary.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "fulltimeSalary or internSalary" , req:fulltimeSalary});
  }
  if(!workplace.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "workplace" , req:workplace});
  }
  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
  return models.CompanyRecruit.update({
    recruitJob: recruitJob,
    recruitNumber: recruitNumber,
    jobDetail: jobDetail,
    preferencePoint: preferencePoint,
    preferDegree: preferDegree,
    internSalary: internSalary,
    fulltimeSalary: fulltimeSalary,
    workplace : workplace,
    remark: remark,
    updateUserId: updateUserId,
    updateDatetime: time
  } , {
    where: {
      serialNumber: serialNumber,
      companyId: companyId,
      recruitSeq: recruitSeq
    }
  }).then(()=>{
      return models.CompanyRecruit.findOne({
        where: {
          serialNumber: serialNumber,
          companyId: companyId,
          recruitSeq: recruitSeq
        }
     });
   }).then((companyRecruit) => {
     if(companyRecruit == null) {
       return res.status(404).json(systemMessage.search.targetMissing);
     }else{
       return res.status(200).json(companyRecruit);
     }
    })
   .catch(function (err) {
       return res.status(500).json(err);
   });
};

exports.delete = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const companyId = req.params.companyId || '';
  const recruitSeq = req.body.recruitSeq || 0;

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }
  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId" , req:companyId});
  }
  if(recruitSeq === null){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "recruitSeq" , req:recruitSeq});
  }

  return models.CompanyRecruit.findOne({
        where: {
          serialNumber: serialNumber,
          companyId: companyId,
          recruitSeq: recruitSeq
        }
      }).then((CompanyRecruit)=>{
        if(CompanyRecruit == null){
          return res.status(404).json(systemMessage.search.targetMissing);
        }else{
          return models.CompanyRecruit.destroy({
            where: {
              serialNumber: serialNumber,
              companyId: companyId,
              recruitSeq: recruitSeq
            }
          }).then(() => res.status(200).json(systemMessage.delete.success))
          .catch(function (err) {
                return res.status(500).json(err);
          });
        }
      })
};

