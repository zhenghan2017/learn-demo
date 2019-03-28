import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketClient from 'socket.io-client';
let socketClient;

class App extends Component {

  componentDidMount() {
    // 开启socket连接
    socketClient = SocketClient('http://192.168.2.119:2018/news');
    // 监听发送消息
    socketClient.emit('server', 'hello server');
    socketClient.on('client', data => console.log(data));
    socketClient.on('error', err => console.log(err));
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
