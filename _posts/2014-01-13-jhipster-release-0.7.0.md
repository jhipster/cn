---
layout: default
title: 发布 0.7.0
---

JHipster release 0.7.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

- JHipster现已支持Websocket, 可以支撑"实时Web应用", 感谢这个优秀的[Atmosphere framework](http://async-io.org/). 仔细调研Atmosphere和新的Spring Websocket支持之后, 我们发现Atmosphere更符合我们的需求. 当然, 如果你们不同意, 我们也可以在Yeoman生成器添加一个选项来支持Spring Websocket.
- 更新了一个可用的[Docker](https://www.docker.io/)配置, 我们在这里[updated installation page](/installation/)更新了详细的文档.
- 更新了所有Maven/NPM/Bower依赖, 让你生成的应用处于技术前沿!

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

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题
