---
layout: default
title: Release 6.3.1
---

JHipster release v6.3.1
==================

Warning, this release fixes an **important security vulnerabilities**:

- Our previous release had an important security vulnerability, please read [the v6.3.0 release notes]({{ site.url }}/2019/09/13/jhipster-release-6.3.0.html) for more information. It was announced that this vulnerability was only for users using JWT authentication: the issue is in fact wider, and affects people using session-based authentication and UAA authentication. Only people using OAuth2 authentication (with services like Keycloak or Okta) are safe. This was already fixed in the previous release, so there is nothing specific for this in this release.
- We have a [new vulnerability that affects Gradle users](https://github.com/jhipster/generator-jhipster/security/advisories/GHSA-mc84-xr9p-938r). The generated configuration file contained one Maven repository configured with HTTP, and not HTTPS, which could lead to man-in-the-middle attacks when doing a build. You will find all information in the security advisory, but to make a long story short: you should use HTTPS both in your Maven and Gradle build files.

**What's new in this release**

This release closes [48 tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.1+is%3Aclosed). It's a patch release, so those are mostly library upgrades, bug fixes, as well as a number of smaller feature enhancements.

关闭的工单与合并请求
------------
一如既往， __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.1+is%3Aclosed)__.

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
