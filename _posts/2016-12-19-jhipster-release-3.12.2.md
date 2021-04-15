---
layout: default
title: Release 3.12.2
---

JHipster release 3.12.2
==================

更新日志
----------

This is a patch release, that corrects ticket [#4680](https://github.com/jhipster/generator-jhipster/issues/4680), which is an annoying client-side bug for Internet Explorer 11.

This is a simple and recommended upgrade for everyone.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.12.2+is%3Aclosed)__.

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
