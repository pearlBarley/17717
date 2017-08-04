var socketio = require('socket.io');
// var actionRecorder = require('./common/action_recorder');
// //var CryptoUtils = require('./CryptoUtils')
// var fs = require('fs');
// if (!fs.existsSync('./public/src/static/upload/voice')) {
//     fs.mkdirSync('./public/src/static/upload/voice');
// }

// let onlineManagers = [];

exports.start = function (server, roomInfo) {

    // 创建socket服务
    // var IO = socketModule.listen(server);
    var io = socketio(server);

    var room = io.of('/room');
    io.on('connection', function (socket) {
    //room.on('connection', function (socket) {
        // 获取请求建立socket连接的url
        // 如: http://localhost:3000/room/room_1, roomID为room_1
        var url = socket.request.headers.referer;
        var splited = url.split('/');
        var roomID = splited[splited.length - 1];   // 获取房间ID
        var user = '';

        socket.on('join', function (userName) {
            user = userName;

            // 将用户昵称加入房间名单中
            if (!roomInfo[roomID]) {
            roomInfo[roomID] = [];
            }
            roomInfo[roomID].push(user);

            socket.join(roomID);    // 加入房间
            // 通知房间内人员
            io.to(roomID).emit('sys', user + '加入了房间', roomInfo[roomID]);  
            console.log(user + '加入了' + roomID);
        });

        socket.on('leave', function () {
            socket.emit('disconnect');
        });

        socket.on('disconnect', function () {
            // 从房间名单中移除
            var index = roomInfo[roomID].indexOf(user);
            if (index !== -1) {
            roomInfo[roomID].splice(index, 1);
            }

            socket.leave(roomID);    // 退出房间
            io.to(roomID).emit('sys', user + '退出了房间', roomInfo[roomID]);
            console.log(user + '退出了' + roomID);
        });

        // 接收用户消息,发送相应的房间
        socket.on('message', function (msg) {
            // 验证如果用户不在房间内则不给发送
            if (roomInfo[roomID].indexOf(user) === -1) {  
            return false;
            }
            io.to(roomID).emit('msg', user, msg);
        });

    });
    var managers = io.of('/managers');
    // managers.use(function(socket, next) {
    //     //  require('fs').appendFile('io.log', JSON.stringify(socket.request), () => {});
    //     var header = socket.request && socket.request.headers;
    //     // console.log('socket.request.headers', header, header.cookie);
    //     if (header && header.cookie) //&& header.cookie.indexOf('connect.sid') > -1
    //         return next();
    //     return next(new Error('Authentication error'));
    // });

    // managers.authorization(function(handshakeData, callback) {
    //     // var cookies = parse_cookies(handshakeData.headers.cookie);

    //     // client.get(cookies.PHPSESSID, function(err, reply) {
    //     //     handshakeData.identity = reply;
    //     //     callback(false, reply !== null);
    //     // });
    //     console.log(handshakeData.headers);
    //     callback(false, true);
    // });
    var watch_users = io.of('/watch_users');
    // watch_users.use(function(socket, next) {
    //     //  require('fs').appendFile('io.log', JSON.stringify(socket.request), () => {});
    //     //  console.log('socket.request._query', socket.request._query)
    //     if (socket.request._query) //useless
    //         return next();
    //     return next(new Error('Authentication error'));
    // });

    watch_users.on('connection', function (socket) {

        socket.on('watchMessage', function (actionResult) {
            if (!actionResult || !actionResult.watchId || !actionResult.action) {
                console.log('Wrong watch message.' + actionResult, socket);
                return;
            }
            actionRecorder.watchUserOnOffline(socket.watchId, true);
            socket.watchId = actionResult.watchId;
            socket.join(actionResult.watchId);

            formatDateTime(actionResult);
            console.log(actionResult);
            managers.emit('watchMessage', actionResult);

            actionRecorder.saveWatchLog(null, actionResult.watchId, actionResult);
            actionRecorder.updateLatestWatchInfo(actionResult.watchId, actionResult);
        });

        socket.on('watchLog', function (logJson) {
            if (!logJson || !logJson.watchId || !logJson.action) {
                console.log('Wrong watch message.' + logJson, socket);
                return;
            }
            actionRecorder.watchUserOnOffline(socket.watchId, true);
            formatDateTime(logJson);
            console.log({
                action: logJson.action,
                watchId: logJson.watchId,
                dateTime: logJson.dateTime,
                length: logJson.log.length
            });
            if (!fs.existsSync('./logs'))
                fs.mkdir('./logs');
            var date = new Date();
            var logFileName = `./logs/${logJson.watchId.replace(/:/g, '_')}_${date.getDay()}.log`;
            fs.appendFile(logFileName, "\n" + logJson.watchId + " " + logJson.dateTime + "\n", () => {});
            fs.appendFile(logFileName, logJson.log, () => {});
        });

        socket.on('disconnect', function () {
            console.log('disconnect', `watch user:${socket.watchId} disconnected!`);
            actionRecorder.watchUserOnOffline(socket.watchId, false);
            managers.emit('watchOffline', {
                watchId: socket.watchId,
                dateTime: new Date()
            });
        });

        socket.on('error', function (err) {
            console.log('error', `watch user:${socket.watchId} error!`, err);
            actionRecorder.watchUserOnOffline(socket.watchId, false);
            managers.emit('watchOffline', {
                watchId: socket.watchId,
                error: err,
                dateTime: new Date()
            });
        });
    });

    managers.on('connection', function (socket) {

        socket.on('serverGet', function (action) {
            if (!action || !action.watchId || !action.action) {
                console.log('Wrong watch message.' + action, socket);
                return;
            }
            socket.managerName = action.name;
            watch_users.to(action.watchId).emit('serverGet', action);
            actionRecorder.saveServerGetLog(action.name, action.watchId, action);
            console.log(action);
        });

        socket.on('disconnect', function () {
            console.log('disconnect', `manager: ${socket.managerName} disconnected!`);
        });

        socket.on('error', function (err) {
            console.log('error', err.message, `manager: ${socket.managerName} disconnected with error!`);
        });
    });


    let chat = io.of('/chat');
    chat.on('connection', function (socket) {

        socket.emit('login');

        socket.on('online', function (username) {
            socket.managerName = username;
            console.log('connect', `manager: ${socket.managerName} connected!`);
            if (!onlineManagers.includes(username)) {
                onlineManagers.push(username);
            }
            socket.join(username);
            socket.emit('loadManagers', onlineManagers);
            socket.broadcast.emit('managerOnline', username);
        });

        socket.on('sendText', function (text) {
            console.log(text);
            chat.to(text.to).emit('receiveText', text);
        });

        socket.on('sendVoice', function (voice) {
            console.log(voice);

            // let dir = './public/src/static/upload/'
            let dir = './public/src/'
            fs.writeFileSync(dir + voice.url, voice.content, function(err) {
                if (err) {
                  console.log(err) 
                };
            });

            chat.to(voice.to).emit('receiveVoice', voice);
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('managerOffline', socket.managerName);
            let index = onlineManagers.findIndex((n) => {
                return n === socket.managerName;
            });
            if (index > -1) {
                onlineManagers.splice(index, 1);
            }
            console.log('chat disconnect', `manager: ${socket.managerName} chat off!`);
        });

        socket.on('error', function (err) {
            console.log('error', err.message, `manager: ${socket.managerName} disconnected with error!`);
        });
    });
}