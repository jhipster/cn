---
layout: default
title: API网关
permalink: /api-gateway/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-exchange"></i> JHipster API网关

JHipster可以生成API网关。网关是普通的JHipster应用程序，因此您可以在该项目上使用常规的JHipster选项和开发工作流，但它也充当微服务的入口。更具体地说，它为所有微服务提供HTTP路由和负载均衡，服务质量，安全性和API文档。

## 目录

1. [架构图](#architecture_diagram)
2. [HTTP路由](#http_routing)
3. [安全](#security)
4. [自动文档](#documentation)
5. [限速](#rate_limiting)
6. [访问控制策略](#acl)

## <a name="architecture_diagram"></a> 架构图

<img src="{{ site.url }}/images/microservices_architecture_detail.001.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## <a name="http_routing"></a> HTTP请求使用网关进行路由

启动网关和微服务后，它们将在registry中注册自己（使用`src/main/resources/config/application.yml`文件中的`eureka.client.serviceUrl.defaultZone`项）。

网关将使用其应用程序名字自动将所有请求代理到微服务：例如，注册微服务`app1`时，该请求在网关上的/`/app1`URL上可用。

例如，如果您的网关运行在`localhost:8080`上，则可以指向[http://localhost:8080/app1/rest/foos](http://localhost:8080/app1/rest/foos)来获取微服务`app1`服务的foos资源。
如果您尝试使用Web浏览器执行此操作，请不要忘记REST资源在JHipster中是默认保护的，因此您需要发送正确的JWT标头（请参见下面的安全性要点），或在微服务的`MicroserviceSecurityConfiguration`类删除这些URL安全保护。

如果有多个运行同一服务的实例，则网关将从JHipster Registry获取这些实例，并将：

- 使用[Netflix Ribbon](https://github.com/Netflix/ribbon)负载均衡HTTP请求。
- 使用[Netflix Hystrix](https://github.com/Netflix/hystrix)提供断路器，以便快速，安全地删除发生故障的实例。

每个网关都有一个特定的"admin > gateway"菜单，可以在其中监视打开的HTTP路由和微服务实例。

如果有多个运行同一服务的实例，则网关将从JHipster Registry获取这些实例，并将：
使用Netflix Ribbon负载均衡HTTP请求。

## <a name="security"></a> 安全

在此[安全文档页面]({{ site.url }}/security/)上详细介绍了标准JHipster安全选项。毕竟，保护微服务架构具有一些特定的调整和选项，在此进行详细介绍。

### JWT（JSON Web令牌）

JWT（JSON Web令牌）是一种行业标准、易于使用的方法，用于保护微服务体系结构中的应用程序。

JHipster使用Okta提供的[JJWT library](https://github.com/jwtk/jjwt)来实现JWT。

令牌由网关生成，并发送到底层微服务：由于它们共享一个公共密钥，因此微服务能够验证令牌并使用该令牌对用户进行身份验证。

这些令牌是自我描述的：它们具有身份验证和授权信息，因此微服务不需要查询数据库或外部系统。这对于确保可扩展的体系结构很重要。
- 为了确保安全，必须在所有应用程序之间共享JWT秘密令牌。
- 对于每个应用程序，默认令牌是唯一的，由JHipster生成。它存储在`.yo-rc.json`文件中。
- 使用`src/main/resources/config/application.yml`文件中的`jhipster.security.authentication.jwt.secret`密钥配置令牌。
- 要在所有应用程序之间共享此密钥，请将密钥从网关复制到所有微服务，或使用[JHipster Registry]({{ site.url }}/jhipster-registry/)的Spring Config Server或[JHipster的Consul K / V存储的特定配置]({{ site.url }}/consul/)进行共享。这是人们使用这些中心配置服务器的主要原因之一。
- 推荐的做法是在开发和生产中使用其他密钥。


### OpenID Connect

JHipster提供了OpenID Connect支持，如[我们的OpenID Connect文档]({{ site.url }}/security/#oauth2)中所述。

选择此选项时，默认情况下将使用Keycloak，并且可能要使用Docker Compose运行完整的微服务架构：请确保阅读我们的[Docker Compose文档]({{ site.url }}/docker-compose/)，并为Keycloak配置正确的`/etc/hosts`。

使用OpenID Connect时，JHipster网关会将OAuth2令牌发送到微服务，该微服务将接受这些令牌，因为它们也已连接到Keycloak服务。

与JWT不同，这些令牌不是自我描述的，而是有状态的，这导致两个主要问题：

微服务中的性能问题：由于查找当前用户的安全信息非常普遍（否则，从一开始我们就不会使用任何安全选项），几乎每个微服务都会调用OpenID Connect服务器来获取该数据。因此，在正常设置中，每个微服务都会在每次收到请求时进行这些调用，这将很快会导致性能问题。

  - 如果在生成JHipster微服务时选择了缓存选项([这里是使用缓存文档]({{ site.url }}/using-cache/))，则将生成特定的`CachedUserInfoTokenServices`Spring Bean，它将缓存这些调用。正确设置后，这将消除性能问题。
  - 如果您需要在“user info”请求获取更多信息，请使用`src/main/resources/application.yml`配置文件中的标准Spring Boot配置键值`security.oauth2.resource.userInfoUri`对其进行配置。
- 认证不会在应用程序和Keycloak之间自动同步。请注意，这是标准的OpenID Connect工作流程，我们希望在此方面对JHipster进行一些特定的改进。结果是：
  - 当用户注销应用程序时，如果刷新浏览器，则将自动再次登录：这是因为他仍然登录了Keycloak，后者提供了自动身份验证。
  - 当用户的会话在Keycloak中失效时，如果该用户已经登录到该应用程序中，则他仍将可以使用该应用程序一段时间。这是因为OpenID Connect是一种有状态机制，并且应用程序无法立即知道会话已失效。

### JHipster UAA

JHipster提供了基于Spring Security生成 "UAA"（用户帐户和身份验证）服务器的选项。该服务器提供OAuth2令牌以保护网关。

您可以在我们特定的[JHipster UAA文档]({{ site.url }}/using-uaa/)中找到所有与UAA相关的信息。

然后，网关使用Spring Security的JWT实现将JWT令牌发送到微服务，因此，其工作原理与上述JWT配置基本相同。

## <a name="documentation"></a> 自动文档

网关暴露了它所代理服务的Swagger API，许多工具依赖此特性，例如Swagger UI和swagger-codegen。

网关的"admin > API"菜单具有特定的下拉列表，其中显示了网关的API以及已注册的微服务中的所有暴露API。

使用此下拉列表，所有微服务API文档已经自动生成，并可以通过网关对其进行测试。

使用安全的API时，安全令牌会自动添加到Swagger UI界面，因此所有请求都可以直接使用。

## <a name="rate_limiting"></a> 限速

这是一项高级特性，它使用[Bucket4j](https://github.com/vladimir-bukhtoyarov/bucket4j)和[Hazelcast](https://hazelcast.com/)提供微服务上的服务质量。

网关提供速率限制功能，因此可以限制REST请求的数量：

- 通过IP地址（对于匿名用户）
- 通过用户登录（对于已登录的用户）

然后，JHipster将使用[Bucket4j](https://github.com/vladimir-bukhtoyarov/bucket4j)和[Hazelcast](https://hazelcast.com/)请求计数，并在超出限制时发送HTTP 429（请求过多）错误。每个用户的默认限制是每小时100,000个API调用。

这是一项重要功能，可以保护微服务架构免于被特定用户的请求所淹没。

网关在保护REST端点安全时，可以完全访问用户的安全信息，因此可以轻松地扩展它，以根据用户的安全角色提供特定的速率限制。

要启用速率限制，请打开`application-dev.yml`或`application-prod.yml`文件，并将`enabled`设置为`true`：

    jhipster:
        gateway:
            rate-limiting:
                enabled: true

数据存储在Hazelcast中，因此，只要配置了Hazelcast分布式缓存，便可以扩展网关，该网关可以直接使用：

- 默认情况下，所有网关都配置了Hazelcast
- 如果使用[JHipster Registry]({{ site.url }}/jhipster-registry/)，则网关的所有实例都应自动在分布式缓存中注册自己

如果要添加更多规则或修改现有规则，则需要在`RateLimitingFilter`类中对其进行编码。修改示例可能是：

- 降低HTTP调用的限制
- 增加每分钟或每天限制
- 取消“admin”用户的所有限制

## <a name="acl"></a> 访问控制策略

默认情况下，所有已注册的微服务都可以通过网关来访问。如果要排除通过网关公开访问的特定API，可以使用网关的特定访问控制策略过滤器。可以使用`application-*.yml`文件中的`jhipster.gateway.authorized-microservices-endpoints`密钥对其进行配置：

    jhipster:
        gateway:
            authorized-microservices-endpoints: # Access Control Policy, if left empty for a route, all endpoints will be accessible
                app1: /api,/v2/api-docs # recommended dev configuration

例如，如果您只希望微服务`bar`的 `/api/foo`API端点可用：

    jhipster:
        gateway:
            authorized-microservices-endpoints:
                bar: /api/foo
