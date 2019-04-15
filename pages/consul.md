---
layout: default
title: Consul
permalink: /consul/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bullseye"></i> Consul

## Consul 概览

作为JHipster注册表的替代方案，您可以选择使用[Consul](https://www.consul.io/), 来自hashicorp的数据中心管理解决方案。
与Eureka相比，它有许多优势：

- 在多节点集群中操作比Eureka更容易。
- 它支持一致性而不是可用性，因此集群状态的更改传播得更快。
- Consul service discovery可以通过 [DNS interface](https://www.consul.io/docs/agent/dns.html) 或 [HTTP API](https://www.consul.io/docs/agent/http.html)与现有应用程序进行简单的互操作。

## 体系结构图

<img src="{{ site.url }}/images/microservices_architecture_detail.003.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## 入门

要开始开发依赖Consul注册表的应用程序，可以在Docker容器中启动Consul实例：

- 运行 `docker-compose -f src/main/docker/consul.yml up` 开启一个 Consul server 在 `dev` 模式. Consul将在Docker主机的端口“8500”上可用，因此如果它在您的计算机上运行，则应位于 [http://127.0.0.1:8500/](http://127.0.0.1:8500/).

您还可以使用 [Docker Compose subgenerator]({{ site.url }}/docker-compose/#docker-compose-subgen) 为多个启用consul的应用程序生成docker配置。

## Application configuration with Consul

如果您在生成Jhipster微服务或网关应用程序时选择了Consul选项，那么它们将自动配置为从Consul的**密钥/值存储**检索配置。

The Key/Value (K/V) 存储的编辑可以使用 [http://localhost:8500/v1/kv/](http://localhost:8500/v1/kv/) 或 [REST API](https://www.consul.io/intro/getting-started/kv.html). 但是，这种方式所做的更改是临时的，并且在Consul服务器/群集关闭时会丢失。因此，为了帮助您轻松地与Key/Value存储进行交互，并将配置管理为简单的yaml文件，Jhipster团队开发了一个小工具：[consul-config-loader](https://github.com/jhipster/consul-config-loader). 当从'consul.yml'docker compose文件启动consul时，*consul config loader**会自动配置，但它也可以作为独立工具运行。
It can be run in two modes:

- a **dev** mode, 其中“central server config”目录中的yaml文件会自动加载到consul中。此外，对该目录的任何更改都将立即与Consul同步。
- a **prod** mode, 它使用Git2Consul将git存储库中包含的yaml文件设置为键/值存储的配置源。

注意，与jhipster注册表一样，您的配置文件需要命名为'appname profile.yml'，其中appname和profile与您要配置的服务的应用程序名称和配置文件相对应。例如，在“consulapp-prod.yml”文件中添加属性将仅为以“prod”配置文件开头的名为“consulapp”的应用程序设置这些属性。此外，“application.yml”中定义的属性将为所有应用程序设置。
