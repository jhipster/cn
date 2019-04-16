---
layout: default
title: Docker 和 Docker Compose
permalink: /docker-compose/
redirect_from:
  - /docker_compose.html
sitemap:
    priority: 0.7
    lastmod: 2016-12-01T00:00:00-00:00
---

# <i class="fa fa-music"></i> Docker 和 Docker Compose

## Summary

开发中强烈推荐使用docker和docker compose，也是一种很好的生产解决方案。

1. [描述](#1)
2. [先决条件](#2)
3. [构建应用程序的Docker映像](#3)
4. [为多个应用程序生成自定义Docker撰写配置](#docker-compose-subgen)
5. [使用数据库](#4)
6. [Elasticsearch](#5)
7. [Sonar](#6)
7. [Keycloak](#7)
8. [常用命令](#8)
9. [Memory Tweaking](#9)

## <a name="1"></a> 描述

_请注意：此Docker配置用于在容器映像中运行生成的应用程序。它与JHipster提供的[Docker setup]({{ site.url }}/installation/) 完全不同，后者用于在容器内运行JHipster生成器_

JHipster提供了完整的Docker支持，以便：

- 促进开发，因为即使使用复杂的微服务体系结构，您也可以非常容易地启动完整的基础结构
- 对于使用docker swarm的用户，直接部署到生产环境中，因为它使用相同的docker compose配置

使用docker compose的一个重要特性是，您可以使用`docker-compose scale`命令轻松地缩放容器。如果您将Jhipster与[微服务架构](#3)结合使用，这将非常有趣。

生成应用程序时，JHipster会为您生成：

- 用于构建Docker映像并在容器中运行应用程序的`Dockerfile`
- 几个Docker Compose配置以帮助您使用第三方服务（例如数据库）运行应用程序

这些文件位于文件夹中`src/main/docker/`.

## <a name="2"></a> 先决条件

你必须安装Docker 和 Docker Compose:

- [Docker](https://docs.docker.com/installation/#installation)
- [Docker Compose](https://docs.docker.com/compose/install)

Docker现在需要创建一个到Docker商店的帐户来下载Docker for Mac和Docker for Windows。绕过这个

<div class="alert alert-info"><i>Tip: </i>

在Windows和Mac OS X上，Kitematic是一个随Docker工具箱提供的易于使用的图形界面，这将使使用Docker变得更加容易。

</div>

<div class="alert alert-warning"><i>Warning: </i>

如果您在Mac或Windows上使用Docker机器，则Docker守护进程对OS X或Windows文件系统的访问权限有限。 Docker Machine 尝试自动共享/Users (OS X) or C:\Users\&lt;username&gt; (Windows) 目录. 因此，您必须在此目录下创建项目文件夹以避免任何问题， 尤其是在使用<a href="{{ site.url }}/monitoring/">JHipster Console</a> 控制台进行监控时。

</div>


如果遇到错误，请选择`npm err！错误：eacces:permission denied`安装jhipster UML（或任何未绑定的包）时，容器可能未安装`sudo`（例如，sudo未与ubuntu xenial绑定）。

__解决方案 1__

NPM文档建议不要将任何NPM包作为根安装。按照 [官方文档](https://docs.npmjs.com/getting-started/fixing-npm-permissions) 修复此问题。

__解决方案 2__

  - `docker container exec -u root -it jhipster bash`,
  - `npm install -g YOUR_PACKAGE`,
  - 然后退出并正常登录容器： `docker container exec -it jhipster bash`

## <a name="3"></a> 构建和运行应用程序的Docker映像

要创建应用程序的Docker映像并将其推入Docker注册表，请执行以下操作：

- 使用 Maven, 键入: `./mvnw package -Pprod verify jib:dockerBuild`
- 使用 Gradle, 键入: `./gradlew -Pprod bootWar jibDockerBuild`

这将使用`prod` 配置文件打包应用程序，并使用连接到本地docker守护进程的 [Jib](https://github.com/GoogleContainerTools/jib) 构建docker映像。

在Windows上，由于[缺少命名管道](https://github.com/spotify/docker-client/issues/875), 您可能需要调整docker的设置并打开“expose daemon tcp://localhost:2375 without tls”。

有关配置详情，请参阅起重臂文件：

- [Jib maven plugin documentation](https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration)
- [Jib gradle plugin documentation](https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin#configuration)

<div id="3-warning" class="alert alert-warning"><i>警告: </i>
<p>
由于jib的工作方式，它将首先尝试从配置的Docker注册表中提取最新版本的基本Docker映像。这是故意的，就像在CI环境中一样，您必须确保始终在最新修补的基础映像之上构建。
</p>
<p>
但是，在本地环境中，这可能会由于网络问题（长时间超时、代理）或您没有登录到Docker注册表而失败。
</p>
<p>
Jib目前有一个<a href="https://github.com/GoogleContainerTools/jib/issues/718">opened issue for offline mode support</a>, 但是如果jib构建失败，您可以使用以下解决方法：
</p>
<p>
For Maven :
<pre>
  ./mvnw clean package -Pprod jib:exportDockerContext && docker build -t myimage target/jib-docker-context
</pre>
For Gradle :
<pre>
  ./gradlew -Pprod bootWar jibExportDockerContext && docker build -t myimage build/jib-docker-context
</pre>
</p>
</div>

要运行此映像，请使用位于应用程序的`src/main/docker` 文件夹中的docker compose配置：

- `docker-compose -f src/main/docker/app.yml up`

此命令将启动应用程序及其依赖的服务 (database, search engine, JHipster Registry...).

如果您选择OAuth 2.0进行身份验证，请务必阅读我们的 [Keycloak section on this documentation](#7).

## <a name="docker-compose-subgen"></a> 为多个应用程序生成自定义Docker撰写配置

如果您的体系结构由几个Jhipster应用程序组成，您可以使用特定的“docker compose”子生成器，它将为所有选定的应用程序生成全局docker compose配置。这将允许您使用一个命令部署和扩展完整的体系结构。
要使用`docker-compose` 子生成器：

- 您需要将所有的单块、网关和微服务都放在同一个目录中。
- 创建另一个目录，例如`mkdir docker compose`。
- 进入那个目录：`cd docker compose`。
- 运行子生成器：`jhipster docker compose`。
- 子生成器将询问您希望在体系结构中使用哪个应用程序，以及是否希望使用elk或prometheus设置监控。

这将生成一个全局docker compose配置，键入`docker compose up`运行它，并让所有服务同时运行。

对于微服务架构，此配置还将预配置Jhipster注册表或Consul，它将自动配置您的服务：

- 这些服务将等待Jhipster注册表（或Consul）运行开始。这可以在 `bootstrap-prod.yml` 文件中使用 `spring.cloud[.consul].config.fail-fast` 和 `spring.cloud[.consul].config.retry`键进行配置。
- 注册表将配置您的应用程序，例如，它将在所有服务之间共享JWT机密令牌。
- 缩放每个服务都是使用docker compose完成的，例如键入 `docker-compose scale test-app=4` 让4个应用程序“test”实例运行。这些实例将由网关自动进行负载平衡，并自动加入同一个Hazelcast群集（如果Hazelcast是您的Hibernate二级缓存）。


## <a name="4"></a>使用数据库

### MySQL, MariaDB, PostgreSQL, Oracle, MongoDB 或 Cassandra

运行 `docker-compose -f src/main/docker/app.yml up`已经自动启动数据库。

如果只想启动数据库，而不想启动其他服务，请使用数据库的docker compose配置：

- With MySQL: `docker-compose -f src/main/docker/mysql.yml up`
- With MariaDB: `docker-compose -f src/main/docker/mariadb.yml up`
- With PostgreSQL: `docker-compose -f src/main/docker/postgresql.yml up`
- With Oracle: `docker-compose -f src/main/docker/oracle.yml up`
- With MongoDB: `docker-compose -f src/main/docker/mongodb.yml up`
- With Cassandra: `docker-compose -f src/main/docker/cassandra.yml up`
- With Couchbase: `docker-compose -f src/main/docker/couchbase.yml up`

### MongoDB Cluster Mode

如果要将MongoDB与副本集或碎片以及它们之间的共享配置一起使用，则需要手动构建和设置MongoDB映像。
按照以下步骤操作：

- 构建镜像: `docker-compose -f src/main/docker/mongodb-cluster.yml build`
- 运行数据库: `docker-compose -f src/main/docker/mongodb-cluster.yml up -d`
- 缩放MongoDB节点服务（必须选择奇数个节点）： `docker-compose -f src/main/docker/mongodb-cluster.yml scale <name_of_your_app>-mongodb-node=<X>`
- 初始化副本集（参数x是上一步中输入的节点数，folder是YML文件所在的文件夹，它是`docker` by default): `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb-node_1 mongo --eval 'var param=<X>, folder="<yml_folder_name>"' init_replicaset.js`
- 初始化shard: `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb_1 mongo --eval 'sh.addShard("rs1/<yml_folder_name>_<name_of_your_app>-mongodb-node_1:27017")'`
- 构建应用程序的Docker映像: `./mvnw package -Pprod verify jib:dockerBuild`
- 启动您的应用: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

如果要添加或删除一些MongoDB节点，只需重复步骤3和4。

### Couchbase Cluster Mode

如果要将couchbase用于多个节点，则需要手动构建和设置couchbase图像。
按照以下步骤操作：

- 构建镜像: `docker-compose -f src/main/docker/couchbase-cluster.yml build`
- 运行数据库: `docker-compose -f src/main/docker/couchbase-cluster.yml up -d`
- 缩放couchbase节点服务（必须选择奇数个节点）： `docker-compose -f src/main/docker/couchbase-cluster.yml scale <name_of_your_app>-couchbase-node=<X>`
- 构建应用程序的Docker映像: `./mvnw package -Pprod verify jib:dockerBuild`
- 启动您的应用: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

### Cassandra

与其他数据库不同，模式迁移由应用程序本身执行，Cassandra模式迁移由专用Docker容器执行。

#### <a name="cassandra-in-development"></a>Cassandra in development
要启动cassandra集群在本地运行应用程序，可以使用docker_compose文件进行开发使用：
`docker-compose -f src/main/docker/cassandra.yml up -d`

Docker-compose将启动2个服务：

- `<name_of_your_app>-cassandra`:  具有Cassandra节点接触点的容器
- `<name_of_your_app>-cassandra-migration`: 自动应用所有CQL迁移脚本的容器（创建键空间、创建表、所有数据迁移…）

有关如何在不重新启动本地群集的情况下添加新的CQL脚本的详细信息，请参阅[Cassandra page]({{ site.url }}/using-cassandra/)

#### Cassandra in production:
`app.yml`docker compose文件使用`cassandra cluster.yml`配置集群。
应用程序在几秒钟后启动 (请参见 _JHIPSTER_SLEEP_ variable)，为集群提供启动和执行迁移的时间。

Cassandra和其他数据库之间的一个大区别是，您可以使用Docker Compose扩展集群。要使群集中有X+1节点，请运行：

- `docker-compose -f src/main/docker/cassandra-cluster.yml scale <name_of_your_app>-cassandra-node=X`

### Microsoft SQL Server

如果要将mssql docker映像与JHipster一起使用，请执行以下步骤：

- 将Docker可用的RAM增加到至少3.25GB
- 运行数据库: `docker-compose -f src/main/docker/mssql.yml up -d`
- 使用您选择的MSSQL客户端创建数据库
- 启动您的应用: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

## <a name="5"></a> Elasticsearch

运行 `docker-compose -f src/main/docker/app.yml up` 已经自动启动搜索引擎。

如果您只想启动您的ElasticSearch节点，而不是其他服务，请使用其特定的Docker Compose配置：

- `docker-compose -f src/main/docker/elasticsearch.yml up`

## <a name="6"></a> Sonar

Docker Compose 配置文件已经为运行Sonar而生成:

- `docker-compose -f src/main/docker/sonar.yml up`

要分析代码，请在项目上运行Sonar:

- With Maven: `./mvnw sonar:sonar`
- With Gradle: `./gradlew sonar`

Sonar报告在: [http://localhost:9000](http://localhost:9000)

## <a name="7"></a> Keycloak

如果选择OAuth2.0作为身份验证，则keyclot将用作默认身份提供程序。运行`docker compose-f src/main/docker/app.yml up`将自动启动keyclook。

要使keyscoat工作， 您需要将以下行添加到host文件中 (`/etc/hosts` on Mac/Linux, `c:\Windows\System32\Drivers\etc\hosts` on Windows).

```
127.0.0.1	keycloak
```

这是因为您将使用计算机上的浏览器(名称为 localhost, 或 `127.0.0.1`), 但在Docker中，它将在自己的容器中运行，该容器的名称为`keycloak`.

如果您只想启动keyscoat，而不是其他服务，请使用其特定的docker-compose配置：

- `docker-compose -f src/main/docker/keycloak.yml up`

## <a name="8"></a> Common commands

### List the containers

您可以使用 `docker container ps -a` 来列出所有容器

    $ docker container ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    fc35e1090021        mysql               "/entrypoint.sh mysql"   4 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp   sampleApplication-mysql

### Docker stats for containers
`docker container stats` or {% raw %}`docker container stats $(docker container ps --format={{.Names}})`{% endraw %} 列出具有CPU, Memory, Networking I/O and Block I/O的所有正在运行的容器。

    $ docker container stats {% raw %}$(docker container ps --format={{.Names}}){% endraw %}
    CONTAINER                 CPU %               MEM USAGE / LIMIT     MEM %               NET I/O               BLOCK I/O             PIDS
    jhuaa-mysql               0.04%               221 MB / 7.966 GB     2.77%               66.69 kB / 36.78 kB   8.802 MB / 302.5 MB   37
    00compose_msmongo-app_1   0.09%               965.6 MB / 7.966 GB   12.12%              121.3 kB / 54.64 kB   89.84 MB / 14.88 MB   35
    00compose_gateway-app_1   0.39%               1.106 GB / 7.966 GB   13.89%              227.5 kB / 484 kB     117 MB / 28.84 MB     92
    jhipster-registry         0.74%               1.018 GB / 7.966 GB   12.78%              120.2 kB / 126.4 kB   91.12 MB / 139.3 kB   63
    gateway-elasticsearch     0.27%               249.1 MB / 7.966 GB   3.13%               42.57 kB / 21.33 kB   48.16 MB / 4.096 kB   58
    00compose_jhuaa-app_1     0.29%               1.042 GB / 7.966 GB   13.08%              101.8 kB / 78.84 kB   70.08 MB / 13.5 MB    68
    msmongo-mongodb           0.34%               44.8 MB / 7.966 GB    0.56%               49.72 kB / 48.08 kB   33.97 MB / 811 kB     18
    gateway-mysql             0.03%               202.7 MB / 7.966 GB   2.54%               60.84 kB / 31.22 kB   27.03 MB / 297 MB     37

### Scale a container

Run `docker-compose scale test-app=4` to have 4 instances of application "test" running.

### Stop containers

`docker-compose -f src/main/docker/app.yml stop`

您也可以直接使用Docker：

`docker container stop <container_id>`

停止容器时，除非删除容器，否则不会删除数据。

### Delete a container

小心！所有数据将被删除：

`docker container rm <container_id>`


## <a name="9"></a> Memory Tweaking

为了优化在容器中运行的应用程序的内存使用，可以在`Dockerfile` 或 `docker-compose.yml`上设置Java内存参数

### 向Dockerfile添加内存参数

设置环境变量。

    ENV JAVA_OPTS=-Xmx512m -Xms256m

### 向docker-compose.yml添加内存参数

这个解决方案是dockerfile所需要的。这样，在组成应用程序的所有容器上都有一个用于内存配置的控制点。

Add the `JAVA_OPTS` into `environment` section.

```
    environment:
      - (...)
      - JAVA_OPTS=-Xmx512m -Xms256m
```

如果Docker基本镜像, `JAVA_OPTS` 不起作用. 在这种情况下，请尝试使用 `_JAVA_OPTIONS`:

```
    environment:
      - (...)
      - _JAVA_OPTIONS=-Xmx512m -Xms256m
```
