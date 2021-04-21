---
layout: default
title: Release 6.9.0
---

JHipster release v6.9.0
==================

This release fixes an **important security vulnerability** if you used master version between v6.8.0 and v6.9.0:

- Please read the [security advisory here](https://github.com/jhipster/generator-jhipster/security/advisories/GHSA-8w7w-67mw-r5p7).

**What's new in this release**

Apart from the security vulnerability, this is a minor release of JHipster v6 with [316 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.9.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Spring Boot 2.2.7.RELEASE - [#11718](https://github.com/jhipster/generator-jhipster/pull/11718)
- Lot of improvements for Reactive applications
- Lot of improvements for Neo4J
- Upgrade to Keycloak 10.0.0 - [#11688](https://github.com/jhipster/generator-jhipster/pull/11688)
- Prettier for Java - [#11645](https://github.com/jhipster/generator-jhipster/pull/11645)
- Support for Testcontainers - [#11584](https://github.com/jhipster/generator-jhipster/pull/11584)
- Circle CI support - [#11452](https://github.com/jhipster/generator-jhipster/pull/11452)
- New language : Bulgarian - [#11498](https://github.com/jhipster/generator-jhipster/pull/11498)
- New language : Sinhala - [#11564](https://github.com/jhipster/generator-jhipster/pull/11564)
- Many libraries upgrades
- Many bug fixes


关闭的工单与合并请求
------------
一如既往， __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.9.0+is%3Aclosed)__.

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

**小提示**

To generate your project with all Java classes already formatted using [prettier-java](https://github.com/jhipster/prettier-java), you should use:

```
jhipster --prettier-java
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们：

- 提交Bug请到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 提交问题请到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
