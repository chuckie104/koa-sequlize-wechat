const fs= require("fs");

const db = require("./db");

let files = fs.readdirSync(__dirname+"/modules");

let filesArray = files.filter((f)=>{
  return f.endsWith(".js");
});

module.exports = {};

for(let f of filesArray){
  let name = f.substring(0,f.length-3);
  module.exports[name]=require(__dirname + '/modules/' + f);
}

module.exports.sync = () => {
    db.sync();
};
