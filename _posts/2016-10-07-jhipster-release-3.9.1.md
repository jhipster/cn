---
layout: default
title: Release 3.9.1
---

JHipster release 3.9.1
==================

更新日志
----------

This is a bug-fix release, because of issue [#4283](https://github.com/jhipster/generator-jhipster/issues/4283).

This is important for everyone using our microservices architecture, as basically the JHipster Registry couldn't register correctly services, because of an issue with the latest SpringFox v2.6.0 release. So we reverted SpringFox to the previous v2.5.0 release, and will do the upgrade later.

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.9.1+is%3Aclosed)__.

更新指引
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

选择手动升级, 需要先升级你的Jhipster版本:

```
npm update -g generator-jhipster
```

如果你已经有了一个项目, 将会继续使用当时项目生成的Jhipster版本.
如果需要升级你的项目, 你需要先删除`node_modules`文件夹再运行:

```
yo jhipster
```

更新你的项目和所有的实体类

```
yo jhipster --with-entities
```

你也可以使用实体类子生成器挨个更新你的实体类, 例如你的实体类名字是_Foo_

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
