---
layout: default
title: 发布 v5.8.2
---

JHipster release v5.8.2
==================

This is a patch release for JHipster 5, which is currently in maintenance mode as we are preparing JHispter 6.

This fixes a [several issues](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.8.2+is%3Aclosed), the most important one being a bug making JHipster modules crash.

There are also a few library upgrades, the most important ones being [Jest for React](https://github.com/jhipster/generator-jhipster/commit/5f1ae61a8a52fdcc5bba8307ff3fd057fc9d2037) and [Angular](https://github.com/jhipster/generator-jhipster/commit/154326fc2c72358163fed917a762e30b70c3412e).

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.8.2+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

升级Jhipster版本:

```
npm update -g generator-jhipster
```

然后升级子生成器:

```
jhipster upgrade
```

**手动升级**

选择手动升级, 需要先升级你的Jhipster版本:

```
npm update -g generator-jhipster
```

如果你已经有了一个项目, 将会继续使用当时项目生成的Jhipster版本.
如果需要升级你的项目, 你需要先删除`node_modules`文件夹再运行:

```
jhipster
```

更新你的项目和所有的实体类

```
jhipster --with-entities
```

你也可以使用实体类子生成器挨个更新你的实体类, 例如你的实体类名字是_Foo_

```
jhipster entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
