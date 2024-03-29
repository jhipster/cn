---
layout: default
title: 发布 v3.5.0
---

JHipster release 3.5.0
==================

更新日志
----------

110 issues and PRs have been closed in this release, the most important being:

- Several libraries upgrade: Gradle [#3849](https://github.com/jhipster/generator-jhipster/pull/3849), Spring Cloud [#3836](https://github.com/jhipster/generator-jhipster/pull/3836), the Maven Docker plugin [#3801](https://github.com/jhipster/generator-jhipster/pull/3801)
- As a result of those upgrades, [JHipster Registry](https://github.com/jhipster/jhipster-registry) v2.3.0 has been released, and the generator now uses this new version
- The JDL import sub-generator is back! [#3532](https://github.com/jhipster/generator-jhipster/issues/3532)
- Upgrade sub-generator doesn't commit on jhipster_upgrade branch from second upgrade [#3757](https://github.com/jhipster/generator-jhipster/issues/3757)
- A new "swagger" profile to use both in dev and prod modes [#3402](https://github.com/jhipster/generator-jhipster/issues/3402)
- JSON pretty print in dev mode [#3830](https://github.com/jhipster/generator-jhipster/issues/3830)
- Better SpringFox configuration for pagination parameters [#3844](https://github.com/jhipster/generator-jhipster/pull/3844)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.5.0+is%3Aclosed)__.

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
