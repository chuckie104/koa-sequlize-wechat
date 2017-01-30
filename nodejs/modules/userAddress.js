

const db = require("../db");


const TYPE=db.STRING(255);
const INTTYPE=db.INTEGER;
const BIGINTTYPE =db.BIGINT;

module.exports=db.defineModel("tt_userAddress",{
    id:BIGINTTYPE,
    userId:BIGINTTYPE,
    name:TYPE,
    phone:TYPE,
    address:TYPE,
    isDefault:INTTYPE,
    province:TYPE,
    city:TYPE
})
