---
layout: default
title: Release 3.11.0
---

JHipster release 3.11.0
==================

更新日志
----------

75 closed tickets and merged PRs in this release! Those are mostly library upgrades, and quite a lot of small improvements in the generated code.

Here are the most important ones:

- Upgrade Gradle to 3.2 - [#4472](https://github.com/jhipster/generator-jhipster/pull/4472)
- Tests generated for ZonedDateTime entity attributes are failing - [#4373](https://github.com/jhipster/generator-jhipster/issues/4373)
- Update to Spring Boot 1.4.2 - [#4449](https://github.com/jhipster/generator-jhipster/issues/4449)
- Change @PostConstruct to @Before in tests - [#4435](https://github.com/jhipster/generator-jhipster/pull/4435)
- Upgrade springfox to 2.6.1 - [#4438](https://github.com/jhipster/generator-jhipster/pull/4438)
- Enable oauth with live reload - [#4442](https://github.com/jhipster/generator-jhipster/pull/4442)
- Configure default date format as ISO - [#4433](https://github.com/jhipster/generator-jhipster/pull/4433)
- Early support for Yarn - [#4426](https://github.com/jhipster/generator-jhipster/pull/4426)
- ClassNotFoundException when using Kafka + Gatling - [#4402](https://github.com/jhipster/generator-jhipster/issues/4402)
- Upgrade to node 6.9.1 LTS - [#4419](https://github.com/jhipster/generator-jhipster/pull/4419)
- Fill test strings with stream to avoid constant string too long error - [#4336](https://github.com/jhipster/generator-jhipster/pull/4336)
- CLOB validation annotations are wrong - [#4344](https://github.com/jhipster/generator-jhipster/issues/4344)


关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.11.0+is%3Aclosed)__.

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
