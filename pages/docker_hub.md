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

JHipster在Docker Hub有自己的[organization]，并提供不同的Docker镜像。


The [jhipster-docker-hub]项目提供所有Docker撰写文件，以便轻松启动这些镜像。
要使用docker compose命令，必须：

- clone the project: `git clone https://github.com/jhipster/jhipster-docker-hub`
- go inside project: `cd jhipster-docker-hub`


<div class="alert alert-warning"><i>警告: </i>

根据您的操作系统，您的<code>docker_host</code>将有所不同。在Linux上，它只是您的<code>localhost<code>。
对于Mac/Windows，您必须使用以下命令获取IP： <code>docker-machine ip default</code>

</div>


## [jhipster/jhipster](https://hub.docker.com/r/jhipster/jhipster) : JHipster的替代安装

有关完整说明，请参阅[安装]({{ site.url }}/installation/)页。

以下命令可用于特定的用例。

### 使用JHipster的最新版本

使用最新版本，在当前目录启动 `jhipster`：

```
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster jhipster
```

### 使用 JHipster v3.0.0

使用一个较老的版本，在当前目录启动 `jhipster`:

```
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster:v3.0.0 jhipster
```

您可以看到所有可用的标签[here](https://hub.docker.com/r/jhipster/jhipster/tags/)


## [jhipster/jdl-studio](https://hub.docker.com/r/jhipster/jdl-studio) : JDL-Studio offline

您可以离线使用JDL Studio，并在 [http://localhost:18080](http://localhost:18080)

```
docker container run -d -p 18080:80 jhipster/jdl-studio
```

## [jhipster/jhipster-sample-app](https://hub.docker.com/r/jhipster/jhipster-sample-app)

它是带有H2或MySQL的示例应用程序。

### 快速启动

在开发概要文件中，直接使用Docker运行简单的JHipster应用程序

```
docker container run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=dev jhipster/jhipster-sample-app
```

然后，您可以访问应用程序 [http://localhost:8080](http://localhost:8080)

### 开发配置

在开发配置文件中运行应用程序

```
docker-compose -f jhipster-sample-app/dev.yml up
```

### Production profile

在生产配置文件中运行应用程序，使用MySQL数据库

```
docker-compose -f jhipster-sample-app/prod.yml up
```

### Production profile and monitoring with ELK stack

在生产配置文件中运行应用程序，使用MySQL数据库和ELK堆栈

```
docker-compose -f jhipster-sample-app/prod-elk.yml up
```

访问正在运行的应用程序[http://localhost:8080](http://localhost:8080)

访问Kibana仪表板 [http://localhost:5601](http://localhost:5601)


## [jhipster/jhipster-sample-app-elasticsearch](https://hub.docker.com/r/jhipster/jhipster-sample-app-elasticsearch)

它是一个使用MySQL和ElasticSearch的示例应用程序。

### Development profile

在开发配置文件中运行应用程序

```
docker-compose -f jhipster-sample-app-elasticsearch/dev.yml up
```

### Production profile

使用MySQL数据库和ElasticSearch在生产配置文件中运行应用程序

```
docker-compose -f jhipster-sample-app-elasticsearch/prod.yml up
```

## [jhipster/jhipster-sample-app-mongodb](https://hub.docker.com/r/jhipster/jhipster-sample-app-mongodb)

它是MongoDB的示例应用程序。

### Production profile

使用MongoDB数据库在生产配置文件中运行应用程序

```
docker-compose -f jhipster-sample-app-mongodb/prod.yml up
```


## [jhipster/jhipster-sample-app-cassandra](https://hub.docker.com/r/jhipster/jhipster-sample-app-cassandra)

它是具有Cassandra集群的示例应用程序。

### Production profile

使用Cassandra集群在生产配置文件中运行应用程序

```
docker-compose -f jhipster-sample-app-cassandra/prod.yml up
```

扩展Cassandra节点

```
docker-compose -f jhipster-sample-app-cassandra/prod.yml scale sample-cassandra-node=2
```


[organization]: https://hub.docker.com/u/jhipster/
[jhipster-docker-hub]: https://github.com/jhipster/jhipster-docker-hub


## Microservices architecture

The images used here are:

- [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry)
- [jhipster/jhipster-sample-app-gateway](https://hub.docker.com/r/jhipster/jhipster-sample-app-gateway)
- [jhipster/jhipster-sample-app-microservice](https://hub.docker.com/r/jhipster/jhipster-sample-app-microservice)

### Production profile

在生产配置文件中运行完整堆栈

```
docker-compose -f jhipster-sample-microservices/prod/prod.yml up
```

它将开始：

- the JHipster Registry
- the gateway
- a MySQL database
- the microservice
- a PostgreSQL database


扩展微服务

```
docker-compose -f jhipster-sample-microservices/prod/prod.yml scale jhipstersamplemicroservice-app=2
```

### Production profile and monitoring with ELK stack

在生产配置文件中运行完整堆栈，使用ELK堆栈

```
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml up
```

扩展微服务

```
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml scale jhipstersamplemicroservice-app=2
```

访问registry at: [http://localhost:8761](http://localhost:8761)

访问gateway at: [http://localhost:8080](http://localhost:8080)

访问Kibana dashboard at: [http://localhost:5601](http://localhost:5601)
