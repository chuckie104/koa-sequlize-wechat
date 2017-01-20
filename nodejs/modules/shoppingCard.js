
const db = require("../db");

const TYPE=db.STRING(255);


module.exports=db.defineModel("tt_shoppingcard",{
  id:db.BIGINT(100),
  userId:TYPE,
  goodsId:TYPE,
  name:TYPE,
  number:db.BIGINT(100)
})
