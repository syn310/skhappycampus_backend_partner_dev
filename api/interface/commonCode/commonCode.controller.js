const models = require('../../model/commonCode/CommonCode');
const systemMessage = require('../../../config/systemMessage');

exports.index = (req,res) => {
  const groupName = req.params.groupName || '';
  const codeOption = req.params.codeOption || '';

    return models.CommonCode.findAll({
      where: {
        groupName: groupName
      }  ,order: [['codeOrder', 'ASC']]
    }).then(commonCodes => {
      let codeList = [];

      if(codeOption == 'S'){
        code = {value:"",text:"선택"}
        codeList.push(code);
      }else if(codeOption == 'A'){
        code = {value:"",text:"전체"}
        codeList.push(code);
      }

      for(var i=0; i<commonCodes.length; i++){
        code = {
          value:commonCodes[i].codeName,
          text:commonCodes[i].codeValue
        }
        codeList.push(code);
      }

      return res.json(codeList)
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err)
    });
};
