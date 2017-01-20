
//首先引入model
const model = require("../module");

const GoodsType = model.goodsType;

//查询商品分类列表
let selectGoodsTypeList = async (ctx,next)=>{
    var goodsTypeList =await GoodsType.findAll({

    });
    return goodsTypeList;
}

//
module.exports = {
  selectGoodsTypeList:selectGoodsTypeList
};
