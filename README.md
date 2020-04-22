# misTgone的毕设

## 项目介绍：
以github上开源项目"XMall商城"作为ui图，作者独立设计完成了所有交互和展示层以及全部后端，并copy了原网站部分的css样式代码。

## 项目技术栈：
- 前台（已完成）：基于vue全家桶，极少量BootStrap，大量element-ui
- 后端（已完成）：node（用到了express,cors,mysql,express-session,body-parser等模块）,mysql服务器，nginx代理服务器，LNMP框架，pm2
- 后台管理（待实现）
- 项目目前部署于百度BCC云服务器，使用了centos7.4系统，搭载了宝塔运维

## 首屏优化
问题主要出在npm run build生成的chunk-ventors.js过大

1. compression-webpack-plugin插件，重新build之后发现chunk-ventors.js仍然有900多kb
2. index.html修改chunk-ventors.js的href为cdn（推荐七牛云）引入js

结果：首屏加载速度从10s缩短为1s

### 作者信息
个人邮箱为1014638917@qq.com，欢迎交流~

大四，自学前端ing




