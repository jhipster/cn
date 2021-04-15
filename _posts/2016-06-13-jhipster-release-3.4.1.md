---
layout: default
title: Release 3.4.1
---

JHipster release 3.4.1
==================

更新日志
----------

This is a bug-fix version, with 2 notable changes:

- The "Upgrade sub-generator" has been modified, please read [#3696](https://github.com/jhipster/generator-jhipster/issues/3696) before using it! This website has been updated with the latest documentation, be sure to read [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) before running the sub-generator.
- We still recommend using a NodeJS LTS (Long Term Support) version, but if you want to live on the bleeding edge, NodeJS 6.x should now work correctly [#3663](https://github.com/jhipster/generator-jhipster/issues/3663)
- Docker images containing JHipster applications should now be 40% smaller! [#3700](https://github.com/jhipster/generator-jhipster/issues/3700)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.4.1+is%3Aclosed)__.

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
