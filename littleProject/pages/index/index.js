//index.js
//获取应用实例
import util from "../../utils/util.js";

var app = getApp()
Page({
  data: {
   username:"",
   password:""
  },
  //事件处理函数
  getUsername:function(event){
      let username= event.detail.value;
      this.setData({username:username});
  
  },

  getPassword:function(event){
      let password= event.detail.value;
      this.setData({password:password});
  },
  login:function(){
    let that =this;
    let username = this.data.username;
    let password = this.data.password;
    wx.request({
      url: 'http://localhost:3000/signin', 
      data: {
        username: username ,
        password: password
      },
      method: "POST",
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.status);
        if(res.data.status=="1"){
            wx.setStorageSync('userLevel', res.data.object.level)
            wx.setStorageSync("userId",res.data.object.id);
            wx.setStorageSync("username",that.data.username);
            wx.navigateTo({url:"../productList/productList"});
        }else if(res.data.status=="2"){
            wx.showModal({
            title: '登录提示',
            content: res.data.msg,
            success: function(res) {
              if (res.confirm) {         
              that.setData({password:""});
                
              }
            }
          })
        }else{
           wx.showModal({
            title: '登录提示',
            content: res.data.msg,
            success: function(res) {
              if (res.confirm) {
                that.setData({username:""});
                that.setData({password:""});
              }
            }
          })
        }
      }
    })
  }

    
})
