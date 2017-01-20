// pages/shoppingCard/shoppingCard.js
const ajax = require("../../utils/util").ajax;
const switchLevel=require("../../utils/util").switchLevel;

Page({
  data:{
    totalPrice:0,
    totalCarryPrice:0,
    shoppingCardTotalNumber:0,
    shoppingCardArray:[
      
    ]
  },
  //页面加载ajax
  onReady:function(){
    let level = wx.getStorageSync('level');    
     let discount=switchLevel(level); 
     let userId = wx.getStorageSync('userId'); 
     let that =this;
     //查看购物车映射的商品总价钱
    ajax("http://localhost:3000/selectTotalPrice","POST",{
      userId:userId
    }).then((data)=>{
      if(data.status=="1"){
        //返回的数据模型
        let object = data.object;
        let totalPrice = data.object.price*discount;
        let totalCarryPrice =data.object.carryPrice*discount; 
        that.setData({totalCarryPrice:totalCarryPrice});
        that.setData({totalPrice:totalPrice});
      }
    })
    //查看购物车总数 
    ajax("http://localhost:3000/selectShoppingCardByUserId","POST",{userId:userId})
    .then((object)=>{
    
      if(object.status=="1"){
        console.log(object.object);
        let length=object.object.length;
        that.setData({shoppingCardTotalNumber:length});
      }else{
        
      }
    })
    //根据购物车查商品总数
    ajax("http://localhost:3000/selectShoppingCardGoodsById","POST",{userId:userId})
    .then((object)=>{
    
      if(object.status=="1"){
        that.setData({ shoppingCardArray:object.object});
        
      }else{
        
      }
    })
  },

  //购物车搜索搜索
  searchProduct:function(event){
    let name = event.detail.value;
    let that = this;
    let userId = wx.getStorageSync('userId'); 
    ajax("http://localhost:3000/selectShoppingCardGoodsById","POST",{
      userId:userId,
      name:name
    }).then((data)=>{
     
          that.setData({ shoppingCardArray:data.object});   
      
    }).catch((error)=>{

    })
  },

  //点击增加购物车
   addNumber:function(event){
     //当前点击的货物下表下表
     let index = event.target.dataset.index;
     //商品id
     let goodsId = event.target.dataset.id;
     //商品名字
     let name = event.target.dataset.name;
     //用户id
     let userId = wx.getStorageSync('userId');

     let that = this;

     let shoppingCardArray = that.data.shoppingCardArray;
     //改变购物车数量大小
     for(let i in shoppingCardArray){
       if(index==i){
          //加入购物车
     ajax("http://localhost:3000/addShoppingCard","POST",{ userId:userId,             goodsId:goodsId,name:name})
     .then((data)=>{
       if(data.status=="2"){
          shoppingCardArray[i].number=parseInt(shoppingCardArray[i].number)+1;
          that.setData({shoppingCardArray:shoppingCardArray});
         that.setData({totalPrice:data.object.price});
         that.setData({totalCarryPrice:data.object.carryPrice});
       }
     }).catah((data)=>{
       console.log(data);
     })
        
       }
     }
     
    
   },

   //减少购物车数量
    subNumber:function(event){


     //当前点击的货物下表下表
     let index = event.target.dataset.index;
     //商品id
     let goodsId = event.target.dataset.id;
     //商品名字
  
     //用户id
     let userId = wx.getStorageSync('userId');

     let that = this;

     let number ;

      let level = wx.getStorageSync('level');    
      
     let discount=switchLevel(level); 

      let shoppingCardArray = that.data.shoppingCardArray;
     //改变购物车数量大小
     for(let i in shoppingCardArray){
       if(index==i){    
         //  
         if(parseInt(shoppingCardArray[i].number)==1){
           wx.showModal({
            title: '购物车提示',
            content: "是否删除"+shoppingCardArray[i].name+"",
            success: function(res) {
              if (res.confirm) {
                //这里调删除购物接口
                ajax("http://localhost:3000/delectShoppingCard","POST",{
                  userId:userId,
                  goodsId:goodsId
                }).then((data)=>{
                    if(data.status=="1"){
                      let object = data.object;
                      let totalPrice = data.object.price*discount;
                      let totalCarryPrice =data.object.carryPrice*discount; 
                      that.setData({totalCarryPrice:totalCarryPrice});
                      that.setData({totalPrice:totalPrice});
                      wx.showToast({
                      title: "删除"+shoppingCardArray[i].name+"成功",
                      icon: 'success',
                      duration: 2000
                    })
                    // 再前端抹除数据
                    //采取删除数组的方式
                    shoppingCardArray.splice(index, 1);
                    that.setData({shoppingCardArray:shoppingCardArray});
                    //购物车数量减减1
                    that.setData({shoppingCardTotalNumber:that.data.shoppingCardTotalNumber-1});
                  
                    }
                }).catch((data)=>{
                    console.log(data);
                })
              }
            }
          })
          return;
         } else{   
           number = shoppingCardArray[i].number;
           //这里调减少购物车接口接口
           ajax("http://localhost:3000/subShoppingCard","POST",{
            userId:userId,
            goodsId:goodsId,
            number:number
          }).then((data)=>{
              //减少成功
              if(data.status=="1"){
                let level = wx.getStorageSync('level');    
                let discount=switchLevel(level); 
                let totalPrice = data.object.price*discount;
                let totalCarryPrice =data.object.carryPrice*discount; 
                //数量减一
                shoppingCardArray[i].number=parseInt(shoppingCardArray[i].number)-1;
                that.setData({shoppingCardArray:shoppingCardArray});
                //更新价钱价钱
                 that.setData({totalCarryPrice:totalCarryPrice});
                 that.setData({totalPrice:totalPrice});
              }
          }).catch((e)=>{
            console(e);
          })
         }      
       }
     }
     
     
   }
  

})