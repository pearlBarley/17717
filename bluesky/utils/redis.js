var config = require('../config/config.js');
var logger = require('./logger')
var redis = require('redis') 

var client = redis.createClient({
  port: config.redis_port,
  host: config.redis_host,
  db: config.redis_db,
  password: config.redis_password,
});


// client.auth(RDS_PWD,function(){
//     console.log('通过认证');
// });

client.on('ready',function(res){
    console.log('ready');    
});

client.on('connect',function(){
    // client.set('author', 'Wilson',redis.print);   
    // client.expire('author', 3);  // Expire in 3 seconds
    // client.set('key', 'value!', 'EX', 10);  // this key will expire after 10 seconds
    // client.get('author', redis.print);
    // client.hmset('short', {'js':'javascript','C#':'C Sharp'}, redis.print);
    // client.hmset('short', 'SQL','Structured Query Language','HTML','HyperText Mark-up Language', redis.print);

    console.log('connect');
});



client.on('error', function (err) {
  if (err) {
    logger.error('connect to redis error, check your redis config', err);
    process.exit(1);
  }
})



// //写入JavaScript(JSON)对象
// client.hmset('sessionid', { username: 'kris', password: 'password' }, function(err) {
//   console.log(err)
// })

// //读取JavaScript(JSON)对象
// client.hgetall('sessionid', function(err, object) {
//   console.log(object)
// })


// exports = module.exports = client;
exports.redis = redis;
exports.client = client;
