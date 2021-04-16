---
layout: default
title: Release 4.13.3
---

JHipster release 4.13.3
==================

更新日志
----------

This patch release has several important fixes and changes:

- HTTP Session Clustering with Hazelcast has been removed ([#6944](https://github.com/jhipster/generator-jhipster/pull/6944)). JHipster now has far better Spring Cache abstraction support, which is a much better solution for everyone. This also lowers the maintenance burden for the core team, for an option which was very rarely used.
- E-mails can now be used as usernames ([#6923](https://github.com/jhipster/generator-jhipster/issues/6923)), as it prevented both Keycloak and Okta to work properly. So you can now login both with your username or your e-mail address - but as your username can also be an e-mail address, we understand this can be confusing, and are currently considering if we should remove the usernames completely, and only use e-mail addresses to login.
- workbox-webpack-plugin was causing the front-end build to fail, and is corrected with [#6950](https://github.com/jhipster/generator-jhipster/pull/6950)
- The `prod` profile now works correctly with microservices, see [#6947](https://github.com/jhipster/generator-jhipster/issues/6947)
- It looks like Oracle changed its JDBC driver names, and this is corrected in [#6952](https://github.com/jhipster/generator-jhipster/issues/6952)
- Support for "includes()" functions with Internet Explorer has been added in [#6953](https://github.com/jhipster/generator-jhipster/issues/6953)

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.13.3+is%3Aclosed)__.

更新指引
------------

**自动升级**

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
