---
layout: default
title: 发布 v5.5.0
---

JHipster release v5.5.0
==================

This minor release comes with 84 fixed issues and closed pull requests.

The most important one, as everybody doing front-end work will experience it, is our new "pacman" loader (you need to see it to understand!). Many thanks to [@sabrinapayet](https://github.com/sabrinapayet) who did [#8558](https://github.com/jhipster/generator-jhipster/pull/8558), that's a [bug bounty](https://www.jhipster.tech/bug-bounties/) which is well-deserved!

Here are the other important closed tickets and pull requests:

- Fix compilation & test issue with MongoDB relationships in [#8511](https://github.com/jhipster/generator-jhipster/pull/8511).
- Cloud Foundry sub-generator does not work: no suitable cloud connector found in [#8518](https://github.com/jhipster/generator-jhipster/issues/8518).
- Docker-Compose: limit memory to 512m in [#8539](https://github.com/jhipster/generator-jhipster/pull/8539).
- Generate correct Feign configuration for JWT gateways in [#8542](https://github.com/jhipster/generator-jhipster/pull/8542).
- Gatling with OAuth2 and Keycloak in [#8552](https://github.com/jhipster/generator-jhipster/issues/8552).
- Clean up and document ports in [#8580](https://github.com/jhipster/generator-jhipster/issues/8580).
- Application shouldn't write log to file in [#8582](https://github.com/jhipster/generator-jhipster/issues/8582).
- Updated Google App Engine Generator for latest JHipster in [#8583](https://github.com/jhipster/generator-jhipster/pull/8583).

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.5.0+is%3Aclosed)__.

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
