---
layout: default
title: Docker Hub
permalink: /docker-hub/
redirect_from:
  - /docker_hub.html
sitemap:
    priority: 0.7
    lastmod: 2016-09-25T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Docker Hub

## 概要

[![]({{ site.url }}/images/logo/docker-hub.png)](https://hub.docker.com/u/jhipster/)

JHipster在Docker Hub拥有自己的[organization]，并提供不同的Docker镜像。

[jhipster-docker-hub]项目提供所有docker-compose文件，可以启动这些镜像。
要使用docker-compose命令，您必须：

- 克隆项目: `git clone https://github.com/jhipster/jhipster-docker-hub`
- 进入项目: `cd jhipster-docker-hub`


<div class="alert alert-warning"><i>注意: </i>

根据您的操作系统，您的<code>DOCKER_HOST</code>将有所不同。
在Linux上，它将是您的<code>localhost</code>。对于Mac/Windows，必须使用以下命令获取IP：<code>docker-machine ip default</code>

</div>


## [jhipster/jhipster](https://hub.docker.com/r/jhipster/jhipster) : JHipster的备选安装

有关完整说明，请参见[安装]({{ site.url }}/installation/)页面。

以下这些命令可以在特定的用例中使用。

### 使用最新版本的JHipster

使用最新版本，在当前文件夹中启动`jhipster`

```
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster jhipster
```

### 使用JHipster v3.0.0

使用老版本，在当前文件夹中启动`jhipster`

```
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster:v3.0.0 jhipster
```

您可以在[此处](https://hub.docker.com/r/jhipster/jhipster/tags/)查看所有可用容器标签

## [jhipster/jdl-studio](https://hub.docker.com/r/jhipster/jdl-studio) : 离线JDL-Studio

您可以离线使用JDL-Studio，通过[http://localhost:18080](http://localhost:18080)对其进行访问

```
docker container run -d -p 18080:80 jhipster/jdl-studio
```

## [jhipster/jhipster-sample-app](https://hub.docker.com/r/jhipster/jhipster-sample-app)

它是带有H2或MySQL的示例应用程序。

### 快速启动

在开发配置文件中直接使用Docker直接运行一个jhipster应用程序

```
docker container run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=dev jhipster/jhipster-sample-app
```

然后，您可以通过[http://localhost:8080](http://localhost:8080)访问该应用程序

### 开发配置

使用开发配置文件运行应用程序

```
docker-compose -f jhipster-sample-app/dev.yml up
```

### 生产配置

使用生产配置文件运行应用程序, 使用MySQL数据库

```
docker-compose -f jhipster-sample-app/prod.yml up
```

### 生产配置和使用ELK Stack进行监控

使用生产配置文件运行应用程序, 并使用MySQL数据库和ELK Stack

```
docker-compose -f jhipster-sample-app/prod-elk.yml up
```

访问正在运行的应用程序 [http://localhost:8080](http://localhost:8080)

访问Kibana仪表板 [http://localhost:5601](http://localhost:5601)

## [jhipster/jhipster-sample-app-elasticsearch](https://hub.docker.com/r/jhipster/jhipster-sample-app-elasticsearch)

使用MySQL和Elasticsearch的示例应用程序。

### 开发配置

使用开发配置文件运行应用程序

```
docker-compose -f jhipster-sample-app-elasticsearch/dev.yml up
```

### 生产配置

使用生产配置文件运行应用程序, 并使用MySQL数据库和Elasticsearch

```
docker-compose -f jhipster-sample-app-elasticsearch/prod.yml up
```

## [jhipster/jhipster-sample-app-mongodb](https://hub.docker.com/r/jhipster/jhipster-sample-app-mongodb)

使用MongoDB的示例应用程序。

### 生产配置

使用生产配置文件运行应用程序, 并使用MongoDB数据库

```
docker-compose -f jhipster-sample-app-mongodb/prod.yml up
```


## [jhipster/jhipster-sample-app-cassandra](https://hub.docker.com/r/jhipster/jhipster-sample-app-cassandra)

使用Cassandra集群的示例应用程序

### 生产配置

使用生产配置文件运行应用程序, 并使用Cassandra集群


```
docker-compose -f jhipster-sample-app-cassandra/prod.yml up
```

扩展Cassandra节点

```
docker-compose -f jhipster-sample-app-cassandra/prod.yml scale sample-cassandra-node=2
```

[organization]: https://hub.docker.com/u/jhipster/
[jhipster-docker-hub]: https://github.com/jhipster/jhipster-docker-hub


## 微服务架构

这里使用的镜像如下：

- [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry)
- [jhipster/jhipster-sample-app-gateway](https://hub.docker.com/r/jhipster/jhipster-sample-app-gateway)
- [jhipster/jhipster-sample-app-microservice](https://hub.docker.com/r/jhipster/jhipster-sample-app-microservice)

### 生产配置

在生产配置文件中运行完整架构

```
docker-compose -f jhipster-sample-microservices/prod/prod.yml up
```

它将启动：

- JHipster Registry
- 网关
- MySQL数据库
- 微服务
- PostgreSQL数据库


扩展微服务

```
docker-compose -f jhipster-sample-microservices/prod/prod.yml scale jhipstersamplemicroservice-app=2
```

### 生产配置和使用ELK Stack进行监控

在生产配置文件中运行完整架构, 使用ELK堆栈

```
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml up
```

扩展微服务

```
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml scale jhipstersamplemicroservice-app=2
```

访问注册中心: [http://localhost:8761](http://localhost:8761)

访问网关: [http://localhost:8080](http://localhost:8080)

访问Kibana仪表板: [http://localhost:5601](http://localhost:5601)
