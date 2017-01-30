
//根据userid查地址
const selectUserAddressByUserIdDao = require("../dao/userAddress").selectUserAddressByUserId;



let selectAddress =async(ctx,next)=>{
  let userId = ctx.request.body.userId;

  //声明返回对象
  let jsonResponse={};
  //拿userId查数据库
  try {
    //查询成功的情况
    let addressObject = await selectUserAddressByUserIdDao(userId);
    if(addressObject.length==0){
      jsonResponse.status ="0";
      jsonResponse.msg ="没有地址";
      jsonResponse.object = "";
    }else{
        jsonResponse.status ="1";
        jsonResponse.msg ="查询成功";
        jsonResponse.object = addressObject;
    }

  } catch (e) {
    console.log(e);
    jsonResponse.status ="0";
    jsonResponse.msg ="查询异常";
    jsonResponse.object = "";

  }

  ctx.response.body=jsonResponse;
}


module.exports={
  "POST /selectAddress":selectAddress
}
