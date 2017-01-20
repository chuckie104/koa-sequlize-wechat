const Sequelize = require('sequelize');

const config = require('./config');


//数据库名字
var sequelize =new Sequelize(config.database,config.username,config.password,{
  host:config.hose,
  dialect: 'mysql',
  pool: {
       max: 5,
       min: 0,
       idle: 30000
   }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name,attributes){
  let attrs={};
  for(var key in attributes){
    let value = attributes[key];
    //如果value是对象证明不知道一个参数并且存在type的类型
    if(typeof value ==='object'&& value["type"]){
        value.allowNull=value.allowNull||null;
        attrs[key] = value;
    }else{
      attrs[key] = {
                type: value,
                allowNull: false
            };
    }
  }
  attrs.id = {
      type: ID_TYPE,
      primaryKey: true
  };

  return sequelize.define(name,attrs,{
    tableName:name,
    timestamps: false,
  })
}

  const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

  var exp = {
      defineModel: defineModel,
      sync: () => {
          // only allow create ddl in non-production environment:
          if (process.env.NODE_ENV !== 'production') {
              sequelize.sync({ force: true });
          } else {
              throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
          }
      }
  };

  for (let type of TYPES) {
      exp[type] = Sequelize[type];
  }

  exp.ID = ID_TYPE;

  module.exports = exp;
