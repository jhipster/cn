---
layout: default
title: Release 0.0.28
---

JHipster release 0.0.28
==================


Maven配置文件"development"和"production"已改名为"dev"和"prod", 简化输入

"dev"模式, 没有添加额外的功能.

"prod"模式, 新增了以下功能:

- 打包应用时候会自动触发完整的"grunt build"
- 最小化、优化后的静态资源会写入"src/main/webapp/dist"目录
- 更新了两个全新的Servlet filter: 一个管理"/dist"目录下的静态文件, 另一个添加HTTP头部缓存信息
