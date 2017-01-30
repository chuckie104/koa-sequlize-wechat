// log request URL:

var selectUser = require("../dao/user");
var setStorage =require("../util").setStorage;

var signin = async(ctx,next)=>{
  let username = ctx.request.body.username,
      password = ctx.request.body.password;
      console.log(username);
      var object =await selectUser(username);
      var jsonResponse={};

      if(object==""||object===null||object==undefined){
        jsonResponse.msg="没有此用户";
        jsonResponse.status="0";

        ctx.response.body=jsonResponse;
        return;
      }
      if(object.password==password){
        //登录成功写进缓存
        setStorage("userId",object.id);
        //返回参数
        jsonResponse.msg="登录成功";
        jsonResponse.status="1";
        jsonResponse.object=object;
      }else{
        jsonResponse.msg="密码错误";
        jsonResponse.status="2";
      }
       ctx.response.body=jsonResponse;
}

//
module.exports={
  "POST /signin":signin
}
