---
layout: default
title: JHipster 注册中心
permalink: /jhipster-registry/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-dashboard"></i> Hipster 注册中心

## 概述

JHipster注册中心是一个运行时应用程序，由JHipster团队提供。与JHipster生成器一样，它是一个开源的、获得Apache2许可的应用程序，其源代码可以在jhipster组织下的github上的[jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry).

JHipster注册中心有三个主要用途：

- 它是一个[Eureka server](https://cloud.spring.io/spring-cloud-netflix/spring-cloud-netflix.html),作为应用程序的发现服务器。这就是JHipster如何处理所有应用程序的路由、负载平衡和可伸缩性。
- 它是一个 [Spring Cloud Config server](https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html), 为所有应用程序提供运行时配置的。
- 它是一个管理服务器，带有用于监视和管理应用程序的仪表盘。

所有这些功能都打包成一个方便的应用程序，并具有基于角度的现代用户界面。

![]({{ site.url }}/images/jhipster-registry-animation.gif)

## 摘要

1. [安装](#installation)
2. [使用Eureka进行服务发现](#eureka)
3. [使用Spring Cloud配置的应用程序配置](#spring-cloud-config)
4. [管理仪表板](#dashboards)
5. [保护JHipster注册中心](#security)

## <a name="installation"></a> Installation

### Spring 配置文件

JHipster注册中心使用一般的JHipster `dev` and `prod` Spring配置, 以及来自Spring Cloud Config标准的 `composite`(参见 [官方文档](https://cloud.spring.io/spring-cloud-config/multi/multi__spring_cloud_config_server.html#composite-environment-repositories)).

因此：

- 使用“dev”配置文件将使用“dev”和“composite”配置文件运行jhipster注册表。“dev”配置文件将从文件系统加载spring cloud配置，查找与运行目录相关的“central config”目录，该目录在“src/main/resources/config/bootstrap.yml”文件中定义。
- 使用“prod”配置文件将使用“prod”和“composite”配置文件运行jhipster注册表。“prod”配置文件将从git存储库加载Spring Cloud配置，默认情况下为[https://github.com/jhipster/jhipster-registry-sample-config](https://github.com/jhipster/jhipster-registry-sample-config)。在实际使用中，应该通过在“src/main/resources/config/bootstrap-prod.yml”文件中重新配置存储库，或者通过重新配置“spring.cloud.config.server.composite”spring属性来更改该存储库。

JHipster注册中心运行后，您可以在`Configuration > Cloud Config`菜单中检查其配置。请注意，如果您无法登录，可能是因为JWT签名密钥设置不正确，这表明您的配置不好。

### 使用预打包的war文件

JHipster注册中心作为可执行的war文件可在 [Releases page](https://github.com/jhipster/jhipster-registry/releases).

下载war文件，并使用您想要使用的配置文件（请参阅上一节关于配置文件的内容），将其作为普通的jhipster应用程序运行。例如，要使用存储在`central config`目录中的Spring Cloud配置运行它：

    ./jhipster-registry-<version>.war --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=native --spring.cloud.config.server.composite.0.search-locations=file:./central-config

请注意，在启动时通过`jhipster_security_authentication_jwt_secret`环境变量或上面所示的参数向注册表提供JWT密钥非常重要。另一种可能的方法是在集中式配置源的“application.yml”文件中设置该值（该文件在所有应用程序（包括注册表）启动时加载）。

请注意，自jhipster 5.3.0以来，我们有了一个新的'jhipster.security.authentication.jwt.base64 secret'属性，它更安全，但是您可能仍然使用旧版本

我们在本文档中使用了`jhipster.security.authentication.jwt.secret`。有关这些属性的详细信息，请参阅我们的[security documentation]({{ site.url }}/security/).

类似地，要使用“prod”配置文件运行注册表，请根据您的设置调整参数，例如：

    ./jhipster-registry-<version>.war --spring.profiles.active=prod --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=git --spring.cloud.config.server.composite.0.uri=https://github.com/jhipster/jhipster-registry-sample-config

    ./jhipster-registry-<version>.war --spring.profiles.active=prod --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=git --spring.cloud.config.server.composite.0.uri=https://github.com/jhipster/jhipster-registry --spring.cloud.config.server.composite.0.search-paths=central-config

### 从源代码生成

JHipster注册中心可以直接从 [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry)克隆/分叉/下载。由于jhipster注册表也是jhipster生成的应用程序，因此可以像其他任何jhipster应用程序一样运行它：

- run it in development with `./mvnw` (for the Java server) and `yarn start` (for managing the front-end), it will use by default the `dev` profile and it will be available at [http://127.0.0.1:8761/](http://127.0.0.1:8761/).
- use `./mvnw -Pprod package` to package it in production, and generate the usual JHipster executable WAR file. You can then run the WAR file using the `dev` or `prod` Spring profile, for example: `./jhipster-registry-<version>.war --spring.profiles.active=prod`

Please note that to use the `dev` and `composite` profile, you need to have a `central-config` directory with your configuration, so if you run `./jhipster-registry-<version>.war --spring.profiles.active=dev`, you need to have that directory set up.

### 使用Docker

如果您想从Docker镜像运行jhipster注册表，可以在Docker Hub上的 [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry/). 每个microservice`src/main/docker`目录中都已存在一个docker-compose文件，可以轻松运行此镜像：

- run `docker-compose -f src/main/docker/jhipster-registry.yml up` to start the JHipster Registry. It will be available on port `8761` of your Docker host, so if it runs on your machine it should be at [http://127.0.0.1:8761/](http://127.0.0.1:8761/).

请阅读我们的[Docker Compose documentation]({{ site.url }}/docker-compose/)了解有关使用JHipster注册中心和docker compose的更多信息。

### Running in the cloud

在云中托管JHipster注册表实例非常容易。这在生产中是强制性的，但在开发中也很有用（不需要在笔记本电脑上运行它）。

请阅读[生产中的微服务]({{ site.url }}/microservices-in-production/) 了解如何将jhipster注册表部署到Cloud Foundry或Heroku。

## <a name="eureka"></a> Eureka服务发现

![]({{ site.url }}/images/jhipster-registry-eureka.png)

JHipster注册中心是一个[Netflix Eureka server](https://github.com/Netflix/eureka), 为所有应用程序提供服务发现。

- 这对于微服务体系结构非常有用：这就是网关如何知道哪些微服务可用，哪些实例可用的方法
- 对于所有应用程序，包括整体应用程序，这是Hazelcast分布式缓存自动缩放的方式，请参见[the Hazelcast cache documentation]({{ site.url }}/using-cache/)

## <a name="spring-cloud-config"></a> Spring Cloud 应用配置

![]({{ site.url }}/images/jhipster-registry-spring-cloud-config.png)

JHipster注册中心是一个 [Spring Config Server](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html): 当启动应用程序时，它们将首先连接到JHipster注册中心以获取其配置。网关和微服务都是如此。

这个配置是一个Spring引导配置， 类似于JHipster的 `application-*.yml` 文件中的配置, 但是它存储在中央服务器中，因此更容易管理。

启动时，您的网关和微服务应用程序将查询注册中心的配置服务器，并用其中定义的属性覆盖它们的本地属性。

提供两种配置源(defined by the `spring.cloud.config.server.composite` property):

- A `native` configuration, which is used by default in development (using the JHipster `dev` profile), and which uses the local filesystem.
- A `Git` configuration, which is used by default in production (using the JHipster `prod` profile), and which stores the configuration in a Git server. This allows to tag, branch or rollback configurations using the usual Git tools, which are very powerful in this use-case.

要管理集中配置，只需在配置源中添加“appname profile.yml”文件，其中 **appname** 和 **profile** 对应于要配置的服务的应用程序名称和当前配置文件。
例如，在“gateway-prod.yml”文件中添加属性将仅为名为**gateway**的应用程序（以**prod**配置文件开头）设置这些属性。此外，将为所有应用程序设置在'application[-dev_prod].yml'中定义的属性。

由于网关路由是使用Spring引导配置的，因此也可以使用Spring配置服务器对其进行管理，例如，可以将应用程序“app1-v1”映射到“v1”分支中的“/app1”URL，并将应用程序“app1-v2”映射到“v2”分支中的“/app1”URL。这是一种很好的方式，可以在不停机的情况下为最终用户升级微服务。

### <a name="encryption"></a> 使用加密的配置值

JHipsterjhipster注册表有一个特定的“配置>加密”页面，允许轻松加密和解密配置值。

要加密配置值（例如，数据库密码），您需要：

- 下载 [JCE](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)并按照下载文件中的说明进行安装（仅当使用Oracle JDK时才需要这样做）。
- 在“bootstrap.yml”（不是“application.yml”）中设置“encrypt.key”属性，或将“encrypt.key”环境变量与对称密钥密码短语一起使用。

如果一切设置正确，您应该能够使用特定的“配置>加密”页面，并使用要在请求的“body”中操作的文本向“config/encrypt”和“config/decrypt”端点发送POST请求。

例如: `curl localhost:8761/config/encrypt -d mypassword`

密码文本必须以`password= '{cipher}myciphertextafterencryotion'`的形式放在任何`*.yml`配置文件中，在发送到其客户端之前，配置服务器将对其进行解密。这样，您的配置文件（存储在git中或“本机”存储在文件系统中）就没有纯文本值。

有关详细信息，请参阅Spring Cloud配置的[Encryption and Decryption documentation](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_encryption_and_decryption).

## <a name="dashboards"></a> 管理仪表板

JHipster注册中心提供用于所有应用程序类型的管理仪表盘。一旦应用程序在Eureka服务器上注册，它将在仪表板中可用。

为了从应用程序访问敏感信息，Jhipster注册中心将使用JWT令牌（这就是为什么Jhipster注册表只适用于使用JWT的应用程序）。用于签署请求的jwt项对于应用程序和JHipster注册中心应该是相同的：默认情况下，JHipster注册中心通过Spring Cloud配置来配置应用程序，这应该是开箱即用的，因为它将向所有应用程序发送相同的项。

### 指标仪表盘

![]({{ site.url }}/images/jhipster-registry-metrics.png)

度量仪表板使用测微计提供应用程序性能的详细视图。

它提供以下指标：

- the JVM
- HTTP requests
- cache usage
- database connection pool

通过单击JVM线程度量旁边的展开按钮，您将获得正在运行的应用程序的stacktrace，这对于发现被阻塞的线程非常有用。

注意：当我们将JHipster注册表切换为监视来自测微计的度量而不是DropWizard度量时，这意味着所有使用5.7.2或更高版本生成的JHipster应用程序都应该迁移到测微计，以便使用JHipster注册表进行监视。如果不想迁移应用程序，请使用JHipster注册表v4.0.6或更高版本。

要迁移应用程序，可以使用 [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/).

### 健康仪表盘

![]({{ site.url }}/images/jhipster-registry-health.png)

健康仪表板使用SpringBootActuator的健康端点提供应用程序各个部分的健康信息。许多健康检查都是由弹簧引导执行器提供的，并且很容易添加特定于应用程序的健康检查。

### 配置仪表板

![]({{ site.url }}/images/jhipster-registry-configuration.png)

配置仪表板使用Spring Boot Actuator的配置端点提供当前应用程序的弹簧配置的完整视图。

### 日志仪表板

![]({{ site.url }}/images/jhipster-registry-logs.png)

日志仪表板允许在运行时管理正在运行的应用程序的日志配置。更改Java包的日志级别与单击按钮一样简单，这在开发和生产中都非常方便。

## <a name="security"></a> 保护JHipster注册中心

JHhipster注册中心在默认情况下是安全的。您可以使用普通jhipster应用程序中使用的“admin/admin”登录名和密码登录。

应用程序也使用相同的“admin”用户连接到jhipster注册表，但使用HTTP基本身份验证。因此，如果您的微服务无法访问注册表，并且您看到一些“401身份验证错误”消息，那是因为您错误地配置了这些应用程序。

为了保护您的JHipster注册中心：

- 您必须更改默认的“admin”密码。此密码是使用标准的Spring启动属性`spring.security.user.password`设置的，因此您可以使用常用的Spring启动机制来修改它：您可以修改项目的`application-*.yml`文件，或者添加一个`spring-security-user-password`环境变量。[Docker Compose sub-generator]({{ site.url }}/docker-compose/) 使用环境变量方法。
- 由于应用程序将使用HTTP连接到注册中心，因此保护该连接通道非常重要。有很多方法可以做到这一点，最简单的方法可能是使用HTTPS。
