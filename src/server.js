const PORT = 3000;
const io = require('socket.io')(PORT);

console.log(`server start on ${PORT}`);

// 中间件只在io建立连接前触发，连接之后数据交换不会触发
const beforeMid = (socket, next) => {
  console.log('before');
  console.log('socketId', socket.id);
  // throw new Error('before handle error');
  next();
}

const afterMid = (socket, next) => {
  console.log('after');
  // 因为on事件不是中间件，所以before之后直接执行了after
  // 取到的值为undefined
  console.log(socket._curtom);
  next();
}

io.of('my-namespace')
  .use(beforeMid)
  // .use(connectMid)
  .on('connection', (socket) => {
    console.log(`${socket.id} connection`);
    socket.on('message', (data) => {
      console.log(`emit data：${data}`);
      socket._custom = 1;
      socket.send('hello client');
    })

    socket.on('my-event', data => {
      console.log(`on data：${data}`);
      socket.emit('my-event', 'hello client');
    })

    socket.on('error', err => {
      console.log('socket error occur', err);
    })

    // 客户端断开连接事件
    socket.on('disconnect', function (err) {
      console.log(`${socket.id} 在${new Date()}失去连接` + err);
    });

    socket.on('close', () => {
      console.log('client close');
    })
  })
  .use(afterMid);

io.on('close', function (data) {
  console.log(`Net server close`);
});

io.on('error', function (err) {
  console.log('io error', err);
});