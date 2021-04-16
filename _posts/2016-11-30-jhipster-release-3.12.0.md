---
layout: default
title: Release 3.12.0
---

JHipster release 3.12.0
==================

更新日志
----------

111 closed tickets and merged PRs in this release!

The biggest news is a complete update of our Hibernate/Liquibase/Ehcache/Hazelcast code. The most incredible thing is that most of the work was done by Software AG, the company making Ehcache, with some help from people from Hazelcast and Liquibase. That's a lot of companies helping JHipster, working together (when they can be competitors outside), and giving us code directly from the core developers of each project!

Here are some details on this update:

- We now support Hibernate 5.2, which has a lot of improvements and new features over our old Hibernate 4 support
- This forced us to upgrade Liquibase, in fact support for Hibernate 5 in Liquibase was done for us!!
- This allowed us to upgrade to Ehcache 3, the new version of Ehcache
- This also triggered an upgrade in our Hazelcast code
- Most of the work was done in [#4454](https://github.com/jhipster/generator-jhipster/pull/4454) by [Henri Tremblay](https://twitter.com/henri_tremblay).

Other important features and bug fixes are:

- Upgrade Spring Cloud to Brixton SR7 [#4576](https://github.com/jhipster/generator-jhipster/pull/4576)
- Upgrade to Hibernate Validator 5.3.3.Final [#4541](https://github.com/jhipster/generator-jhipster/pull/4541)
- Upgrade to MapStruct 1.1.0.Final [#4539](https://github.com/jhipster/generator-jhipster/pull/4539)
- Remove jhipster from the URL under the management part [#4477](https://github.com/jhipster/generator-jhipster/pull/4477)
- Vietnamese [#4486](https://github.com/jhipster/generator-jhipster/pull/4486) and Serbian [#4572](https://github.com/jhipster/generator-jhipster/pull/4572) languages support
- Only use the JHipsterProperties to generate the baseURL for sending emails [#4507](https://github.com/jhipster/generator-jhipster/issues/4507)
- Get microservice alert and error headers from gateway [#4522](https://github.com/jhipster/generator-jhipster/pull/4522)
- Jenkinsfile: report tests results [#4484](https://github.com/jhipster/generator-jhipster/pull/4484)
- Search thrash button doesn't show when entity doesn't have pagination [#4480](https://github.com/jhipster/generator-jhipster/issues/4480)
- Support for long file names on Windows with Gradle - [#4323](https://github.com/jhipster/generator-jhipster/issues/4323)


关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.12.0+is%3Aclosed)__.

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

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
