

const db = require("../db");

module.exports=db.defineModel("tt_goodstype",{
  id:db.BIGINT(255),
  name:db.STRING(255)
})
