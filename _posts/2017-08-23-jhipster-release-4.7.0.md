---
layout: default
title: 发布 v4.7.0
---

JHipster release 4.7.0
==================

更新日志
----------

- Major new feature: Generate criteria class and backend for filtering using JPA! [read the new documentation here]({{ site.url }}/entities-filtering/) - see [#5540](https://github.com/jhipster/generator-jhipster/pull/5540)
- Major new feature: Support for API-first dev using swagger-codegen - see [#6229](https://github.com/jhipster/generator-jhipster/pull/6229)
- Spring dependencies upgrades - see [#6268](https://github.com/jhipster/generator-jhipster/pull/6268)
- Bootstrap, ng-bootstrap and Webpack upgrades - see [#6233](https://github.com/jhipster/generator-jhipster/pull/6233)
- Upgrade to JHipster Console v2.2.1 - see [#6175](https://github.com/jhipster/generator-jhipster/pull/6175)
- Migratation of Logstash appender from UDP to TCP - see [#6102](https://github.com/jhipster/generator-jhipster/issues/6102)
- Many minor bugs and small new features

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.7.0+is%3Aclosed)__.

更新指引
------------

**自动升级**

WARNING [this has been fixed very recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

升级Jhipster版本:

```
yarn global upgrade generator-jhipster
```

然后升级子生成器:

```
jhipster upgrade
```

**手动升级**

选择手动升级, 需要先升级你的Jhipster版本:

```
yarn global upgrade generator-jhipster
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
