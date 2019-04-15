---
layout: default
title: API Gateway
permalink: /api-gateway/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-exchange"></i> The JHipster API Gateway

JHipster可以生成API网关。网关是一个普通的JHipster应用程序，因此您可以在该项目上使用通常的Jhipster选项和开发工作流，但它也充当微服务的入口。更具体地说，它为所有微服务提供HTTP路由和负载平衡、服务质量、安全性和API文档。

## Summary

1. [架构图](#architecture_diagram)
2. [HTTP路由](#http_routing)
3. [安全](#security)
4. [自动生成文档](#documentation)
5. [速率限制](#rate_limiting)
6. [访问控制策略](#acl)

## <a name="architecture_diagram"></a> Architecture diagram

<img src="{{ site.url }}/images/microservices_architecture_detail.001.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## <a name="http_routing"></a> HTTP使用网关进行路由

当网关和微服务启动时，它们将在注册表中注册自己。 (使用 `eureka.client.serviceUrl.defaultZone` key in the `src/main/resources/config/application.yml` file).

网关将使用其应用程序名称自动将所有请求代理到微服务：例如，当注册微服务“app1”时，它在网关上的“/app1”URL上可用。

例如，如果您的网关在“localhost:8080”上运行，则可以指向[http://localhost:8080/app1/rest/foos]（http://localhost:8080/app1/rest/foos）以
获取微服务“app1”提供的“foos”资源。如果您尝试使用Web浏览器进行此操作，请不要忘记Jhipster中的REST资源默认是安全的，因此您需要发送正确的JWT头（请参见下面的安全性要点），或者删除MicroService的“MicroServiceSecurityConfiguration”类中这些URL的安全性。

如果同一服务有多个实例正在运行，网关将从jhipster注册表中获取这些实例，并将：

- Load balance HTTP requests using [Netflix Ribbon](https://github.com/Netflix/ribbon).
- Provide a circuit breaker using [Netflix Hystrix](https://github.com/Netflix/hystrix), so that failed instances are quickly and safely removed.

每个网关都有一个特定的“管理>网关”菜单，在该菜单中可以监视打开的HTTP路由和微服务实例。

## <a name="security"></a> 安全

标准JHipster安全选项在[本安全文档页]（{{site.url}}/security/）上有详细说明。然而，保护微服务体系结构有一些特定的调整和选项，在这里详细介绍。

### JWT (JSON Web Token)

JWT (JSON Web Token) 是一种行业标准、易于使用的方法，用于保护微服务体系结构中的应用程序。

JHipster 使用 [JJWT library](https://github.com/jwtk/jjwt), Okta提供, 实现 JWT.

令牌由网关生成并发送到底层微服务：由于它们共享一个公共密钥，微服务能够验证令牌，并使用该令牌对用户进行身份验证。

这些令牌是自给自足的：它们同时具有身份验证和授权信息，因此微服务不需要查询数据库或外部系统。这对于确保可扩展的体系结构很重要。

为了安全性工作，必须在所有应用程序之间共享JWT机密令牌。

- 对于每个应用程序，默认令牌是唯一的，由JHipster生成。它存储在`.yo rc.json`文件中。
- 令牌是用'src/main/resources/config/application.yml'文件中的'jhipster.security.authentication.jwt.secret'键配置的。
- 要在所有应用程序之间共享该项，请将该项从网关复制到所有微服务，或使用[JHipster注册表]（{{site.url}}/jhipster注册表/）的Spring配置服务器或[jhipster对Consul K/V Store的特定配置]（{{site.url}}/consul/）共享该项。这是人们使用这些中央配置服务器的主要原因之一。
- A good practice is to have a different key in development and production.

### OpenID 对接

JHipster 提供 OpenID 连接支持, 详细资料 [in our OpenID Connect documentation]({{ site.url }}/security/#oauth2).

选择此选项时，默认情况下将使用Keyclaft，您可能希望使用Docker Compose运行完整的微服务体系结构：请务必阅读我们的[Docker Compose documentation]（{{site.url}}/docker compose/），并正确配置您的`/etc/hosts`作为keyclaft。

当使用OpenID连接时，JHipster网关将OAuth2令牌发送到微服务，微服务将接受这些令牌，因为它们也连接到keycloft。

不像JWT, 这些令牌不是自给自足的，应该是有状态的，这导致了两个主要问题:

- 微服务中的一个性能问题：由于查找当前用户的安全信息非常常见（否则我们从一开始就不会使用任何安全选项），因此每个微服务都会调用OpenID Connect服务器来获取该数据。因此，在正常设置中，这些调用将由每个微服务在每次收到请求时进行，这将很快导致性能问题。
  - 如果您在生成JHipster微服务时选择了缓存选项（[这里是“使用缓存”文档]（{{site.url}}/using cache/）。正确调整后，这将消除性能问题。
  - 如果您想了解有关此“用户信息”请求的更多信息，可以使用“src/main/resources/application.yml”配置文件中的标准Spring引导配置键“security.oauth2.resource.userinfouri”进行配置。
- 认证不会在应用程序和keyscout之间自动同步。请注意，这是标准的OpenID连接工作流，我们希望在Jhipster中对此做一些具体的改进。因此：
  - 当用户注销应用程序时，如果刷新浏览器，他将自动再次登录：这是因为他仍然登录提供自动身份验证的keyscoat。
  - 当用户的会话在Keyscout中无效时，如果用户已经登录到应用程序中，他将仍然能够使用该应用程序一段时间。这是因为OpenID连接是一种有状态的机制，应用程序不会立即知道会话已经失效。

### JHipster UAA

JHipster提供基于Spring安全性生成“UAA”（用户帐户和身份验证）服务器的选项。此服务器提供OAuth2令牌以保护网关。

您将在我们的特定[JHipster UAA documentation]({{ site.url }}/using-uaa/)找到UAA相关信息.

然后，网关使用SpringSecurity的JWT实现将JWT令牌发送到微服务，因此这与上面详细介绍的JWT配置基本相同。

## <a name="documentation"></a> 自动文档生成

网关公开了它代理的服务的SwaggerAPI定义，这样您就可以从所有有用的工具（如SwaggerUI和SwaggerCodeGen）中获益。

网关的“admin>api”菜单有一个特定的下拉列表，显示网关的api和注册微服务中的所有api。

使用此下拉列表，所有微服务API都会自动记录，并且可以从网关进行测试。

当使用安全的API时，安全令牌会自动添加到Swagger UI接口中，因此所有请求都是开箱即用的。

## <a name="rate_limiting"></a> 速率限制

这是一个高级功能，使用[bucket4j]（https://github.com/vladimir-bukhtoyarov/bucket4j）和[hazelcast]（https://hazelcast.com/）提供微服务质量。

网关提供速率限制功能，因此可以限制REST请求的数量：

- 按IP地址（匿名用户）
- 按用户 (登录用户)

JHipster 将使用[bucket4j]（https://github.com/vladimir-bukhtoyarov/bucket4j）和[hazelcast]（https://hazelcast.com/）计算请求计数，并在超过限制时发送HTTP 429（请求太多）错误。每个用户的默认限制是每小时100000次API调用。

这是一个重要的特性，可以保护微服务体系结构不被特定用户的请求淹没。

由于网关保护REST端点，因此它可以完全访问用户的安全信息，因此可以很容易地扩展，以根据用户的安全角色提供特定的速率限制。

启用速率限制, 打开 `application-dev.yml` or `application-prod.yml` 设置 `enabled` to `true`:

    jhipster:
        gateway:
            rate-limiting:
                enabled: true

数据存储在Hazelcast中，因此只要配置了Hazelcast分布式缓存，就可以扩展网关，这应该是现成的：

- 默认情况下，所有网关都配置了Hazelcast
- 如果使用[jhipster注册表]（{{site.url}}/jhipster注册表/），则网关的所有实例都应自动注册到分布式缓存中。

如果要添加更多规则或修改现有规则，则需要在“ratelimitingfilter”类中对它们进行编码。修改的示例可以是：

- 降低HTTP调用的限制
- 添加每分钟或每天限制
- 删除“管理员”用户的所有限制

## <a name="acl"></a> 访问控制策略

默认情况下，所有注册的微服务都可以通过网关使用。如果要排除通过网关公开的特定API，可以使用网关的特定访问控制策略筛选器。使用 `jhipster.gateway.authorized-microservices-endpoints` 关键字 在 `application-*.yml` 文件中配置:

    jhipster:
        gateway:
            authorized-microservices-endpoints: # Access Control Policy, if left empty for a route, all endpoints will be accessible
                app1: /api,/v2/api-docs # recommended dev configuration

For example, if you only want the `/api/foo` endpoint of microservice `bar` to be available:

    jhipster:
        gateway:
            authorized-microservices-endpoints:
                bar: /api/foo
