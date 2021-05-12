---
layout: default
title: 发布 v6.3.0
---

JHipster release v6.3.0
==================

This release fixes an **important security vulnerability**:

- Please read the [security advisory here](https://github.com/jhipster/generator-jhipster/security/advisories/GHSA-mwp6-j9wf-968c).
- **Are you vulnerable?** if you use JWT, session or UAA authentication, and more importantly if you use our system to send a link to reset passwords, then you are affected. The algorithm used isn't cryptographically secure, which means that an attacker could guess a reset link, and hence take over any account in the system.
- **How to fix the issue** you probably don't need to upgrade JHipster, as this just affects a few generated files, so this can be done manually. The issue is in the generated `RandomUtil` class. [Here is this class in our sample application generated with JHipster v6.2.0](https://github.com/jhipster/jhipster-sample-app/blob/v6.2.0/src/main/java/io/github/jhipster/sample/service/util/RandomUtil.java) and [here is the updated version, using JHipster v6.3.0](https://github.com/jhipster/jhipster-sample-app/blob/v6.3.0/src/main/java/io/github/jhipster/sample/service/util/RandomUtil.java). So all you need to do is copy the new file, which uses `SecureRandom`, and replace the older file.
- **How this issue was handled** This issue was found by [Jonathan Leitschuh](https://github.com/JLLeitschuh), and was fixed in the next couple of hours by [Frederik Hahne](https://github.com/atomfrede). Please note that we gave a [$500 bug bounty to Jonathan](https://github.com/jhipster/generator-jhipster/issues/10401) as well as a [$300 bug bounty to Frederik](https://github.com/jhipster/generator-jhipster/issues/10402). For obvious security reasons, only the [JHipster core dev team](https://www.jhipster.tech/team/) knew about this issue during that period. We then waited one day in order to inform everyone, including doing [an advisory on our Twitter account](https://twitter.com/jhipster/status/1172387424715988994) so that our users are not caught up with a surprise emergency release.
- **What will happen next** This is the first time we used the "security advisory" feature from GitHub. We certainly learned a lot, and we will provide in the very near future a clear path to report security advisories to the team.

**What's new in this release**

Apart from the security vulnerability, this is a minor release of JHipster v6 with [247 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Spring Boot 2.1.8 and Spring Cloud Greenwich SR3
- All Docker images have been upgraded to their latest versions
- Migration from Tslint to Eslint ([#10187](https://github.com/jhipster/generator-jhipster/pull/10187) and [#10213](https://github.com/jhipster/generator-jhipster/pull/10213)). The JHipster ESlint configuration is now externalized in a new repository at https://github.com/jhipster/eslint-config-jhipster [#10358](https://github.com/jhipster/generator-jhipster/pull/10358)
- Created Jar is now non executable by default [#10282](https://github.com/jhipster/generator-jhipster/pull/10282)
- Enforce architecture constraints with ArchUnit [#10274](https://github.com/jhipster/generator-jhipster/pull/10274)
- Add a new Feign Client sub-generator based on OpenAPIGenerator [#9548](https://github.com/jhipster/generator-jhipster/issues/9548)
- Liquibase can use different credentials than the one in the application (so the running application cannot change the current schema)
- Add support for Caffeine Cache [#10303](https://github.com/jhipster/generator-jhipster/pull/10303)
- Enhance Google App Engine generator with Java 11, Jar support and more ([#10284](https://github.com/jhipster/generator-jhipster/pull/10284) and [#10336](https://github.com/jhipster/generator-jhipster/pull/10336))
- Fix the AWS generator monolith flow [#10376](https://github.com/jhipster/generator-jhipster/pull/10376)
- Fix admin logs screen in Angular [jhipster/ng-jhipster#97](https://github.com/jhipster/ng-jhipster/pull/97)
- Fix interactions between main generator and blueprint when one is installed globally and the other locally [#10257](https://github.com/jhipster/generator-jhipster/issues/10257)
- Fix issues with Istio URLs [#10135](https://github.com/jhipster/generator-jhipster/issues/10135)

关闭的工单与合并请求
------------
一如既往， __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.0+is%3Aclosed)__.

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
