---
layout: default
title: 使用Couchbase
permalink: /using-couchbase/
redirect_from:
  - /using_couchbase.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-database"></i> 使用Couchbase

Couchbase是生成应用程序时可以选择的受支持数据库之一。

选择Couchbase时：

*   Spring Data Couchbase将用于访问数据库。这非常接近Spring Data JPA，这就是为什么Couchbase支持非常接近（默认）JPA支持的原因 
*   [Couchmove](https://github.com/differentway/couchmove)用于代替[Liquibase](http://www.liquibase.org/)管理数据库更改
*   [实体子生成器]({{ site.url }}/creating-an-entity/)不会询问您实体关系，因为您无法在NoSQL数据库建立关系（至少不会在JPA建立关系）
*   [Couchbase TestContainers](https://github.com/differentway/testcontainers-java-module-couchbase)用于启动数据库的容器化版本以运行单元测试。

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
