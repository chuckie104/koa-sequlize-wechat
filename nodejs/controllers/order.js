
//订单事务
let orderTransaction = require("../dao/transaction").orderTransaction;

let SelectShoppingCardByUserId =require("../dao/shoppingCard").selectShoppingCardByUserId;

let SelectGoodsById =require("../dao/goods").selectGoodsById;

let get_string_time =require("../util").get_string_time;

let SelectOrderBynumber = require("../dao/order").selectOrderBynumber;

let SelectOrderdscBynumber = require("../dao/orderdsc").selectOrderdscBynumber;



//添加订单接口
//逻辑
// 1.先调用生成订单接口生成订单
//
// 2.生成订单成功后
//
// 3.把商品详情插入到订单详情表
//
// 4.删除对应userid购物车数据

 let createOrder =async(ctx,next)=>{
  //首先拿到userid
  let userId = ctx.request.body.userId;

  //总价钱
  let amount = ctx.request.body.amount;
  //购物车商品订单id
  let goodsIdArray =[];

  //购物车数量
  let numberArray = [];
  //拿userid查购物车goodsid去goods表查出商品详情

  try {
      let goodsArray = await SelectShoppingCardByUserId(userId);

      if(goodsArray.length==0){
        return;
      }else{
        for(let i in goodsArray){
          var  goodsId =goodsArray[i].goodsId;
          var number = goodsArray[i].number;
          goodsIdArray.push(goodsId);
          numberArray.push(number);
        }

      }
  } catch (e) {
      console.log(e);

  }

  //声明插入订单详情数组
  var selectParams=[];
  //声明插入订单详情数组对象
  let paramsObject={};

  //拼接参数列表
  //订单类型
  let orderType =0;

  let time =new Date().getTime();
  //订单号 时间戳加userid
  let orderNumber=time*1000+userId;

  let payState=0;

  let checkState=0;

  let gmtCreated=get_string_time(time);
  //执行增加订单事务

  let object;
  try {
      object =await SelectGoodsById(goodsIdArray);

      if(object.length==0){
        return;
      }else{
        //插入订单详情数组需要的参数
        for(var i in object){
          var {id,price,name,carryPrice,bogoState} = object[i].dataValues;
          // console.log(object[i]);
          paramsObject.orderNumber =orderNumber;
          paramsObject.goodsId =id;
          paramsObject.price=price;
          paramsObject.goodsName = name;
          // console.log(name);
          paramsObject.number = numberArray[i];
          paramsObject.carryCost=carryPrice;
          paramsObject.bogoState=bogoState;

          var newJson =JSON.stringify(paramsObject);

          selectParams.push(newJson);
          // console.log(selectParams);
        }
      }
  } catch (e) {

  }
  var   newArray =[];
  // console.log(typeof selectParams);
  for(var i in selectParams){
      let json = JSON.parse(selectParams[i]);
      newArray.push(json);
  }

  // console.log(orderType,orderNumber,userId,payState,checkState,gmtCreated,amount,newArray);
  let jsonResponse={};
  try {
    //如果执行事务成功
    await orderTransaction(orderType,orderNumber,userId,payState,checkState,gmtCreated,amount,newArray);
    //如果生成订单成功
    jsonResponse.status="1";
    jsonResponse.msg="新增订单成功";
    jsonResponse.object=orderNumber;
    ctx.response.body=jsonResponse;
  } catch (e) {
      console.log(e+"报错了事务");
      //如果生成订单成功
      jsonResponse.status="0";
      jsonResponse.msg="新增订单失败";
      jsonResponse.object="";
      ctx.response.body=jsonResponse;
  }

}

//查询订单接口
let selectOrder = async(ctx,next)=>{

    //订单号
    let orderNumber = ctx.request.body.orderNumber;
    let jsonResponse={} ;
    //首先拿订单号查数据库
    let orderObject;
    let object={};
    try {
      orderObject =  await SelectOrderBynumber(orderNumber)
    } catch (e){

      orderObject=null;
      return;
    }

    //拿订单号查商品详情信息
    let orderdscObject = await SelectOrderdscBynumber(orderNumber).catch((e)=>{console.log(e);return;});
    //如果没有数据
    if(orderObject===null||orderObject==undefined){

        jsonResponse.status="0";
        jsonResponse.msg="空数据";
        object.order = "";
        object.orderdsc="";
        jsonResponse.object=object;
        ctx.response.body = jsonResponse;
    }else{
        jsonResponse.status="1";
        jsonResponse.msg="查询成功";
        object.order = orderObject;
        object.orderdsc=orderdscObject;
        jsonResponse.object=object;
        ctx.response.body = jsonResponse;
    }

}






module.exports={
  "POST /createOrder":createOrder,
  "POST /selectOrder":selectOrder
}
