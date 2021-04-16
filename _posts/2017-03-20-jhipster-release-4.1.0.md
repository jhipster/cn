---
layout: default
title: Release 4.1.0
---

JHipster release 4.1.0
==================

更新日志
----------

This is a minor release, as we migrated to Yeoman 1.0 (see [#5331](https://github.com/jhipster/generator-jhipster/pull/5331)). This means we had to refactor a lot of code, including all the sub-generators. If you are using modules from [our marketplace]({{ site.url }}/modules/marketplace), they *should* work, but we recommend that all module authors check their code with this new version.

The JHipster Registry reached release v2.6.0, with a new Spring Cloud version, and more aggressive Eureka timeouts, which should be better for normal use cases (if you have hundreds or thousands of microservices, you might consider raising those numbers again). In our roadmap, we expect to have new major release of the JHipster Registry, which should be able to monitor all monoliths, gateways and microservices in one single place.

We also closed 51 issues and pull requests (see the list below), and upgraded many dependencies.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.1.0+is%3Aclosed)__.

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

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
