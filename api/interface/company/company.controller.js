const models = require('../../model/company/Company');
const systemMessage = require('../../../config/systemMessage');
const querySequelize = require('../../model/models.js');
require('date-utils');

exports.index = (req,res) => {
    return models.Company.findAll({
      order: [['companyName', 'ASC']]
    })
    .then(faqs => res.json(faqs))
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

exports.show = (req,res) => {
  const companyId = req.params.companyId || '';

  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId", req:companyId});
  }

return models.Company.findOne({
    where: {
      companyId: companyId,
    }
  }).then(company => {
      if (!company){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(company);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};


exports.detail = (req,res) => {
  const companyId = req.params.companyId || '';

  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId", req:companyId});
  }

return models.Company.findOne({
    where: {
      companyId: companyId,
    }
  }).then(company => {
      if (!company){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(company);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

exports.create = (req,res) => {

  const companyAddress = req.body.companyAddress || '';
  const companyGuide = req.body.companyGuide || '';
  const companyName= req.body.companyName || '';
  const companyType= req.body.companyType || '';
  const companyUrl= req.body.companyUrl || '';
  const contactPerson= req.body.contactPerson || '';
  const contactPhone= req.body.contactPhone || '';
  const idealType= req.body.idealType || '';
  const sales= req.body.sales || 0;
  const employeeNumber= req.body.employeeNumber || 0;
  const companyLogoUrl= req.body.companyLogoUrl || '';
  // const createUserId = req.body.createUserId || '';
  // const updateUserId = req.body.updateUserId || '';
  
  if(!companyAddress.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyAddress" , req:companyAddress});
  }
  if(!companyGuide.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyGuide" , req:companyGuide});
  }
  if(!companyName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyName" , req:companyName});
  }
  if(!companyType.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyType" , req:companyType});
  }
  if(!companyUrl.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyUrl" , req:companyUrl});
  }
  if(!contactPerson.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "contactPerson" , req:contactPerson});
  }
  if(!contactPhone.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "contactPhone" , req:contactPhone});
  }
  if(!idealType.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "idealType" , req:idealType});
  }
  if(!sales.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "sales" , req:sales});
  }
  if(!employeeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "employeeNumber" , req:employeeNumber});
  }
  if(!companyLogoUrl.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyLogoUrl" , req:companyLogoUrl});
  }
  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  return models.Company.create({
    companyAddress :companyAddress,
    companyGuide: companyGuide,
    companyName: companyName,
    companyUrl: companyUrl,
    companyType: companyType,
    contactPerson: contactPerson,
    contactPhone: contactPhone,
    idealType: idealType,
    sales: sales,
    employeeNumber: employeeNumber,
    companyLogoUrl: companyLogoUrl,
    createDatetime: time,
  }).then((company) => {
    return res.status(201).json(company)
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err)
  });
};


exports.update = (req,res) => { 
  console.log(`req.body.companyLogoUrl: ${req.body.companyLogoUrl}`); 
  const companyId = req.params.companyId || '';
  const companyAddress = req.body.companyAddress || '';
  const companyGuide = req.body.companyGuide || '';
  const companyName= req.body.companyName || '';
  const companyType= req.body.companyType || '';
  const companyUrl= req.body.companyUrl || '';
  const contactPerson= req.body.contactPerson || '';
  const contactPhone= req.body.contactPhone || '';
  const idealType= req.body.idealType || '';
  const sales= req.body.sales || 0;
  const employeeNumber= req.body.employeeNumber || 0;
  const companyLogoUrl= req.body.companyLogoUrl || '';
  // const updateUserId = req.body.updateUserId || '';
  
  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId" , req:companyId});
  }
  if(!companyAddress.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyAddress" , req:companyAddress});
  }
  if(!companyGuide.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyGuide" , req:companyGuide});
  }
  if(!companyName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyName" , req:companyName});
  }
  if(!companyType.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyType" , req:companyType});
  }
  if(!companyUrl.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyUrl" , req:companyUrl});
  }
  if(!contactPerson.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "contactPerson" , req:contactPerson});
  }
  if(!contactPhone.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "contactPhone" , req:contactPhone});
  }
  if(!idealType.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "idealType" , req:idealType});
  }
  if(sales===null){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "sales" , req:sales});
  }
  if(employeeNumber===null){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "employeeNumber" , req:employeeNumber});
  }
  if(!companyLogoUrl.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyLogoUrl" , req:companyLogoUrl});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  return models.Company.update({
    companyAddress :companyAddress,
    companyGuide: companyGuide,
    companyName: companyName,
    companyUrl: companyUrl,
    companyType: companyType,
    contactPerson: contactPerson,
    contactPhone: contactPhone,
    idealType: idealType,
    sales: sales,
    employeeNumber: employeeNumber,
    companyLogoUrl: companyLogoUrl,
    updateDatetime: time,
  } , {
    where: {
      companyId: companyId,
    }
  }).then(()=>{
      return models.Company.findOne({
        where: {
          companyId: companyId
        }
     });
   }).then((company) => {
     if(company == null) {
       return res.status(404).json(systemMessage.search.targetMissing);
     }else{
       return res.status(200).json(company);
     }
    })
   .catch(function (err) {
       return res.status(500).json(err);
   });
};
