
const model = require("../module");

const Order =model.order;


//生成订单
//参数列表 订单类型(0商品购买 1vip 2活动) 订单编号 用户id 支付状态(默认 0 未支付 1已支付) 后台处理状态(默认 0 未处理 1已处理) 总价
let createOrder = async(orderType,orderNumber,userId,payState,checkState,gmtCreated,amount,transaction={})=>{
  try {
    await Order.create({
        orderType:orderType,
        orderNumber:orderNumber,
        userId:userId,
        payState:payState,
        checkState:checkState,
        gmtCreated:gmtCreated,
        amount:amount
    },transaction)


  } catch (e) {
    console.log(e);
  }
}

//根据订单号查订单
let selectOrderBynumber =async(orderNumber)=>{
    let order = await Order.findOne({
      where:{
        orderNumber:orderNumber
      }
    });

    return order;
}

module.exports={
  createOrder:createOrder,
  selectOrderBynumber:selectOrderBynumber
}
