

//订单生成事务
var sequelize = require("../transaction");

//生成订单
var createOrder = require("./order").createOrder;
//生成订单详情
var createOrderdsc = require("./orderdsc").createOrderdsc;

//删除购物车接口
var destoryShoppingCard = require("./shoppingCard").destoryShoppingCard;

let orderTransaction=async(orderType,orderNumber,userId,payState,checkState,gmtCreated,amount,params)=>{
  try {
    // console.log(params);
   await sequelize.transaction(
      async (t)=>{
          await  createOrder(orderType,orderNumber,userId,payState,checkState,gmtCreated,amount,{transaction:t}).catch((error)=>{
          console.log(error+"订单");
        })
          await  createOrderdsc(params,{transaction:t}).catch((error)=>{
          console.log(error+"订单详情");
        })
        await destoryShoppingCard(userId).catch((error)=>{
            console.log(error+"删除购物车");
        })
      }

   )

  } catch (e) {
      console.log(e)
  }

}


module.exports={
  orderTransaction:orderTransaction
}
