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

router.get('/examination',bodyParser.json(),function(req,res){
 	console.log(req.body);

	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password : 'root',
		database : 'lyy'
	});
	connection.connect();
	var sql = "SELECT * FROM question limit 0,15;"
	connection.query(sql, function (err, result) {
    	if(err){
    		console.log('[SELECT ERROR] - ',err.message);
    		return;
        }
        console.log(result);
        if(result[0]){  
        	responseData.code = 0;
        	responseData.data = result;
        	res.json(responseData);
        	connection.end();
        }else{
        	
        }
	});
});
module.exports = router;