---
layout: default
title: 发布 v3.3.0
---

JHipster release 3.3.0
==================

更新日志
----------

This version is a library upgrade, as Spring Cloud Brixton is now officially stable. We have also upgraded to the latest Spring Boot and Spring Security versions.

Important changes and bug fixes:

- A new JHipster Registry (v2.1.0) has been released, and adds a new dashboard when you open up the application.
- MongoDB deployment was buggy, as there was an error in the Mongobee configuration [#3582](https://github.com/jhipster/generator-jhipster/issues/3582)
- Spring Data Cassandra support has been removed, so we use directly the DataStax Driver. This has allowed us to upgrade the Driver to a more recent version, and be ready for Cassandra 3.0 [#3570](https://github.com/jhipster/generator-jhipster/pull/3570)
- The mail health check is now disabled by default, as it was causing issues with the Registry and Cassandra [#3579](https://github.com/jhipster/generator-jhipster/issues/3579)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.3.0+is%3Aclosed)__.

更新指引
------------

使用以下命令更新Jhipster:

```
npm update -g generator-jhipster
```

如果你已经有了一个项目, 将会继续使用当时项目生成的Jhipster版本.
如果需要升级你的项目, 你需要先删除`node_modules`文件夹再运行:

```
yo jhipster
```

更新你的项目和所有的实体类

```
yo jhipster --with-entities
```

你也可以使用实体类子生成器挨个更新你的实体类, 例如你的实体类名字是_Foo_

```
yo jhipster:entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
