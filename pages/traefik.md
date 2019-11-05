---
layout: default
title: Traefik
permalink: /traefik/
sitemap:
    priority: 0.7
    lastmod: 2019-01-29T00:00:00-00:00
---

# <i class="fa fa-exchange"></i> Traefik

## Traefik概述

[Traefik](https://traefik.io/)是现代的HTTP反向代理和负载均衡器，旨在轻松部署微服务。

它可以像Zuul一样路由HTTP请求，因此它与[JHipster网关]({{ site.url }}/api-gateway/)有些功能重叠，但是它工作在API网关更低的层面：它仅路由HTTP请求，不提供速率限制，安全性或Swagger文档聚合。

Traefik的好处之一是可以与许多不同的服务发现解决方案一起使用：但是，对于JHipster，默认情况下，它仅与 [Consul]({{ site.url }}/consul/)一起使用。

它可以应用于两种不同的体系结构样式，如下所述。

## 架构图1：默认配置

由于Traefik是反向代理和负载均衡器，因此它取代了Zuul，并将所有HTTP请求直接路由到正确的服务。

<img src="{{ site.url }}/images/microservices_architecture_detail.004.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

在这种架构中，JHipster“网关”不再是真正的网关，它主要是在这里为Angular应用程序服务。

这是我们的默认配置。

## 架构图2: Traefik和Zuul

Traefik也可以与Zuul一起使用：在这种情况下，对微服务的HTTP请求，先通过Traefik，然后通过Zuul，然后再到达其目的地。

<img src="{{ site.url }}/images/microservices_architecture_detail.005.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

这道中了更多的网络请求，因此效率不如以前的体系结构。但是，这允许充分利用JHipster网关：它可以专心处理速率限制或Swagger文档聚合。

总之，Traefik可以用作边缘服务，从而可以方便扩展JHipster网关。

此配置可与JHipster一起使用，开箱即用：唯一的问题是客户端应用程序使用绝对URL，例如对于"microservice1"：

- 默认URL是"/services/microservice1"，仅通过Traefik（这是上面的“默认配置”）。
- "/services/gateway/microservice1" URL将使用在Traefik中配置的"gateway"应用程序，然后使用Zuul来访问"microservice1"应用程序。

## 入门

请注意，Traefik仅适用于[Consul]({{ site.url }}/consul/)，因此，如果您使用 [JHipster Registry]({{ site.url }}/jhipster-registry/)，则此功能将无效。

要在微服务架构中使用Traefik，请运行[docker-compose子生成器]({{ site.url }}/docker-compose/)，并在出现询问您要使用哪个网关的问题时选择Traefik。

这将生成一个用于在Docker中运行Traefik的`traefik.yml`配置以及一个`traefik/traefik.toml`文件，该文件是Traefik的配置文件。

设置此配置文件是为了：

- Traefik运行在端口`80`上，因此，如果您有一个名为`gateway`的应用程序，则可以通过转到[http://localhost/services/gateway/](http://localhost/gateway/)来访问它。
- Traefik管理UI可在端口`28080`上找到，因此您可以在[http://localhost:28080](http://localhost:28080)上访问它。

由于Traefik使用Consul，因此检查Consul管理UI也很有用，该UI可在端口`8500`上找到：[http://localhost:8500](http://localhost:8500)。

#### 配置您的基本HREF

在构建网关的Docker镜像之前，您需要在`webpack.common.js`中配置`baseHref`值以匹配网关基本名称。例如，如果网关基本名称为`gateway`，则`baseHref`应为`/services/gateway/`。

#### 为OAuth 2.0配置

如果您将前端和api分开，则无需在本地执行其他配置。只需`npm start`并转到`http://localhost:9000`

在构建网关的Docker镜像之前，必须[配置您的基本HREF](#configure-your-base-href)并更新各种文件。

##### 服务

在`src/main/java/.../config/SecurityConfiguration.java`中，您必须在Spring更改`defaultSuccessUrl`。
例如，如果网关的基本名称是`gateway`，则必须在`.oauth2Login()`下添加`.defaultSuccessUrl("/services/gateway/")`。

现在，您可以通过运行`docker-compose up -d`启动所有基础架构。
