//加载express模块
var express = require('express');
//加载body-parse接受前台发过来的数据
var bodyParser = require('body-parser');
const cookieParase = require('cookie-parser');
var formidable = require('formidable'); //载入formidable

var app = express();

app.use(express.static('src',{   // 静态资源中间件
  setHeaders : function(res,path,stat){
    res.setHeader('Cache-Control', 'max-age=' + 6000);
  }
}));

//设置bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParase());

//设置文件静态托管,当使用public的路由就会从下面找到文件
app.use('/public', express.static(__dirname + '/public'))

/*跨域*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

/*根据不同功能划分版块*/
app.use('/ly', require('./routers/main'));  //登录
app.use('/ym', require('./routers/ym'));
app.use('/ll', require('./routers/admin'));  //上传图片


//监听
app.listen(8081);
console.log("摧毁程序已启动，请立即疏散！3、2、1")