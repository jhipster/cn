---
layout: default
title: Release 0.8.0
---

JHipster release 0.8.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

这是我们至今以来最大的一个更新.

我们从"正常"的Spring完全迁移至[Spring Boot](http://projects.spring.io/spring-boot/). 所以带来了许多新变更:

- 需要运行应用, 可以从你的IDE中运行"Application"类, 或者执行"mvn spring-boot:run". 底层使用Tomcat.
- Java项目配置包名从"conf"重命名为"config"
- Yaml格式配置文件
- liquibase配置文件现在移到src/main/resources/config/liquibase目录

我们将所有库都已更新至最新版本!

Spring Boot是一门新技术, 希望大家谨慎升级:

### 好消息

- IDE可以脱离Maven运行应用. 更快(无需启动Maven)并且和debugger一起更容易运行
- 更精简的配置文件. 很难量化我们的提升程度, 大约精简了200~300行代码
- Yaml格式配置带来更好的可读性与使用便利
- Spring Boot Actuator带来许多特性, 我们计划下次更新添加更多这些特性

### 坏消息

- 使用Tomcat启动会比之前慢２秒(Jetty没有问题): 貌似是由于没有web.xml导致Tomcat出现这个问题


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
