---
layout: default
title: Consul
permalink: /consul/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bullseye"></i> Consul

## Consul概述

作为JHipster Registry的替代方案，您可以选择使用Hashicorp的数据中心管理解决方案 [Consul](https://www.consul.io/)。
与Eureka相比，它具有许多优点：

- 在多节点群集中进行操作比在Eureka上容易。
- 与可用性相比，它更注重一致性，因此可以更快地传播集群状态的变化。
- Consul服务发现可以通过其[DNS interface](https://www.consul.io/docs/agent/dns.html)或[HTTP API](https://www.consul.io/docs/agent/http.html)轻松与现有应用程序进行互操作。

## 架构图

<img src="{{ site.url }}/images/microservices_architecture_detail.003.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## 入门

开始开发依赖Consul registry的应用程序，可以在Docker容器中启动Consul实例：

- 运行`docker-compose -f src/main/docker/consul.yml up`以在`dev`模式下启动Consul服务器。然后，Consul将在Docker主机的端口`8500`上可用，因此如果它在您的计算机上运行，​​则应位[http://127.0.0.1:8500/](http://127.0.0.1:8500/)。

您还可以使用[Docker Compose子生成器]({{ site.url }}/docker-compose/#docker-compose-subgen)为多个启用consul的应用程序生成docker配置。

## 使用Consul进行应用程序配置

如果您在生成JHipster微服务或网关应用程序时选择了Consul选项，则将自动配置它们以从Consul的**Key/Value存储**中检索其运行配置。

可以使用位于[http://localhost:8500/v1/kv/](http://localhost:8500/v1/kv/)上的UI或[REST API](https://www.consul.io/intro/getting-started/kv.html)来修改键/值（K/V）存储。但是，以这种方式进行的更改是临时的，在Consul服务器/群集关闭时将丢失。因此，为了帮助您轻松地与键/值存储进行交互并以简单的YAML文件形式管理您的配置，JHipster团队开发了一个小工具：[consul-config-loader](https://github.com/jhipster/consul-config-loader)。从`consul.yml` docker-compose文件启动Consul时会自动配置**consul-config-loader**，但它也可以作为独立工具运行。
它可以在两种模式下运行：

- **dev**模式，其中将从`central-server-config`目录中的YAML文件自动加载到Consul中。此外，对该目录的任何更改将立即与Consul同步。
- **prod**模式，使用Git2Consul来设置Git存储库中包含的YAML文件，作为键/值存储的配置源。

请注意，与JHipster Registry一样，您的配置文件将需要命名为`appname-profile.yml`，其中appname和profile与您要配置的服务的应用程序名称和配置文件相对应。例如，在`consulapp-prod.yml`文件中添加属性将仅对以`prod`概要文件开头的名为`consulapp`的应用程序设置这些属性。此外，将为所有应用程序设置`application.yml`中定义的属性。
