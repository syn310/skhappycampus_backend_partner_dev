const server = require('../models.js');
const Sequelize = require('sequelize');

const Menu = server.define('svBpMenu' , {
  menuId : {
    type : Sequelize.STRING(11),
    allowNull : false,
    primaryKey : true,
    // autoIncrement: true
  },
  menuName : {
    type : Sequelize.STRING(50),
    allowNull : false
  },
  depth : {
    type : Sequelize.INTEGER,
    allowNull : false
  },
  url : {
    type : Sequelize.STRING(50)
  },
  subUrl : {
    type : Sequelize.STRING(50)
  },
  parent : {
    type : Sequelize.INTEGER
  },
  showYn : {
    type : Sequelize.STRING(1)
  },
  useYn : {
    type : Sequelize.STRING(1)
  },
  ord : {
    type : Sequelize.INTEGER
  },
  needLoginYn : {
    type : Sequelize.STRING(1)
  },
  mainShowYn : {
    type : Sequelize.STRING(1)
  },
  mainDescription : {
    type : Sequelize.STRING(100)
  },

}, {underscored:true});


module.exports =  {
    Menu : Menu
}
