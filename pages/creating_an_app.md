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

# <i class="fa fa-rocket"></i> Creating an application

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

您可以使用[Maven](http://maven.apache.org/) 或 [Gradle](http://www.gradle.org/)来构建您所生成的Java应用程序。 Maven使用起来更加稳定和成熟，Gradle使用起来更加灵活, 更易于扩展以及更具有主流.

### 您想要使用哪些其它技术？

此问题可以通过多选来添加一个或若干个其它技术到应用程序中。可选择的技术有：

#### 使用swagger-codegen进行API first开发

此选项通过集成构建[Swagger-Codegen](https://github.com/swagger-api/swagger-codegen)让您可以为您的应用程序进行[API-first开发]({{ site.url }}/doing-api-first-development)。

#### 使用ElasticSearch搜索引擎

[Elasticsearch](https://github.com/elastic/elasticsearch) 将通过Spring Data Elasticsearch进行配置。 您可以从我们的[Elasticsearch guide]({{ site.url }}/using-elasticsearch/)页面获取更多信息。

#### 使用Hazelcast的集群式HTTP sessions

JHipster默认仅使用HTTP session来存储[Spring Security](http://docs.spring.io/spring-security/site/index.html)的认证和授权信息。当然，您可以选择将更多的数据存储到您的HTTP sessions中。
如果运行在集群中，使用HTTP sessions将会导致问题出现，特别是在您没有使用带有“sticky sessions”的load balancer的情况下。
如果您想要在您的集群内部复制您的sessions，选择此项[Hazelcast](http://www.hazelcast.com/)来进行配置。

#### 使用Spring Websocket的WebSockets

使用Spring Websocket来开启Websockets。 我们也提供了一个完整的样本来为您展示怎样更有效率地使用此框架。

#### 使用Apache Kafka的异步信息

使用[Apache Kafka]({{ site.url }}/using-kafka/)作为publish/subscribe信息的代理.

### 您想要使用哪个client端框架？

使用client端框架。

您可以选择：

*   Angular
*   React

### 您想要为您的CSS使用Sass stylesheet preprocessor吗？

[Sass](https://sass-lang.com/)是简化您CSS设计的一个非常好的解决方案。为了有效率地使用它，您需要运行[Webpack](https://webpack.js.org)开发服务器, 此服务器将会自动进行配置。

### 您想要开启国际语言版本支持吗？

JHipster默认为client端和server端都提供了非常好的国际语言版本支持。然而，国际语言版本增加了一点开销，并在管理上会有一点复杂, 您可以不选择不安装此项。

请注意Jhipster仅覆盖了对用户界面的国际语言版本支持，对于数据中的国际语言, 您需要亲自在JPA/Hibernate层进行编码。

### 您要想使用哪种测试框架？

JHipster默认提供了Java单元/集成测试（使用Spring's JUnit）以及JavaScript单元测试（使用Jest）。 作为选项，您也可以添加一下框架：

*   使用Gatling进行性能测试
*   使用Cucumber进行行为测试
*   使用Protractor进行Angular集成测试

您可以在我们的 ["运行测试"指导]({{ site.url }}/running-tests/)页面获取更多信息。

### 您想要从Jhipster市场中安装其他生成器吗？

[JHipster市场]({{ site.url }}/modules/marketplace/)是您安装附加模块的地方, 它由第三方开发人员编写，用来添加非官方特性到您的应用中。

## <a name="5"></a> 使用蓝本

JHipster 5引入了蓝本概念。 蓝本是指可以为client/server端提供模板定制功能来覆盖JHipster模板的一种JHipster模块。 比如，[Kotlin蓝本](https://github.com/jhipster/jhipster-kotlin)可以替换绝大多数使用了Kotlin的Java服务端代码。

比如，在生成一个应用程序时，可以像下面这样通过输入蓝本名称来调用Kotlin蓝本。

```bash
jhipster --blueprint kotlin
```

蓝本名称存储在`.yo-rc.json`中，并在执行如`entity`，`spring-controller`和`spring-service`等子生成器时会被自动调用。

如果一个蓝本没有在一个子生成器中实现, 则它将会被跳过并且同一子生成器的JHipster模板会被调用。

**注意:** 一个应用程序仅能使用一个蓝本，多蓝本目前还不被支持。

## <a name="3"></a> 命令行选项

您也可以运行JHipster一些可选命令行选项。通过输入`jhipster app --help`可以查阅这些选项参考。

这里是您可以输入的选项：

* `--help` - 打印输出生成器的选项和使用方式。
* `--blueprint` - 指明使用一个蓝本。比如`jhipster --blueprint kotlin`。
* `--skip-cache` - 不要保留提示回答（默认为：false）。
* `--skip-git` - 不要自动将生成的项目添加到Git中（默认为：false）。
* `--skip-install` - 不要自动安装依赖（默认为：false）。
* `--skip-client` - 跳过client端应用程序生成，因此您仅有Spring Boot后端代码生成（默认为：false）。
* `--skip-server` - 跳过server端应用程序生成，因此您仅有前端代码生成（默认为：false）。
* `--skip-user-management` - 跳过后端和前端的用户管理生成（默认为：false）
* `--i18n` - 当跳过client端应用程序生成时，开启或关闭i18n，否则将没有影响（默认为：true）
* `--auth` - 当跳过server端应用程序生成时，指明认证类型，否则将没有影响，但是当使用`skip-server`时必须指明
* `--db` - 当跳过server端应用程序生成时，指明数据库, 否则将没有影响，但是当使用`skip-server`时必须指明
* `--with-entities` - 如果有通过`.jhipster`文件夹中的entity配置文件生成的entity，则重新生成这些现有的entity（默认为：false）
* `--skip-checks` - 跳过对必需工具的确认（默认为：false）
* `--jhi-prefix` - 对service，component和state/route的名称前添加前缀（默认为：jhi）
* `--entity-suffix` - 对entity类名添加后缀（默认为：空字符串）
* `--dto-suffix` - 对DTO类名添加后缀（默认为：DTO）
* `--yarn` - 使用Yarn取代NPM（默认为：false）
* `--experimental` - 开启实验特性。请注意这些特性也许不稳定并且在任何时候都有可能会被中断。

## <a name="4"></a> 提示

您也可以使用Yeoman命令行选项, 比如`--force`自动重写现有文件。因为您如果想要重新生成您的整个应用程序，包括其全部entity，您可以运行`jhipster --force --with-entities`。
