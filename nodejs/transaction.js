const Sequelize = require('sequelize');

const config = require('./config');


//数据库名字
var sequelize =new Sequelize(config.database,config.username,config.password,{
  host:config.hose,
  dialect: 'mysql',
  pool: {
       max: 5,
       min: 0,
       idle: 30000
   }
});

  module.exports = sequelize;
