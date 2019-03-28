# react-socket

实现了react端和node服务端的通过socket.io简单通讯的实例。

具体实现还要参照项目中具体使用场景

与express的结合如果是按express-generator脚手架生成

开启http服务会在/bin/www文件中开启，只实现过在www文件中调用socket.io与官网实例一样操作，但在www文件中编写不便，也不利于模块分离（端口可与express共用）

另一种实现方式是直接重新使用http模块或者net模块开启新端口（端口与express不同），相当于
开启一个新服务，但是随express应用一起启动。

还未研究express脚手架生成目录文件下与socket.io模块优雅分离的方案，如果你有相关的实践，请留言，谢谢！
