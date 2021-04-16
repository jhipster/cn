---
layout: default
title: Release 6.1.1
---

JHipster release v6.1.1
==================

This is an emergency patch release because of a broken transitive dependency, that blocks our command line. see [#9952](https://github.com/jhipster/generator-jhipster/issues/9952) for more information.

Apart from this blocker issue, this release also includes many improvements, here are the most important ones:

- Lots of work to improve how faker.js generates fake data  - [#9862](https://github.com/jhipster/generator-jhipster/pull/9862) [#9663](https://github.com/jhipster/generator-jhipster/pull/9663) [#9890](https://github.com/jhipster/generator-jhipster/pull/9890)
- Update to Spring Boot 2.1.6 - [#9930](https://github.com/jhipster/generator-jhipster/pull/9930)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.1.1+is%3Aclosed)__.

更新方法
------------

**自动升级**

在原有的项目上使用 [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动更新：

首先，升级JHipster版本：

```
npm update -g generator-jhipster
```

然后运行upgrade子生成器：

```
jhipster upgrade
```

**手动升级**

同样，需要先升级您的JHipster到最新版：

```
npm update -g generator-jhipster
```

对于已经存在的项目，它仍使用原来生成该项目时的JHipster版本。
要升级项目，必须首先删除其`node_modules`文件夹，然后运行：

```
jhipster
```

您还可以通过运行以下命令来更新项目及其所有实体：

```
jhipster --with-entities
```

您还可以通过再次运行entity子生成器（jhipster entity）来逐一更新实体，例如，如果您的实体名为_Foo_，则运行：

```
jhipster entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们：

- 提交Bug请到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 提交问题请到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
