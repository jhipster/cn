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

ElasticSearch是一个在数据库顶部添加搜索功能的选项。

此选项有一些限制：

*   它只适用于SQL数据库和MongoDB。Cassandra和CouchBase的支持将在未来增加（欢迎帮助！）
*   您的数据库和ElasticSearch之间没有自动复制机制，因此您可能有不同步的数据。因此，您可能需要编写一些特定的代码来同步您的数据，例如使用Spring`@scheduled`注释每天晚上运行。
*   这也意味着，如果数据库在应用程序之外被更改，则搜索索引将不同步。 [Elasticsearch Reindexer](https://www.jhipster.tech/modules/marketplace/#/details/generator-jhipster-elasticsearch-reindexer) JHipster module can help in these situations.

选择ElasticSearch选项时：

*   在[Spring Data Jest](https://github.com/VanRoy/spring-data-jest)的帮助下，使用了Spring Data ElasticSearch。Spring数据笑话，允许与ElasticSearch的RESTAPI通信。它禁用了SpringBoot的自动配置并使用自己的配置。
*   "repository"包有新的子包，称为“search”，它包含所有的ElasticSearch存储库。
*   "User"实体在elasticsearch中得到索引，您可以使用`/api/_search/users/：query` REST端点进行查询。
*   当使用[entity sub-generator]({{ site.url }}/creating-an-entity/)时，生成的实体将被ElasticSearch自动索引，并用于REST端点。搜索功能也添加到Angular/React用户界面，因此您可以在主CRUD屏幕中搜索您的实体。

### 在开发中使用

在开发中，JHipster使用嵌入式ElasticSearch实例运行。 如果设置了`SPRING_DATA_JEST_URI`环境变量 (或将 `spring.data.jest.uri`属性添加到 `application-dev.yml`)，也可以使用外部ElasticSearch实例。

运行外部ElasticSearch实例的最简单方法是使用提供的Docker Compose配置：

    docker-compose -f src/main/docker/elasticsearch.yml up -d

然后设置一个环境变量指向它：

    export SPRING_DATA_JEST_URI=http://localhost:9200

### 在生产中使用

在生产中，JHipster需要一个外部ElasticSearch实例。默认情况下，应用程序查找在本地主机上运行的ElasticSearch实例。这可以通过使用`application-prod.yml`文件中的标准Spring引导属性进行配置。

### 在Heroku上使用

On Heroku, the [Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai) is configured as an add-on. JHipster is automatically configured to talk to it.
