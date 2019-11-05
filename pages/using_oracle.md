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

使用JPA时，可以选择使用Oracle数据库。

_仅Oracle 12c及更高版本支持此选项。_

由于Oracle具有专有的JDBC驱动程序，因此我们无法将其与JHipster捆绑在一起。该驱动程序可使用Oracle Maven repository提供，该repository必须进行特殊配置，因为它不是公共的仓库（您将需要一个Oracle帐户）。

JHipster生成的Maven或Gradle配置已经使用Oracle Maven repository，但是您仍然需要配置对存储库的身份验证。为此，请遵循[这篇来自Oracle的博客文章](https://blogs.oracle.com/dev2dev/entry/how_to_get_oracle_jdbc)。

将Oracle与JHipster结合使用时，以下限制将生效

- 实体名称不能超过26个字符，这是由于Oracle对对象名称的限制为30个字符，并且我们保留4个字符来为生成的表生成主键序列。
- 实体字段名称不能超过30个字符。
- 建立关系时，外键名称不能超过30个字符，因此，如果它们太长，则会被截断。
- 在进行多对多关系时，联接表名称将遵循JPA规范（格式为" firstTable_secondTable"）：如果长度超过30个字符，则将其截断。
- Oracle保留关键字不能用作实体名称或字段名称。
- 我们不像其他数据库那样提供Oracle数据库Docker镜像，因为Oracle不允许拥有公共Docker镜像。
