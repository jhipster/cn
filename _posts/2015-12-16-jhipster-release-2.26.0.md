---
layout: default
title: 发布 v2.26.0
---

JHipster release 2.26.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

### The marketplace is open!

Everybody has been waiting for this for a long time, our [marketplace]({{ site.url }}/modules/marketplace/) is now open!

You can code your own modules, with all the power of the JHipster sub-generators, but without having to be part of the project: anybody can code and publish them easily, just follow our [documentation here]({{ site.url }}/modules/creating-a-module/).

### JHipster "needles"

The modules have made us update the "needles" again! We promise it's the last time you need to merge them!

### New date picker

Since the beginning we were using the standard HTML5 datepicker. It's standard, but it just doesn't work on Firefox, which is really annoying.
As we use more and more Angular UI features (the router, the modular views), we decided to use their datepicker by default.

### Hazelcast issues

We've had a lot of Hazelcast issues recently, so all of this code has been reworked and refactored!

Closed tickets
------------

一如既往, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.26.0+is%3Aclosed)__.

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
