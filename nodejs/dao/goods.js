
const Model = require("../module");

const Goods = Model.goods;

//查询产品所有列表
let selectGoodsList = async ()=>{
  
  let goodsList = await Goods.findAll({
      where:{
        saleState:"1"
      }
  })
  return goodsList;
}

//查询产品byTypeId
let selectGoodsByTypeId = async (typeId)=>{
  // let typeIdP =parseInt(typeId);
  let good = await Goods.findAll({
    where:{
      typeId:typeId
    }
  })
  return good;
}

//查询产品byId
let selectGoodsById  = async(id)=>{
  let good = await Goods.findAll({
    where:{
      id:{
        $in:id
      }
    }
  })
  return good;
}

//根据中文名字模糊查询
let selectGoodsByNameLike = async(name)=>{
  let goods = await Goods.findAll({
    where:{
      name:{
        $like:"%"+name+"%"
      }
    }
  })
  return goods;
}

module.exports={
  selectGoodsList:selectGoodsList,
  selectGoodsByTypeId:selectGoodsByTypeId,
  selectGoodsById:selectGoodsById,
  selectGoodsByNameLike:selectGoodsByNameLike
}
