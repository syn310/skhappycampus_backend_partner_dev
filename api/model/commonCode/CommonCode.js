const server = require('../models.js');
const Sequelize = require('sequelize');

const CommonCode = server.define('svCommonCode' , {
  codeId : {
    type : Sequelize.STRING(100),
    allowNull : false,
    primaryKey : true
  },
  groupName : {
    type : Sequelize.STRING(100),
    allowNull : false,
  },
  codeName : {
    type : Sequelize.STRING(100),
    allowNull : false,
  },
  codeValue : {
    type : Sequelize.STRING(100),
    allowNull : false
  },
  codeOrder : {
    type : Sequelize.INTEGER,
    allowNull : false
  },
  //생성날짜
  createDatetime : {
    type : Sequelize.DATE,
    defaultValue : Sequelize.NOW
  },
  //생성자아이디
  createUserId : {
    type : Sequelize.STRING(300)
  },
  //수정날짜
  updateDatetime : {
    type :  Sequelize.DATE,
    defaultValue : Sequelize.NOW
  },
  //수정자아이디
  updateUserId : {
    type : Sequelize.STRING(300)
  }
}, {underscored:true});


module.exports = {
    CommonCode : CommonCode
}
