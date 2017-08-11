/**
 * config
 */

var path = require('path');

var config = {
  // debug 为 true 时，用于本地调试
  debug: true,

  // mongodb 配置
  // db: 'mongodb://127.0.0.1/test',

  // redis 配置，默认是本地
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',

  // 程序运行的端口
  // port: 3000,

  // 文件上传配置
  upload: {
    path: path.join(__dirname, 'public/uploads/'),
    url: '/public/uploads/'
  },

};


module.exports = config;
