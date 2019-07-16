/**
 * @fileoverview gRPC-Web generated client stub for hello
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.hello = require('./helloworld_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hello.GreetClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hello.GreetPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hello.helloReq,
 *   !proto.hello.helloResp>}
 */
const methodInfo_Greet_sayHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hello.helloResp,
  /** @param {!proto.hello.helloReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.helloResp.deserializeBinary
);


/**
 * @param {!proto.hello.helloReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hello.helloResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.helloResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.GreetClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.Greet/sayHello',
      request,
      metadata || {},
      methodInfo_Greet_sayHello,
      callback);
};


/**
 * @param {!proto.hello.helloReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.helloResp>}
 *     A native promise that resolves to the response
 */
proto.hello.GreetPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/hello.Greet/sayHello',
      request,
      metadata || {},
      methodInfo_Greet_sayHello);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hello.objectReq,
 *   !proto.hello.objectResp>}
 */
const methodInfo_Greet_getPerson = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hello.objectResp,
  /** @param {!proto.hello.objectReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.objectResp.deserializeBinary
);


/**
 * @param {!proto.hello.objectReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hello.objectResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.objectResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.GreetClient.prototype.getPerson =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.Greet/getPerson',
      request,
      metadata || {},
      methodInfo_Greet_getPerson,
      callback);
};


/**
 * @param {!proto.hello.objectReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.objectResp>}
 *     A native promise that resolves to the response
 */
proto.hello.GreetPromiseClient.prototype.getPerson =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/hello.Greet/getPerson',
      request,
      metadata || {},
      methodInfo_Greet_getPerson);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hello.listReq,
 *   !proto.hello.listResp>}
 */
const methodInfo_Greet_getList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hello.listResp,
  /** @param {!proto.hello.listReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.listResp.deserializeBinary
);


/**
 * @param {!proto.hello.listReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hello.listResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.listResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.GreetClient.prototype.getList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.Greet/getList',
      request,
      metadata || {},
      methodInfo_Greet_getList,
      callback);
};


/**
 * @param {!proto.hello.listReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.listResp>}
 *     A native promise that resolves to the response
 */
proto.hello.GreetPromiseClient.prototype.getList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/hello.Greet/getList',
      request,
      metadata || {},
      methodInfo_Greet_getList);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hello.enumsReq,
 *   !proto.hello.enumsResp>}
 */
const methodInfo_Greet_getType = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hello.enumsResp,
  /** @param {!proto.hello.enumsReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.enumsResp.deserializeBinary
);


/**
 * @param {!proto.hello.enumsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hello.enumsResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.enumsResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.GreetClient.prototype.getType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.Greet/getType',
      request,
      metadata || {},
      methodInfo_Greet_getType,
      callback);
};


/**
 * @param {!proto.hello.enumsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.enumsResp>}
 *     A native promise that resolves to the response
 */
proto.hello.GreetPromiseClient.prototype.getType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/hello.Greet/getType',
      request,
      metadata || {},
      methodInfo_Greet_getType);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hello.bytesReq,
 *   !proto.hello.bytesResp>}
 */
const methodInfo_Greet_getByte = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hello.bytesResp,
  /** @param {!proto.hello.bytesReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.bytesResp.deserializeBinary
);


/**
 * @param {!proto.hello.bytesReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hello.bytesResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.bytesResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.GreetClient.prototype.getByte =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.Greet/getByte',
      request,
      metadata || {},
      methodInfo_Greet_getByte,
      callback);
};


/**
 * @param {!proto.hello.bytesReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.bytesResp>}
 *     A native promise that resolves to the response
 */
proto.hello.GreetPromiseClient.prototype.getByte =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/hello.Greet/getByte',
      request,
      metadata || {},
      methodInfo_Greet_getByte);
};


module.exports = proto.hello;

