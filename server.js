// TODO 
// 了解这两个库
const grpc = require('grpc');
const protoLoad = require('@grpc/proto-loader');
const fs = require('fs');

const proroLoadPath = __dirname + '/helloworld.proto';
const packageDefinition = protoLoad.loadSync(
  proroLoadPath,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const packageSelf = grpc.loadPackageDefinition(packageDefinition);
const hello = packageSelf.hello;

/**
 * sayHello
 * @param {*} call 
 * @param {*} cb 
 */
function doSayHello(call, cb) {
  cb(null, { msg: `hello ${call.request.name}` });
}

function doGetPerson(call, cb) {
  const { name, age, sex } = call.request;
  cb(null, { person: { name: 'han', age: 25, sex: 'man' } });
}

function doGetList(call, cb) {
  cb(null, { arr: [1, 2, 3, 4, 5] });
}

function doGetType(call, cb) {
  cb(null, { type: call.request.type });
}

function doGetByte(call, cb) {
  const buffers = fs.readFileSync('./helloworld.proto');
  cb(null, { file: buffers });
}

// 得到grpc server
function getServer() {
  const server = new grpc.Server();
  server.addService(hello.Greet.service, {
    sayHello: doSayHello,
    getPerson: doGetPerson,
    getList: doGetList,
    getType: doGetType,
    getByte: doGetByte
  });
  return server;
}

if (require.main === module) {
  var server = getServer();
  server.bind('0.0.0.0:7000', grpc.ServerCredentials.createInsecure());
  server.start();
}

exports.getServer = getServer;
