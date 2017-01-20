function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function getRandomColor(){ 
return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
} 

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n;
}
//封装的ajax

function ajax(url,requestType,data){
  let promise = new Promise(function(resolve,reject){
       wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method:requestType,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        resolve(res.data);
      },fail:function(error){
        reject(error);
      }
  })
  })

  return promise;
  
}

//switch
function switchLevel(params){
   let discount;
    switch (params) {
  case "0":
    discount =1;
    break;
    case "1":
    discount =0.8;
    break;
    case "2":
    discount =0.7;
    break;
    case "3":
    discount =0.5;
    break;
  default:  
     discount=1; 
  }

  return discount;
}



module.exports = {
  formatTime: formatTime,
  getRandomColor:getRandomColor,
  ajax:ajax,
  switchLevel:switchLevel
}


