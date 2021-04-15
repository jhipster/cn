---
layout: default
title: Release 1.3.0
---

JHipster release 1.3.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

This is an important new release, with two major news:

- The entity sub-generator has been greatly improved, and can now generate a whole CRUD application, from database to HTML. Please check our [updated documentation]({{ site.url }}/creating-an-entity/).
- Our Java "hot reload" feature has been deprecated. We had too many bugs, people got confused about it, and most importantly the Spring Loaded team is not working on the project. We will try to find an alternative, as we have invested a lot of time on this subject. Please note that for generating Liquibase changelogs, you can now use the new entity sub-generator (see above point).

[You can check the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.3.0+is%3Aclosed).

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
