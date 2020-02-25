const server = require('../models.js');
const Sequelize = require('sequelize');

const Question = server.define('svQuestion' , {
    //문의순번
  questionSeq : {
    type : Sequelize.INTEGER,
    allowNull : false,
    primaryKey : true,
    autoIncrement: true
  },
  //문의자이메일
  //questionEmail : {
    //type : Sequelize.STRING(300),
    //allowNull : false
  //},
  //문의자 전화번호
  //questionPhone : {
    //type : Sequelize.STRING(100),
    //allowNull : false
  //},
  //문의유형
  questionType : {
    type : Sequelize.STRING(100)
  },
  //문의제목
  questionTitle : {
    type : Sequelize.STRING(1000)
  },
  //문의내용
  questionContent : {
    type : Sequelize.TEXT('long')
  },
  //문의답변
  questionAnswer : {
    type : Sequelize.TEXT('long')
  },
  answerYn : {
    type : Sequelize.STRING(100),
    defaultValue : '문의중'
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


module.exports =  {
    Question : Question
}
