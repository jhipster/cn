---
layout: default
title: Release 1.8.0
---

JHipster release 1.8.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

更新日志
----------

We have a major change in this release: we swichted our JPA ID generation strategy, from "TABLE" to "AUTO". Originally we selected "TABLE" as it's the easiest way to be portable across databases, but we discovered (thanks to our friends from YourKit!) that this was consuming extra database connections. As a result of this change, you can now use JHipster applications without any trouble on "free" cloud databases like ClearDB or ElephantSQL (which only give you 4 connections available).

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.8.0+is%3Aclosed)__.

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
