import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketClient from 'socket.io-client';
let socketClient;
const token = 'your token';

class App extends Component {

  componentDidMount() {
    // 开启socket连接
    socketClient = SocketClient('http://192.168.2.119:2018/news', {
      'query': `token=${token}`
    });
    // 监听发送消息
    socketClient.emit('server', 'hello server');
    socketClient.on('client', data => console.log(data));
    socketClient.on('error', err => console.log(err));
    socketClient.on('authenticated', function () {
      // token认证通过的处理
    });
    socketClient.on('unauthorized', msg => {
      console.log(`unauthorized：${JSON.stringify(msg.data)}`);
      // 认证失败的处理
    });
    // 连接超时监听
    socketClient.on('connect_timeout', err => {
      console.log(err);
    });
    // 连接失败监听
    socketClient.on('connect_error', err => {
      console.group(err);
    });
    // 服务器重连成功监听
    socketClient.on('reconnect', () => {
      // 服务端重新连接后会触发该时间，进行相应处理
    })
  }

  componentWillUnmount() {
    // 关闭socket连接
    socketClient.close();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
