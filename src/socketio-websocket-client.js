const Socket = require('socket.io-client');

const client = Socket('ws://localhost:3001');

const init = () => {
  // 新建立连接和重连都会触发
  console.log('connect server success');
  client.emit('my-event', 'send hello server');
}

init();

client.on('my-event', data => {
  console.log(`on data：${data}`);
})

client.on('error', err => {
  console.log(`server error：${err}`);
})

client.on('disconnect', () => {
  console.log('server disconnect');
})

client.on('reconnect', () => {
  console.log('reconnect');
  init();
})