var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'baobei'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取
router.post('/',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	pool.query('SELECT * FROM lunbo',function(err,rows){
		res.send(rows)
	})
})

//删除
router.post("/del",function (req, res, next) {
	res.header("Access-Control-Allow-Origin","*");
	console.log(req.body)
	pool.query(`DELETE FROM lunbo WHERE id=${req.body._tuid}`,function () {
		res.send("删除成功")
	})
  });

  
router.post('/img',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	var form = new formidable.IncomingForm();
	form.uploadDir = 'public/images'  //图片的存放路径
	form.parse(req,function(err,fields,files){
		//parse 是用来解析文件或图片信息的
		console.log(fields,files);
		for(i in files){
			var file = files[i];
			var fName = (new Date()).getTime();
			switch(file.type){
				case 'image/jpeg':
				fName = fName+'.jpg';
				break;
				case 'image/png':
				fName = fName + '.png';
				break;
				case 'image/gif':
				fName = fName + '.gif';
				break;
			}
			var newPath = 'public/images/' + fName
			//用来定义图片新的路径
			fs.renameSync(file.path,newPath);
			//接受两个参数 第一个是旧的路径 第二个是新的
			//res.send(newPath);
		}
		 pool.query(`INSERT INTO lunbo (img) VALUES ('http://localhost:3000/images/${fName}')`,function(err,rows){
            if(err) throw err;
            if(rows){
                pool.query('SELECT id,img FROM lunbo',function(err,rows){
                    res.send(rows);
                })
            }
        })
	})
})










module.exports = router;
