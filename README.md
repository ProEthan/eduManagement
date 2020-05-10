# 微信小程序云开发项目

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 项目介绍

主要实现班级消息通知过程管理，还涉及到微信小程序开发的授权管理，订阅消息推送管理。功能概括：

- 登录注册：教师或学生不同身份注册登录
- 主界面：教师可以发布通知，所在班级的学生可以查看并回复。教师每次发布通知都会向该班订阅消息的学生推送该通知
- 个人信息界面：个人信息、班级成员信息
- 权限申请：学生登录进入时会请求获取订阅消息授权（一次性）；教师发布通知和学生回复通知需要请求获取微信用户昵称、头像信息。

## 项目体验

teacher：
username:111  password:111  class:111
username:333  password:333  class:111
username:888  password:888  class:222

student：
username:222  password:222  class:111
username:444  password:444  class:111
username:999  password:999  class:222

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

