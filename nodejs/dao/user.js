const model = require("../module");

let user = model.user;

var login = async (username)=>{
  var data=await user.findOne({
    where:{
      username:username
    }
  })
  return data;
}

console.log(login+"user为什么不是一个函数");

module.exports=login;
