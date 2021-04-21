---
layout: default
title: JHipster 发布 v7.0.0 版本
---

JHipster 发布 v7.0.0 版本
==================

这是我们的第一个稳定的JHipster v7版本！

这是我们的2个v7.0.0 beta版本的更新日志的摘要，并通过我们的最新更改进行了更新。

它总共包含2371个关闭的工单和主要项目的合并请求：

- 825个关闭的工单和合并请求： [v7.0.0](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0)
- 226个关闭的工单和合并请求： [v7.0.0-beta.1](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.1)
- 1320个关闭的工单和合并请求：: [v7.0.0-beta.0](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.0)

重大变化
------------

方案（Blueprint）和模块（Module)相关：
- 删除getAllJhipsterConfig - [#12023](https://github.com/jhipster/generator-jhipster/issues/12023)，使用getJhipsterConfig代替。
- 为同步配置创建jhipsterConfig并将configOptions移动到Generator-base中[#12026](https://github.com/jhipster/generator-jhipster/pull/12026)， 现在generators-base-blueprint的jhipsterConfig字段是一个代理，而不是存储对象，请查看PR描述以进行迁移。
- 在 `base-generator` 更新为 `getXXXAppName()`。 [#12325](https://github.com/jhipster/generator-jhipster/issues/12325):
  - 增加 `getFrontendAppName()` 方法和 `frontendAppName` 属性
  - 移除 `getAngularAppName()` 方法和 `angularAppName` 属性
  - 移除 `getAngularXName()` 方法和 `angularXAppName` 属性
- 移除 `setup*Options()` 一系列操作
  - 必要时使用 `load(App/Client/Server)Config` ，也可能不需要替换。
- `id` 字段被添加到JHipster 7的字段（fields）中。
  - 如果您的方案（Blueprint）或模块（Module）不支持，通过以下方法过滤掉。 `this.fields = this.fields.filter(field => !field.id);`

前端相关：
- Angular: 进一步遵循Angular样式指南 - [#13125](https://github.com/jhipster/generator-jhipster/issues/13125)
- React: 测试文件与被测文件同目录 [#13425](https://github.com/jhipster/generator-jhipster/issues/13425)
- 登录页面重构 - [#11926](https://github.com/jhipster/generator-jhipster/pull/11926)
- 用Day.js替换 moment - [#12575](https://github.com/jhipster/generator-jhipster/issues/12575)
- 服务器通用脚本 - 由Webapp替换Webpack profile [#13196](https://github.com/jhipster/generator-jhipster/pull/13196)

后端相关：
- 保护user api并为关系创建一个过滤的 user api - [#12374](https://github.com/jhipster/generator-jhipster/issues/12374)
- Springfox 3升级 - [#12133](https://github.com/jhipster/generator-jhipster/pull/12133) and [jhipster/jhipster#764](https://github.com/jhipster/jhipster/pull/764)
  - `swagger` maven profile 修改为 `api-docs`
  - `jhipster.swagger` property 修改为 `jhipster.api-docs`
  - `SwaggerCustomizer` 修改为 `SpringfoxCustomizer`
  - `swaggerSpringfoxApiDocket` 修改为 `openapiSpringfoxApiDocket`
  - `swaggerSpringfoxManagementDocket` 修改为 `openAPISpringfoxManagementDocket`
- 所有生成的网关都是 Reactive  的，而不是Spring MVC - [#13855](https://github.com/jhipster/generator-jhipster/issues/13855)
  - Zuul被Spring Cloud Gateway取代
  - Ribbon  被Spring Cloud Load Balancer取代
- 将id添加到PUT请求中 - [#14139](https://github.com/jhipster/generator-jhipster/issues/14139)

实体相关:
- 更改关系表表名 - [#11025](https://github.com/jhipster/generator-jhipster/issues/11025)

最重要的新功能和升级
-------------

新的功能
- 支持 Vue.js  - [#12064](https://github.com/jhipster/generator-jhipster/pull/12064)
- 支持 Cypress - [#12307](https://github.com/jhipster/generator-jhipster/pull/12307)
- JDL Studio V2
- JHipster控制中心（JHipster Control Center） - 详情： [project](https://github.com/jhipster/jhipster-control-center)
- Prettier for Java - [#12109](https://github.com/jhipster/generator-jhipster/issues/12109)
- 支持 Angular CLI - [#10539](https://github.com/jhipster/generator-jhipster/issues/10539)
- 支持 Snyk - [#12441](https://github.com/jhipster/generator-jhipster/issues/12441)
- 添加–-pk-type支持 - [#13296](https://github.com/jhipster/generator-jhipster/issues/13296)
- 添加 @MapstructExpression 支持 - [#13195](https://github.com/jhipster/generator-jhipster/pull/13195)
- 使用k8s子生成器支持Neo4j - [#13548](https://github.com/jhipster/generator-jhipster/pull/13548)
- NPM 7 - [#13060](https://github.com/jhipster/generator-jhipster/pull/13060)

实体相关
- 支持自定义ID - [#13258](https://github.com/jhipster/generator-jhipster/pull/13258)
- 增量 Liquibase - [#12178](https://github.com/jhipster/generator-jhipster/issues/12178)

改进
- Angular 11 - [#13035](https://github.com/jhipster/generator-jhipster/pull/13035)
- 改进 Blueprint
- 改进 Webflux 
- Spring Boot 2.4 - [#13551](https://github.com/jhipster/generator-jhipster/pull/13551)
- 默认Java 11 - [#12021](https://github.com/jhipster/generator-jhipster/pull/12021)
- PostgreSQL作为默认数据库 - [#11736](https://github.com/jhipster/generator-jhipster/issues/11736)
- IntegrationTest注解 - [#12460](https://github.com/jhipster/generator-jhipster/issues/12460)
- Annotation to detect generated files - [#12459](https://github.com/jhipster/generator-jhipster/issues/12459)
- 删除system和anonymoususer用户 - [#13043](https://github.com/jhipster/generator-jhipster/pull/13043)
- Docker-Compose v3 - [#12428](https://github.com/jhipster/generator-jhipster/issues/12428)
- Typescript 4 - [#12435](https://github.com/jhipster/generator-jhipster/pull/12435)
- Webpack5用于React和Vue - [#13615](https://github.com/jhipster/generator-jhipster/pull/13615)

重构内容
- JHipster库，使用`tech.jhipster`作为包名称 - [#12854](https://github.com/jhipster/generator-jhipster/issues/12854)
- JHipster Core与generator-jhipster合并 - [#11694](https://github.com/jhipster/generator-jhipster/pull/11694)
- ng-jhipster与generator-jhipster合并 - [#12909](https://github.com/jhipster/generator-jhipster/issues/12909)

已移除内容
- 删除Audit页面 - [#12024](https://github.com/jhipster/generator-jhipster/pull/12024)
- 删除Yarn 支持 - [#12134](https://github.com/jhipster/generator-jhipster/pull/12134)
- 删除不推荐使用的JHipster Console（ELK） - [#12414](https://github.com/jhipster/generator-jhipster/pull/12414)
- 删除UAA支持 - [#13081](https://github.com/jhipster/generator-jhipster/issues/13081)
- 删除Traefik支持 - [#14233](https://github.com/jhipster/generator-jhipster/issues/14233)


关闭的工单与合并的请求
------------
一如既往, __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0)__.

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

要使用增量Liquibase更改日志生成项目，应使用：

```
jhipster --incremental-changelog
```

要在Java类中使用`@GeneratedByJHipster`注释生成项目，应使用：

```
jhipster --with-generated-flag
```


帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们：

- 提交Bug请到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 提交问题请到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
