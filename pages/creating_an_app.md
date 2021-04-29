---
layout: default
title:  创建一个应用程序
permalink: /creating-an-app/
redirect_from:
  - /creating_an_app.html
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00  
---

# <i class="fa fa-rocket"></i> 创建一个应用程序

_**请查看有关创建新JHipster应用程序的 [视频教程]({{ site.url }}/video-tutorial/)！**_

1. [快速开始](#1)
2. [生成应用程序时可能遇到的问题](#2)
3. [使用蓝图](#5)
4. [命令行选项](#3)
5. [提示](#4)

## <a name="1"></a> 快速开始

首先，创建一个生产应用程序的空目录：

`mkdir myapplication`

转到该目录：

`cd myapplication/`

要生成您的应用程序，请输入：

`jhipster`

回答生成器提出的问题，以创建符合您需求的应用程序。[下一节](#2)将详细介绍这些选项。

生成应用程序后，您可以使用Maven（在Linux/MacOS/Windows PowerShell上为`./mvnw`，在Windows Cmd上为`mvnw`）或Gradle（在Linux/MacOS/Windows PowerShell上为`./gradlew`，在Windows Cmd上为`gradlew`）启动它。

**注意**如果您是在第一次运行`./mvnw`命令后使用Maven并更改了前端文件，则必须运行`./mvnw -Pwebapp`才能查看最新的前端版本（Gradle会检测到前端更改，自动并在需要时重新编译前端）。

该应用程序将在[http://localhost:8080](http://localhost:8080)可以访问

重要的是，如果需要实时重新加载JavaScript/TypeScript代码，则需要运行`npm start`或`yarn start`。您可以转到[在开发环境使用JHipster]({{ site.url }}/development/)页面以获取更多信息。

如果您使用`实时重新加载`，则可以通过`./mvnw -P-webapp`或`./gradlew -x webapp`排除客户端任务来加快服务器启动速度。 它特别加快了Gradle的速度。

## <a name="2"></a> 生成应用程序时遇到的选择

_有些选项会根据您之前的选择而改变。例如，如果您没有选择SQL数据库，则无需配置Hibernate缓存。_

### 您要创建哪种_类型_的应用程序？

您创建的应用程序类型取决于您是否希望使用微服务架构。如果不确定使用，默认为Monolithic应用程序，可以在 [此处]({{ site.url }}/microservices-architecture/)获得有关微服务的完整说明。

您可以选择：

*   Monolithic应用程序：这是一种经典的，集所有功能一体的应用程序。它易于使用和开发，是我们建议的默认设置。
*   微服务应用程序：在微服务架构中，担任独立的一个服务。
*   微服务网关：在微服务架构中，担任请求路由和请求保护的边缘服务。

### What is the base name of your application? (您的应用程序的基础名是什么？)

这是您应用程序的名称。

### What is your default Java package name? （您的默认Java软件包名称是什么？）

您的Java应用程序将以此为包的根名称。该值由Yeoman存储，以便下次运行生成器时，最新的一个提供的值将成为默认值。
当然，您可以通过提供新的包名称来覆盖它。

### Do you want to use the JHipster Registry to configure, monitor and scale your application? （您是否要使用JHipster Registry来配置，监控和扩展您的应用程序？）

[JHipster Registry]({{ site.url }}/jhipster-registry/)是一个开源工具，用于管理您在运行中的应用程序。

使用微服务架构时，这是必需的（这就是为什么仅在生成monolith时才出现这个选项的原因）。

### Which _type_ of authentication would you like to use? （您要使用哪种 _类型_ 的身份验证？）

该选择的选项取决于先前的选项。例如，如果您选择了上面的[JHipster Registry]({{ site.url }}/jhipster-registry/)，则只能使用JWT身份验证。

以下是所有可选的选项：

*   JWT身份验证：使用[JSON Web Token (JWT)](https://jwt.io/)，这是默认选择，也是大多数人使用的方法。
*  OAuth 2.0/OIDC身份验证：使用OpenID Connect服务（例如[Keycloak](https://www.keycloak.org/)或[Okta](https://developer.okta.com)）来处理应用程序外部身份验证。这比JWT更加安全，但是它需要设置OpenID Connect服务，因此有点复杂。请注意，默认情况下，JHipster将同步来自OpenID Connect服务器的用户数据，为此它将需要一个数据库。
*   HTTP会话身份验证：基于会话的经典身份验证机制，人们通常使用 [Spring Security](http://docs.spring.io/spring-security/site/index.html)进行此操作。

您可以在我们 [保护应用程序]({{ site.url }}/security/) 页面上找到更多信息。

### Which _type_ of database would you like to use? （您要使用哪种 _类型_ 的数据库？）

您可以选择：

- 一个SQL数据库（H2，MySQL，MariaDB，PostgreSQL，MSSQL，Oracle），您将使用Spring Data JPA访问该数据库
- [MongoDB]({{ site.url }}/using-mongodb/)
- [Cassandra]({{ site.url }}/using-cassandra/)
- [Couchbase]({{ site.url }}/using-couchbase/)
- [Neo4j]({{ site.url }}/using-neo4j/)
- 无数据库（仅在使用具有JWT身份验证的[微服务应用]({{ site.url }}/microservices-architecture/)时可用）

### Which _production_ database would you like to use? （您要使用哪个 _生产_ 数据库？)

这是在"production"配置文件使用的数据库。要对其进行配置，请修改您的`src/main/resources/config/application-prod.yml` 文件。

如果要使用Oracle，您可能需要了解当前的限制，见[使用Oracle数据库]({{ site.url }}/using-oracle/)。

###  Which _development_ database would you like to use? (您要使用哪个 _开发_ 数据库？)

这是在"development"配置文件使用的数据库，你可以选择：

*   H2，其数据存储在内存中。这是使用JHipster的最简单方法，但是当您重新启动服务器时，数据将丢失。
*   H2，其数据存储在磁盘上。与在内存中运行相比，这是一个更好的选择，因为在应用程序重新启动时您不会丢失数据。
*   与您选择用于生产的数据库相同的数据库：设置起来有点复杂，但最终最好与用于生产的数据库一起使用。如[开发指南]({{ site.url }}/development/)中所述，这也是使用liquibase-hibernate的最佳方法。

要对其进行配置，请修改您的`src/main/resources/config/application-dev.yml`文件。

### Do you want to use the Spring cache abstraction? (您是否要使用Spring抽象缓存？)

Spring抽象缓存允许使用不同的缓存实现，您可以使用：

1.[ehcache](http://ehcache.org/)（本地缓存），[Caffeine](https://github.com/ben-manes/caffeine)（本地缓存），

2.[Hazelcast](http://www.hazelcast.com/)（分布式缓存）、[Infinispan](http://infinispan.org/)（另一个分布式缓存）、[Memcached](https://memcached.org/)（另一个分布式缓存）或 [Redis](https://redis.io/) （配置为单个服务器缓存）。

这可能会对您的应用程序的性能产生非常积极的影响，因此建议您选择该选项。

###Do you want to use Hibernate 2nd level cache? (您是否要使用Hibernate 2级缓存？)

仅当您选择使用SQL数据库（因为JHipster将使用Spring Data JPA访问它）并且在上一个选择中选择了缓存实现服务时，此选项才可用。

[Hibernate](http://hibernate.org/)是JHipster使用的JPA提供程序，它可以使用缓存提供程序大大提高其性能。因此，我们强烈建议您使用此选项，并根据应用程序的需要调整缓存的实现。

### Would you like to use Maven or Gradle? （您要使用Maven还是Gradle？）

您可以使用[Maven](http://maven.apache.org/)或[Gradle](http://www.gradle.org/)构建生成的Java应用程序。Maven更稳定，更成熟。Gradle更灵活，更易于扩展且更具推广意义。

### Which other technologies would you like to use? （您还想使用哪些其他技术？）

这是一个多选答案，可以添加一种或多种其他技术到应用程序中。可用的技术有：

#### API first development using swagger-codegen （使用swagger-codegen的API先行开发）

通过此选项，您可以通过将[Swagger-Codegen](https://github.com/swagger-api/swagger-codegen)集成到构建中来为应用程序进行API先行开发。

#### Search engine using ElasticSearch （使用ElasticSearch的搜索引擎）

[Elasticsearch](https://github.com/elastic/elasticsearch)将使用Spring Data Elasticsearch配置。您可以在我们的[Elasticsearch指南]({{ site.url }}/using-elasticsearch/)中找到更多信息。

#### Clustered HTTP sessions using Hazelcast （使用Hazelcast的集群HTTP会话）

默认情况下，JHipster仅使用HTTP会话来存储[Spring Security](http://docs.spring.io/spring-security/site/index.html)的身份验证和授权信息。您可以选择在HTTP会话中放入更多数据。
如果您在集群中运行，则使用HTTP会话会引起问题，尤其是如果您不将负载均衡器与`粘滞会话（会话保持）`一起使用。
如果要在群集中复制会话，请选择此选项以配置[Hazelcast](http://www.hazelcast.com/)。

#### WebSockets using Spring Websocket （使用Spring Websocket的WebSockets）

可以使用Spring Websocket启用Websocket。我们还提供了一个完整的示例，向您展示如何有效地使用框架。

#### Asynchronous messages using Apache Kafka （使用Apache Kafka的异步消息）

使用[Apache Kafka]({{ site.url }}/using-kafka/)作为发布/订阅消息代理服务。

### Which _Framework_ would you like to use for the client? (您想为前端选择使用哪个 _框架_ ？)

要使用的前端框架。

您可以使用：

*   Angular
*   React
*   Vue

### Would you like to use a Bootswatch theme? (您要使用Bootswatch主题吗？)

要使用的前端题。

您可以使用[Bootswatch](https://bootswatch.com/)中的任何主题，也可以选择默认主题。

### Would you like to use the Sass stylesheet preprocessor for your CSS? (您想为CSS使用Sass样式表预处理器吗？)

[Sass](https://sass-lang.com/)是简化CSS设计的绝佳解决方案。为了高效使用，您将需要运行[Webpack](https://webpack.js.org)开发服务，该服务将自动配置Sass。

### Would you like to enable internationalization support? (您想启用国际化支持吗？)

默认情况下，JHipster在前端和后端都提供出色的国际化支持。但是，国际化支持会增加一些额外的性能开销，并且管理起来会有些复杂，因此您可以选择不安装此功能。

请注意，JHipster仅支持UI国际化。为了实现数据国际化，您需要在JPA/Hibernate层中自己编写代码。

### Which testing frameworks would you like to use? (您想使用哪些测试框架？)

默认情况下，JHipster提供Java单元/集成测试（使用Spring的JUnit支持）和JavaScript单元测试（使用Jest）。您还可以添加对以下内容的支持：

*   使用Gatling进行性能测试
*   使用Cucumber进行行为测试
*   用Protractor进行Angular集合测试

您可以在["运行测试"指南]({{ site.url }}/running-tests/)中找到更多信息。

### Would you like to use incremental Liquibase changelogs? (您要使用增量Liquibase变更日志吗？)

JHipster可以选择为您创建增量更改日志，因此您无需重新创建数据库或手动生成Liquibase差异。

随时使用`--incremental-changelog`选项运行JHipster以将其启用。

执行JHipster时，实体包含两种状态：

*   已保存到磁盘的旧状态
*   内存中的新状态（从jdl或提示生成）

它们之间将产生差异，并创建变更日志。

支持的功能：

*   创建/删除字段
*   创建/删除关系
*   JDL和提示

不支持类型和约束之类的属性更改。

冲突：
*   `--fork`选项，因为它保存到磁盘上以覆盖旧状态。

### Would you like to install other generators from the JHipster Marketplace? (您是否要从JHipster市场安装其他生成器？)

在[JHipster Marketplace]({{ site.url }}/modules/marketplace/)上，您可以安装由第三方开发人员编写的其他模块，以向项目中添加非官方功能。

## <a name="5"></a>使用蓝图

JHipster 5引入了蓝图的概念。蓝图是JHipster模块，可以提供定制的前后端模板，这些蓝图将覆盖JHipster中的模板。例如，[Kotlin蓝图](https://github.com/jhipster/jhipster-kotlin) 用Kotlin替换了大多数Java后端代码。

例如，要使用Kotlin蓝图，请在生成应用程序时按如下所示传递蓝图的名称。

```bash
jhipster --blueprint kotlin
```

蓝图的名称保存在`.yo-rc.json`中，将在执行诸如`entity`, `spring-controller` and `spring-service`等子生成器时自动使用。

如果某个蓝图未实现特定的子生成器，那么将跳过该蓝图，并使用同一子生成器的JHipster模板。

**注意：** 一个应用程序只能使用一个蓝图，尚不支持多个蓝图。

## <a name="3"></a> 命令行选项

您还可以使用一些可选的命令行选项运行JHipster。可以通过输入`jhipster app --help`来找到这些选项的参考。

您可以通过以下选项：
* `--help` - 显示生成器的选项和用法
* `--blueprint` - 指定要使用的蓝图, 例如`jhipster --blueprint kotlin`
* `--skip-cache` - 不要缓存回答问题的选项 (默认值: false)
* `--skip-git` - 不要将生成的项目自动添加到Git (默认值: false)
* `--skip-install` - 不自动安装依赖项 (默认值: false)
* `--skip-client` - 跳过前端应用生成，因此仅生成了Spring Boot后端代码 (默认值: false).
* `--skip-server` - 跳过后端应用生成，因此只生成了前端代码 (默认值: false).
* `--skip-user-management` - 跳过后端和前端的用户管理生成 (默认值: false)
* `--i18n` - 是否禁用或启用i18n，仅在跳过前端生成时有效 (默认值: true)
* `--auth` - 在跳过服务器端代码生成时指定身份验证类型，否则无效，而且在使用`skip-server`时是必需的
* `--db` - 在跳过服务器端代码生成时指定数据库，否则无效，但在使用`skip-server`时是必需的
* `--with-entities` - 重新生成现有实体类即使它们已经生成（使用`.jhipster`文件夹中的配置文件）(默认值: false)
* `--skip-checks` - 跳过依赖工具的检查 (默认值: false)
* `--jhi-prefix` - 在服务，组件和状态/路由名称之前添加前缀（默认值：jhi）
* `--entity-suffix` - 在实体类名称后添加后缀（默认值：""）
* `--dto-suffix` - 在DTO类名称后添加后缀（默认值：DTO）
* `--yarn` - 使用Yarn代替NPM（默认值：false）
* `--prettier-java` - 使用[prettier-java](https://github.com/jhipster/prettier-java) 格式化所有Java类（默认值：false）
* `--experimental` - 启用实验功能。请注意，这些功能可能不稳定，并可能随时发生重大变更
* `--skip-fake-data` - 跳过生成用于开发的虚拟数据
* `--creation-timestamp` - 为可复制的构建设置时间戳。 时间戳记应该是可解析的js日期，例如：2019-01-01。 必须与--with-entities或import-jdl一起使用（generator-jhipster> 6.5.1）

## <a name="4"></a> 提醒

您还可以使用Yeoman命令行选项，例如`--force`来自动覆盖现有文件。因此，如果要重新生成整个应用程序，包括其实体类，则可以运行`jhipster --force --with-entities`。
