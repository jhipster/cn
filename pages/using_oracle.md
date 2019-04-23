---
layout: default
title: 使用Oracle
permalink: /using-oracle/
redirect_from:
  - /using_oracle.html
sitemap:
    priority: 0.7
    lastmod: 2015-06-08T18:40:00-00:00
---

# <i class="fa fa-database"></i> 使用Oracle

使用JPA时，您可以选择使用Oracle数据库。

_此选项仅在Oracle 12c及更高版本中受支持。_

因为Oracle有一个专有的JDBC驱动程序，所以我们不能将它与JHipster捆绑在一起。此驱动程序可以使用Oracle Maven存储库，因为它不是公共的，所以必须进行专门配置（您需要一个Oracle帐户）。

JHipster生成的Maven或Gradle配置已经使用Oracle Maven存储库，但您仍然需要配置对存储库的身份验证。要做到这一点，请遵循[this blog post from Oracle](https://blogs.oracle.com/dev2dev/entry/how_to_get_oracle_jdbc).

在将Oracle与JHipster一起使用时，以下限制将适用

- 实体名不能超过26个字符，这是由于Oracle对对象名的30个字符限制，我们保留4个字符来为生成的表生成主键序列。
- 实体字段名不能超过30个字符
- 在处理关系时，外键名不能超过30个字符，因此如果它们太长，将被截断。
- 在进行多对多关系时，联接表名称将遵循JPA规范（格式为“FirstTable_SecondTable”）：如果长度超过30个字符，它将被截断。
- Oracle保留关键字不能用作实体名或字段名。
- 我们不像其他数据库那样提供Oracle数据库Docker映像，因为Oracle不允许使用公共Docker映像。
