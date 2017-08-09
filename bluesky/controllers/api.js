

const Account = require('../models/Account');
let bcrypt = require('bcrypt-nodejs');
let crypto = require('crypto');

let createRandomToken = (callback) => {
      crypto.randomBytes(32,  (err, salt) => {
        if (err) { throw err;}
        salt = new Buffer(salt).toString('hex');
        crypto.pbkdf2('123456', salt, 3000, 32, function (err,hash) {
            if (err) { throw err; }
            hash = new Buffer(hash).toString('hex');
            callback(hash);
        })
      })
}
//hmac-sha1加密
// let createRandomToken = (content, callback) => {
//     //var content = 'password';//加密的明文；
//     var token;//加密的密钥；
//     var buf = crypto.randomBytes(16);
//     token = buf.toString('hex');//密钥加密；
//     //console.log("生成的token(用于加密的密钥):"+token);
//     var SecrectKey=token;//秘钥；
//     var Signture = crypto.createHmac('sha1', SecrectKey);//定义加密方式
//     Signture.update(content);
//     var result=Signture.digest().toString('base64');//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
//     //console.log("加密的结果f："+miwen);
//     callback(result)
// }
    


exports.login = (req, res) => {
   //res.send('Hello World!');
  Account.find({username: req.body.username},function(err,data){
    if (err) { res.json({success: false, msg: err}) }
    if(data.length==0){
        res.json({success: false, msg: "不存在该用户"})
    }else{
      bcrypt.compare(req.body.password,data[0].password,function(err,bool){
        if(bool){
           //生成token
           createRandomToken((token)=>{
               data[0].tokens.push(token)
               let tokens = data[0].tokens
               //console.log(new Date().toLocaleString()) getTime()
               let tokenExpires = Date.now() + 3600000; // 1 hour
               Account.update({ username: req.body.username },{tokens, tokenExpires}, (err, numberAffected, rawResponse) => {
                   if (err) { res.json({success: false, msg: err}) }
                   res.json({success: true, msg: "登陆成功", token: token})
               });
           })
           
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
    if (err) { res.json({success: false, msg: err}) }
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

 