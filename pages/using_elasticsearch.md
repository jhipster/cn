---
layout: default
title: 使用Elasticsearch
permalink: /using-elasticsearch/
redirect_from:
  - /using_elasticsearch.html
sitemap:
    priority: 0.7
    lastmod: 2017-04-16T00:00:00-00:00
---

# <i class="fa fa-search"></i> 使用Elasticsearch

Elasticsearch是一个在数据库之上添加搜索功能的选项。

此选项有一些限制：

*   它仅适用于SQL数据库和MongoDB。将来会添加Cassandra和Couchbase支持（欢迎提供帮助！）。
*   您的数据库和Elasticsearch之间没有自动复制机制，因此您的数据可能不同步。结果，您可能需要编写一些特定的代码来同步数据，例如使用Spring `@Scheduled`注解，使其每天晚上运行。
    *   这也意味着，如果在应用程序外部更改数据库，则搜索索引将不同步。在这些情况下，[Elasticsearch Reindexer](https://www.jhipster.tech/modules/marketplace/#/details/generator-jhipster-elasticsearch-reindexer)JHipster模块可以提供帮助。

选择Elasticsearch选项时：

*   在[Spring Data Jest](https://github.com/VanRoy/spring-data-jest)的帮助下，使用了Spring Data Elasticsearch。Spring Data Jest，可与Elasticsearch的REST API通信。它会禁用Spring Boot的自动配置，而是使用自己的自动配置。
*   "repository"软件包具有一个名为"search"的新子软件包，其中包含所有Elasticsearch repositories。
*   "User"实体在Elasticsearch中建立索引，您可以使用`/api/_search/users/:query`REST端点进行查询。
*   当使用[实体子生成器]({{ site.url }}/creating-an-entity/)时，所生成的实体将由Elasticsearch自动索引，并在REST端点中使用。Angular/React用户界面中还添加了搜索功能，因此您可以在CRUD主屏幕中搜索实体。

### 在开发中使用

在开发中，JHipster与嵌入式Elasticsearch实例一起运行。如果您设置了`SPRING_DATA_JEST_URI`环境变量（或向您的`application-dev.yml`添加`spring.data.jest.uri`属性），您还可以使用外部Elasticsearch实例。

运行外部Elasticsearch实例的最简单方法是使用提供的Docker Compose配置：

    docker-compose -f src/main/docker/elasticsearch.yml up -d
    
然后设置一个环境变量指向它：

    export SPRING_DATA_JEST_URI=http://localhost:9200

### 在生产中使用

在生产中，JHipster需要一个外部Elasticsearch实例。默认情况下，应用程序查找在localhost上运行的Elasticsearch实例。可以使用`application-prod.yml`文件中的标准Spring Boot属性进行配置。

### 在Heroku上使用

在Heroku上，将[Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai)配置为附加组件。JHipster被自动配置为与会话。