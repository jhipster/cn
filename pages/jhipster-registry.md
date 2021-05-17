---
layout: default
title: JHipster Registry
permalink: /jhipster-registry/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-dashboard"></i> JHipster Registry

## Overview

JHipster Registry是JHipster团队提供的应用程序。与JHipster生成器一样，它是一个开源，Apache 2-licensed应用程序，其源代码在JHipster组织的GitHub上可用：[jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry)

JHipster Registry具有三个主要功能：

- 它是一个[Eureka服务](https://cloud.spring.io/spring-cloud-netflix/spring-cloud-netflix.html)，作为应用程序的发现服务器。该服务器维护并分发可用应用程序实例的动态列表，微服务随后使用这些列表来执行HTTP请求路由和负载平衡。
- 它是一个[Spring Cloud配置服务](https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html)，为所有应用程序运行时提供配置。
- 它还是一台管理服务器，具有用于监视和管理应用程序的仪表板。

所有这些功能都通过基于Angular的现代用户界面，打包到一个便利的应用程序中。

![]({{ site.url }}/images/jhipster-registry-animation.gif)

## 目录

1. [安装](#installation)
2. [使用Eureka进行服务发现](#eureka)
3. [使用Spring Cloud Config进行应用程序配置](#spring-cloud-config)
4. [管理仪表板](#dashboards)
5. [保护JHipster Registry](#security)

## <a name="installation"></a> 安装

### Spring配置文件

JHipster Registry使用常规的JHipster`dev`和`prod`Spring配置文件，以及Spring Cloud Config的标准`composite`（请参阅[官方文档](https://cloud.spring.io/spring-cloud-config/multi/multi__spring_cloud_config_server.html#composite-environment-repositories)）。

结果是：

- 使用`dev`配置文件将与`dev`和`composite`配置文件一起运行JHipster Registry。`dev`配置文件将从文件系统加载Spring Cloud配置，以查找与`src/main/resources/config/bootstrap.yml`文件中定义的运行目录相对的`central-config`目录。

- 使用`prod`配置文件将运行带有`prod`配置文件和`composite`配置文件的JHipster Registry。`prod`配置文件将从Git存储库加载Spring Cloud配置，该存储库默认为[https://github.com/jhipster/jhipster-registry-sample-config](https://github.com/jhipster/jhipster-registry-sample-config)。在实际使用中，应该通过在`src/main/resources/config/bootstrap-prod.yml`文件中重新配置它，或者通过重新配置`spring.cloud.config.server.composite`Spring属性来更改此存储库。

JHipster Registry运行后，您可以在`Configuration > Cloud Config`菜单中检查其配置。请注意，如果您无法登录，则可能是因为JWT签名密钥未正确设置，这表明您的配置不正确。

### 使用预打包的JAR文件

JHipster Registry在我们的[发行页面](https://github.com/jhipster/jhipster-registry/releases)页面上提供了可执行的JAR文件。

下载JAR文件，并使用您要使用的配置文件（通常是JHipster应用程序）运行它（请参阅关于配置文件的上一节）。例如，要使用存储在`central-config`目录中的Spring Cloud Config配置运行它：

    java -jar ./jhipster-registry-<version>.jar --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=native --spring.cloud.config.server.composite.0.search-locations=file:./central-config

请注意，通过使用`JHIPSTER_SECURITY_AUTHENTICATION_JWT_SECRET`环境变量或使用如上所述的参数，向启动时的registry提供JWT密钥很重要。另一种可能的方法是在集中式配置源的`application.yml`文件中设置此值（该文件在启动时由所有应用程序（包括registry）加载）。

请注意，自JHipster 5.3.0起，我们有了一个新的`jhipster.security.authentication.jwt.base64-secret`属性，该属性更安全，但是由于您可能仍使用旧版本，因此我们也使用`jhipster.security.authentication.jwt.secret`属性。有关这些属性的更多信息，请参考我们的[安全性文档]({{ site.url }}/security/)。

同样，要使用`prod`配置文件运行registry，请根据您的设置调整参数，例如：

    java -jar ./jhipster-registry-<version>.jar --spring.profiles.active=prod --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=git --spring.cloud.config.server.composite.0.uri=https://github.com/jhipster/jhipster-registry-sample-config

    java -jar ./jhipster-registry-<version>.jar --spring.profiles.active=prod --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=git --spring.cloud.config.server.composite.0.uri=https://github.com/jhipster/jhipster-registry --spring.cloud.config.server.composite.0.search-paths=central-config

### 从源码构造

可以直接从[jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry)克隆/fork/下载JHipster Registry。由于JHipster Registry也是JHipster生成的应用程序，因此您可以像其他任何JHipster应用程序一样运行它：

- 使用`./mvnw`（用于Java服务器）在开发环境中运行它，并使用`yarn start`（用于管理前端）运行，默认情况下它将使用`dev`配置文件，并且可以从[http://127.0.0.1:8761/](http://127.0.0.1:8761/)访问。

- 使用`./mvnw -Pprod package`将其打包到生产环境中，并生成通常的JHipster可执行JAR文件。然后，您可以使用`dev`或`prod` Spring配置文件运行JAR文件，例如：`./jhipster-registry-<version>.jar --spring.profiles.active=prod`

请注意，要使用`dev`和`composite`配置文件，您需要在配置中包含一个`central-config`目录，因此，如果运行`java -jar ./jhipster-registry-<version>.jar --spring.profiles.active=dev`，您将需要建立该目录。

### 使用Docker

如果您希望从Docker镜像运行JHipster Registry，则可以在Docker Hub上的[jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry/)上找到它。每个微服务`src/main/docker`目录中已经存在一个用于运行该镜像的docker-compose文件：

- 运行`docker-compose -f src/main/docker/jhipster-registry.yml up`以启动JHipster Registry。它将在Docker主机的端口`8761`上可用，因此如果它在您的计算机上运行，​​则应位于[http://127.0.0.1:8761/](http://127.0.0.1:8761/)。

请阅读我们的[Docker Compose文档]({{ site.url }}/docker-compose/)以获取有关将JHipster Registry与Docker Compose结合使用的更多信息。

### 在云端运行

您可以在云上运行JHipster Registry实例。。这在生产中是必需的，但在开发中也很有用（无需在笔记本电脑上运行它）。

请阅读[生产中的微服务文档]({{ site.url }}/microservices-in-production/)，以了解如何将JHipster Registry部署到Cloud Foundry或Heroku。

## <a name="eureka"></a> 使用Eureka进行服务发现

![]({{ site.url }}/images/jhipster-registry-eureka.png)

JHipster注册表是[Netflix Eureka服务器](https://github.com/Netflix/eureka)，它为所有应用程序提供服务发现。

- 这对于微服务体系结构非常有用：这是网关如何知道哪些微服务可用以及哪些实例已启动的方式
- 对于所有应用程序，包括monoliths，这是Hazelcast分布式缓存可以自动扩展的方式，请参见[Hazelcast缓存文档]({{ site.url }}/using-cache/)

## <a name="spring-cloud-config"></a> 使用Spring Cloud Config进行应用程序配置

![]({{ site.url }}/images/jhipster-registry-spring-cloud-config.png)

JHipster Registry是[Spring Config Server](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html)：启动应用程序时，它们将首先连接到JHipster Registry以获取其配置。网关和微服务都是如此。

此配置是Spring Boot配置，就像在JHipster`application-*.yml`文件中找到的配置一样，但是它存储在中央服务器中，因此更易于管理。

启动时，您的网关和微服务应用程序将查询Registry的配置服务器，并用在那里定义的属性覆盖其本地属性。

可以使用两种配置源（由`spring.cloud.config.server.composite`属性定义）：

- `native`配置，开发中默认配置（使用JHipster`dev`配置文件），并且使用本地文件系统。
- `Git`配置，该配置在生产中默认使用（使用JHipster `prod`配置文件），并将配置存储在Git服务器中。这允许使用常用的Git工具来标记，分支或回滚配置，这些工具在此用例中非常强大。

要管理集中式配置，您需在配置源中添加`appname-profile.yml`文件，其中**appname**和**profile**对应于您要配置的服务的应用程序名称和当前配置文件。
例如，在`gateway-prod.yml`文件中添加属性将仅为以**prod**配置文件启动的名为**gateway**的应用程序设置这些属性。此外，将为所有应用程序设置`application[-dev|prod].yml`中定义的属性。

由于网关路由是使用Spring Boot配置的，因此也可以使用Spring Config Server对其进行管理，例如，您可以将应用程序`app1-v1`映射到`v1`分支中的 `/app1` URL，并将`app1-v2`映射到`/app1` `v2`分支中的URL。这是升级微服务的好方法，而最终用户不会停机。

### <a name="encryption"></a> 使用加密的配置值

JHipster Registry具有特定的`configuration > encryption`页面，可对配置值进行加密和解密。

要加密配置值（例如，数据库密码），您需要：

- 下载[JCE](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)并按照下载文件中的说明进行安装（仅在使用Oracle JDK时才需要）。
- 在`bootstrap.yml`（而不是`application.yml`）中设置`encrypt.key`属性，或在对称密钥密码中使用`ENCRYPT_KEY`环境变量。

如果一切设置正确，则您应该能够使用特定的`Configuration > Encryption`页面，并且还可以将您要处理的文本发送到`/config/encrypt`和`/config/decrypt`端点的POST请求中，并在请求的`body`中进行操作。

For example: `curl localhost:8761/config/encrypt -d mypassword`
例如：`curl localhost:8761/config/encrypt -d mypassword`

密文必须以`password= '{cipher}myciphertextafterencryotion'`的形式放置在任何`*.yml`配置文件中，并且在配置服务器将其发送到客户端之前，它将被解密。这样，您的配置文件（存储在Git或“本地”存储在文件系统中）就没有纯明文值。

有关更多信息，请参阅Spring Cloud Config的[加密和解密文档](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_encryption_and_decryption)。

## <a name="dashboards"></a> 管理仪表板

JHipster Registry提供了用于所有应用程序类型的管理仪表板。一旦应用程序在Eureka服务器上注册，它就会在仪表板中可见。

为了从应用程序访问敏感信息，JHipster Registry将使用JWT令牌（这就是JHipster Registry仅适用于使用JWT的应用程序的原因）。用于签署请求的JWT密钥对于应用程序和JHipster Registry应该是相同的：默认情况下，JHipster Registry通过Spring Cloud Config配置应用程序，这应该是开箱即用的，因为它将发送相同的密钥给所有应用程序。

### 指标仪表板

![]({{ site.url }}/images/jhipster-registry-metrics.png)

指标仪表板使用Micrometer来提供应用程序性能的详细视图。

它提供以下指标：

- JVM状态
- HTTP请求
- cache使用率
- database连接池

通过单击JVM线程指标旁边的Expand按钮，您将获得正在运行的应用程序的堆栈跟踪，这对于找出阻塞的线程非常有用。

注意：当我们切换JHipster Registry以监视来自Micrometer的度量标准而不是Dropwizard度量标准时，这意味着应将所有使用5.7.2或更早版本生成的JHipster应用程序迁移到Micrometer，以使用JHipster Registry进行监视。如果您不想迁移应用程序，请使用JHipster Registry v4.0.6或更旧的版本。

要迁移应用程序，可以使用[JHipster升级子生成器]({{ site.url }}/upgrading-an-application/)。

### 健康状况仪表板

![]({{ site.url }}/images/jhipster-registry-health.png)

运行状况仪表板使用Spring Boot Actuator的运行状况端点来提供有关应用程序各个部分的运行状况信息。
Spring Boot Actuator提供了许多开箱即用的健康检查，您可以添加特定于应用程序的健康检查。

### 配置仪表板

![]({{ site.url }}/images/jhipster-registry-configuration.png)

配置仪表板使用Spring Boot Actuator的配置端点来提供当前应用程序的Spring配置的完整视图。

### 日志仪表板

![]({{ site.url }}/images/jhipster-registry-logs.png)

日志仪表板允许在运行时管理正在运行的应用程序的Logback配置。
您可以通过单击按钮来更改Java包的日志级别，这在开发和生产中都非常方便。

## <a name="security"></a> 保护JHipster Registry

默认情况下，JHipster Registry是安全的。您可以使用普通JHipster应用程序中使用的"admin/admin"登录名和密码登录。

应用程序也使用同一"admin"用户连接到JHipster Registry，但使用了HTTP Basic身份验证。因此，如果您的微服务无法访问注册表，并且看到一些"401 authentication error"消息，那是因为您错误地配置了那些应用程序。

为了保护您的JHipster Registry，请执行以下操作：

- 您必须更改默认的"admin"密码。此密码是使用标准的Spring Boot属性`spring.security.user.password`设置的，因此您可以使用常规的Spring Boot机制对其进行修改：您可以修改项目的`application-*.yml`文件，或添加`SPRING_SECURITY_USER_PASSWORD`环境变量。[Docker Compose子生成器]({{ site.url }}/docker-compose/)使用环境变量方法。
- 由于您的应用程序将使用HTTP连接到registry，因此保护该连接通道非常重要。有很多方法可以做到这一点，最简单的方法就是使用HTTPS。
