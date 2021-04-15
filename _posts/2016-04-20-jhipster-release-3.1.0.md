---
layout: default
title: Release 3.1.0
---

JHipster release 3.1.0
==================

更新日志
----------

This is an upgrade and a bug-fix version for JHipster 3.0.0, with 161 closed tickets and PRs! Those are too long to list, here are the main changes:

- We have migrated to Spring Cloud Brixton.RC1 (yes, RC2 was released yesterday, that will be in the next release)
- JHipster Registry 1.1.0 has been released to match Spring Cloud Brixton.RC1, and has an easier configuration for JWT as well as some bug corrections
- JHipster Console 1.1.0 has also been released to match Spring Cloud Brixton.RC1, with some new and improved dashboards
- The Heroku sub-generator has had many improvements, in particular if you use it with the JHipster Registry
- Many small UI improvements and bug corrections

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.1.0+is%3Aclosed)__.

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

更新你的项目和所有的实体类

```
yo jhipster --with-entities
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

If the issue you have is an urgent bug or security issue, please:

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
