const SocketIO = require('socket.io');
const WebSocket = require('ws');

const port = 3001;
const io = SocketIO(port);
console.log(`server start on ${port}`)

io.on('connection', socket => {
  console.log(`${socket.id} connect success`);
  const wsObj = {};

  wsObj[socket.id] = [];
  socket.on('my-event', data => {
    console.log(`on data：${data}`);
    console.log('connect keys', Object.keys(wsObj));
    let backSocket;
    // 存在则复用连接，不存在则重新建立连接
    if (wsObj[socket.id] && wsObj[socket.id][0]) {
      backSocket = wsObj[socket.id][0];
    } else {
      const newBackSocket = new WebSocket('ws://localhost:3000');
      backSocket = newBackSocket;
      wsObj[socket.id].push(backSocket);
    }

    backSocket.onopen = () => {
      backSocket.send('hello back server');

      backSocket.onmessage = (message) => {
        console.log(`back server send：${message.data}`);
        setTimeout(() => {
          socket.emit('my-event', 'hello client');
        }, 5000)
      }
    }
  })

  socket.on('error', err => {
    console.log('socket error occur', err);
  })

  // 客户端断开连接事件
  socket.on('disconnect', function (err) {
    // console.log(`${socket.id} 在${new Date()}失去连接`);
    console.log('close keys', Object.keys(wsObj));
    if (wsObj[socket.id]) {
      for (const item of wsObj[socket.id]) {
        item.close();
      }
      wsObj[socket.id] = null;
    }
  });

  socket.on('close', () => {
    console.log('client close');
  })
});

io.on('close', function (data) {
  console.log(`Net server close`);
});

io.on('error', function (err) {
  console.log('io error', err);
});