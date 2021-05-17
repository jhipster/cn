---
layout: default
title: 发布 v5.4.0
---

JHipster release v5.4.0
==================

This release comes with 89 fixed issues and closed pull requests, including [8 bug bounties](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.0+is%3Aclosed+label%3A%24100) that were paid thanks to our [bug bounty program](https://www.jhipster.tech/bug-bounties/). If your company benefits from JHipster, wants great visibility in our community, or wants the ability to choose which tickets deserve bug bounties, please consider [sponsoring the project](https://www.jhipster.tech/sponsors/).

Here are the most important changes for this release:

- Migration to [Jib](https://github.com/GoogleContainerTools/jib) for creating Docker images ([#8352](https://github.com/jhipster/generator-jhipster/pull/8352)) thanks to [Daniel Petisme](https://github.com/danielpetisme). This is a huge improvement over the Docker Maven plugin that we were using, but as a result the command to create an image as changed, and that will impact everyone! Please use now `./mvnw package -Pprod jib:dockerBuild` or `./gradlew -Pprod bootWar jibDockerBuild`.
- Support for relationships in MongoDB  ([#7944](https://github.com/jhipster/generator-jhipster/issues/7944)), thanks to [Iván García Sainz-Aja](https://github.com/ivangsa). Relationships work with Angular and React, and also with the JHipster Domain Language (JDL) exactly as they do with an SQL database. This is a very impressive achievement, and probably one of our most requested features!
- Upgrade to the [JHipster Console 4.0.0](https://github.com/jhipster/jhipster-console/releases/tag/v4.0.0) thanks to [Pierre Besson](https://github.com/PierreBesson). This includes many new features, the most impressive one being that you can now jump directly from the Zipkin UI to Kibana (and back again!), allowing you to easily spot where your microservices spend time.
- Upgrade to Istio 1.x, as well as many improvements in the Istio configuration ([#8321](https://github.com/jhipster/generator-jhipster/pull/8321)) thanks to [Srinivasa Vasu](https://github.com/srinivasa-vasu).
- Upgrade to the latest Keycloak ([#8432](https://github.com/jhipster/generator-jhipster/pull/8432)) and Traefik ([#8427](https://github.com/jhipster/generator-jhipster/pull/8427)) versions.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.0+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

升级Jhipster版本:

```
npm update -g generator-jhipster
```

然后升级子生成器:

```
jhipster upgrade
```

**手动升级**

选择手动升级, 需要先升级你的Jhipster版本:

```
npm update -g generator-jhipster
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
