

const db = require("../db");

const Sequelize = require('sequelize');

const TYPE=db.STRING(255);
const INTTYPE=db.INTEGER;
const BIGINTTYPE =db.BIGINT;
//gmtCreated:Sequelize.DATE, amount:Sequelize.FLOAT,
module.exports=db.defineModel("tt_order",
{
  id:BIGINTTYPE,
  orderType:INTTYPE,
  orderNumber:TYPE,
  userId:BIGINTTYPE,
  payState:INTTYPE,
  checkState:INTTYPE,
  name:{type:TYPE,allowNull: true},
  address:{type:TYPE,allowNull: true},
  phone:{type:TYPE,allowNull: true},
  gmtCreated:Sequelize.DATE,
  num:{type:INTTYPE,allowNull: true},
  amount:Sequelize.FLOAT,
  memo:{type:TYPE,allowNull: true},
  userCode:{type:INTTYPE,allowNull: true},
  message:{type:TYPE,allowNull: true},
  needBill:{type:INTTYPE,allowNull: true},
  billTitle:{type:TYPE,allowNull: true},
  billSendAddress:{type:TYPE,allowNull: true},
  expressNums:{type:TYPE,allowNull: true},
  expressCompanys:{type:TYPE,allowNull: true},
  activityId:{type:BIGINTTYPE,allowNull: true},
  isScorePay:{type:INTTYPE,allowNull: true},
  payState:{type:INTTYPE,allowNull: true}
})
