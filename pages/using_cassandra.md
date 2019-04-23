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

Cassandra是在生成应用程序时可以选择的受支持数据库之一。

此生成器有一个限制：

*   它不支持OAuth2身份验证（我们需要实现Cassandra后端到Spring Security的OAuth2服务器）

选择Cassandra时：

*   Cassandra CQLcassandra cql驱动程序用于访问数据库。我们不使用Spring数据Cassandra，因为我们更喜欢直接使用驱动程序。因此，存储库包含大量的代码
*   [entity sub-generator]({{ site.url }}/creating-an-entity/)不会要求您提供实体关系，因为您无法与NoSQL数据库建立关系（至少不会以与JPA建立关系的方式）
*   生成的实体只支持一个分区键，即ID。将来的版本将提供复合主键和群集键。

## 迁移工具

类似于[Liquibase](http://www.liquibase.org/), JHipster提供了一个工具来应用您的cql迁移脚本，但有一些限制：

*   该工具在启动时不是由应用程序本身运行的，而是在Docker容器中或手动运行的。
*   所有CQL脚本必须遵循模式` timestamp description.cql`并放置在changelog目录中：`src/main/resources/config/cql/changelog/`
*   位于changelog目录中的所有未应用的脚本都按字母顺序应用（即：跟随时间戳）
*   因为Cassandra不是事务性数据库，如果在工具使用的表中插入元数据之前发生错误，那么CQL迁移脚本可能会多次运行。

有关工具的一些信息：

*   生成实体后，其cql文件将在 `src/main/resources/config/cql/changelog/`中生成，方法与生成jpa的liquibase changelogs相同
*   对于运行测试，`src/main/resources/config/cql/changelog/`目录中的所有cql脚本都自动应用于内存集群
*   也就是说，您只需将脚本放到changelog目录中，就可以将其应用于测试。
*   该工具使用自己的cassandra表`schema_version`来存储元数据信息

该工具将按以下顺序应用来自`src/main/resources/config/cql/`的迁移脚本：

1.  `create-keyspace.cql` - create the keyspace and the `schema_version` table to store the migration metadata
2.  all `cql/changelog/\*.cql` files in alphabetical order

### 运行工具

根据您是否使用Docker，您有几个选项可以运行迁移工具。

#### 使用Docker:

如果使用生成的`pp.yml`或`cassandra.yml`撰写文件启动了带有docker compose的cassandra集群，则该工具已经运行并且应用了所有cql脚本。

在changelog目录中添加cql脚本后，可以重新启动负责再次运行迁移服务的Docker服务，而不停止群集：
`docker-compose -f src/main/docker/cassandra.yml up <app>-cassandra-migration`

#### 手动:

有了一些先决条件，您可以手动运行该工具。熟悉该工具之后将其包含到部署管道中可能会很有用。

##### 先决条件:

*   Add the Cassandra contact point environment variable, typically locally: ``export CASSANDRA_CONTACT_POINT=`127.0.0.1` ``
*   Install a recent (>4) bash version and md5sum with your favorite package manager
*   Have CQLSH in your classpath

要运行该工具，请使用以下命令：`src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/`

By default, the `src/main/resources/config/create-keyspace.cql` script is used to create the keyspace if necessary.
You can override it with a second argument: `src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/ create-keyspace-prod.cql`

If you only want to execute a specific script against your cluster use: `src/main/docker/cassandra/scripts/execute-cql.sh src/main/resources/config/cql/changelog/<your script>.cql`

## 非Linux操作系统上的Cassandra和Docker

在MacOSX和Windows上，Docker容器不直接托管，而是托管在一个virtualbox虚拟机上。
这些，您不能在本地主机中访问它们，但必须点击VirtualBox IP。

您可以使用以下环境变量覆盖Cassandra接触点（默认为localhost）： ``export SPRING_DATA_CASSANDRA_CONTACTPOINTS=`docker-machine ip default` ``

#### Cassandra节点：

因为Cassandra节点也被托管在虚拟机中，当从接触点接收到它们的地址时，Cassandra Java驱动程序将在尝试与它们进行接触时接收到错误。
要解决此问题，可以将路由规则添加到路由表中，[(source)](http://krasserm.github.io/2015/07/13/chaos-testing-with-docker-and-cassandra/#port-mapping).

假设运行cassandra节点的容器的IP地址为172.18.0.x: 
``sudo route -n add 172.18.0.0/16 `docker-machine ip default` ``
