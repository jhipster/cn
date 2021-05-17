---
layout: default
title: JHipster领域语言-应用程序配置
permalink: /jdl/applications
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster领域语言 (JDL) - 应用程序配置

## 概要

1. [语法](#语法)
1. [应用程序中的选项](#应用程序中的选项)
1. [示例](#示例)
   1. [简单例子](#简单例子)
   1. [多个应用](#多个应用)
   1. [关联实体](#关联实体)
   1. [配置项](#配置项)
1. [微服务流程](#微服务流程)
1. [详细完整示例](#详细完整示例)
1. [可用的应用程序配置选项](#可用的应用程序配置选项)
1. [更多](#更多)

***

### 语法

应用程序声明如下：

```
application {
  config {
    <application option name> <application option value>
  }
  [entities <application entity list>]
  [<options>]
}
```

  - 应用程序配置项（Key/Value）在`config`(必须在`application`内)下指定。
  - 您可以根据需要选择0个、1个或任何多个应用程序选项（只要它们有效）。
  - 将在应用程序内部生成的实体通过`entities`列出，这是在应用程序中生成实体推荐的方法。
    - 你可以不使用以上方法，但要在应用内生成实体必须执行以下操作:
      - 来自应用程序内的另一个JDL文件
      - 或使用CLI
  - 关键字`entities`是可选的： 如果不配置，文件中的每个实体都将在应用程序内部生成。
  - 应用程序可以有常规选项 (像 `dto` 或 `service`) ，更多信息 [下一节](#options-in-applications) 。

---

### 应用程序中的选项

选项声明 (`dto`、`service`、`skipServer`等) 在JDL应用程序中受支持，但有一些规则。

假设我们有这样的JDL文件：
```jdl
application {
  config {
    baseName app1
  }
  entities A, B, C
  dto * with mapstruct
}

application {
  config {
    baseName app2
  }
  entities C, D
  paginate * with pagination except D 
}

application {
  config {
    baseName app3
  }
  entities * except A, B, C, D, F
  service * with serviceClass
}

entity A
entity B
entity C
entity D
entity E
entity F

paginate * with infinite-scroll
```

在此示例中，我们可以看到：
  - JDL文件中有6个声明的实体： `A, B, C, D, E and F`.
  - 有3个应用程序: `app1, app2 and app3`
    - `app1` 使用 `A, B and C`
    - `app2` 使用 `C and D`
    - `app3` 使用 `E` (`* except A, B, C, D, F`)
  - 这些应用程序中的每一个都声明了选项，并且还声明了**全局**选项。
    - `app1` 应用 `dto` 于 `A, B and C`
    - `app2` 应用 `paginate` 于 `C` (因为有一个例外)
    - `app3` 应用 `service` 于 `E`
    - 全局使用 `pagination` (对每个实体有效)

这是文件的生成方式：
  - `app1`
    - `A`: 将使用`paginate with infinite-scroll` （全局选项不会被本地选项覆盖），并且
      `dto with mapstruct`
    - `B`: 将使用相同的选项
    - `C`: 也使用相同的选项
  - `app2`:
    - `C`: 将使用 `paginate with pagination` （而不是 `infinite-scroll` ，因为本地优先）
    - `D`: 将使用 `paginate with infinite-scroll` 因为上一个选项不包括 `D`
  - `app3`:
    - `E`: 将使用 `paginate with infinite-scroll` 和 `service E with serviceClass`

本示例说明了**遮蔽**原理。 全局选项受支持，并且将在每个已声明的应用程序中使用，**除非**在应用程序中也声明了选项。

另请注意，该片段摘自上一个示例 `app3`:
```jdl
entities * except A, B, C, D, F
service * with serviceClass
```
这基本上意味着`app3`将仅使用`E`，而应用程序的实体将使用“ service”选项，意思是`E`，而不是` A - F`。

最后，存在不在任何应用程序中的“ F”实体，因此不会生成该实体。

_注意：目前支持所有常规选项。_

---

### 示例

#### 简单例子

```jdl
application {
  config {
    baseName exampleApp
    applicationType gateway
  }
}
```

---

#### 多个应用

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
}

application {
  config {
    baseName exampleApp3
    applicationType gateway
    serverPort 9000
  }
}
```

---

#### 关联实体

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
  entities A
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
  entities * except A
}

entity A
entity B
entity C
```

---

#### 配置项

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
  entities A
  dto A with mapstruct 
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
  entities * except A
  paginate C with pagination
}

entity A
entity B
entity C
```

---

### 详细完整示例

示例 1:

```jdl
application {
  config {
    baseName myMonolith
    applicationType monolith
  }
  entities * except C, D
}
application {
  config {
    baseName myGateway
    applicationType gateway
    serverPort 9042
  }
  entities * except A, B
}
application {
  config {
    baseName microserviceA
    applicationType microservice
  }
  entities C
}
application {
  config {
    baseName microserviceB
    applicationType microservice
    serverPort 8082
  }
  entities D
}
entity A
entity B
entity C
entity D
dto * with mapstruct
service * with serviceClass
paginate D with pager
```

现在，生成这些应用程序和文件夹时将发生以下事件：
  - 将创建四个应用程序：
    - myMonolith 在 `./myMonolith`文件夹中，并且配置服务器端口 `8080`
    - myGateway 在 `./myGateway`文件夹中， 并且配置服务器端口 `9042`
    - microserviceA 在 `./microserviceA`文件夹中，并且配置服务器端口 `8081`
      - 即使我们没有指定服务器端口，JHipster也会默认设置一个端口。
      - 对于微服务，默认值是`8081`
      - 对于网关和单体应用而言，它是`8080`
    - microserviceB 在 `./microserviceB`文件夹中，并且配置服务器端口 `8082`
  - 将生成四个实体
    - `A` 和 `B` 在单体应用（monolith）中
    - `C` 和 `D` 都在网关（gateway）中
      - `C` 在第一个微服务
      - `D` 在第二个微服务
  - 选项`microservice`对`C` 和 `D`而言是隐式的
    - 由于它们是在两个微服务上生成的，因此默认情况下将设置此选项。
  - 选项的工作方式与以前相同

请注意，如果不存在默认值，则生成器将设置默认值（例如`databaseType`）。JHipster Core可以为您做完全相同的事情。

---

示例 2: 存在配置项
请看 [配置项一节](#options-in-applications).

---

### 微服务工作流程

处理微服务几乎是一件棘手的事情，但是JDL为您提供了一些您认为合适的选项来处理您的实体。
使用 `microservice <ENTITIES> with <MICROSERVICE_APP_NAME>` ，您可以指定在哪个微服务中生成哪个实体。

参考以下设置为例：
```
entity A
entity B
entity C
microservice A with firstMS
microservice B with secondMS
```

给定两个JHipster应用程序（'firstMS'和'secondMS'），如果在两个应用程序中导入JDL文件，将获得以下内容：
  - 在 'firstMS' 中，将生成实体 `A` 和 `C` 。
  - 在 'secondMS' 中，将生成实体`B` and `C` 。

`C` 之所以会同时生成，是因为如果没有微服务选项指定在何处生成该实体，将每个都生成。

如果您决定在单体应用中导入此JDL，则会生成每个实体（单体没有限制JDL中的选项）。

_注意：如果要在两个不同的微服务中生成同一实体，则可以编写两个JDL文件 而不是每次更新JDL文件。_

前面的示例不能这样写：
```
entity A
entity B
entity C
microservice * except B with firstMS
microservice * except A with secondMS
```

结果如下：
  - 在 'firstMS' 中，仅有实体 `C` 被生成。
  - 在 'secondMS' 中, 实体 `B` 和 `C` 都会生成。

这是因为，在解析时，如果一个选项与另一个选项重叠，则后者优先。
您还可以使用JDL创建整个微服务栈， [这篇博客文章](https://medium.com/@deepu105/create-full-microservice-stack-using-jhipster-domain-language-under-30-minutes-ecc6e7fc3f77) 有示例

---

### 可用的应用程序配置选项

这是JDL支持的应用程序选项：

_不是您要找的，请查看 [常规选项](/jdl/options#available-options)。_

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL选项名称</th>
    <th>默认值</th>
    <th>可选值</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>applicationType</td>
    <td>monolith</td>
    <td>monolith, microservice, gateway</td>
    <td></td>
  </tr>
  <tr>
    <td>authenticationType</td>
    <td>jwt</td>
    <td>jwt, session, oauth2</td>
    <td>jwt</td>
  </tr>
  <tr>
    <td>baseName</td>
    <td>jhipster</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>blueprint</td>
    <td></td>
    <td>Name of an additional blueprint (see <a href="https://www.jhipster.tech/modules/marketplace/#/list">Marketplace</a>)</td>
    <td>已过时，字符型</td>
  </tr>
  <tr>
    <td>blueprints</td>
    <td></td>
    <td>其他方案(Blueprint)的名称 (可查看 <a href="https://www.jhipster.tech/modules/marketplace/#/list">方案和模块市场</a>)</td>
    <td></td>
  </tr>
  <tr>
    <td>buildTool</td>
    <td>maven</td>
    <td>maven, gradle</td>
    <td></td>
  </tr>
  <tr>
    <td>cacheProvider</td>
    <td>ehcache or hazelcast</td>
    <td>caffeine, ehcache, hazelcast, infinispan, memcached, redis, no</td>
    <td>ehcache用于单体和网关的，否则为hazelcast</td>
  </tr>
  <tr>
    <td>clientFramework</td>
    <td>angularX</td>
    <td>angularX, react</td>
    <td></td>
  </tr>
  <tr>
    <td>clientPackageManager</td>
    <td>npm</td>
    <td>npm, yarn</td>
    <td></td>
  </tr>
  <tr>
    <td>clientTheme</td>
    <td>none</td>
    <td>Something or none</td>
    <td>您可以输入所需的任何值，前提是您知道它会起作用（例如Yeti）。</td>
  </tr>
  <tr>
    <td>clientThemeVariant</td>
    <td></td>
    <td>Something or primary</td>
    <td>您可以输入所需的任何值，前提是您知道它会起作用（例如深色或浅色），也可以为空</td>
  </tr>
  <tr>
    <td>databaseType</td>
    <td>sql</td>
    <td>sql, mongodb, cassandra, couchbase, no</td>
    <td></td>
  </tr>
  <tr>
    <td>devDatabaseType</td>
    <td>h2Disk</td>
    <td>h2Disk, h2Memory, *</td>
    <td>* 生产用数据库类型</td>
  </tr>
  <tr>
    <td>dtoSuffix</td>
    <td>DTO</td>
    <td></td>
    <td>DTO的后缀。 如果为空字符串，则为false。</td>
  </tr>
  <tr>
    <td>enableHibernateCache</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableSwaggerCodegen</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableTranslation</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>entitySuffix</td>
    <td></td>
    <td></td>
    <td>实体的后缀。 如果为空字符串，则为false。</td>
  </tr>
  <tr>
    <td>jhiPrefix</td>
    <td>jhi</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>languages</td>
    <td>[en, fr]</td>
    <td>Languages available in JHipster</td>
    <td>中括号必须有</td>
  </tr>
  <tr>
    <td>messageBroker</td>
    <td>false</td>
    <td>kafka, false</td>
    <td></td>
  </tr>
  <tr>
    <td>nativeLanguage</td>
    <td>en</td>
    <td>JHipster支持的任何语言</td>
    <td></td>
  </tr>
  <tr>
    <td>packageName</td>
    <td>com.mycompany.myapp</td>
    <td></td>
    <td>设置包名选项</td>
  </tr>
  <tr>
    <td>prodDatabaseType</td>
    <td>mysql</td>
    <td>mysql, mariadb, mssql, postgresql, oracle, no</td>
    <td></td>
  </tr>
  <tr>
    <td>reactive</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>searchEngine</td>
    <td>false</td>
    <td>elasticsearch, false</td>
    <td></td>
  </tr>
  <tr>
    <td>serverPort</td>
    <td>8080, 8081 or 9999</td>
    <td></td>
    <td>取决于应用程序类型</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>false</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipUserManagement</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>testFrameworks</td>
    <td>[]</td>
    <td>cypress, protractor, cucumber, gatling</td>
    <td>中括号必须有</td>
  </tr>
  <tr>
    <td>websocket</td>
    <td>false</td>
    <td>spring-websocket, false</td>
    <td></td>
  </tr>
</table>

---

### 更多

 [可用常规选项](/jdl/options)
