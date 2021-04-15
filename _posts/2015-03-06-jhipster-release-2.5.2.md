---
layout: default
title: Release 2.5.2
---

JHipster release 2.5.2
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

This is a bug-fixing release. The 2 major changes are:

- The generated .gitignore file has been [really improved](https://github.com/jhipster/generator-jhipster/blob/master/app/templates/gitignore). This should solve issues like [#1211](https://github.com/jhipster/generator-jhipster/issues/1211) but __be careful__ as this might ignore files which weren't ignored before!
- [Pagination has been corrected](https://github.com/jhipster/generator-jhipster/issues/1208)

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.5.2+is%3Aclosed)__.

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
