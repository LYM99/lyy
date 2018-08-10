var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable'); //载入formidable

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


router.post('/ll', function(req, res) {
    console.log(req)
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './src/images';
    form.keepExtensions = true; //设置文件上传时临时文件的文件名是否包括扩展名
    form.maxFieldsSize = 2*1024*1024;
    form.parse(req,function(err,field,files){
      //console.log(files);
/*      if(Object.keys(files).length !== 0){
        var oldpath = files.file.path;
        var newpath = path.join(path.dirname(oldpath),files.uploadImg.name);
        fs.rename(oldpath,newpath,(err)=>{
            if(err) throw err;
            res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
            responseData.code = 1;
            responseData.message="上传成功！";
            res.json(responseData);
        })
      }*/
    });
});

 
module.exports = router;