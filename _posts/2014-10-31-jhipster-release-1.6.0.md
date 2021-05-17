---
layout: default
title: 发布 v1.6.0
---

JHipster release 1.6.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

更新日志
----------

Lots of exciting stuff in the new release! Here are the most important improvements:

- Integration tests are much, much quicker (on our specific test suite, we went from __1 minutes 45 seconds__ to __11 seconds__! Yes, that's faster). They now reuse the Spring application context (see the [related commit](https://github.com/jhipster/generator-jhipster/commit/c825bf0ec6a05bffa1925fff9d2208d0cb4c13bc)) instead of creating a new one.
- WARNING, [#681](https://github.com/jhipster/generator-jhipster/issues/681) is a small change but has a lot of consequences. It gives us much better security, but as we have changed the algorithm, it means that if you upgrade an existing application your users will need to have new passwords.
- [#702](https://github.com/jhipster/generator-jhipster/issues/702) is an improvement over one-to-many and many-to-many relationships to handle entities with some upper case letters in their names (like "priceList")
- We upgraded AngularJS and Angular Translate to more recent versions
- [#701](https://github.com/jhipster/generator-jhipster/issues/701) was causing compilation errors when using OAuth2 with an SQL database

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.6.0+is%3Aclosed)__.

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
