
console.log(456);
const Sequelize = require('sequelize');
const db =require("../db");

const TYPE=db.STRING(255);
const INTTYPE=db.INTEGER;
const BIGINTTYPE =db.BIGINT;

module.exports=db.defineModel("tt_orderdes",{
  id:BIGINTTYPE,
  orderNumber:TYPE,
  goodsId:BIGINTTYPE,
  price: Sequelize.FLOAT,
  goodsName:TYPE,
  number:INTTYPE,
  carryCost: Sequelize.FLOAT,
  bogoState:INTTYPE
})
