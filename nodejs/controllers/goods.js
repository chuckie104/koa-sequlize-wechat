

//查询产品分类dao
const SelectGoodsTypeList = require("../dao/goodsType").selectGoodsTypeList;
//查询产品列表dao
const SelectGoodsList = require("../dao/goods").selectGoodsList;
//查询产品
const SelectGoodsByTypeId =require("../dao/goods").selectGoodsByTypeId;

//模糊查询dao
const SelectGoodsByNameLike =require("../dao/goods").selectGoodsByNameLike;

const SelectUser = require("../dao/user");

//获取缓存
const getStorage =require("../util").getStorage;


//获取缓存
const setStorage =require("../util").setStorage;

//查询产品分类接口
let selectGoodsTypeList =async(ctx,next)=>{
  let object = await SelectGoodsTypeList();

  ctx.response.body=object;
}




//查询产品列表
let selectGoodsList =async(ctx,next)=>{

  //打折尺度
  let discount;

  //查出来的商品
  let object = await SelectGoodsList();


  //初始化返回数据
  let responseJson = {};

  if(object == ""||object==undefined ){
    responseJson.msg="查询失败";
    responseJson.status="0";
    responseJson.object = "";
    ctx.response.body =responseJson;
  }else {
    responseJson.msg="查询成功";
    responseJson.status="1";
    responseJson.object = object;
    ctx.response.body =responseJson;
  }
}


//用商品类id查询商品列表

let selectGoodsByTypeId = async (ctx,next)=>{
  let typeId=ctx.request.body.typeId;
  //会员等级
  let level = ctx.request.body.level;
  //打折尺度
  let discount;

  let object  = await SelectGoodsByTypeId(typeId);


  //初始化返回数据
  let responseJson = {};

  if(object==""||object==undefined){
    responseJson.msg="该分类没有商品";
    responseJson.status="0";
    responseJson.object = "";
    ctx.response.body =responseJson;
  }else {
    responseJson.msg="";
    responseJson.status="1";
    responseJson.object = object;
    ctx.response.body =responseJson;
  }
}

//搜索模糊查询接口
let selectGoodsByNameLike = async(ctx,next)=>{
    let name = ctx.request.body.name;
    let responseJson={};

    try {
      let goodsArray = await SelectGoodsByNameLike(name);
      
      if(goodsArray==undefined){
        responseJson.msg="没数据";
        responseJson.status="2";
        responseJson.object ="";

      }else{
        responseJson.msg="查询数据成功";
        responseJson.status="1";
        responseJson.object =goodsArray;
      }

    } catch (e) {
      console.log(e);
      responseJson.msg="查询数据异常";
      responseJson.status="0";
      responseJson.object ="";
    }
    ctx.response.body = responseJson;
}



//暴露接口
module.exports={
  "GET /selectGoodsTypeList":selectGoodsTypeList,
  "POST /selectGoodsList":selectGoodsList,
  "POST /selectGoodsByTypeId":selectGoodsByTypeId,
  "POST /selectGoodsByNameLike":selectGoodsByNameLike
}
