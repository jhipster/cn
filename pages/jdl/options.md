---
layout: default
title: JHipster 领域语言 (JDL) - 选项
permalink: /jdl/options
sitemap:
    priority: 0.5
    lastmod: 2019-11-02T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 领域语言 (JDL) - 选项

## 概要

在JHipster中，您可以为实体指定选项，例如分页或DTO。
您可以使用JDL进行相同的操作，或者使用实体上的注解，或者使用以下语法：

    entity A {
      name String required
    }
    entity B
    entity C

    dto A, B with mapstruct

    paginate A with infinite-scroll
    paginate B with pagination
    paginate C with pager  // pager is only available in AngularJS

    service A with serviceClass
    service C with serviceImpl

可用选项的完整列表可查看 [选项列表](#选项列表).

1. [怎么做](#怎么做)
1. [语法](#语法)
1. [The use XYZ options](#the-use-xyz-options)
1. [示例](#示例)
   1. [Basic unary example](#basic-unary-example)
   1. [Basic binary example](#basic-binary-example)
   1. [all, * example](#all--example)
   1. [all, * example with exclusions (unary)](#all--example-with-exclusions-unary)
   1. [all, * example with exclusions (binary)](#all--example-with-exclusions-binary)
   1. [Option with custom values](#option-with-custom-values)
   1. [Mixed example](#mixed-example)
1. [About services](#about-services)
1. [Microservice-related options](#microservice-related-options)
1. [Custom annotations](#custom-annotations)
1. [Available options](#available-options)
1. [See also](#see-also)

---

### 怎么做

有两种选择：
  - 一元（无选项值）
  - 二元（带值）

有三种将选项应用于实体的方法：
  - 使用选项名称 (`dto`、`readOnly`等)，可查看示例
  - 使用注解
  - 使用`use XYZ`形式

不建议将它们混合使用，因为这会降低可读性。

---

### 语法

对于常规形式：
```
<option name> <option entity list>

or

<option name> <option entity list> with <option value>

or

<option name> <option entity list> with <option value> except <option excluded entity list>

or 

<option name> <option entity list> except <option excluded entity list>
```

  - 对于一元选项：
    - 选项名称和列表是必需的
    - 排除的实体是可选的，带有`except`关键字（有关更多详细信息，请参见下文）
  - 对于二元选项：
    - 实体列表位于关键字`with`和选项值之前
    - 同样，被排除的实体最后带有`except`关键字

对于注解：
```
@<option name>
entity <entity name>

or

@<option name>(<option value>)
```

  - 与Java类似，注解可以将值放在括号中
    - 根据选项的不同，值可以是或可以不是可选的

---

### 使用`use XYZ`选项

使用use 选项形式，您可以在实体上指定一些选项。
它是在JHipster Code 2020期间创建的，其创建原因是：
  - 解决禁用选项的问题（在JHipster中有不止一种"否"的用法：`no, false, none`）
  - 提出一种按实体对选项进行分组的方法

```jdl
entity A
entity B
entity C

use serviceClass for * except C
use mapstruct, serviceImpl, infinite-scroll for A, B
use pagination for C
```

<table class="table table-striped table-responsive">
  <tr>
    <th>use 选项值</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>mapstruct</td>
    <td>是否为您的实体创建DTO，如果实体具有DTO但没有设置service，则将使用`serviceClass`</td>
  </tr>
  <tr>
    <td>serviceClass</td>
    <td></td>
  </tr>
  <tr>
    <td>serviceImpl</td>
    <td></td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>当应用程序使用Cassandra时，禁止将分页作为选项</td>
  </tr>
  <tr>
    <td>infinite-scroll</td>
    <td>当应用程序使用Cassandra时，禁止将分页作为选项</td>
  </tr>
  <tr>
    <td>elasticsearch</td>
    <td>要求应用程序启用searchEngine选项</td>
  </tr>
  <tr>
    <td>couchbase</td>
    <td>要求应用程序启用searchEngine选项</td>
  </tr>
</table>

---

### 示例

每个示例将具有三种形式：
  - 常规的
  - 基于注解的
  - use 形式（如适用）

---

#### 基本一元示例

常规的：
```jdl
entity A

readOnly A
```

基于注解的：
```jdl
@readOnly
entity A
```

---

#### 基本二元示例

常规的：
```jdl
entity A

dto A with mapstruct
```

基于注解的
```jdl
@dto(mapstruct)
entity A
```

使用 `use` 关键字：
```jdl
entity A

use mapstruct, serviceImpl, pagination for A
```

---

#### `all`和` * `关键字示例

`all` 和 `*` 是相同的

常规的：
```jdl
entity A
entity B

dto all with mapstruct
```

基于注解的：
```jdl
@dto(mapstruct)
entity A

@dto(mapstruct)
entity B
```

使用 `use` 关键字：
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for *
```

---

#### `all`和` * ` 带有排除项的示例（一元）

常规的：
```jdl
entity A
entity B

skipClient * except A
```

基于注解的：
```jdl
entity A

@skipClient
entity B
```

使用 `use` 关键字：
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for * except A
```

---

#### `all`和` * ` 带有排除项的示例（二元）

常规的：
```jdl
entity A
entity B

dto all with mapstruct except A
```

基于注解的：
```jdl
entity A

@dto(mapstruct)
entity B
```

使用 `use` 关键字：
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for all except A
```

---

#### 具有自定义值的选项

```jdl
entity A
entity B

microservice all with mySuperMS
```

---

#### 混合例子

常规的：
```jdl
entity A
entity B
entity C

readOnly B, C
dto * with mapstruct except C
service * with serviceClass except C
search A with elasticsearch
```

基于注解的：
```jdl
@dto(mapstruct)
@search(elastisearch)
@service(serviceClass)
entity A

@readOnly
@dto(mapstruct)
@service(serviceClass)
entity B

@readOnly
entity C
```

---

### 关于`service`

指定的`service`都不会创建将直接调用`repository`接口的`resource`类。 这是默认和最简单的选项，请参阅A。

`service with serviceClass`（请参见B）将使`resource`调用`service`类，后者将调用`repository`接口。
`service with serviceImpl` （请参阅C）将创建一个`service`接口，该接口将由`resource`类使用。

该接口由将调用`repository`接口的具体类实现。

除非确定，否则不使用任何`service`，这对CRUD来说是最简单的选择。 如果您将有很多业务逻辑，这些业务逻辑将使用多个`repository`，因此非常适合用于`service`类。
JHipster不是使用`service`接口的粉丝，但是如果您喜欢它们，请使用`service`的实现类。

    entity A
    entity B
    entity C

    // no service for A
    service B with serviceClass
    service C with serviceImpl

---

### 微服务相关的选项

从JHipster v3开始，可以创建微服务。 您可以指定一些选项以在JDL中生成您的实体：
微服务的名称和搜索引擎。

您可以通过以下方法指定微服务的名称（JHipster应用程序的名称）：

```
entity A
entity B
entity C
microservice * with mysuperjhipsterapp except C
microservice C with myotherjhipsterapp
search * with elasticsearch except C
```

第一个选项用于告诉JHipster您希望微服务处理您的实体，而第二个选项指定您如何以及是否希望搜索实体。

---

### 自定义注解

自定义注解在JDL中是可以的，例如：

```jdl
@customAnnotation(customValue)
entity A
```

这样做的主要目的是用于方案（blueprint）：有时，您需要为实体甚至字段提供自定义选项。
对于常规选项（`dto`、`pagination`等)，这些选项将像在CLI中一样在JSON中生成。
但是，对于自定义选项，它们将在转储的JSON中的`options`键下生成。

---

### 可用选项

Here are the entity options supported in the JDL:

_不是您要找的？ 查看 [应用程序选项](/jdl/applications#available-application-configuration-options)._

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL 选项名称</th>
    <th>选项类型</th>
    <th>默认值</th>
    <th>可选值</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>这将使前端代码生成被跳过</td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>这将使服务器代码生成被跳过</td>
  </tr>
  <tr>
    <td>noFluentMethod</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      查看<a href="https://www.jhipster.tech/2016/08/17/jhipster-release-3.6.0.html#important-change-fluent-setters">说明</a>
      了解更详细内容
    </td>
  </tr>
  <tr>
    <td>filter</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      查看<a href="https://www.jhipster.tech/entities-filtering/">过滤</a> 了解更多详细内容；如果设置为true,但未设置`service`，则将使用`serviceClass`
    </td>
  </tr>
  <tr>
    <td>readOnly</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      添加此选项将使实体变为只读， 查看
      <a href="https://www.jhipster.tech/2019/10/10/jhipster-release-6.4.0.html#jhipster-release-v640">发布日志</a>
      进一步了解。
     </td>
  </tr>
  <tr>
    <td>dto</td>
    <td>binary</td>
    <td>no</td>
    <td>mapstruct, no</td>
    <td>是否为您的实体创建DTO，如果实体具有DTO但没有`service`，则将使用`serviceClass`</td>
  </tr>
  <tr>
    <td>service</td>
    <td>binary</td>
    <td>no</td>
    <td>serviceClass, serviceImpl, no</td>
    <td></td>
  </tr>
  <tr>
    <td>paginate</td>
    <td>binary</td>
    <td>no</td>
    <td>pagination, infinite-scroll, no</td>
    <td>当应用程序使用Cassandra时，禁止分页</td>
  </tr>
  <tr>
    <td>search</td>
    <td>binary</td>
    <td>no</td>
    <td>elasticsearch, no</td>
    <td>要求应用程序启用searchEngine选项</td>
  </tr>
  <tr>
    <td>microservice</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td>将为微服务应用程序内声明的每个实体自动添加</td>
  </tr>
  <tr>
    <td>angularSuffix</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
  <tr>
    <td>clientRootFolder</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
</table>

---

### 也可以查看

应用程序选项 [在这儿](/jdl/applications)
