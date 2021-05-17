---
layout: default
title: JHipster控制中心
permalink: /jhipster-control-center/
sitemap:
    priority: 0.7
    lastmod: 2020-10-20T00:00:00-00:00
---

# <i class="fa fa-codepen"></i> JHipster控制中心

## 概述

JHipster控制中心（JHipster Control Center）的主要目的是监视和管理应用程序。

它的所有功能都通过现代Vue用户界面打包到一个外部应用程序中。 它的源代码可在JHipster组织下的GitHub上找到，网址为[jhipster/jhipster-control-center](https://github.com/jhipster/jhipster-control-center) 。

![]({{ site.url }}/images/jhipster-control-center-animation.gif)

## 概要

1. [Spring特定的配置文件](#profiles)
2. [安装](#installation)
3. [架构](#architecture)
4. [认证机制](#authentication)
5. [特性](#features)

## <a name="profiles"></a>  Spring特定的配置文件

**控制中心使用常规的JHipster`dev`和`prod`Spring配置文件。 但是，要正常工作，必须从与Spring Cloud Discovery后端相对应的Spring配置文件开始。**

- `eureka`: 连接到Eureka服务器并获取其注册实例，该实例在application-eureka.yml中配置
- `consul`: 连接到Consul服务器并获取其注册实例，该实例在application-consul.yml中配置
- `static`: 使用作为属性提供的实例的静态列表，该列表在application-static.yml中配置
- `kubernetes`: 在application-kubernetes.yml中配置

这对于微服务体系结构非常有用：控制中心以这种方式知道哪些微服务可用，哪些实例可用。

对于所有应用程序（包括单体式应用程序），Hazelcast分布式缓存可以自动扩展， 查阅[Hazelcast缓存文档]({{ site.url }}/using-cache/)

## <a name="installation"></a> 安装

### 在本地运行

* ### 步骤1：运行Spring Cloud Discovery后端使用的服务器

  Eureka和Consul docker-compose文件位于src/main/docker下，以简化测试项目 (查看 [specific spring profiles](#profiles)).

    - 对于Consul: 运行 `docker-compose -f src/main/docker/consul.yml up -d`
    - 对于Eureka: 运行 `docker-compose -f src/main/docker/jhipster-registry.yml up -d`
    - 对于Kubernetes : 查看 [kubernetes文档](https://www.jhipster.tech/kubernetes/#deploying-to-kubernetes)
    - 否则，要使用静态实例列表，可以直接转到下一步。

* ### 步骤2：选择您的身份验证配置文件

  身份验证有2种 (查看 [认证机制](#authentication)):

    - JWT: 这是默认身份验证，如果选择此身份验证，则无需执行任何操作。
    - OAuth2: 要使用OAuth2身份验证，您必须启动Keycloak。 运行 `docker-compose -f src/main/docker/keycloak.yml up -d`
    

* ### 步骤3：运行克隆的项目

    根据所需的特定Spring配置文件运行控制中心，以下是一些示例：

    - 对于使用JWT和Consul开发, 运行 `./mvnw -Dspring.profiles.active=consul,dev`
    - 对于使用JWT和Eureka开发, 运行`./mvnw -Dspring.profiles.active=eureka,dev`
    - 对于使用JWT和静态实例列表进行开发, 运行 `./mvnw -Dspring.profiles.active=static,dev`
    - 对于使用OAuth2和Consul进行开发， 运行 `./mvnw -Dspring.profiles.active=consul,dev,oauth2`
    - 对于使用OAuth2和Eureka进行开发, 运行 `./mvnw -Dspring.profiles.active=eureka,dev,oauth2`
    - 刚开始开发运行 `./mvnw` 然后在另一个终端运行 `npm start` 用于热重载客户端代码

### 从Docker运行

A 容器映像已在Docker Hub上提供。 要使用它，请运行以下命令：

- `docker pull jhipster/jhipster-control-center`
- `docker run -d --name jhcc -p 7419:7419 jhipster/jhipster-control-center:latest`

## <a name="architecture"></a> 架构

这是一个标准的Web应用程序，通过其管理API端点连接到一个或几个JHipster应用程序。 这些管理端点可以公开在标准API端口（通常为8080、8081等）上，也可以公开在专用管理端口（通常为9999）上，以便与外界隔离。

控制中心使用 [Spring Cloud Gateway](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/) 路由API和Spring Cloud LoadBalancer以在对另一个微服务的调用中提供客户端负载平衡（默认情况下，Ribbons已禁用，以使用Spring Cloud LoadBalancer的负载平衡实现）。

![]({{ site.url }}/images/jhipster-control-center-architecture.png)

## <a name="authentication"></a> 认证机制

为了访问您的应用程序，JHipster Control Center根据配置文件使用特定的安全机制。

#### ***JWT***
这是一个自定义的JHipster实现。 用于签署请求的JWT密钥对于应用程序和控制中心应该是相同的：默认情况下，控制中心通过Spring Cloud Config配置应用程序，这应该是开箱即用的，因为它将发送相同的key到所有应用程序 。

#### ***OAuth2***
此配置文件使用第三方授权-身份验证服务器，例如Keycloak（或Okta即将推出）。 当您连接到控制中心时，控制中心将使用OAuth2协议在Keycloak中生成会话。

然后，在Oauth2SecurityConfiguration.java中，我们的安全配置将使用Spring Security的过滤器链从Keycloak获得授权，并使用`http.oauth2Login()`生成Spring的Principal（当前用户）。 之后，Spring Security的过滤器链将应用`http.oauth2ResourceServer().jwt().jwtAuthenticationConverter(jwtAuthenticationConverter())`来获得其角色的身份验证。 通过这种方式，我们可以轻松地更改我们的提供程序（Keycloak，Okta等）。

## <a name="features"></a> 特性

### ***实例***

JHipster控制中心提供了应用程序实例的列表。 一旦应用程序在服务器（consul或eureka）上注册，它就会在列表中可用。

![]({{ site.url }}/images/jhipster-control-center-instances.png)

### ***指标***

指标页面使用Micrometer来提供应用程序性能的详细视图。

它提供有关以下方面的指标：

- JVM
- HTTP请求
- 缓存使用
- 数据库连接池

通过单击JVM线程指标旁边的Expand按钮，您将获得正在运行的应用程序的堆栈跟踪，这对于找出阻塞的线程非常有用。

![]({{ site.url }}/images/jhipster-control-center-metrics.png)

### ***健康***

运行状况页面使用Spring Boot Actuator运行状况端点来提供有关应用程序各个部分的运行状况信息。

Spring Boot Actuator提供了许多开箱即用的健康检查，您可以添加特定于应用程序的健康检查。

![]({{ site.url }}/images/jhipster-control-center-health.png)

### ***配置***

配置页面使用Spring Boot Actuator的配置端点来提供当前应用程序的Spring配置的完整视图。

![]({{ site.url }}/images/jhipster-control-center-configuration.png)

### ***日志***

日志页面允许在运行时管理正在运行的应用程序的Logback配置。

您可以通过单击按钮来更改Java包的日志级别，这在开发和生产中都非常方便。

![]({{ site.url }}/images/jhipster-control-center-logs.png)

### ***日志文件***

日志文件页面允许在运行时查看正在运行的应用程序的日志。 默认情况下，它是禁用的，您需要对其进行配置。 如果禁用了日志文件，则显示此消息：
```
No available logfile. Please note that it is not available by default, you need to set up the Spring Boot properties below! 
Please check:
 - if the microservice is up
 - if these properties are set: 
     - logging.file.path
     - logging.file.name (to avoid using the same spring.log)

See:
 - https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html
 - https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html
```

![]({{ site.url }}/images/jhipster-control-center-logfile.png)

### ***API***

API页面允许查看您应用程序的所有API文档，并通过单个Swagger UI框架测试其端点。

![]({{ site.url }}/images/jhipster-control-center-api.png)

