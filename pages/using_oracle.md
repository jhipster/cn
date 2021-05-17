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

_仅Oracle 12cR1及更高版本（例如19c，18c和12cR2）支持此选项。_

当将Oracle与JHipster一起使用时，根据Oracle数据库版本，将有以下限制。

对于19c，18c和12cR2版本：

- 实体名称不能超过124个字符，这是由于Oracle对对象名称的128个字符的限制，并且我们保留4个字符来为生成的表生成主键序列。
- 实体字段名称不能超过128个字符。
- 建立关系时，外键名称不能超过128个字符，因此，如果它们太长，则会被截断。
- 建立多对多关系时，联接表名称将遵循JPA规范（格式为`firstTable_secondTable`）：如果长度超过128个字符，则将其截断。

对于版本12cR1：

- 实体名称不能超过26个字符，这是由于Oracle对对象名称的限制为30个字符，并且我们保留4个字符来为生成的表生成主键序列。
- 实体字段名称不能超过30个字符。
- 建立关系时，外键名称不能超过30个字符，因此，如果它们太长，则会被截断。
- 在进行多对多关系时，联接表名称将遵循JPA规范（格式为" firstTable_secondTable"）：如果长度超过30个字符，则将其截断。
- Oracle保留关键字不能用作实体名称或字段名称。
- 可在以下位置找到Oracle数据库19c（EE，SE2，单实例和RAC）Docker映像：https://container-registry.oracle.com
- 可以在这里找到Oracle数据库19c Docker构建文件：https://github.com/oracle/docker-images/tree/master/OracleDatabase

请注意，强烈建议使用版本19c，因为它具有长期支持（到2027年结束）。

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
