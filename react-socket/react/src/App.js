import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketClient from 'socket.io-client';
let socketClient = null;

class App extends Component {

  componentDidMount() {
    // 暂未找到如何优雅的关闭socket连接，这里暂时采取直接将socket对象置为null的方式
    socketClient = SocketClient('http://192.168.2.119:2018/news');
    socketClient.emit('server', 'hello server');
    socketClient.on('client', data => console.log(data));
    socketClient.on('error', err => console.log(err));
  }

  componentWillUnmount() {
    // 只是关闭了连接，实际使用中，不重置socket对象的话再进入该页面会有两个socket连接产生
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
