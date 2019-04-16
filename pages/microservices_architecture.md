---
layout: default
title: 用JHipster做微服务
permalink: /microservices-architecture/
sitemap:
    priority: 0.7
    lastmod: 2016-03-10T00:00:00-00:00
---

# <i class="fa fa-sitemap"></i> 用JHipster做微服务

## <a name="microservices_vs_monolithic"></a> 微服务与单机架构

Jhipster将要问的第一个问题是您要生成的应用程序类型。您可以在两种体系结构样式之间进行选择：

- 一个“单片”架构使用一个单一的、一刀切的应用程序，它包含前端角度代码和后端弹簧引导代码。
- “微服务”体系结构将前端和后端分开，这样您的应用程序就更容易扩展和解决基础设施问题。

“单机”应用程序更容易操作，因此如果您没有任何特定的需求，这是我们推荐的选项，也是我们的默认选项。

## <a name="overview"></a> 微服务架构概述

JHipster微服务架构的工作方式如下：

 * A [gateway]({{ site.url }}/api-gateway/) 是jhipster生成的应用程序（生成时使用应用程序类型“microservice gateway”），用于处理Web流量，并为角度应用程序提供服务。如果您想遵循 [Backends for Frontends pattern](https://www.thoughtworks.com/insights/blog/bff-soundcloud)，可以有几个不同的网关，但这不是必需的。
 * [Traefik]({{ site.url }}/traefik/)是一个现代的HTTP反向代理和负载平衡器，可以与网关一起工作。
 * The [JHipster Registry]({{ site.url }}/jhipster-registry/) 是一个运行时应用程序，所有应用程序在此注册并从中获取配置。它还提供运行时监视仪表盘。
 * [Consul]({{ site.url }}/consul/) 是一个服务发现服务，也是一个密钥/值存储。它可以用作Jhipster注册表的替代项。
 * [JHipster UAA]({{ site.url }}/using-uaa/)是基于jhipster的用户身份验证和授权系统，使用OAuth2协议。
 * [Microservices]({{ site.url }}/creating-microservices/) 是jhipster生成的处理REST请求的应用程序（生成时使用应用程序类型“microservice application”）。它们是无状态的，并且有几个实例可以并行启动以处理重负载。
 * The [JHipster Console](https://github.com/jhipster/jhipster-console)是基于elk堆栈的监控和警报控制台。

在下面的图表中，绿色组件是特定于您的应用程序的，而蓝色组件提供了其底层基础设施。

<img src="{{ site.url }}/images/microservices_architecture_2.png" alt="Diagram" style="width: 930px; height: 558px"/>
