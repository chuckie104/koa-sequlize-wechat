

const model = require("../module");

const UserAddress =model.userAddress;


//查询该用户所有地址

let selectUserAddressByUserId = async(userId)=>{
    let addressObject = await UserAddress.findAll({
      where:{
        userId:userId
      }
    })

    return addressObject;
}


module.exports={
  selectUserAddressByUserId:selectUserAddressByUserId
}
