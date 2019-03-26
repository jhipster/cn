---
layout: default
title: 创建一个Jhipster应用程序
permalink: /creating-an-app/
redirect_from:
  - /creating_an_app.html
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00
---

# <i class="fa fa-rocket"></i> 创建应用

_**请查阅我们 [video tutorial]({{ site.url }}/video-tutorial/) 关于创建一个新的Jhipster应用程序的视频教程!**_

1. [快速开始](#1)
2. [生成一个Jhipster应用程序时所提出的问题](#2)
3. [使用蓝本](#5)
4. [命令行选项](#3)
5. [提示](#4)

## <a name="1"></a> 快速开始

首先，需要为您所要创建的应用程序来创建一个空文件夹：

`mkdir myapplication`

进入这个文件夹：

`cd myapplication/`

生成您的应用程序，输入：

`jhipster`

通过回答生成器提出的若干问题来创建满足您需要的一个应用程序。这些选项将表述在 [下节中](#2).

当应用程序生成之后，您就可以使用Maven来运行它 (`./mvnw` on Linux/MacOS/Windows PowerShell, `mvnw` on Windows Cmd) 或者使用Gradle (`./gradlew` on Linux/MacOS/Windows PowerShell, `gradlew` on Windows Cmd)来运行它。

应用程序将通过 [http://localhost:8080](http://localhost:8080) 来打开

**重要** 如果您想使用实时重载您的JavaScript/TypeScript代码 ，您需要运行 `npm start` 或 `yarn start`。 您可以浏览 [Using JHipster in development]({{ site.url }}/development/) 页面来获取等多信息。

## <a name="2"></a> 生成一个Jhipster应用程序所提出的问题

_其中一些问题会根据您对之前问题做出的选择而改变。 比如，如果您没有选择一个SQL数据库，您将无需对Hibernate缓存进行配置。_

### 您想要创建哪种Jhipster应用程序？

您要创建的Jhipster应用程序类型取决于您是否希望使用微服务架构（microservices architacture）。 对微服务（microservices）的完整说明[在这里]({{ site.url }}/microservices-architecture/)，如果不确定是否使用微服务，可以使用默认选项“Monolithic application”。

您可以选择其中一个选项：

*   Monolithic application: 此选项是生成一个经典的单一通用型应用程序。此类应用程序更容易使用和开发，这是我们推荐的默认选项。
*   Microservice application: 此选项适用在微服务架构下，生成一个微服务应用程序。
*   Microservice gateway: 此选项适用在微服务架构下，生成一个用于处理路由（routes）和安全（secure）请求的边缘服务端（edge server）应用程序。
*   JHipster UAA server: 此选项适用在微服务架构下，生成一个基于OAuth2认证机制的服务端应用程序，该应用程序用于确保微服务安全。详情参考Jhipster UAA文档获取更多信息。

### 您的应用程序的基本名称是什么？

这是命名您的应用程序。

### 您的应用程序的默认Java包名是什么？

您的Java应用程序将使用此名称作为其根包名称。此名称会被Yeoman保存，以便下次您再运行生成器时此名称将变成默认包名，您当然也可以重写成新的名称。

### 您想要使用Jhipster Registry来配置，监控和扩展您的应用程序吗？

[Jhipster Registry]({{ site.url }}/jhipster-registry/) 是用来在运行时管理您的应用程序的一个开源工具应用。

当您使用微服务架构时，此应用会被要求使用（这也是为什么此问题仅在生成单一通用型应用程序（monolithic application）时才被问及）。

### 您想要使用哪种认证类型？

此问题的回答取决于您对之前问题的回答。比如，如果您在上一问题中选择了[JHipster Registry]({{ site.url }}/jhipster-registry/)，那么您在此问题中只能选择JWT认证。

这里是所有可供选择的选项：

*   JWT authentication: 使用[JSON Web Token (JWT)](https://jwt.io/)，这是默认选项，也是绝大多数人的选择。
*   OAuth 2.0 / OIDC Authentication: 使用一个OpenID连接服务器，比如[Keycloak](http://www.keycloak.org/) 或 [Okta](https://www.okta.com)，可以在应用程序之外处理认证。此选项比JWT更安全，但是它要求需要设置一个OpenID连接服务器，因此有一点复杂。请注意Jhipster默认将从OpenID连接服务器同步用户数据，并为其将需要一个数据库。
*   HTTP Session Authentication: 经典的基于session的认证机制, 通常配合[Spring Security](http://docs.spring.io/spring-security/site/index.html)一起使用。
*   Authentication with JHipster UAA server: 此选项使用必须分别生成的[JHipster UAA server]({{ site.url }}/using-uaa/)，这是一个OAuth2的服务器，用来在应用程序之外来进行认证处理。

您可以在我们的[securing your application]({{ site.url }}/security/)页面查找到更多信息。

### 您想要使用哪种数据库？

您可以选择：

- An SQL database (H2, MySQL, MariaDB, PostgreSQL, MSSQL, Oracle)：一个SQL数据库，您将通过Spring Data JPA访问数据库。
- [MongoDB]({{ site.url }}/using-mongodb/)：MondoDB数据库
- [Cassandra]({{ site.url }}/using-cassandra/)：Cassandra数据库
- [Couchbase]({{ site.url }}/using-couchbase/)：Couchbase数据库
- No database (only available when using a [microservice application]({{ site.url }}/microservices-architecture/) with JWT authentication)：无数据库（仅在使用带有JWT认证的微服务应用（microservice application）时可选择）。

### 您想要在生产环境下使用哪种数据库？

此数据库是您要在生产环境("production" profile)下使用的数据库。请修改您的`src/main/resources/config/application-prod.yml`文件对其进行配置。

如果您想要使用Oracle数据库，您需要[手动安装Oracle JDBC驱动包依赖]({{ site.url }}/using-oracle/)。

### 您想要在开发环境下使用哪种数据库？

此数据库是您要在开发环境("development" profile)下使用的数据库。您可以选择：

*   H2, 数据存储在内存中。这是Jhipster使用的最简单的数据库方式，但是当您重启服务器时您将丢失您的数据。
*   H2, 数据存储在硬盘中。这是比数据储存在内存中更好的一种选择，因为当您重启应用时您将不会丢失您的数据。
*   使用与生产环境下相同类型的数据库：尽管这里在设置上会有点复杂，但是与生产环境下使用相同的数据库将最终会是更好的一种选择。这也是使用liquibase-hibernate最好的方式，具体描述在[the development guide]({{ site.url }}/development/)。

请修改您的src/main/resources/config/application-dev.yml`文件对其进行配置。

### 您想要使用Spring缓存（Spring cache abstraction）吗?

Spring缓存（Spring cache abstraction）允许使用不同的缓存实现方式: 您可以使用[ehcache](http://ehcache.org/) (本地缓存)，[Hazelcast](http://www.hazelcast.com/) (分布式缓存), 或 [Infinispan](http://infinispan.org/) (另一种分布式缓存). Spring缓存可以对您应用程序的性能产生非常积极的影响，因此推荐使用此选项。

### 您想要使用Hibernate二级缓存（Hibernate 2nd level cache）吗？

此选项仅在您选择了SQL数据库（Jhipster将使用Spring Data JPA对数据库进行访问）并且在上一问题中也选择了一种缓存之后才可选择。

[Hibernate](http://hibernate.org/)是Jhipster使用的JPA框架，它可以使用缓存大大提成其性能。因此，我们强烈推荐您使用此选项，并根据您应用程序的需要对缓存进行调整。

### 您想要使用Maven还是Gradle？

You can build your generated Java application either with [Maven](http://maven.apache.org/) or [Gradle](http://www.gradle.org/). Maven is more stable and more mature. Gradle is more flexible, easier to extend, and more hype.

### Which other technologies would you like to use?

This is a multi-select answer, to add one or several other technologies to the application. Available technologies are:

#### API first development using swagger-codegen

This option lets you do [API-first development]({{ site.url }}/doing-api-first-development) for your application by integrating the [Swagger-Codegen](https://github.com/swagger-api/swagger-codegen) into the build.

#### Search engine using ElasticSearch

[Elasticsearch](https://github.com/elastic/elasticsearch) will be configured using Spring Data Elasticsearch. You can find more information on our [Elasticsearch guide]({{ site.url }}/using-elasticsearch/).

#### Clustered HTTP sessions using Hazelcast

By default, JHipster uses a HTTP session only for storing [Spring Security](http://docs.spring.io/spring-security/site/index.html)'s authentication and authorisation information. Of course, you can choose to put more data in your HTTP sessions.
Using HTTP sessions will cause issues if you are running in a cluster, especially if you don't use a load balancer with "sticky sessions".
If you want to replicate your sessions inside your cluster, choose this option to have [Hazelcast](http://www.hazelcast.com/) configured.

#### WebSockets using Spring Websocket

Websockets can be enabled using Spring Websocket. We also provide a complete sample to show you how to use the framework efficiently.

#### Asynchronous messages using Apache Kafka

Use [Apache Kafka]({{ site.url }}/using-kafka/) as a publish/subscribe message broker.

### Which _Framework_ would you like to use for the client?

The client-side framework to use.

You can either use:

*   Angular
*   React

### Would you like to use the Sass stylesheet preprocessor for your CSS?

[Sass](https://sass-lang.com/) a great solution to simplify designing CSS. To be used efficiently, you will need to run a [Webpack](https://webpack.js.org) dev server, which will be configured automatically.

### Would you like to enable internationalization support?

By default JHipster provides excellent internationalization support, both on the client side and on the server side. However, internationalization adds a little overhead, and is a little bit more complex to manage, so you can choose not to install this feature.

Please note that JHipster covers only UI internationalization. For data internationalization, you will need to code it yourself in JPA/Hibernate layer.

### Which testing frameworks would you like to use?

By default JHipster provide Java unit/integration testing (using Spring's JUnit support) and JavaScript unit testing (using Jest). As an option, you can also add support for:

*   Performance tests using Gatling
*   Behaviour tests using Cucumber
*   Angular integration tests with Protractor

You can find more information on our ["Running tests" guide]({{ site.url }}/running-tests/).

### Would you like to install other generators from the JHipster Marketplace?

The [JHipster Marketplace]({{ site.url }}/modules/marketplace/) is where you can install additional modules, written by third-party developers, to add non-official features to your project.

## <a name="5"></a> Using a blueprint

JHipster 5 introduces the concept of a blueprint. Blueprints are JHipster modules that can provide custome client/server side templates that will override the ones from JHipster. For example, the [Kotlin blueprint](https://github.com/jhipster/jhipster-kotlin) replaces most of the Java server side code with Kotlin.

For example, to use the Kotlin blueprint pass the name of the blueprint like below while generating an app.

```bash
jhipster --blueprint kotlin
```

The name of the blueprint is saved in the `.yo-rc.json` and will be automatically used while executing sub-generators like `entity`, `spring-controller` and `spring-service`.

If a blueprint doesn't implement a specific sub-generator, it will be skiped and the JHipster templates for the same sub-generator will be used.

**Note:** An application can use only one blueprint, multiple blueprints are not supported yet.

## <a name="3"></a> Command-line options

You can also run JHipster with some optional command-line options. Reference for those options can be found by typing `jhipster app --help`.

Here are the options you can pass:

* `--help` - Print the generator's options and usage
* `--blueprint` - Specify a blueprint to use. For example `jhipster --blueprint kotlin`
* `--skip-cache` - Do not remember prompt answers (Default: false)
* `--skip-git` - Do not add the generated project to Git automatically (Default: false)
* `--skip-install` - Do not automatically install dependencies (Default: false)
* `--skip-client` - Skip the client-side application generation, so you only have the Spring Boot back-end code generated (Default: false).
* `--skip-server` - Skip the server-side application generation, so you only have the front-end code generated (Default: false).
* `--skip-user-management` - Skip the user management generation, both on the back-end and on the front-end (Default: false)
* `--i18n` - Disable or enable i18n when skipping client side generation, has no effect otherwise (Default: true)
* `--auth` - Specify the authentication type when skipping server side generation, has no effect otherwise but mandatory when using `skip-server`
* `--db` - Specify the database when skipping server side generation, has no effect otherwise but mandatory when using `skip-server`
* `--with-entities` - Regenerate the existing entities if they were already generated (using their configuration in the `.jhipster` folder) (Default: false)
* `--skip-checks` - Skip the check of the required tools (Default: false)
* `--jhi-prefix` - Add prefix before services, components and state/route names (Default: jhi)
* `--entity-suffix` - Add suffix after entities class names (Default: empty string)
* `--dto-suffix` - Add suffix after DTOs class names (Default: DTO)
* `--yarn` - Use Yarn instead of NPM (Default: false)
* `--experimental` - Enable experimental features. Please note that these features may be unstable and may undergo breaking changes at any time

## <a name="4"></a> Tips

You can also use the Yeoman command-line options, like `--force` to automatically overwrite existing files. So if you want to regenerate your whole application, including its entities, you can run `jhipster --force --with-entities`.
