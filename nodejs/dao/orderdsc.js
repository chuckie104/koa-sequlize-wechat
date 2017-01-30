

const model = require("../module");

const Orderdsc =model.orderdsc;


//这里要传一个数组进来
//生成多条数据
let createOrderdsc = async(params,transaction={})=>{
    try {
        await Orderdsc.bulkCreate(params,transaction);

    } catch (e) {
        console.log(e);
    }
}

//根据订单号查订单
let selectOrderdscBynumber =async(orderNumber)=>{
    let order = await Orderdsc.findAll({
      where:{
        orderNumber:orderNumber
      }
    });

    return order;
}

module.exports={
  createOrderdsc:createOrderdsc,
  selectOrderdscBynumber:selectOrderdscBynumber
}
