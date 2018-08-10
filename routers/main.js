var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var responseData;
router.use(function(req, res , next){
	//每次调用api下面的这个都被初始化，code为0
	responseData = {
		code:0,
		message:'',
		data:{

		},
	};
	next();
})

router.post('/register',bodyParser.json(),function(req,res){
	var username = req.body.username,
		password = req.body.password,
		telphone = req.body.telphone,
		sex = req.body.sex,
		age = req.body.age,
		home = req.body.home;

	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password : 'root',
		database : 'lyy'
	});
	connection.connect();
	var sql = "SELECT * FROM userinfo WHERE telphone = '"+telphone+"';";
	var sql1 = 'INSERT INTO userinfo (username,password,sex,age,telphone,home) VALUES ('+"'"+username+"',"+"'"+password+"',"+"'"+sex+"',"+age+",'"+telphone+"',"+"'"+home+"'"+');';
	connection.query(sql, function (err, result) {
    	if(err){
    		console.log('[SELECT ERROR] - ',err.message);
    		return;
        }
        if(result[0]){  //说明已经注册
        	responseData.code = 0;
        	responseData.message="该电话号码已被注册！";
        	res.json(responseData);
        	connection.end();
        }else{
        	connection.query(sql1, function (err, result) {
        		if(result.insertId){
		            console.log(username+'注册成功');
		            console.log('_______________________________')
		        	responseData.code = 1;
		        	responseData.message="注册成功！";
		        	res.json(responseData);
		        	connection.end();
		        	return
		        }else{
		        	responseData.code = 0;
		        	responseData.message="注册失败！";
		        	res.json(responseData);
		        	connection.end();
		        	return
		        }
        	})
        }
	});
});

router.post("/login",bodyParser.json(),function(req,res){
	var username = req.body.username,
		password = req.body.password;
	//res.cookie('user', 'lililiwen');
    console.log(req.cookies);
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password : 'root',
		database : 'lyy'
	});
	connection.connect();
	var  sql = "SELECT * FROM userinfo WHERE username = '"+username+"' and password = '"+password+"';";
	connection.query(sql, function (err, result) {
    	if(err){
    		console.log('[SELECT ERROR] - ',err.message);
    		return;
        }
        if(result[0]){
        	console.log(result[0].username+'登录一次！');
        	responseData.code = 1;
        	responseData.message = "登录成功！";
        	responseData.data.username = result[0].username;
        	res.json(responseData);
        	connection.end();
        	return 
        }else{
        	responseData.code = 0;
        	responseData.message = "账号或密码错误！";
        	res.json(responseData);
        	connection.end();
        	return
        }
	});

});
 
module.exports = router;