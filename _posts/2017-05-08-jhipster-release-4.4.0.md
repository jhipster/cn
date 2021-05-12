---
layout: default
title: 发布 v4.4.0
---

JHipster release 4.4.0
==================

JHipster Registry 3.0
----------

The [JHipster Registry]({{ site.url }}/jhipster-registry/) has reached version 3.0! It is a major release, that adds dashboards to the Registry: it is now able to monitor all application types (monoliths, gateways, microservices) in one central location.

As a result, the [JHipster Registry has a new documentation page]({{ site.url }}/jhipster-registry/), which is now part of new section dedicated to microservices on this website. Please check this out, there is a lot of new stuff here!

This new JHipster Registry has been possible thanks to the great work of [Julien Margarido](https://github.com/JulienMrgrd), our new trainee working on JHipster, congratulations to him!

Other important news and updates
----------

This new releases comes with 135 closed tickets and pull requests! Here are the most important news:

- Several library updates, including an upgrade to Spring Cloud Dalston
- Lots of code clean up and new unit tests (our sample application now has 91,1% code coverage!)
- The JHipster gateway API now supports rate limiting using Bucket4j instead of Cassandra, which gives much better quality and performance, see [#5388](https://github.com/jhipster/generator-jhipster/issues/5388) and the new [API gateway documentation]({{ site.url }}/api-gateway/). This rate limiting system can still scale across several gateway instances, using our distributed caching support with Hazelcast, which works thanks to the JHipster Registry!
- Much improved Zuul and Eureka settings, giving a huge performance increase, more quality and stability, than when using the standard Spring Cloud settings
- Support for JSR310's Instant type, see [#5684](https://github.com/jhipster/generator-jhipster/pull/5684)

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.4.0+is%3Aclosed)__.

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

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
