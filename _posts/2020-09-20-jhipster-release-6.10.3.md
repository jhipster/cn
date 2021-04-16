---
layout: default
title: Release 6.10.3
---

JHipster release v6.10.3
==================

This is a patch release which contains these fixes:
- Fix prettier-java dependency
- Security: prevent leakage of technical details trough problem message - [#12128](https://github.com/jhipster/generator-jhipster/pull/12128)
- Redis: do not use dynamic property source in junit callbacks - [#12150](https://github.com/jhipster/generator-jhipster/pull/12150)
- Sponsor: add Entando as new Gold Sponsor - [#12205](https://github.com/jhipster/generator-jhipster/pull/12205)
- Security: avoid password and resetKey column to be sorted by the /users API - [#12327](https://github.com/jhipster/generator-jhipster/pull/12327)
- AWS-Containers: Use bootJar instead of bootWar - [#12342](https://github.com/jhipster/generator-jhipster/pull/12342)
- Angular: fix protractor waiting for timeout with angular - [#12420](https://github.com/jhipster/generator-jhipster/pull/12420)


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.10.3+is%3Aclosed)__.

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
