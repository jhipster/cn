---
layout: default
title: 创建微服务
permalink: /creating-microservices/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 创建微服务

微服务是JHipster应用程序的一种类型，它没有前端 (Angular前端必须生成在 [gateway]({{ site.url }}/api-gateway/)), 并且和 [JHipster Registry]({{ site.url }}/jhipster-registry/) 一起配置, 发现和管理.

## <a name="generating_entities"></a> 在微服务体系结构中生成实体

使用 [entity sub-generator]({{ site.url }}/creating-an-entity/) 在微服务架构中的工作方式稍有不同，因为前端和后端代码不在同一应用程序中。

首先，在微服务应用程序中生成实体：这是正常工作的，您还可以使用 [JHipster UML]({{ site.url }}/jhipster-uml/) 或 [JDL Studio](https://start.jhipster.tech/jdl-studio/)来帮助您生成复杂的实体和关系。由于微服务没有前端，因此不会生成角度/反应代码。

然后，在网关上再次运行实体子生成器。一个新问题将出现在开头，这是针对网关的：

- 您可以选择正常生成一个新的实体（网关也是一个标准的JHipster应用程序，因此对于单块应用程序来说，这是可行的），或者使用来自微服务的现有JHipster配置。
- 如果选择从微服务生成实体，则需要在本地计算机上输入此微服务的路径，然后JHipster将在网关上生成前端代码。

## <a name="hazelcast"></a> 使用Hazelcast的分布式缓存

如果您的应用程序使用SQL数据库，JHipster将针对微服务提出不同的二级缓存解决方案：

- JHipster的默认微服务缓存解决方案是hazelcast
- 您仍然可以选择Ehcache（单片应用程序的默认解决方案）或根本不使用缓存。

此解决方案是微服务的默认解决方案，因为在此体系结构中，您将扩展服务：

- 使用本地缓存，您的服务实例将没有同步缓存，从而导致数据不正确
- 如果没有任何缓存，扩展的负担将被推到数据库中，这将不太擅长（除非您使用我们的Cassandra选项）。

在微服务中使用Hazelcast将导致特定的配置：

- 在启动时，您的应用程序将连接到JHipster注册表，以确定是否正在运行同一服务的其他实例。
- 使用 `dev` 配置文件, JHipster将在本地主机（`127.0.0.1`）上使用每个实例的不同端口创建这些实例的集群。 默认情况下，Hazelcast端口是 `your application's port + 5701` (因此，如果您的应用程序的端口是 `8081`, Hazelcast将使用端口 `13782`)
- 使用 `prod` 配置文件, JHipster将使用默认的hazelcast端口（`5701`）创建一个包含它找到的所有其他节点的集群

## <a name="no_database"></a> 没有数据库的微服务

只有微服务应用程序才能在没有数据库的情况下创建。这是因为微服务很小，没有用户管理代码。

没有数据库的微服务非常小，可以用来连接到特定的后端，比如遗留系统。
