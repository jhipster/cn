---
layout: default
title: Release 4.0.6
---

JHipster release 4.0.6
==================

更新日志
----------

This is the sixth patch release for JHipster 4.0.0.

This includes 44 closed tickets and PRs, and it has 2 very important upgrades:

- Support for Spring Boot 1.5.1, which includes a major upgrade for many dependencies
- Continuous Integration support has been moved to a specific sub-generator, and now supports Jenkins, Travis, GitLab and CircleCI. You can find more information on our [Continuous Integration documentation]({{ site.url }}/setting-up-ci/).

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.0.6+is%3Aclosed)__.

更新指引
------------

**手动升级 (works for JHipster 4.x applications)**

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

**自动升级 only works for JHipster 3.x applications**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

```
yo jhipster:upgrade
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

If the issue you have is an urgent bug or security issue, please:

- 在推特上联系[@java_hipster](https://twitter.com/java_hipster)
