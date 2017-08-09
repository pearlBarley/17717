

const Account = require('../models/Account');
let bcrypt = require('bcrypt-nodejs');

exports.login = (req, res) => {
   //res.send('Hello World!');
  Account.find({username:req.body.username},function(err,data){
    if(data.length==0){
        res.json({success: false, msg: "不存在该用户"})
    }else{
      bcrypt.compare(req.body.password,data[0].password,function(err,data){
        if(data){
           res.json({success: true, msg: "登陆成功", data: data})
        }else{
           res.json({success: false, msg: "登录失败"})
        }
      });
    }
  })
}

//register
exports.signup = (req, res) => {
   Account.find({ "$or": [{ username: req.body.username },{ email: req.body.email }] }, function(err,data) {
    if (err) { res.send('err') }
    if(data.length == 0){
      bcrypt.hash(req.body.password,null,null,function(err,hash){
        const account = new Account();
        account.username = req.body.username
        account.email = req.body.email
        account.password = hash

        account.save(function(err,data){
           res.json({success: true, msg: "注册成功", data: data})
        })
      });   	
    }else{
      res.json({success: false, msg: "注册失败"})
    }
  })
}

 