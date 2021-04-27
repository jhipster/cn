---
layout: default
title: 使用JHipster进行微服务
permalink: /microservices-architecture/
sitemap:
    priority: 0.7
    lastmod: 2016-03-10T00:00:00-00:00
---

# <i class="fa fa-sitemap"></i> 使用JHipster进行微服务

## <a name="microservices_vs_monolithic"></a> 微服务架构与整体架构

生成应用时JHipster问您的第一个问题是您要生成的应用程序类型。您可以在两种架构之间进行选择：

- "monolithic"架构使用一个单独的，所有组件集一体的应用程序，其中包含前端代码和后端Spring Boot代码。
- "微服务"架构将前端和后端分开，因此您的应用程序可以更轻松地扩展和解决基础架构问题。

"monolithic"应用程序更易于操作，因此，如果您没有任何特定要求，则建议使用此选项，并且将其作为默认选项。

## <a name="overview"></a> 微服务架构概述

JHipster微服务架构以以下方式工作：

 * [gateway]({{ site.url }}/api-gateway/)是JHipster生成的应用程序(生成时选择`microservice application``microservice gateway`)，该应用程序处理Web流量，并为Angular/React应用程序提供服务。如果您要遵循[Backends for Frontends模式](https://www.thoughtworks.com/insights/blog/bff-soundcloud)，则可以存在几种不同的网关，但这不是强制性的。
 * [JHipster Registry]({{ site.url }}/jhipster-registry/)是一个所有应用程序在运行时候在其注册并从中获取其配置的服务。它还提供了运行时监视仪表板。
 * [Consul]({{ site.url }}/consul/)是服务发现服务以及提供键/值存储。它可以用作JHipster Registry的替代服务。
 * [Microservices]({{ site.url }}/creating-microservices/)是JHipster生成的应用程序（生成时选择`microservice application`），用于处理REST请求。它们是无状态的，可以并行启动它们的多个实例来达到负载均衡的目的。

在下图中，绿色组件特定于您的应用程序，蓝色组件提供了其基础结构。

<img src="{{ site.url }}/images/microservices_architecture_2.png" alt="Diagram" style="width: 930px; height: 558px"/>
