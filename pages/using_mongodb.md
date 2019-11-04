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
*   [Mongobee](https://github.com/mongobee/mongobee)用于代替[Liquibase](http://www.liquibase.org/)管理数据库更改
*   [实体子生成器]({{ site.url }}/creating-an-entity/)不会询问您实体关系，因为您无法在NoSQL数据库建立关系（至少不会在JPA建立关系）
*   [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo) 用于运行数据库的内存版本以运行单元测试。

### MongoDB Atlas

如果要使用[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)，可能会遇到此错误：

```json
error: {
    "ok" : 0,
    "errmsg" : "user is not allowed to do action [find] on [mydb.system.indexes]",
    "code" : 8000,
    "codeName" : "AtlasError"
}
```

由于[Mongobee](https://github.com/mongobee/mongobee/)不再维护，因此您可以迁移到[Mongock](https://github.com/cloudyrock/mongock)。访问：
- 问题: [issues/8665](https://github.com/jhipster/generator-jhipster/issues/8665)
- 提案: [issues/8678](https://github.com/jhipster/generator-jhipster/issues/8678)
- [StackOverFlow](https://stackoverflow.com/questions/49958635/mongodb-atlas-user-is-not-allowed-to-do-action-find-on-system-indexes)上的提问
