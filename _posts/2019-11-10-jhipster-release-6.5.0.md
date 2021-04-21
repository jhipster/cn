---
layout: default
title: Release 6.5.0
---

JHipster release v6.5.0
==================

This is a new minor release of JHipster v6 with [147 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.5.0+is%3Aclosed).

Here are the most significant ones:

- Azure Spring Cloud sub generator - [merge commit](https://github.com/jhipster/generator-jhipster/commit/d40cf08ab79c0c4d005550551380ea446a1e4c6e)
- Support of GitHub Actions - [#10606](https://github.com/jhipster/generator-jhipster/pull/10606)
- Persistence improvements using hypersistence optimizer - [#10667](https://github.com/jhipster/generator-jhipster/pull/10667)
- Upgrade to Spring Boot 2.1.10.RELEASE - [#10734](https://github.com/jhipster/generator-jhipster/pull/10734)
- Upgrade to JHipster Core 6+ - [#10745](https://github.com/jhipster/generator-jhipster/pull/10745)
- Microservices Support for AWS Containers - [#10494](https://github.com/jhipster/generator-jhipster/pull/10494)
- No HTTP Checkstyle plugin - [#10466](https://github.com/jhipster/generator-jhipster/pull/10466)
- New flag to disable Fake data generation - [#9663](https://github.com/jhipster/generator-jhipster/pull/9663)
- Many libraries upgrades

关闭的工单与合并请求
------------
一如既往， __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.5.0+is%3Aclosed)__.

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
