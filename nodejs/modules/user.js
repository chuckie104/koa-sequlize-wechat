const db = require("../db");

module.exports=db.defineModel("tt_user",{
  id:db.BIGINT(250),
  username:db.STRING(250),
  password:db.STRING(250),
  level:db.STRING(250)

});
