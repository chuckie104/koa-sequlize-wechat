
const db = require("../db");

const TYPE=db.STRING(255);


//参数说明 商品ID 商品分类ID 商品名字 商品标题 商品描述 商品库存 商品价钱 商品图片地址 商品运费 商品销售状态 是否买一送一 是否热销
module.exports=db.defineModel("tt_goods",{
  id:TYPE,
  typeId:TYPE,
  name:TYPE,
  title:TYPE,
  introduce:TYPE,
  stock:TYPE,
  price:TYPE,
  imgUrl:TYPE,
  carryPrice:TYPE,
  saleState:TYPE,
  bogoState:TYPE,
  hotState:TYPE,
  suffImgUrl:TYPE

})
