---
layout: default
title: 发布 v2.23.1
---

JHipster release 2.23.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

This is a bug-fix release, which solves a number of issues from version 2.23.0 and updates a few libraries.

Most important bug fixes
---------

### OAuth2 authentication

OAuth2 authentication was broken when the new Spring Boot 1.3.0 devtools were selected (issue [#2291](https://github.com/jhipster/generator-jhipster/issues/2291)). So we have removed, for the moment, our `CustomUserDetails` class, which was causing the issue: discussion is still under way on how we will solve this in the long term.

### Cloud Foundry deployment

Deployment to Cloud Foundry was broken (issue [#2225](https://github.com/jhipster/generator-jhipster/issues/2225)), as there is an incompatibility between Spring Boot 1.3.0 and Cloud Foundry (see the Cloud Foundry issue [here](https://github.com/cloudfoundry/cli/issues/411)). For the moment we have removed the "executable" flag on our generated WAR files, and have updated the documentation accordingly (you can't run the WAR files directly with `./my_application.war`, you need to do `java -jar my_application.war`instead).

### Wrong HTTP cache headers in production

Our HTTP cache headers where wrong in production (issue [#2239](https://github.com/jhipster/generator-jhipster/issues/2239)). We have corrected then, and have now excellent performance in production back again!

Closed tickets
------------

一如既往, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.23.1+is%3Aclosed)__.

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

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题
