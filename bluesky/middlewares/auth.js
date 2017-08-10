
var jwt = require('jsonwebtoken');
const Account = require('../models/Account');
let redisModule = require('../utils/redis');

exports.loginAuth = (req, res, next) => {
  // req.params.token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    // 验证token是否有效
    redisModule.client.get('token', function (err, reply) {
        if (err) {
            // return res.status(500).send({
            //     success: false,
            //     message: '数据库出错了'
            // });
            res.json({success: false, msg: "数据库出错了"})
        }
        console.log("reply",reply)
        if (reply === token) {
            //验证并解析token
            jwt.verify(token, 'shhhhh', function(err, decoded) {
                if (err) {
                  // console.log(err);
                  return res.json({ success: false, message: 'token已失效' });
                } else {
                  //注入req,方便后面调用id等信息
                  req.token_info = decoded;
                  console.log("decoded",decoded)
                  // console.log(req.token_info.username);
                  // console.log(req.token_info.email);
                  next();
                }
            });
        }            
        else 
        {
            return res.json({
                success: false,
                message: 'token已失效'
            });
        }

    });

    
  } else {
    // 如果没有token，则返回错误
    return res.status(403).send({
        success: false,
        message: '找不到token'
    });
  }

  // next();
}
