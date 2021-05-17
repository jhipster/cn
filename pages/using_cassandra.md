---
layout: default
title: 使用Cassandra
permalink: /using-cassandra/
redirect_from:
  - /using_cassandra.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-eye"></i> 使用Cassandra

Cassandra是生成应用程序时可以选择的受支持数据库之一。

此生成器有一个限制：

*   它不支持OAuth2身份验证（我们需要在Spring Security的OAuth2服务器上实现一个Cassandra后端）

选择Cassandra时：

*   使用Apache Cassandra的Spring Data Reactive
*   [实体子生成器]({{ site.url }}/creating-an-entity/)不会询问您实体关系，因为您无法在NoSQL数据库建立关系（至少不会在JPA建立关系）
*   生成的实体仅支持一个分区key，即ID。未来版本将提供复合主键和群集键

## 迁移工具

与[Liquibase](http://www.liquibase.org/)相似，JHipster提供了一个工具来应用CQL迁移脚本，但有一些限制：

*   该工具在启动时不会由应用程序本身运行，而是在Docker容器内或手动运行
*   所有CQL脚本都必须遵循`{timestamp}_{description}.cql`模式，并放置在changelog目录中：`src/main/resources/config/cql/changelog/`
*   位于changelog目录中的所有尚未应用的脚本均按字母顺序应用（即：遵循时间戳记）
*   由于Cassandra不是事务数据库，因此如果在将元数据插入该工具使用的表中之前发生错误，则有可能使CQL迁移脚本多次运行

该工具的一些信息：

*   生成实体后，其CQL文件将在`src/main/resources/config/cql/changelog/`中生成，就像我们为JPA生成Liquibase更改日志一样
*   对于正在运行的测试，`src/main/resources/config/cql/changelog/`目录中的所有CQL脚本都会自动应用于内存集群
    *   意味着除了将脚本放到changelog目录中以将其应用于测试之外，您无需执行任何其他操作
*   该工具使用自己的cassandra表`schema_version`存储元数据信息

该工具将按以下顺序应用`src/main/resources/config/cql/`中的迁移脚本：

1.  `create-keyspace.cql`-创建键空间和`schema_version`表存储迁移元数据
2.  按字母顺序排列的所有`cql/changelog/\*.cql`文件

### 运行工具

根据是否使用Docker，您有几种选择来运行迁移工具。

#### 使用Docker：

如果使用生成的`app.yml`或`cassandra.yml` compose文件，通过docker-compose启动了Cassandra集群，则该工具已经运行，并且已应用所有cql脚本。

在changelog目录中添加CQL脚本之后，您可以重新启动负责再次运行迁移服务的docker-service而不停止集群：
`docker-compose -f src/main/docker/cassandra.yml up <app>-cassandra-migration`

#### 手动:

确认一些先决条件后，您可以手动运行该工具。熟悉该工具，在以后将其包含在部署pipeline中可能会很有用。

##### 先决条件:

*   添加Cassandra访问点环境变量，通常在本地添加：``export CASSANDRA_CONTACT_POINT=`127.0.0.1` ``
*   使用您喜欢的软件包管理器安装最新（> 4）bash版本和md5sum
*   在您的类路径中有CQLSH

要运行该工具，请使用此命令： `src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/`

默认情况下，`src/main/resources/config/create-keyspace.cql`在必要时使用脚本创建键空间。
您可以使用第二个参数覆盖它：`src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/ create-keyspace-prod.cql`

如果只想针对集群运行特定的脚本，请使用：`src/main/docker/cassandra/scripts/execute-cql.sh src/main/resources/config/cql/changelog/<your script>.cql`

## 非Linux操作系统上的Cassandra和Docker

在Mac OSx和Windows上，不是直接托管Docker容器，而是在VirtualBox VM上托管。
这些，您不能在localhost中访问它们，而必须使用VirtualBox IP。

您可以使用以下环境变量覆盖Cassandra连访问点（默认情况下为localhost）：``export SPRING_DATA_CASSANDRA_CONTACTPOINTS=`docker-machine ip default` ``。

#### Cassandra节点：

由于Cassandra节点也托管在虚拟机中，因此在从访问点接收到它们的地址后，尝试连接它们时，Cassandra Java驱动程序将收到错误消息。

要解决此问题，可以将路由规则添加到路由表[(source)](http://krasserm.github.io/2015/07/13/chaos-testing-with-docker-and-cassandra/#port-mapping)中。

假设运行Cassandra节点的容器的IP地址为172.18.0.x：
``sudo route -n add 172.18.0.0/16 `docker-machine ip default` ``
