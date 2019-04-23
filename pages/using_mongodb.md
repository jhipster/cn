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

MongoDB是在生成应用程序时可以选择的受支持数据库之一。

选择MongoDB时：

*   Spring数据MongoDB将用于访问数据库。这非常接近于SpringDataJPA，这就是为什么MongoDB支持非常接近（默认）JPA支持的原因。
*   使用[mongobee](https://github.com/mongobee/mongobee)而不是[liquibase](http://www.liquibase.org/)来管理数据库更改。
*   [实体子生成器](site.url/创建实体/)不会要求您提供实体关系，因为您无法与NoSQL数据库建立关系（至少不会以与JPA建立关系的方式）。
*   [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo)用于运行单元测试的数据库内存版本。

### MongoDB Atlas

如果你想用[MongoDB Atlas](https://www.mongodb.com/cloud/atlas), 您可能会遇到此错误：

```json
error: {
    "ok" : 0,
    "errmsg" : "user is not allowed to do action [find] on [mydb.system.indexes]",
    "code" : 8000,
    "codeName" : "AtlasError"
}
```

As [Mongobee](https://github.com/mongobee/mongobee/) is not maintained anymore, you could migrate to [Mongock](https://github.com/cloudyrock/mongock). See:

- the ticket: [issues/8665](https://github.com/jhipster/generator-jhipster/issues/8665)
- the proposal: [issues/8678](https://github.com/jhipster/generator-jhipster/issues/8678)
- the question on [StackOverFlow](https://stackoverflow.com/questions/49958635/mongodb-atlas-user-is-not-allowed-to-do-action-find-on-system-indexes)
