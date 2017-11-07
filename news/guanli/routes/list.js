var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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

router.post('/get', function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  pool.query(`SELECT * FROM datalist`,function(err,rows){
    res.send(rows)
  })
});

//获取详情
router.post('/xq',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  pool.query(`SELECT * FROM datalist WHERE id=${req.body.id}`,function(err,rows){
    res.send(rows);
    console.log(req.body.id)
  })
})

//添加
router.post('/inst', function(req, res, next) {
  console.log(req.body)
  var title=req.body.tit;
  var namea=req.body.namea;
  var timer=req.body.timer;
  var sele=req.body.sele;
  var detail=req.body.datail;
  console.log(title,namea,timer,sele,detail)
  res.header('Access-Control-Allow-Origin','*');
  pool.query(`INSERT INTO datalist (uid,title,time,name,content) VALUES (${sele},'${title}','${timer}','${namea}','${detail}')`,function(err,rows){
     res.send(rows)
  })
});

//删除
router.post("/del",function (req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  console.log(req.body)
  pool.query(`DELETE FROM datalist WHERE id=${req.body.id}`,function () {
      res.send("删除成功")
  })
});

//修改
router.post('/amend', function(req, res, next) {
  var title=req.body.tit;
  var namea=req.body.namea;
  var timer=req.body.timer;
  var sele=req.body.sele;
  var datail=req.body.datail;
  var ii=req.body.ii;
  console.log(req.body)
  // console.log(ii)
  res.header('Access-Control-Allow-Origin','*');
  pool.query(`UPDATE datalist SET uid=${sele},title="${title}",time="${timer}",name="${namea}",content='${datail}' WHERE id=${ii}`,function(err,rows){
    // console.log(err)
    res.send(rows)
  })
});


module.exports = router;
