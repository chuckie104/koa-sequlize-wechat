
//首先引入koa文件
const Koa =require("koa");



const bodyParser = require("koa-bodyparser");

const controller = require('./controller');



//创建一个koa对象
const app = new Koa();



app.use(bodyParser());

app.use(controller());

//监听300端口
app.listen(3000);
