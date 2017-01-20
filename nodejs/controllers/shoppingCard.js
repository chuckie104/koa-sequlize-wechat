

//根据id跟货物查询购物车dao
const SelectShoppingCard =require("../dao/shoppingCard").selectShoppingCard;
//更新购物车dao
const UpdateShoppingCard =require("../dao/shoppingCard").updateShoppingCard;
//新建购物车dao
const InsertShoppingCard =require("../dao/shoppingCard").insertShoppingCard;
//拿用户id查购物车
const SelectShoppingCardByUserId =require("../dao/shoppingCard").selectShoppingCardByUserId;
//拿商品id 查商品
const SelectGoodsById =require("../dao/goods").selectGoodsById;
//查询购物车表模糊查询
const SelectShoppingCardByLike =require("../dao/shoppingCard").selectShoppingCardByLike;

//删除购物车
const DelectShoppingCard =require("../dao/shoppingCard").delectShoppingCard;

const TotalPrice =require("../util").totalPrice;

//查询购物车商品接口
let selectShoppingCardGoodsById = async(ctx,next)=>{
  //查询购物车接口使用的用户id
  let userId = ctx.request.body.userId;
  //是否有参数name作为判断是否是模糊查询
  let name  = ctx.request.body.name;
  //声明查询出来购物车对象
  let goodsObject={};
  if(name==undefined||name==""){
    //先查询购物车有的goods
     goodsObject = await SelectShoppingCardByUserId(userId);
  }else{
    //做模糊查询
     goodsObject = await SelectShoppingCardByLike(userId,name);
  }
  //存放查出来的goodsid
  let goodsIdArray =[];
  //声明返回拼接json对象
  let jsonResponse ={};

  for(var f in goodsObject){
    goodsIdArray.push(goodsObject[f].goodsId);
  }
  //查询出再购物车的货物列表
  try {
    let goodsArray = await SelectGoodsById(goodsIdArray);
    if(goodsArray.length==0){
      jsonResponse.status="1";
      jsonResponse.msg="没有数据";
      jsonResponse.object = goodsArray;
    }else{
      jsonResponse.status="1";
      jsonResponse.msg="查询成功";
      for(var i in goodsArray){
        let number =goodsObject[i].number;
      goodsArray[i].dataValues.number=number;
      }
      jsonResponse.object = goodsArray;
    }
    ctx.response.body = jsonResponse;
  } catch (e) {
    console.log(e);
    jsonResponse.status="0";
    jsonResponse.msg="查询异常";
    jsonResponse.object =[];
    ctx.response.body = jsonResponse;
  }
}

//加入购物车接口
let addShoppingCard = async (ctx,next)=>{
    //拿到传进来的userId goodsId name
    let userId = ctx.request.body.userId;

    let goodsId  = ctx.request.body.goodsId;
    let name = ctx.request.body.name;

    //先查一遍数据库。看看有没数据
    let object = await SelectShoppingCard(userId,goodsId);
    //声明返回的json
    let jsonResponse={};
    //如果没数据
    if(object==undefined||object===null){
      try {
        //如果没用调用插入购物车接口
      await  InsertShoppingCard(userId,goodsId,name);
      //返回总价json 里面有运费总价跟商品总价
      let totalPriceObject = await TotalPrice(userId);

        jsonResponse.msg="加入购物车成功";
        jsonResponse.status="1";
        //查出来的数据
        jsonResponse.object =totalPriceObject;
        ctx.response.body=jsonResponse;
      } catch (e) {
        console.log(e);
        jsonResponse.msg="加入购物车失败";
        jsonResponse.status="0";
        jsonResponse.object ="";
        ctx.response.body=jsonResponse;
      }
    }else{
      //有数据
      let number = object.number+1;
      try {
      await  UpdateShoppingCard(userId,goodsId,number);
      let totalPriceObject = await TotalPrice(userId);
        jsonResponse.msg="加入购物车成功";
        //查出来的数据
        jsonResponse.object = "";
        jsonResponse.status="2";
        //查出来的数据
        jsonResponse.object =totalPriceObject;
        ctx.response.body=jsonResponse;
      } catch (e) {
        jsonResponse.msg="更新购物车失败";
        jsonResponse.status="0";
        ctx.response.body=jsonResponse;
      }
    }

}

//减少购物车个数
let subShoppingCard = async (ctx,next)=>{
  let userId=ctx.request.body.userId,
      goodsId=ctx.request.body.goodsId,
      number = ctx.request.body.number;
      //有数据
      let jsonResponse={};
      number = number-1;
      try {
      await  UpdateShoppingCard(userId,goodsId,number);
      let totalPriceObject = await TotalPrice(userId);
        jsonResponse.msg="减少成功";
        //查出来的数据
        jsonResponse.status="1";
        //查出来的数据
        jsonResponse.object =totalPriceObject;
        ctx.response.body=jsonResponse;
      } catch (e) {
        console.log(e);
        jsonResponse.msg="更新购物车失败";
        jsonResponse.status="0";
            jsonResponse.object = "";
        ctx.response.body=jsonResponse;
      }
}

//查询购物车接口
let selectShoppingCardByUserId = async(ctx,netx)=>{
  let userId = ctx.request.body.userId;

  let object=await SelectShoppingCardByUserId(userId);
  let jsonResponse={};
  if(object==undefined||object===null){
      jsonResponse.status="0";
      jsonResponse.msg="查询失败";
      jsonResponse.object="";
      ctx.response.body=jsonResponse;
  }else{
    jsonResponse.status="1";
    jsonResponse.msg="查询成功";
    jsonResponse.object=object;
    ctx.response.body=jsonResponse;
  }
}

//查询购物车总价接口
let selectTotalPrice = async(ctx,next)=>{
  //拿到传进来的userId g
  let userId = ctx.request.body.userId;

  var jsonResponse={};
  //购物车与商品照应
  try {
    //调用封装函数计算出总价钱与总运费
    let totalPriceObject = await TotalPrice(userId);

    jsonResponse.msg="查询成功";
    jsonResponse.status="1";
    jsonResponse.object=totalPriceObject;
    ctx.response.body=jsonResponse;
  } catch (e) {
    console.log(e);
    jsonResponse.msg="查询失败";
    jsonResponse.status="0";
    jsonResponse.object="";
    ctx.response.body=jsonResponse;
  }
}

//删除购物车接口
let delectShoppingCard = async (ctx,next)=>{
  let userId=ctx.request.body.userId,
      goodsId=ctx.request.body.goodsId,
      jsonResponse={};

      try {
        await DelectShoppingCard (userId,goodsId);
        let totalPriceObject = await TotalPrice(userId);
        jsonResponse.status="1";
        jsonResponse.msg="删除购物车成功";
        jsonResponse.object=totalPriceObject;
        ctx.response.body=jsonResponse;
      } catch (e) {
        console.log(e);
        jsonResponse.status="0";
        jsonResponse.msg="删除购物车异常";
        ctx.response.body=jsonResponse;
      }
}


module.exports={
  "POST /addShoppingCard":addShoppingCard,
  "POST /selectShoppingCardByUserId":selectShoppingCardByUserId,
  "POST /selectTotalPrice":selectTotalPrice,
  "POST /selectShoppingCardGoodsById":selectShoppingCardGoodsById,
  "POST /subShoppingCard":subShoppingCard,
  "POST /delectShoppingCard":delectShoppingCard

}
