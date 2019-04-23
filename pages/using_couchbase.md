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

CouchBase是在生成应用程序时可以选择的受支持数据库之一。

选择CouchBase时：

*   Spring数据库将用于访问数据库。这非常接近SpringDataJPA，这就是为什么CouchBase支持非常接近（默认）JPA支持的原因
*   使用[Couchmove](https://github.com/differentway/couchmove) 而不是[Liquibase](http://www.liquibase.org/)来管理数据库更改
*   [entity sub-generator]({{ site.url }}/creating-an-entity/) 不会要求您提供实体关系，因为您无法与NoSQL数据库建立关系（至少不会以与JPA建立关系的方式）
*   [Couchbase TestContainers](https://github.com/differentway/testcontainers-java-module-couchbase) 用于启动用于运行单元测试的数据库的容器化版本

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
