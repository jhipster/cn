---
layout: default
title: 发布 v3.2.1
---

JHipster release 3.2.1
==================

更新日志
----------

This is a bug-fix version for JHipster v3.2.0, with a couple of cool new features.

Important bug fixes:

- Error with languages with 5-letter codes [#3554](https://github.com/jhipster/generator-jhipster/issues/3554)
- findByUserIsCurrentUser() not working with JWT [#3560](https://github.com/jhipster/generator-jhipster/issues/3560)

Cool new features:

- We have a brand new [JHipster DevBox](https://github.com/jhipster/jhipster-devbox). It is based on the latest Ubuntu Xenial release, uses XUbuntu, and has many improved applications.
- There should now be a notification when a new version is released [#3562](https://github.com/jhipster/generator-jhipster/pull/3562). Of course, this couldn't have been tested for real, so let's wait for the next version to see if it works :-)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.2.1+is%3Aclosed)__.

更新指引
------------

使用以下命令更新Jhipster:

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
