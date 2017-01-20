
const Model = require("../module");

const ShoppingCard = Model.shoppingCard;

//更改购物车信息
//参数列表 用户id 商品id 商品名字 商品数量
var updateShoppingCard = async(userId,goodsId,number)=>{
    await ShoppingCard.update({
      number:number
    },{
      where:{
        userId:userId,
        goodsId:goodsId
      }
    })
}

// 添加购物车数据
var insertShoppingCard =async(userId,goodsId,name)=>{
  await ShoppingCard.create({
      userId:userId,
      goodsId:goodsId,
      name:name,
      number:1

  })
}

//根据货物id跟用户id查到指定的货物
var selectShoppingCard = async(userId,goodsId)=>{
  let shoppingCard = await ShoppingCard.findOne({
    where:{
      userId:userId,
      goodsId:goodsId
    }
  })
  return shoppingCard;
}

//根据用户id找到所有货物
var selectShoppingCardByUserId = async(userId)=>{
  let shoppingCard = await ShoppingCard.findAll({
    where:{
      userId:userId,
    }
  })
  return shoppingCard;
}

//模糊查询购物车
var selectShoppingCardByLike =async(userId,name)=>{
    let goodsList =await ShoppingCard.findAll({
      where:{
        userId:userId,
        name:{
          $like:"%"+name+"%"
        }
      }
    })
    return goodsList;
}

//删除购物车
var delectShoppingCard =async(userId,goodsId)=>{
    await  ShoppingCard.destroy({
      where:{
        userId:userId,
        goodsId:goodsId
      }
    })
}



module.exports={
  updateShoppingCard:updateShoppingCard,
  insertShoppingCard:insertShoppingCard,
  selectShoppingCard:selectShoppingCard,
  selectShoppingCardByUserId:selectShoppingCardByUserId,
  delectShoppingCard :delectShoppingCard,
  selectShoppingCardByLike:selectShoppingCardByLike
}
