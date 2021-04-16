---
layout: default
title: Release 3.6.1
---

JHipster release 3.6.1
==================

更新日志
----------

This is a minor release, correcting a few bugs from yesterday's 3.6.0 release.

- Several primary keys have had their length reduced because of [#3996](https://github.com/jhipster/generator-jhipster/issues/3996). This caused a bug with older (4.6) versions of MySQL, but those length were too big, so it's a good thing to reduce them if possible. If you have an existing database, you don't have to alter your tables: having a bigger PK doesn't do any harm, so migration is totally optional.
- The Elasticsearch Docker image has been upgraded to v2.3.5, which is its latest version, and which works with Spring Boot 1.4. See [#4000](https://github.com/jhipster/generator-jhipster/issues/4000).
- Kubernetes now uses the same image versions as Docker. See [#4002](https://github.com/jhipster/generator-jhipster/pull/4002).

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.6.1+is%3Aclosed)__.

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

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
