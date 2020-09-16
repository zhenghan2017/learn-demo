const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('connect server succeed');

  try {
    ws.send('hello server');
  } catch (e) {
    ws.emit('error', e);
  }
}

ws.onclose = () => {
  console.log('server close');
}

// 当服务端未开启的情况会触发错误事件，然后触发close事件
ws.onerror = (err) => {
  console.log(`error occured：${err.message}`);
}

ws.onmessage = (message) => {
  console.log(`server send：${message.data}`);
}

ws.on('unexpected-response', (req, res) => {
  console.log('req', req, null, 2);
  console.log('res', res, null, 2);
})
