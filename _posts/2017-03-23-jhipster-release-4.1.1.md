---
layout: default
title: Release 4.1.1
---

JHipster release 4.1.1
==================

更新日志
----------

This is the first patch release of JHipster 4.1.0.

- We have closed 32 issues and pull requests, but please note that **more than half** of the [closed tickets are marked invalid](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aissue+milestone%3A4.1.1+is%3Aclosed). Please, follow our [guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md) or we will close your tickets: invalid tickets make the whole team lose a lot of time, so if you want new patch releases and new cool features, you need to follow the project rules.
- With this release, the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) is working again! As this is a small patch release, this is the good moment for everyone to test it! If you have it working (or not!), don't hesitate to tweet it and mention [@jhipster](https://twitter.com/jhipster).
- The most important bug fix on this release is [#5458](https://github.com/jhipster/generator-jhipster/pull/5458), as this made errors in all applications using OAuth2. Concerning OAuth2, please note that only 0,46% of applications used this option during the last month: there have already been talks to remove this, as it has a big maintenance cost, for very few users. So if you like OAuth2, please help maintaining it!

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.1.1+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

```
yo jhipster:upgrade
```

**手动升级**

选择手动升级, 需要先升级你的Jhipster版本:

```
yarn global upgrade generator-jhipster
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
