

const fs = require("fs");



function addController(router,dir){
  //拿到控制器的文件目录
  const files = fs.readdirSync(__dirname+"/"+dir);

  //过滤出控制器文件夹的js文件
  var fileArray = files.filter((f)=>{
      return f.endsWith(".js");
  });

  for(var f of fileArray){

    let mapping= require(__dirname+"/"+dir+"/"+f);

    addMapping(router,mapping);
  }

}


function addMapping(router,mapping){

    for(var key in mapping){
      if(key.startsWith("GET ")){
        var path = key.substring(4);
        router.get(path,mapping[key]);
      }else if(key.startsWith("POST ")){
        var path = key.substring(5);
        router.post(path,mapping[key]);
      }else{
        console.log("无效的URL");
      }
    }

}

module.exports=function (dir){
  let controllers_dir = dir||"controllers";
  const router = require("koa-router")();
  addController(router,controllers_dir);

  return router.routes();
}
