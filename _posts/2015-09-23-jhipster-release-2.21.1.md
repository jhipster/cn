---
layout: default
title: Release 2.21.1
---

JHipster release 2.21.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

This is a bug fixing release, which mainly:

- Upgrades many libraries to their latest versions: Spring Boot, BrowserSync...
- Fixes issue [#1991](https://github.com/jhipster/generator-jhipster/issues/1991) : grunt tests where failing when both OAuth2 and WebSockets where selected
- Fixes issue [#2026](https://github.com/jhipster/generator-jhipster/issues/2026) : Cassandra support was broken because of the new user management system
- Fixes issue [#2030](https://github.com/jhipster/generator-jhipster/issues/2030) : when the "no i18n" option was selected, user management was broken

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.21.1+is%3Aclosed)__.

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

- 在推特上联系[@java_hipster](https://twitter.com/java_hipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题
