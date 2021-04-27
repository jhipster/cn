---
layout: default
title: 使用MongoDB
permalink: /using-mongodb/
redirect_from:
  - /using_mongodb.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-leaf"></i> 使用MongoDB

MongoDB是生成应用程序时可以选择的受支持数据库之一。

选择MongoDB时：

*   Spring Data MongoDB将用于访问数据库。这非常接近Spring Data JPA，这就是为什么MongoDB支持非常接近（默认）JPA支持的原因
*   [Mongock](https://www.mongock.io)用于代替[Liquibase](http://www.liquibase.org/)管理数据库更改
*   [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo) 用于运行数据库的内存版本以运行单元测试。

<br/><br/><br/><br/><br/>