
//首先引入koa文件
const Koa =require("koa");

const session = require("koa-session2").default;

const bodyParser = require("koa-bodyparser");

const controller = require('./controller');

const   Store =  require( "./session.js");

console.log(session+"看看函数");

//创建一个koa对象
const app = new Koa();

//koa-session2
app.use(session({
    store: new Store()
}));

app.use(bodyParser());

app.use(controller());

//监听300端口
app.listen(3000);
