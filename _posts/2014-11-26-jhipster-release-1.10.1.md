---
layout: default
title: 发布 v1.10.1
---

JHipster release 1.10.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

更新日志
----------

This is a maintenance release for our latest v1.10.0 version. For your information, maintenance is done on the "v1.x_maintenance" branch, and contains only important bug fixes that been merged on the "master" branch (which contains the new v2.0.0 code).

The v2.0.0 version is taking some time to finish, as we have changed many parts of the generator. You can follow our changes on [our GitHub issue tracker, using the milestone "2.0.0"](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.0.0). When this is all finished, we will release a document listing what's new and what's cool in the v2.0.0 release.

This is why, as we have a couple of important fixes on the v1.x version, we have decided to release this maintenance version.

More specifically, we included the following fixes:

- Corrected the Gradle wrapper (which was corrupted), and added a .gitattribute configuration so that it doesn't happen ever again!
- Corrected the Maven build to enabled milestones, so you could grab the new Spring Boot 1.2.0.RC2 easily (lesson learned: a "release candidate" is not released yet!)

Many thanks to everybody sending us Pull Requests, we are very happy to have so many people contributing.

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
