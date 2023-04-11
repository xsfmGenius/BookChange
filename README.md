# BookExchange
基于微信原生云开发实现的校园图书交易小程序，包含图书购买、二手书发布、社区交流及个人信息管理四个主要功能。
## 运行说明
```
1.新建云环境，修改调试基础库为2.22.0(新版本微信小程序不能直接获取用户微信数据)
2.修改app.js中wx.cloud.init中的env为自己云环境id
2.云数据库导入database中数据(含测试数据，部分图片存储至云存储中，需自行修改)
3.云存储新建comment和secondhand两个文件夹
```
注：大图片可上传至云存储或第三方存储平台中
## 界面展示
![GIF](https://user-images.githubusercontent.com/68805593/231096576-b343eae7-5f19-4cbb-9f82-73f26c2a210f.gif)
