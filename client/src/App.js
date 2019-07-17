import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    const { helloReq, objectReq, listReq, enumsReq, bytesReq } = require('../../helloworld_pb.js');
    const { GreetPromiseClient } = require('../../helloworld_grpc_web_pb.js');

    const client = new GreetPromiseClient('http://' + window.location.hostname + ':4000', null, null);
    // simple unary call
    var request = new helloReq();
    request.setName('World');

    // 获取返回的数据方法要根据res原型上（即__proto__属性）中的getXXX()方法
    // 普通对象传输
    client.sayHello(request, {})
      .then((res) => {
        console.log('res', res);
      })
      .catch(err => {
        console.log(err);
      })

    // 对象嵌套传输
    const objReq = new objectReq();
    objReq.setName('han');
    objReq.setAge(25);
    objReq.setSex('man');
    client.getPerson(objReq, {})
      .then(res => {
        console.log('objRes', res.getPerson().getName());
      })
      .catch(err => {
        console.log('err', err);
      })

    // list传输
    const _listReq = new listReq();
    client.getList(_listReq)
      .then(res => {
        console.log('listRes', res);
      })
      .catch(err => {
        console.log(err);
      })

    // 枚举传输
    const _enumsReq = new enumsReq();
    _enumsReq.setType("PROTECT");
    client.getType(_enumsReq, {})
      .then(res => {
        console.log('enumsRes', res.getType());
      })
      .catch(err => {
        console.log(err);
      })

    // 字节类型数据传输
    const _bytesReq = new bytesReq();
    client.getByte(_bytesReq, {})
      .then(res => {
        console.log('byteRes', res.getFile());
      })
      .catch(err => {
        console.log(err);
      });
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
