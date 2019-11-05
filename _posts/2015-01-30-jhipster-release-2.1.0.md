---
layout: default
title: Release 2.1.0
---

JHipster release 2.1.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

Our v2.0.0 has been a great success, with only very minor bugs, that's why we are releasing a v2.1.0 version with some cool new features.

The most important parts concern the security:

- We have a new "token" security mechanism, that is stateless and does not require a data store. This is a specific JHipster mechanism, close to what you will find in the node.js community.
- If you use the more classical "session" security, which is the default Spring Security mechanism, we now have a successful CSRF protection. This is quite unique, as most people think that as both Spring Security and AngularJS provide CSRF protection, they should be safe. In fact, as both technologies don't use the same tokens, it just doesn't work! This has been a very complex work.
- As all this is quite complicated, we now have a new documentation page explaning our security options

__WARNING__ As our security mechanisms have changed, your .yo-rc.json files need to be changed! The "authenticationType" property is now different, and you need to upgrade it: the easiest way is to delete it and answer the questions again.

Concerning our roadmap, we hope to have soon a working Cassandra implementation. This should be a very interesting option!

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.1.0+is%3Aclosed)__.

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

- 在推特上联系[@java_hipster](https://twitter.com/java_hipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题
