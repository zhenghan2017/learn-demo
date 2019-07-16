## grpc-web-demo

---
#### 环境配置
1. 下载protoc-gen-grpc-web，直接下载对应文件

    [https://github.com/grpc/grpc-web/releases](https://note.youdao.com/)

mac下可以直接mv /当前目录 /usr/local/bin

2. 下载protoc
    
```
 brew install grpc protobuf
```

3. 上面安装完都需要设为全局变量

4. 下载docker

#### 流程

1.配置envoy代理和docker镜像

2.定义proto文件

3.生成客户端服务器存根，在项目目录下执行以下命令,具体生成的文件类型等可以修改命令参数，详情见grpc-web 客户端配置选项

```
protoc -I=. hello.proto \     
  --js_out=import_style=commonjs:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```
4.运行docker，启动envoy
```
docker build -t grpc-demo/envoy -f ./envoy.Dockerfile . 

docker run -d -p 8080：8080 --network = host grpc-demo/envoy
(mac/windows下去除network参数项)
```

基础的envoy配置
```
admin:
  access_log_path: /tmp/admin_access.log
  address:
    socket_address: { address: 0.0.0.0, port_value: 9901 }

static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: 0.0.0.0, port_value: 4000 }
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        config:
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: local_service
              domains: ["*"]
              routes:
              - match: { prefix: "/" }
                route:
                  cluster: greeter_service
                  max_grpc_timeout: 0s
              cors:
                allow_origin:
                - "*"
                allow_methods: GET, PUT, DELETE, POST, OPTIONS
                allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                max_age: "1728000"
                expose_headers: custom-header-1,grpc-status,grpc-message
                enabled: true
          http_filters:
          - name: envoy.grpc_web
          - name: envoy.cors
          - name: envoy.router
  clusters:
  - name: greeter_service
    connect_timeout: 0.25s
    type: logical_dns
    http2_protocol_options: {}
    lb_policy: round_robin
    # 之前没有注意这一行，转发一直没有成功
    # win/mac hosts: Use address: host.docker.internal instead of address: localhost in the line below
    hosts: [{ socket_address: { address: host.docker.internal, port_value: 7000 }}]

```

5. 启动client和server，client连接到4000端口，envoy将流量转到7000的服务端，进行请求
