/**
 * Module dependencies.
 */
const express = require('express');
var http = require('http');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');  
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
// const homeController = require('./controllers/home');
// const userController = require('./controllers/user');
// const apiController = require('./controllers/api');
// const contactController = require('./controllers/contact');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();
// var server = http.createServer(app);
var server = http.Server(app);

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8999);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// html templete
// app.engine('.html', require('ejs').__express);
// app.set('view engine', 'html');

// pug templete
// app.set('view engine', 'pug');

// app.use(expressStatusMonitor()); //与socket.io 冲突
app.use(compression());
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser());
// app.use(bodyParser.json());  //获取不到req.body 换了上面的写法
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use((req, res, next) => {
//     if (req.path === '/api/upload') {
//         next();
//     } else {
           // 经测试会导致post请求失败  node post Error: CSRF token missing express
//         lusca.csrf()(req, res, next);
//     }
// });
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
        req.path !== '/login' &&
        req.path !== '/signup' &&
        !req.path.match(/^\/auth/) &&
        !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    } else if (req.user &&
        req.path == '/account') {
        req.session.returnTo = req.path;
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */

// 引入路由方法一
// require('./routes')(app);

// 引入路由方法二
var router = require('./routes/router');
var apiRouter = require('./routes/apiRouter');
app.use('/', router);
app.use('/api', apiRouter);

// 引入路由方法三
// app.get('/', homeController.index);
// app.get('/', homeController.index);
// app.get('/signin', homeController.signin);
// app.post('/signin', homeController.signin_post);


/**
 * Error Handler.
 */
app.use(errorHandler());

/*
 * Socket.io
 */
let socketio = require('./socket');
// 房间用户名单
app.roomInfo = {};
socketio.start(server, app.roomInfo);
// require('./sockets')(app, exports.server);

// var socketModule = require('socket.io');
// var socketModule = require('socket.io')({
//     transports: ['websocket']
// });
// io.configure(function() {
//     io.set('transports', ['websocket']);
// });


// app.users = {};//存储在线用户列表的对象
// io.sockets.on('connection', function (socket) {

//   //有人上线
//   socket.on('online', function (data) {
//     //将上线的用户名存储为 socket 对象的属性，以区分每个 socket 对象，方便后面使用
//     socket.name = data.user;
//     //users 对象中不存在该用户名则插入该用户名
//     if (!app.users[data.user]) {
//       app.users[data.user] = data.user;
//     }
//     //向所有用户广播该用户上线信息
//     io.sockets.emit('online', {users: app.users, user: data.user});
//   });

//   //有人发话
//   socket.on('say', function (data) {
//     if (data.to == 'all') {
//       //向其他所有用户广播该用户发话信息
//       socket.broadcast.emit('say', data);
//     } else {
//       //向特定用户发送该用户发话信息
//       //clients 为存储所有连接对象的数组
//       var clients = io.sockets.clients();
//       //遍历找到该用户
//       clients.forEach(function (client) {
//         if (client.name == data.to) {
//           //触发该用户客户端的 say 事件
//           client.emit('say', data);
//         }
//       });
//     }
//   });

//   //有人下线
//   socket.on('disconnect', function() {
//     //若 users 对象中保存了该用户名
//     if (app.users[socket.name]) {
//       //从 users 对象中删除该用户名
//       delete app.users[socket.name];
//       //向其他所有用户广播该用户下线信息
//       socket.broadcast.emit('offline', {users: app.users, user: socket.name});
//     }
//   });
// });

/**
 * Start Express server.
 */
// app.listen(app.get('port'), () => {
server.listen(app.get('port'), function() {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;