const WebSocket = require('ws');

const PORT = 3000;

const wsServer = new WebSocket.Server({ port: PORT }, () => {
  console.log(`server start on ${PORT}`)
});

wsServer.on('connection', (ws) => {
  // emit只触发自身的事情，不能发送给客户端
  ws.on('message', data => {
    console.log(`client send：${data}`);

    // 输出当前所有客户端
    // console.log('client set', wsServer.clients);

    // 正常情况
    ws.send('hello client');

    // 该情况下会触发自身的error事件
    // try {
    //   ws.send('hello client', a);
    // } catch (e) {
    //   ws.emit('error', e);
    // }

    // 模拟延迟返回
    // setTimeout(() => {
    //   ws.send(`I'm late`);
    // }, 5000)
  });

  ws.on('server-error', (err) => {
    console.log(`server error：${err}`);
  })

  // error事件是监听自身的错误
  ws.on('error', err => {
    console.log(`error occured：${err.message}`);
  })

  ws.on('close', () => {
    console.log('client close');
  })

  ws.on('unexpected-response', (req, res) => {
    console.log('req', req, null, 2);
    console.log('req', res, null, 2);
  })
});