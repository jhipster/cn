---
layout: default
title: Docker和Docker Compose
permalink: /docker-compose/
redirect_from:
  - /docker_compose.html
sitemap:
    priority: 0.7
    lastmod: 2016-12-01T00:00:00-00:00
---

# <i class="fa fa-music"></i> Docker和Docker Compose

## 摘要

在开发中强烈建议使用Docker和Docker Compose，这在生产中也是很好的解决方案。

1. [描述](#1)
2. [先决条件](#2)
3. [构建应用程序的Docker镜像](#3)
4. [为多个应用程序生成自定义Docker-Compose配置](#docker-compose-subgen)
5. [使用数据库](#4)
6. [Elasticsearch](#5)
7. [Sonar](#6)
7. [Keycloak](#7)
8. [常用命令](#8)
9. [内存调整](#9)

## <a name="1"></a> 描述

_请注意：此Docker配置是用于在容器镜像中运行您生成的应用程序。它与JHipster提供的[Docker设置]({{ site.url }}/installation/)完全不同，后者主要用于在容器内运行JHipster生成器_


JHipster提供了完整的Docker支持，以便：

- 加速开发，因为即使使用复杂的微服务架构，也可以非常轻松地启动完整的基础架构
- 对于使用Docker Swarm的用户，因为它与Docker Compose使用相同的配置，所以可以直接部署到生产中

使用Docker Compose的一个重要优点是，您可以使用`docker-compose scale`命令轻松地伸缩容器数目。如果您将JHipster与[微服务架构](#3)一起使用，这将非常有益。

自动生成应用程序时，JHipster会为您生成：

- 用于构建Docker镜像并在容器内运行应用程序的`Dockerfile`
- 多个帮助您的第三方服务（例如数据库）快速运行的Docker Compose配置文件

这些文件位于文件夹`src/main/docker/`中。

## <a name="2"></a> 先决条件

您必须安装Docker和Docker Compose：

- [Docker](https://docs.docker.com/installation/#installation)
- [Docker Compose](https://docs.docker.com/compose/install)

现在需要在Docker商店中创建一个帐户来下载Docker for Mac和Docker for Windows。让我们绕过这个限制

<div class="alert alert-info"><i>提示: </i>

在Windows和Mac OS X上，Kitematic是Docker Toolbox附带易于使用的图形界面，这将使Docker的使用变得更加容易。

</div>

<div class="alert alert-warning"><i>注意: </i>

如果在Mac或Windows上使用Docker Machine，则Docker守护程序对OS X或Windows文件系统仅具有有限的访问权限。Docker Machine尝试自动共享您的"/Users"（OS X）或"C\Users\[用户名]"（Windows）目录。因此，您必须在这些目录下创建项目文件夹，避免因为卷挂载导致的任何问题。尤其是在使用<a href="{{ site.url }}/monitoring/">JHipster Console</a> 进行系统监控的情况下。

</div>


安装JHipster UML（或任何未捆绑的软件包）时如果遇到`npm ERR! Error: EACCES: permission denied`，可能您的容器未安装`sudo`（例如：sudo未与Ubuntu Xenial未捆绑安装）。

__解决方案1__

NPM文档建议不要以root用户身份安装任何NPM软件包。请按照[官方文档](https://docs.npmjs.com/getting-started/fixing-npm-permissions)解决。

__解决方案2__

  - `docker container exec -u root -it jhipster bash`,
  - `npm install -g YOUR_PACKAGE`,
  - 然后退出并正常登录容器: `docker container exec -it jhipster bash`

## <a name="3"></a> 构建应用程序的Docker镜像

要使用[Jib](https://github.com/GoogleContainerTools/jib)连接到本地Docker守护程序构建应用程序的Docker镜像，请执行以下操作：

- 使用Maven, 输入: `./mvnw package -Pprod verify jib:dockerBuild`
- 使用Gradle, 输入: `./gradlew -Pprod bootJar jibDockerBuild`

在没有Docker的情况下构建应用程序的Docker镜像并将其直接推送到Docker仓库中，请运行：

- 使用Maven, 输入:: `./mvnw package -Pprod verify jib:build`
- 使用Gradle, 输入: `./gradlew -Pprod bootJar jib`

如果您无法正常使用，请参考Jib文档以获取配置详细信息，特别是有关如何设置对Docker仓库的身份验证的指引：

- [Jib maven插件文档](https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration)
- [Jib gradle插件文档](https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin#configuration)

<div id="3-warning" class="alert alert-warning"><i>注意: </i>
<p>
由于Jib的工作方式，它将首先尝试从配置的Docker仓库中拉取Docker基础镜像的最新版本。这样操作是有原因的，因为在CI环境中，您必须确保始终在最新的基础镜像之上构建自己的镜像。
</p>
<p>
但是，在本地环境中，如果Jib无法访问Docker仓库，则这可能会使您的构建失败。一种解决方法是使用`--offline`标识，只要Jib已经将Docker基本镜像拉取到其本地缓存中，该问题便会迎刃而解。
</p>
<p>
使用Maven，输入：<pre>./mvnw -Pprod package verify jib:dockerBuild --offline</pre>
使用Gradle，输入：<pre>./gradlew -Pprod bootJar jibDockerBuild --offline</pre>
</p>
<p>
请注意，jib当前无法从Docker守护程序中提取本地Docker镜像。在[GoogleContainerTools/jib/issues/1468]（https://github.com/GoogleContainerTools/jib/issues/1468）上可以跟踪该问题的进展。
</p>
</div>

要运行此镜像，请使用位于应用的`src/main/docker`文件夹中的Docker Compose配置：

- `docker-compose -f src/main/docker/app.yml up`

此命令将启动您的应用程序及其依赖的服务（数据库，搜索引擎，JHipster Registry…）。

如果您选择OAuth 2.0进行身份验证，请务必阅读本文档中的[Keycloak](#7)部分。

## <a name="docker-compose-subgen"></a> 为多个应用程序生成自定义Docker-Compose配置

如果您的架构由多个JHipster应用程序组成，则可以使用特定的`docker-compose`子生成器，该生成器将为所有选定的应用程序生成一体的Docker Compose配置。这样一来，您便可以部署和扩展完整的体系结构。

要使用docker-compose子生成器，请执行以下操作：

- 您需要将所有的monolith应用，网关和微服务放在同一目录中。
- 创建另一个新目录, 例如 `mkdir docker-compose`.
- 进入目录: `cd docker-compose`.
- 执行子生成器: `jhipster docker-compose`.
- 子生成器将询问您要在架构中使用哪个应用程序，以及是否要使用ELK或Prometheus设置系统监控。

这将生成一个全局的Docker Compose配置，输入`docker-compose up`来运行它，所有服务将会立即运行。

对于微服务架构，此配置还将预配置了JHipster Registry或Consul，这将自动配置您的服务：
- 这些服务将等待JHipster Registry（或Consul）正常工作之后运行。可以在`bootstrap-prod.yml`文件设置`spring.cloud[.consul].config.fail-fast`和`spring.cloud[.consul].config.retry`配置。
- JHipster Registry或Consul将配置您的应用程序，例如: 在所有服务之间共享JWT Token。
- 使用Docker Compose来完成每个服务的扩展，例如，输入`docker-compose scale test-app=4`可以运行4个"test"应用程序实例。这些实例将由网关自动进行负载均衡，并将自动加入相同的Hazelcast群集（如果Hazelcast是您的Hibernate 2级缓存）。

## <a name="4"></a> 使用数据库

### MySQL, MariaDB, PostgreSQL, Oracle, MongoDB或Cassandra

运行`docker-compose -f src/main/docker/app.yml up`将会自动启动数据库。

如果您只想启动数据库，而不包括其他服务，请使用专用的数据库Docker Compose配置：

- 使用MySQL: `docker-compose -f src/main/docker/mysql.yml up`
- 使用MariaDB: `docker-compose -f src/main/docker/mariadb.yml up`
- 使用PostgreSQL: `docker-compose -f src/main/docker/postgresql.yml up`
- 使用Oracle: `docker-compose -f src/main/docker/oracle.yml up`
- 使用MongoDB: `docker-compose -f src/main/docker/mongodb.yml up`
- 使用Cassandra: `docker-compose -f src/main/docker/cassandra.yml up`
- 使用Couchbase: `docker-compose -f src/main/docker/couchbase.yml up`

### MongoDB集群模式

如果需要使用MongoDB的副本集或者分片功能，并在服务间共享配置，则需要手动构建和配置MongoDB镜像。请按照以下步骤操作：

- 构建镜像: `docker-compose -f src/main/docker/mongodb-cluster.yml build`
- 运行数据库: `docker-compose -f src/main/docker/mongodb-cluster.yml up -d`
- 扩展MongoDB节点服务（您必须选择奇数个节点）: `docker-compose -f src/main/docker/mongodb-cluster.yml scale <name_of_your_app>-mongodb-node=<X>`
- 初始化副本集（参数X是您在上一步中输入的节点数，文件夹是YML文件所在的文件夹，默认情况下为`docker`）： `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb-node_1 mongo --eval 'var param=<X>, folder="<yml_folder_name>"' init_replicaset.js`
- 初始化分片： `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb_1 mongo --eval 'sh.addShard("rs1/<yml_folder_name>_<name_of_your_app>-mongodb-node_1:27017")'`
- 构建应用程序的Docker镜像： `./mvnw -Pprod clean verify jib:dockerBuild`或`./gradlew -Pprod clean bootJar jibDockerBuild`
- 启动应用：`docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

如果要添加或删除一些MongoDB节点，只需重复步骤3和4。

### Couchbase集群模式

如果需要在多个节点上使用Couchbase，则需要手动构建和配置Couchbase镜像。请按照以下步骤操作：

- 构建镜像：`docker-compose -f src/main/docker/couchbase-cluster.yml build`
- 运行数据库：`docker-compose -f src/main/docker/couchbase-cluster.yml up -d`
- 扩展Couchbase节点服务（您必须选择奇数个节点）：`docker-compose -f src/main/docker/couchbase-cluster.yml scale <name_of_your_app>-couchbase-node=<X>`
- 构建应用程序的Docker镜像：`./mvnw -Pprod clean verify jib:dockerBuild` or `./gradlew -Pprod clean bootJar jibDockerBuild`
- 启动应用：`docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

### Cassandra

与其他数据库的架构迁移由应用程序本身执行不同，Cassandra架构迁移由专用的Docker容器来执行。

#### <a name="cassandra-in-development"></a>开发环境使用Cassandra
要启动Cassandra集群用于本地运行应用，可以将此docker_compose文件用于开发：`docker-compose -f src/main/docker/cassandra.yml up -d`

Docker-compose将启动2个服务：

- `<name_of_your_app>-cassandra`: 具有Cassandra服务节点的容器
- `<name_of_your_app>-cassandra-migration`: 自动应用所有CQL迁移脚本（创建键空间，创建表，所有数据迁移等）的容器

有关如何在不重新启动本地集群的情况下添加新的CQL脚本的更多信息，请参见[Cassandra页面]({{ site.url }}/using-cassandra/)。

#### 生产环境使用Cassandra：:

`app.yml`docker-compose文件使用 `cassandra-cluster.yml` 配置Cassandra集群。

应用程序会延迟几秒启动（依赖 _JHIPSTER_SLEEP_ 变量配置），为Cassandra集群启动和执行迁移提供时间。

Cassandra与其他数据库之间的最大区别是，您可以使用Docker Compose工具来动态扩展集群。要想在集群中运行X+1个节点，请运行：

- `docker-compose -f src/main/docker/cassandra-cluster.yml scale <name_of_your_app>-cassandra-node=X`

### Microsoft SQL Server

如果要将MSSQL Docker镜像与JHipster一起使用，请遵循以下几个步骤：

- 将Docker可用的RAM增加到至少3.25GB
- 运行数据库: `docker-compose -f src/main/docker/mssql.yml up -d`
- 使用您的MSSQL客户端创建数据库
- 启动您的应用: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

## <a name="5"></a> Elasticsearch

运行 `docker-compose -f src/main/docker/app.yml up`命令将已经自动启动您的搜索引擎。

如果您只想启动Elasticsearch节点，不包括其他服务，请使用其特定的Docker Compose配置：

- `docker-compose -f src/main/docker/elasticsearch.yml up`

## <a name="6"></a> Sonar

Jhipster已经生成了一个运行Sonar的Docker Compose配置：

- `docker-compose -f src/main/docker/sonar.yml up`

要分析您的代码，请在您的项目上运行Sonar：

- 使用Maven: `./mvnw sonar:sonar`
- 使用Gradle: `./gradlew sonar`

Sonar生成的报告在这个位置可以获取：[http://localhost:9000](http://localhost:9000)

## <a name="7"></a> Keycloak

如果您选择OAuth 2.0作为身份验证，则Keycloak将用作默认验证提供者。运行`docker-compose -f src/main/docker/app.yml up`会自动启动Keycloak。

要使Keycloak正常工作，您需要在主机文件中添加以下行（在Mac/Linux中为`/etc/hosts`，在Windows中为`c:\Windows\System32\Drivers\etc\hosts`）。

```
127.0.0.1	keycloak
```

这是因为在您计算机的浏览器会以本地地址来（localhost或`127.0.0.1`）访问应用程序，但是在Docker内部会以容器名来（名称为`keycloak`）访问。

如果您只想启动Keycloak，而不是其他服务，请使用其特定的Docker Compose配置：

- `docker-compose -f src/main/docker/keycloak.yml up`

## <a name="8"></a> 常用命令

### 查看容器列表

您可以使用`docker container ps -a`列出所有容器

    $ docker container ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    fc35e1090021        mysql               "/entrypoint.sh mysql"   4 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp   sampleApplication-mysql

### Docker容器统计信息
`docker container stats`或者{% raw %}`docker container stats $(docker container ps --format={{.Names}})`{% endraw %}列出所有正在运行容器的CPU，内存，网络I/O和块I/O统计信息。

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

### 伸缩容器

执行 `docker-compose scale test-app=4` 命令来运行4个 "test" 实例.

### 停止容器

`docker-compose -f src/main/docker/app.yml stop`

您也可以直接使用Docker：

`docker container stop <container_id>`

除非删除容器，停止容器时不会删除数据。

### 删除容器

小心！所有数据将被删除：

`docker container rm <container_id>`


## <a name="9"></a> 内存调整

为了优化容器中运行的应用程序的内存使用，您可以在`Dockerfile`或`docker-compose.yml`上设置Java内存参数

### 向Dockerfile添加内存参数

设置环境变量。

    ENV JAVA_OPTS=-Xmx512m -Xms256m

### 将内存参数添加到docker-compose.yml

Dockerfile需要此解决方案。这样，您就可以在组成应用程序的所有容器上为内存配置设置一个控制点。

将`JAVA_OPTS`添加到`environment`部分。

```
    environment:
      - (...)
      - JAVA_OPTS=-Xmx512m -Xms256m
```

由于Docker底层镜像影响，`JAVA_OPTS`将不起作用。在这种情况下，请尝试使用`_JAVA_OPTIONS`代替：

```
    environment:
      - (...)
      - _JAVA_OPTIONS=-Xmx512m -Xms256m
```
