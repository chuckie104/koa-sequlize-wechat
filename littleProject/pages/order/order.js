// pages/order/order.js
const ajax = require("../../utils/util").ajax;
const switchLevel =require("../../utils/util").switchLevel;
 let level = wx.getStorageSync('level');    
  let discount=switchLevel(level); 
  let userId = wx.getStorageSync('userId'); 
//商品名称 商品数量 商品单价 productInfoList
Page({
  data:{
    pickIndex:0,
    addressArray:[],
    address:{address:"地址",name:"收货人",phone:"联系电话"},
    productInfoList:[],
    totalPrice:0,
    totalCarryPrice:0,
    isShowAddress:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){

    let that = this;
    // 页面渲染完成
    //当前页面首先查询订单货物
    ajax("http://localhost:3000/selectOrder","POST",{
      orderNumber:"1485018215486001"
    }).then((data)=>{
      if(data.status=="1"){
          that.setData({productInfoList:data.object.orderdsc});
          var totalPrice=0;
          var totalCarryPrice=0;
          for(let i in data.object.orderdsc){
            let {price,number,carryCost}=data.object.orderdsc[i];
            console.log(price);
            totalPrice+=price*number;
            totalCarryPrice+=carryCost;
          }
          that.setData({totalPrice:totalPrice*discount});
          that.setData({totalCarryPrice:totalCarryPrice});
      }
    })

    //当前页面查询用户地址
     ajax("http://localhost:3000/selectAddress","POST",{
      userId:userId
    }).then((data)=>{
      //查询成功的状态
      if(data.status=="1"){
          let object =data.object;
          //首先得到地址的长度
          let length = object.length;
          //声明地址长度对应的地址名字数组
          let addressArray =[];
          //default地址
          let selectAddress={};
          let selectBindAddress={};
          //选择器地址名称 例如  地址1 
          for(var i=0;i<length;i++){
            let a = i+1;
            if(object[i].isDefault==0){
              selectAddress=object[i];
              selectBindAddress=object[i];
              that.setData({pickIndex:i});
              that.setData({pickBindIndex:i});
            }
            addressArray.push("地址"+a+"");
          }
          that.setData({isShowAddress:true});
          that.setData({addressArray:addressArray});
          that.setData({selectAddress:selectAddress});
          that.setData({allAddress:object});
           that.setData({selectBindAddress:selectBindAddress});
          that.setData({allBindAddress:object});
      }else if(data.status="0"){
        that.setData({isShowAddress:false});
      }
    })
  },
  //地址选择
  bindPickerChang:function(event){
    let addressIndex = event.detail.value;
    this.setData({pickIndex:addressIndex});
    //用户所有地址
    let addAddress = this.data.allAddress;
    for(let i in addAddress){
      //如果是选中的对应的下标更换页面数据
      if(i==addressIndex){
        this.setData({selectAddress:addAddress[i]});
      }
    }
  },
  // 发票地址选择
  bindPickerBindChang:function(event){
    let addressIndex = event.detail.value;
    console.log(addressIndex);
    this.setData({pickBindIndex:addressIndex});
    //用户所有地址
    let addAddress = this.data.allBindAddress;
    for(let i in addAddress){
      //如果是选中的对应的下标更换页面数据
      if(i==addressIndex){
        this.setData({selectBindAddress:addAddress[i]});
      }
    }
  }
})