const express = require('express');
const socketioJwt = require('socketio-jwt');
const SECRET = 'your token secret';

// 初始化app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(2018);

io
  // of可以分配路径
  .of('/news')
  .on('connection', function (socket) {
    // token验证中间件
    io.use(socketioJwt.authorize({
      secret: SECRET,
      handshake: true
    }));

    // emit发送消息
    // on监听消息
    socket.emit('client', 'hello client');
    socket.on('server', function (data) {
      console.log(data);
    });

    socket.on("close", function (data) {
      console.log(`close`);
    });

    // 用户触发disconnect或者关闭浏览器时触发
    socket.on('disconnect', function (err) {
      console.log(`disconnect`);
    });

    // 必须监听一个“error”事件，否则在客户端调用closesocket或强制关闭时服务器端会发射“error"事件。
    // 如果没有该事件的处理程序，进程便会异常终止。
    socket.on("error", function (error) {
      if (error) {
        console.log(`error: ${error}`);
      }
    });
  });

io.on('close', function (data) {
  console.log(`server close`);
});

io.on('error', function (err) {
  console.log(err);
});

// http服务开启
console.info(`Express server listening at 127.0.0.1:2018`);
