---
layout: default
title: 创建微服务
permalink: /creating-microservices/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 创建微服务

微服务是一种JHipster应用程序，它没有前端（必须在[网关]({{ site.url }}/api-gateway/))上生成Angular前端），并且可以与[JHipster Registry]({{ site.url }}/jhipster-registry/)一起配置，发现和管理。

## <a name="generating_entities"></a> 在微服务架构中生成实体

在微服务架构中，使用[实体子生成器]({{ site.url }}/creating-an-entity/)的工作方式略有不同，因为前端和后端代码不在同一应用程序中。

首先，在微服务应用程序中生成实体：这是一个常用操作，您还可以使用[JHipster UML]({{ site.url }}/jhipster-uml/)或[JDL Studio](https://start.jhipster.tech/jdl-studio/)来帮助您生成复杂的实体和关系。由于微服务没有前端，因此不会生成Angular/React代码。

然后，在网关上，再次运行实体子生成器。开头将出现一个新问题，该问题将特供于网关：

- 您可以选择正常生成一个新实体（网关也是标准的JHipster应用程序，因此这对于Monolith应用程序来说可以正常工作），或者选择使用微服务中现有的JHipster配置。
- 如果选择从微服务生成实体，则需要在本地计算机上指定该微服务的路径，然后JHipster将在网关上生成前端代码。

## <a name="hazelcast"></a> 使用Hazelcast进行分布式缓存

如果您的应用程序使用SQL数据库，那么JHipster会为微服务提出一个不同的第二级缓存解决方案：

- JHipster的默认微服务缓存解决方案是Hazelcast
- 您仍然可以选择Ehcache（monolith应用程序的默认解决方案）或Caffeine，或者选择完全不使用缓存

此解决方案是微服务的默认设置，因为在此架构中，您可以扩展服务：

- 使用本地缓存，您的服务实例将没有服务间同步的缓存，从而导致数据不正确
- 没有任何缓存，扩展的负担将被推到数据库上，这将不是很好（除非您使用我们的Cassandra选项）

将Hazelcast与微服务一起使用将产生特定的配置：

- 在启动时，您的应用程序将连接到JHipster Registry，以查找同一服务的其他实例是否正在运行
- 通过`dev`配置文件，JHipster将在本地主机（`127.0.0.1`）上创建这些实例的集群，每个实例使用一个不同的端口。默认情况下，Hazelcast端口是`应用程序的端口+5701`（因此，如果您的应用程序的端口是`8081`，Hazelcast将使用端口`13782`） 
- 借助`prod`配置文件，JHipster将使用默认的Hazelcast端口（`5701`）创建一个包含所有找到的其他节点的集群。

## <a name="no_database"></a> 没有数据库的微服务

没有数据库，只能创建微服务应用程序。这是因为微服务很小，并且没有用户管理代码。

没有数据库的微服务非常小，可以用来连接到特定的后端（如旧版系统）。
