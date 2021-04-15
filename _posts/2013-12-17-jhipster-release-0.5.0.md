---
layout: default
title: Release 0.5.0
---

JHipster release 0.5.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

- 实体类的子生成器现在已可以使用. 完整的使用文档参考[此处](/creating-an-entity/)
- 你现在可以创建一个单独的可执行Jar文件用于简便部署. 文档参考[生产环境章节](/production/)
- 一些缺陷修复与些许性能提升, 以及文档更新

更新指引
------------

使用以下命令更新Jhipster:

```
npm update -g generator-jhipster
```

使用以下命令更新你的项目

```
yo jhipster
```

我们修改了Liquebase变更集, 添加了"HIBERNATE_SEQUENCES"表, 你需要删除你现有的表结构或者手动添加.

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题
