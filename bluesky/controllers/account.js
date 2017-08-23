

const Account = require('../models/Account');
let bcrypt = require('bcrypt-nodejs');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let redisModule = require('../utils/redis');

// let createRandomToken = (callback) => {
//       crypto.randomBytes(32,  (err, salt) => {
//         if (err) { throw err;}
//         salt = new Buffer(salt).toString('hex');
//         crypto.pbkdf2('123456', salt, 3000, 32, function (err,hash) {
//             if (err) { throw err; }
//             hash = new Buffer(hash).toString('hex');
//             callback(hash);
//         })
//       })
// }
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
            //  createRandomToken((token)=>{
            //      data[0].tokens.push(token)
            //      let tokens = data[0].tokens
            //      //console.log(new Date().toLocaleString()) getTime()
            //      let tokenExpires = Date.now() + 3600000; // 1 hour
            //      Account.update({ username: req.body.username },{tokens, tokenExpires}, (err, numberAffected, rawResponse) => {
            //          if (err) { res.json({success: false, msg: err}) }
            //          res.json({success: true, msg: "登陆成功", token: token})
            //      });
            //  })

            // 创建token
            //var token = jwt.sign({data: 'foobar'}, 'secret', { expiresIn: 60 * 60 });
            var username = data[0].username,
                email = data[0].email,
                _id = data[0]._id
            // var token = jwt.sign({ username, email }, 'shhhhh', { expiresIn: 60 * 60 }); //用户在有效时间内logout前端销毁token后，token还是有效的，所以有效期判断放在redis上
            var token = jwt.sign({ username, email, _id }, 'shhhhh');
            redisModule.client.set('token', token);
            redisModule.client.expire('token', 60 * 60);
            // setTimeout(()=>{
            //      redisModule.client.get('token',redisModule.redis.print);
            // },5000)

            // 返回token
            res.json({
                success: true,
                message: '登陆成功',
                token: token
            });
           
        }else{
            res.json({success: false, msg: "登录失败"})
        }
      });
    }
  })
}

//logout
exports.logout = (req, res) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        //redisModule.client.set('token', { is_expired: true });
        redisModule.client.expire('token', 0);  //设置token为过期
        res.json({success: true, msg: "登出成功"})
    } else {
        // 如果没有token，则返回错误
       res.json({success: false, msg: "找不到token"})
  }
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
            if(err) res.json({success: false, msg: err})
            res.json({success: true, msg: "注册成功", data: data})
        })
    });   	
    }else{
        res.json({success: false, msg: "注册失败"})
    }
  })
}

 