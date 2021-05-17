---
layout: default
title: 发布 v2.27.1
---

JHipster release 2.27.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

This version is at the same time a bug-fix release and a first step towards migrating to JHipster 3.0. This is because our main bug-fix is in fact a back-port from JHipster 3.0!

- Recommended JavaScript build tool is now [Gulp](http://gulpjs.com/). Gulp will be the only option available with JHipster 3.0, as maintaining 2 tools in parallel is a waste of effort from the dev team. As AngularJS 2.0 is using Gulp, this is also a decision made to prepare our future move towards AngularJS 2.0 and TypeScript (but that will be for JHipster 4.0!).
- Most important bug fixed is [#2932](https://github.com/jhipster/generator-jhipster/issues/2932) which made the production profile fail when using both Gulp and Gradle.

And in case you missed it, we have released [the JDL Studio](https://start.jhipster.tech/jdl-studio/) to help you generate your entities. Check it out and send us feedback!

Closed tickets
------------

一如既往, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.27.1+is%3Aclosed)__.

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

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
