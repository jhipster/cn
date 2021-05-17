---
layout: default
title: 发布 v6.0.0
---

JHipster release v6.0.0
==================

This is the first official release of JHipster v6.

It builds upon our v6.0.0.beta.0 release, after one month of beta testing and [120 closed tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.0.0+is%3Aclosed).

Most important new features and upgrades
-------------

Those are the release notes from our previous beta release (v6.0.0.beta.0), updated for this stable release (v6.0.0).

- Migration to Spring Boot 2.1.x
- JDK 11 support (while keeping JDK 8+ compatibility)
- HTML 5 pushstate [#9098](https://github.com/jhipster/generator-jhipster/pull/9098)
- Kubernetes enhancements (Istio, Helm)
- Migration to Spring Cloud Greenwish.x
- Upgrade to Spring Security 5.1's OIDC Support
- Upgrade to JUnit 5
- FakerJS support to generate sample data for entities [#9104](https://github.com/jhipster/generator-jhipster/pull/9104)
- Update to latest Angular version [#8161](https://github.com/jhipster/generator-jhipster/pull/8161)
- Update to latest React version
- Lazy Loading of Angular entities
- Bootswatch theme selection
- Removed CSS Option [#9350](https://github.com/jhipster/generator-jhipster/pull/9350)
- Improvements in Sonar integration [#9423](https://github.com/jhipster/generator-jhipster/pull/9423) and [#9482](https://github.com/jhipster/generator-jhipster/pull/9482), including an externalized sonar-project.properties file.
- Gatling 3 support, including several improvements with better and faster incremental builds and BOM support.
- Integration tests are set up in their separate phase for Maven and Gradle
- Update to Gradle 5
- Migration to Liquibase 3.6.x
- Update Elastic to 6.4.x
- Update to Couchbase 6.x
- Update to Infinispan 9.4.x
- Update to Cassandra 4.x
- Update to Hazelcast 3.11.x
- Logging to the console in json format
- Changing the default packaging to Jar while still being able to produce a War [#9034](https://github.com/jhipster/generator-jhipster/pull/9034)
- Prettier for formatting YAML [#9281](https://github.com/jhipster/generator-jhipster/pull/9281)
- Prettier transform to prettify the output from all sub-generators [#9371](https://github.com/jhipster/generator-jhipster/pull/9371)

We also removed a few features:

- Removed deprecated 'rancher-compose' sub-generator
- Removed Chocolatey and Homebrew installations, as we found out they didn't provide much benefits to users
- Deprecated the [JHipster Devbox](https://github.com/jhipster/jhipster-devbox) for the moment: we are looking for a maintainer, if you are interested please ping us!

关闭的工单与合并请求
------------
一如既往， __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.0.0+is%3Aclosed)__.

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
