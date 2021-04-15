---
layout: default
title: Release 0.9.1
---

JHipster release 0.9.1
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

* "热重载"特性变得越来越好: 现在我们支持热载入Spring Beans(在*大多*情况)和Jackson beans(序列化和反序列化的缓存在重载会被清除), 我们现在着重解决重载JPA的实体类..
* 更新Spring Boot至最新的1.0.0.RC2. 这个会导致[warning when running the executable WAR](https://github.com/spring-projects/spring-boot/issues/348)
* 更新了生成器依赖库的版本, 在Mac OS X运行我们发现还有一些问题

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
