// pages/productList/productList.js
const ajax = require("../../utils/util").ajax;
const switchLevel=require("../../utils/util").switchLevel;

Page({
  data:{
    typeArray:[],
    vipSelect:["体验会员","金卡会员","白金会员","钻石会员",],
    isVipSelect:[true,false,false,false],
    vipSelectLevel:["0","1","2","3"],
    selectTypeArray:[],
    productMenuArray:[],
    shoppingCardTotalNumber:0,
    totalPrice:0,
    totalCarryPrice:0
  },
  //切换vip
  vipSelect:function(event){
    let index = event.target.dataset.index;
    let isVipSelect=this.data.isVipSelect;
    for(var i in isVipSelect){
      isVipSelect[i]=false;
      if(i==index){
         isVipSelect[i]=true;
      }
    }
    this.setData({isVipSelect,isVipSelect});
    let productMenuArray=this.data.productMenuArray;
    let level;
    //当前选中数组

      for(let i in isVipSelect){
          if(isVipSelect[i]){
            level=this.data.vipSelectLevel[i];
          } 
      }
      console.log(level);
      let discount = switchLevel(level);

    for(var p of productMenuArray ){
      let price = parseInt(p.price);
      let discountPrice = price*discount;
      p.discountPrice = discountPrice;
    }
      this.setData({productMenuArray:productMenuArray});
  },

  //切换商品种类
  selectGoodsByTypeId:function(event){
    //商品种类下标操作是否选中
    let index = event.target.dataset.index;
    //商品种类id用来 查数据库的
    let id = event.target.dataset.id;
    let level;
    //师傅选中数组
    let isVipSelect =  this.data.isVipSelect;
    for(let i in isVipSelect){
        if(isVipSelect[i]){
          level=this.data.vipSelectLevel[i];
        } 
    }

    let that = this;
    //类型选中数组
    let selectTypeArray = this.data.selectTypeArray;
    //循环操作是否选中
    for(let i in selectTypeArray){
      selectTypeArray[i]=false;
      if(i==index){
        selectTypeArray[i]=true;
      }
    }
    //把是否选中重新写入data
    this.setData({selectTypeArray:selectTypeArray});

    //调分类接口
     //页面初始化商品列表列表
    ajax("http://localhost:3000/selectGoodsByTypeId","POST",{typeId:id})
    .then((data)=>{
        let productMenuArray=data.object;
            let level;
            //当前选中数组
            let isVipSelect =  that.data.isVipSelect;
            for(let i in isVipSelect){
                if(isVipSelect[i]){
                  level=that.data.vipSelectLevel[i];
                } 
            }

            let discount = switchLevel(level);

          for(var p of productMenuArray ){
            let price = parseInt(p.price);
            let discountPrice = price*discount;
            p.discountPrice = discountPrice;
          }

           that.setData({productMenuArray:productMenuArray});
      
    }).catch((data)=>{
        console.log(data);
    })

  },

  //添加购物车
  addShoppingCard:function(event){
    
    let index = event.target.dataset.index;
    //拿到当前点击的货物id
    let goodsId = event.target.dataset.id;
    //拿到当前点击的货物名字
    let name= event.target.dataset.name;
    //会员等级
    let level = wx.getStorageSync('level');  
    
    let userId = wx.getStorageSync('userId'); 
    //商品折扣
    let discount=switchLevel(level); 

    let that =this;
     ajax("http://localhost:3000/addShoppingCard","POST",{ userId:userId,             goodsId:goodsId,name:name})
     .then((object)=>{
       if(object.status=="1"){
          that.setData(                         {shoppingCardTotalNumber:that.data.shoppingCardTotalNumber+1});
          let totalPrice = object.object.price*discount;
          let totalCarryPrice =object.object.carryPrice*discount; 
         
          //总价钱
          that.setData({totalPrice:totalPrice});
          //总运费
          that.setData({totalCarryPrice:totalCarryPrice});
          wx.showToast({
                      title: "添加"+name+"成功",
                      icon: 'success',
                      duration: 2000
                    })
       }else if(object.status=="2"){
          let totalPrice = object.object.price*discount;
          let totalCarryPrice =object.object.carryPrice*discount; 
         
          //总价钱
          that.setData({totalPrice:totalPrice});
          //总运费
          that.setData({totalCarryPrice:totalCarryPrice});
       }
      
     })
  },
  //模糊搜索查询
  searchProduct:function(event){
    let value = event.detail.value;
    let that =this;
    ajax("http://localhost:3000/selectGoodsByNameLike","POST",{
      name:value
    }).then((data)=>{
      if(data.status=="1"){
        let productMenuArray=data.object;
            let level;
            //当前选中数组
            let isVipSelect =  that.data.isVipSelect;
            for(let i in isVipSelect){
                if(isVipSelect[i]){
                  level=that.data.vipSelectLevel[i];
                } 
            }

            let discount = switchLevel(level);

          for(var p of productMenuArray ){
            let price = parseInt(p.price);
            let discountPrice = price*discount;
            p.discountPrice = discountPrice;
          }

        that.setData({productMenuArray:productMenuArray});
      }
    })
  },
 
  onReady:function(){
    //查看是否有登录状态
    try {
      var value = wx.getStorageSync('userId');      
      if (!value) {
          wx.redirectTo({
            url: "../index/index"
          })
          return;
      }
    } catch (e) {
   
    }
     let level = wx.getStorageSync('level');    
     let discount=switchLevel(level); 
     let userId = wx.getStorageSync('userId'); 
     let that =this;

    // 页面初始化 options为页面跳转所带来的参数
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
    //页面初始化商品分类列表
    ajax("http://localhost:3000/selectGoodsTypeList","GET",{})
    .then((data)=>{
        that.setData({typeArray:data});
        //获得列表的长度
        let length = that.data.typeArray.length;
        //声明一个数组
        let selectTypeArray = [];
        for(var i =0;i<length;i++){
         
            selectTypeArray.push(false);
                 
        }
        that.setData({selectTypeArray:selectTypeArray});

    }).catch((data)=>{
        console.log(data);
    })
   
    //页面初始化商品列表列表
    ajax("http://localhost:3000/selectGoodsList","POST",{})
    .then((data)=>{
        console.log(data);

        if(data.status=="1"){
            let productMenuArray=data.object;
            let level;
            //当前选中数组
            let isVipSelect =  that.data.isVipSelect;
            for(let i in isVipSelect){
                if(isVipSelect[i]){
                  level=that.data.vipSelectLevel[i];
                } 
            }

            let discount = switchLevel(level);

          for(var p of productMenuArray ){
            let price = parseInt(p.price);
            let discountPrice = price*discount;
            p.discountPrice = discountPrice;
          }

           that.setData({productMenuArray:productMenuArray});
        }else{
         
        }
    }).catch((data)=>{
        console.log(data);
    })
  },
 

  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
   //跳转到购物车
   toShoppingCard:function(){
     wx.navigateTo({
      url: '../shoppingCard/shoppingCard'
    })
   }

})