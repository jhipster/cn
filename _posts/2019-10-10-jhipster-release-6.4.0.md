---
layout: default
title: Release 6.4.0
---

JHipster release v6.4.0
==================

This is a new minor release of JHipster v6 with [135 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.4.0+is%3Aclosed).

Here are the most significant ones:

- Redis support - [#10057](https://github.com/jhipster/generator-jhipster/pull/10057)
- Migration to native apache Kafka client - [#10379](https://github.com/jhipster/generator-jhipster/pull/10379)
- Read only entity - [jhipster-core#370](https://github.com/jhipster/jhipster-core/pull/370) [#10561](https://github.com/jhipster/generator-jhipster/pull/10561) [#10562](https://github.com/jhipster/generator-jhipster/pull/10562) [#10563](https://github.com/jhipster/generator-jhipster/pull/10563)
- Use observables across Angular application - [#10383](https://github.com/jhipster/generator-jhipster/pull/10383)
- Some fixes for Sonar - [#10559](https://github.com/jhipster/generator-jhipster/pull/10559)
- Support inline content for JDL - [#10504](https://github.com/jhipster/generator-jhipster/pull/10504)
- Upgrade to Spring Boot 2.1.9 - [#10546](https://github.com/jhipster/generator-jhipster/pull/10546)
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.4.0+is%3Aclosed)__.

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
