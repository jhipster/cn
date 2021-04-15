---
layout: default
title: Release 0.3.0
---

JHipster release 0.3.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

- JDK 7是最低要求 (如果你还在使用Java6, 你就不能自称Java狂热者了!)
- Spring的配置几乎没有XML的存在! 我们唯一保持XML配置文件的组件是Spring Security. 我们需要等待Spring Security下次更新才替换这个文件.
- 替换新的连接池库: 我们现在使用[HikariCP](https://github.com/brettwooldridge/HikariCP)
- 由于很多用户开始使用Spring4, 我们也与时俱进升级到了Spring 4.0.0.RC2


更新指引
------------

使用以下命令更新Jhipster:

```
npm update -g generator-jhipster
```

你现在可以弃用这些已经不使用的XML文件:

- src/main/resources/META-INF/persistence.xml
- src/main/resources/META-INF/spring/applicationContext-database.xml
- src/test/resources/META-INF/spring/applicationContext-database.xml

使用以下命令更新你的项目

```
yo jhipster
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
