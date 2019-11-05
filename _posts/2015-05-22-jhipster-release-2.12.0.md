---
layout: default
title: Release 2.12.0
---

JHipster release 2.12.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

This is a bug-fixing release. The biggest changes come from those two issues:

- [#1479](https://github.com/jhipster/generator-jhipster/issues/1479): we now have a new question in the entity sub-generator so you can do two relationships between the same two entities.
- [#1468](https://github.com/jhipster/generator-jhipster/issues/1468): one-to-one mappings now have a @JsonIgnore annotation so we don't have a circular reference in our JSON views.

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.12.0+is%3Aclosed)__.

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
