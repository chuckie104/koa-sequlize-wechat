
//拿用户id查购物车
const SelectShoppingCardByUserId =require("./dao/shoppingCard").selectShoppingCardByUserId;

const SelectGoodsById = require("./dao/goods").selectGoodsById;

var cache={}

function setStorage(n,v){
  cache[n]=new Buffer(JSON.stringify(v));
}

function getStorage(n){
  return JSON.parse(cache[n].toString());
}

//统计总价函数装
var totalPrice=async (userId)=>{
  //总货物的id
  let object=await SelectShoppingCardByUserId(userId);
  //goodsId数组
  var array =[];
  //number数组
  var numberArray = [];
  // var goodsArray=[];
  var jsonResponse={};
  //总价
  let price=0;
  //总运费
  let carryPrice=0;
  if(object==undefined){

  }else{
    for(let i in object){
      array.push(object[i].goodsId);
      numberArray.push(object[i].number);
    }
  }
  try {
    //
    let goodsArray = await SelectGoodsById(array);
    for(let i in goodsArray){
      //获取当前商品在购物车的数量
      let number = parseInt(numberArray[i]);
      //总价累加
       price += parseInt(goodsArray[i].price)*number;
       //运费累加
       carryPrice += parseInt(goodsArray[i].carryPrice);
    }
    //返回商品总价跟货物总价
    return {price:price,carryPrice:carryPrice}

  } catch (e) {
      console.log(e);
      return{};
  }
}


module.exports={
  setStorage:setStorage,
  getStorage:getStorage,
  totalPrice:totalPrice
}
