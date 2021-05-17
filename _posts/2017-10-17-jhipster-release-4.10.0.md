---
layout: default
title: 发布 v4.10.0
---

JHipster release 4.10.0
==================

更新日志
----------

- OpenID Connect support is now ready! This means you can now secure your JHipster application using an OpenID Connect provider such as [Keycloak](http://www.keycloak.org/) or [Okta](https://www.okta.com). This also includes microservices security, using a Zuul proxy (in a JHipster gateway) or using Feign (to connect microservices together). This replaces our older OAuth2 support, as announced in our previous release. This is a huge work, so please be careful when using this first release. For more information, see [#6432](https://github.com/jhipster/generator-jhipster/issues/6432), [#6435](https://github.com/jhipster/generator-jhipster/pull/6435) and [#6519](https://github.com/jhipster/generator-jhipster/issues/6519).
- As the entity sub-generator goes too far for some simple use-cases, we have a new [Spring MVC REST controller sub-generator]({{ site.url }}/creating-a-spring-controller/). For consistency reasons, we also renamed our "Service sub-generator" to become the [Spring service sub-generator]({{ site.url }}/creating-a-spring-service/). Please note that we focus on the Spring Boot generators, as on the client-side you can use [Angular CLI](https://github.com/angular/angular-cli) with JHipster. For more information, see [#6451](https://github.com/jhipster/generator-jhipster/pull/6451).
- After project generation, if Git is installed, the generator now automatically initializes a Git repository and commits the generated application. See [#6453](https://github.com/jhipster/generator-jhipster/issues/6453).
- Our recent support for [Zalando problem-spring-web](https://github.com/zalando/problem-spring-web) had been greatly improved, for example with [#6404](https://github.com/jhipster/generator-jhipster/issues/6404) and [#6411](https://github.com/jhipster/generator-jhipster/pull/6411).

Roadmap
----------

Two important new features are planned for our next `4.11.0` release:

- [Couchbase support](https://github.com/jhipster/generator-jhipster/issues/6086).
- [Use jhipster-dependencies BOM](https://github.com/jhipster/generator-jhipster/pull/6509), that should greatly simplifies future application upgrades.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.10.0+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

升级Jhipster版本:

```
yarn global upgrade generator-jhipster
```

然后升级子生成器:

```
jhipster upgrade
```

**手动升级**

选择手动升级, 需要先升级你的Jhipster版本:

```
yarn global upgrade generator-jhipster
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
