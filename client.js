const mqtt = require('mqtt');
const ProtoBuf = require('protobufjs');

// 导入proto文件
const Message = ProtoBuf.loadSync('./message.proto');
const Eig = ProtoBuf.loadSync('./eig.proto');

const host = '192.168.2.228';
const port = '1883';
// 类似通道号
const beeId = '8866';
// 主题前缀，out为输出，in为输入
const GET = 'EigOut';
const SEND = 'EigIn';
const client = mqtt.connect(`mqtt://${host}:${port}`);

client.on('connect', function () {
  console.log('connect');

  // 订阅实际消息
  // 配合实际消息返回使用
  // client.subscribe(`${GET}/SM_/${beeId}`, function (err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });

  // 订阅test消息
  client.subscribe('test', function (err) {
    if (err) {
      console.log(err);
    }
    const BeeMessage = Message.lookup('cn.beepower.domain.message.BeeMessage');
    const MeasureValue = Eig.lookup('cn.beepower.eig.msg.MeasureValues');
    const measureValue = {
      values: [{
        pointId: 1,
        isDiscrete: 1,
        analogValue: 1,
        discreteValue: 1,
        timestamp: 1,
        isStored: false
      }]
    };
    const encode = MeasureValue.encode(measureValue).finish();
    const beeMessage = {
      topic: 'test',
      payload: {
        value: encode
      }
    };
    const message = BeeMessage.encode(beeMessage).finish();
    // 发布test消息
    client.publish('test', message);
  });
});

// 测试消息返回
client.on('message', function (topic, message) {
  // message is Buffer
  const BeeMessage = Message.lookup('cn.beepower.domain.message.BeeMessage');
  const MeasureValue = Eig.lookup('cn.beepower.eig.msg.MeasureValues');
  const beeMessage = BeeMessage.decode(message);
  // const buffer = BeeMessage.encode(beeMessage).finish();
  // console.log(Buffer.isBuffer(beeMessage.topic), Buffer.isBuffer(buffer));
  const measureValue = MeasureValue.decode(beeMessage.payload.value);
  console.log(measureValue.values[0]);
  client.end()
});

// 实际量测数据返回
// client.on('message', function (topic, message) {
//   // 通过topic进行分别处理
//   // message is Buffer
//   const Payload = Message.lookupType('cn.beepower.domain.message.Payload');
//   const MeasureValue = Eig.lookupType('cn.beepower.eig.msg.MeasureValue');
//   const payload = Payload.decode(message);
//   console.log('topic：', topic);
//   const keys = Object.keys(payload);
//   console.log(keys);
//   const measureValue = MeasureValue.decode(payload.value);
//   console.log(measureValue);
//   client.end()
// });
