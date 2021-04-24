---
layout: default
title: JHipster 领域语言 (JDL) - 入门指南
permalink: /jdl/getting-started
sitemap:
  priority: 0.5
  lastmod: lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 领域语言 (JDL) - 入门指南

## 概要

在此页面中，您将了解JDL以及如何创建应用程序及其相关的所有内容。

1. [生成内容](#生成内容)
   1. [使用文件](#使用文件)
   1. [使用单行JDL](#使用单行JDL)
1. [生成应用](#生成应用)
1. [生成实体](#生成实体)
1. [生成属性](#生成属性)
1. [枚举](#枚举)
1. [关联关系](#关联关系)
1. [选项](#选项)
1. [部署](#部署)
1. [常量](#常量)
1. [导出JDL](#导出JDL)

---

## 生成内容

### 使用文件

您可以使用JDL文件生成实体，过程如下：

- 创建扩展名为“ .jh”或“ .jdl”的文件，
- 声明您的应用程序，部署，实体和关系，或者使用 [JDL-Studio](https://start.jhipster.tech/jdl-studio/) 或 [JHipster IDE](https://www.jhipster.tech/jhipster-ide/)创建和下载文件，
- 如果仅创建实体，则在JHipster应用程序的根文件夹中运行`jhipster jdl my_file.jdl`。
- 如果要创建应用程序，请在文件夹中运行“ jhipster jdl my_file.jdl”。

_至此_，大功告成！

如果您在团队中工作，也许你有多个文件而不是一个文件。
我们添加了此选项，以便您不必手动将所有文件连接为一个文件，而只要运行：

    jhipster jdl my_file1.jdl my_file2.jdl

如果您不想在导入JDL时重新生成实体，则可以使用`--json-only`标志来跳过实体创建部分，仅在`.jhipster`文件夹中创建json文件。

    jhipster jdl ./my-jdl-file.jdl --json-only

默认情况下，`jdl`仅重新生成已更改的实体。如果您希望重新生成所有实体，然后传递`--force`标志。
请注意，这将覆盖您对实体文件的所有本地更改：

    jhipster jdl ./my-jdl-file.jdl --force

如果要在项目中使用它，可以通过执行以下操作来添加它：

- NPM: `npm install jhipster-core --save`
- Yarn: `yarn add jhipster-core`

在本地安装，并将其保存在您的`package.json` 文件中。

---

### 使用单行JDL

生成代码的另一种方法是在CLI中传递JDL代码，方法是：
`jhipster jdl --inline "application { config { baseName jhipster, applicationType microservice } }"`.

生成实体时，这种生成代码的方式特别有用。

---

现在，我们将从一个小的JDL内容开始，以了解生成内容的各种方法。
其他部分将对语法进行说明，但此处将重点介绍生成器。

这是我们将使用的基本内容：

```jdl
application {
  config {
    baseName jhipster
    applicationType microservice
  }
}
```

这是一个非常基本的微服务应用程序，名为“ jhipster”，我们将看到从该示例生成应用程序的各种方法。

您将看到，通过这个小示例，您已经成功地从头创建了一个应用程序。

---

## 使用远程JDL文件

您也可以在`jdl`命令中使用URL。 只需传递URL而不是文件名，如下所示

```
jhipster jdl https://my-site.com/my.jdl


jhipster jdl https://gist.githubusercontent.com/user/id/raw/id/myapp.jdl
```

您还可以仅通过指定文件名从我们的[JDL示例仓库]（https://github.com/jhipster/jdl-samples）获取远程JDL文件，我们将自动解析URL。

```
jhipster jdl default.jdl
```

## 生成应用

正如我们在前面的示例中看到的那样，生成应用程序非常简单，让我们以前面的示例为基础，并向其中添加更多内容：

```jdl
application {
  config {
    baseName jhipster
    applicationType microservice
    serverPort 4242
    buildTool gradle
  }
}
```

让我们分解一下：

- `application` 是你要声明一个应用程序的关键字
- `config` 是你要指定配置
  - 稍后会看到你还可以在应用程序中声明实体
- `baseName`, `applicationType`等是配置应用程序的关键字

这就是使用JDL创建应用程序的方式。
要查看所有受支持的应用程序选项，请转到 [应用生成](/jdl/applications).

---

## 生成实体

生成实体可能没有想像的那么简单。
您也可以去 [实体和属性](/jdl/entities-fields) 进一步了解您可以对实体执行的操作。

### 生成基本实体

```jdl
entity A
```

该实体没有属性，甚至没有明确的表名（即便JHipster从该实体的名称自动设置了一个表名）。
这是声明实体的最简单方法。

请注意，此形式等效于：

```jdl
entity A(a) {}
```

我们添加了数据库表名和大括号。
默认情况下，JHipster基于指定的实体名称生成表名称。

声明实体的属性时需要大括号。

### 添加注释

这是给实体添加注释的方法：

```jdl
/**
 * This is a simple entity
 */
entity A
```

如果后端使用Java，则将添加Javadoc注释。

### 应用中的实体

仅在应用程序中生成某些实体，可以使用`entities`关键字：

```jdl
application {
  config {}
  entities A, B
}

application {
  config {}
  entities C
}

entity A
entity B
entity C
```

这在微服务架构中特别有用。

---

## 生成属性

在实体中声明属性，需要声明实体的结构体并在其中实现：

```jdl
entity MyEntity {
  name String
  closed Boolean
}
```

除以上两种方法外，更多请查看 [实体和属性](/jdl/entities-fields).

### 添加注释和校验

和注释添加到实体的方式相同，我们也可以将注释添加到字段：

```jdl
entity MyEntity {
  /** My field */
  name String required minlength(2) maxlength(50)
}
```

校验取决于属性类型，有关校验的详细信息，请参见 [实体和属性](/jdl/entities-fields).

---

## 枚举

枚举是具有固定值的类型：

```jdl
enum Type {
  A,
  B(b)
}

entity E {
  name Type
}
```

注意枚举的值是如何可选的。

他们只有一个校验规则：`required`。

你可以查看更多关于 [枚举](/jdl/enums) 的详细信息。

---

## 关联关系

实体之间的关系也是可用的，并使用关键字`relationship`声明。

```jdl
entity A
entity B

relationship OneToOne {
  A{a} to B{b}
}
```

在此我们可以看到：

- `OneToOne` 是关系类型
  - 还有 `OneToMany`, `ManyToMany` 和 `ManyToOne`
- 我们声明关系的来源和目的地（从 `A` 到 `B`）
- 我们还声明了每个实体中的引入的属性名（在`B`实体中为属性`a`，在`A`实体中为属性`b`）
  - 这意味着关系是双向的，即：双向一对一关联关系。

要了解更多关于关系的详细内容，你可以前往 [关联关系](/managing_relationships).

### 单向关系还双向关系？

你可能希望单向的关系，而不是双向的，这取决于你如何设计你的模型。
可以通过不指定如下所示的引入属性来实现：

```jdl
relationship OneToOne {
  A{a} to B
}
```

你可以都不指定引入的属性名，默认情况下将至少引入一个（在源中）

```jdl
relationship OneToOne {
  A to B
}
```

### 关系注释和校验

关系也有注释和校验规则（只有`required`）：

```jdl
relationship OneToOne {
  A{a} to B{b required}
}
```

在此示例中，我们可以看到：

- `required` 指定是否需要关系的一方。
  - 代替0..1，这种一对一关系要求`b`不能为空。

要了解更多关于关系的内容，你可以去相应的 [关联关系](/jdl/relationships)页面。

---

## 选项

和在CLI中将选项应用于实体的方法相同，也可以在JDL中执行以下操作：

```jdl
entity A
entity B
entity C

readOnly A
dto * with mapstruct
service * with serviceImpl
paginate A, B with pager
```

下面发生的事情，让你有意外的惊喜：

- `dto`、`paginate` 和 `service` 是二元选项，因为它们需要一个实体列表和一个值
  - `with` 用于指定选项值
  - 注意 `*` 意味着该选项将应用于所有实体
- `readOnly` 是一元选项，这意味着此类选项仅包含实体列表

声明实体列表的方法有多种：

- 你可以一一列举，如：`A, B, C`
- 您可以选择所有的：`*` 或 `all`
  - 您可以指定排除某些实体： `service * with serviceImpl except A, B`

### 注解

注释是声明选项的另一种方法，让我们重写前面的示例：

```jdl
@readOnly
@dto(mapstruct)
@service(serviceImpl)
@paginate(pager)
entity A

@dto(mapstruct)
@service(serviceImpl)
@paginate(pager)
entity B

@dto(mapstruct)
@service(serviceImpl)
entity C
```

类似于Java或Typescript，注释是"装饰器"，是实体的选项。

此示例与先前的示例等效，因为它们可用于生成相同的代码。

要了解有关选项的更多信息，您可以转到 [选项](/jdl/options)

---

## 部署

最后，还可以使用`deployment`关键字从JDL文件生成部署，该关键字与JHipster v5.7及更高版本兼容：

```jdl
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

_要导入一个或多个部署，您不必位于JHipster应用程序文件夹中。_

有关部署的说明，请参见 [部署](/jdl/deployments).

一个JHipster部署具有对所有其他属性的默认值的配置和使用以前的语法将确保您的部署将使用默认值（就像您没有做出任何特定选择一样）。
最终的部署将具有：

- deploymentType: `docker-compose`
- appsFolders: `foo, bar`
- dockerRepositoryName: `yourDockerLoginName`
- serviceDiscoveryType: `eureka`
- gatewayType: `SpringCloudGateway`
- directoryPath: `../`
- 等等

现在，如果您需要一些自定义选项：

```jdl
deployment {
  deploymentType kubernetes
  appsFolders [store, invoice, notification, product]
  dockerRepositoryName "yourDockerLoginName"
  serviceDiscoveryType no
  istio autoInjection
  kubernetesServiceType Ingress
  kubernetesNamespace jhipster
  ingressDomain "jhipster.192.168.99.100.nip.io"
}
```

这些选项只是JDL中可用选项的一个示例。
部署页面上提供了完整的选项列表，请查看 [部署](/jdl/deployments).

---

## 常量

JDL支持数字常量。
这是一个例子：

```jdl
DEFAULT_MIN_LENGTH = 1
DEFAULT_MAX_LENGTH = 42
DEFAULT_MIN_BYTES = 20
DEFAULT_MAX_BYTES = 40
DEFAULT_MIN = 0
DEFAULT_MAX = 41

entity A {
  name String minlength(DEFAULT_MIN_LENGTH) maxlength(DEFAULT_MAX_LENGTH)
  content TextBlob required
  count Integer min(DEFAULT_MIN) max(DEFAULT_MAX)
}
```

---

## 导出JDL

如果您的应用程序中已经有实体并且希望拥有JDL文件，请不用担心！ 您不必从头开始，因为有一个子生成可以为您完成此任务。

在应用程序的根文件夹中运行 `jhipster export-jdl <FILE_NAME>` ，您将拥有所有应用程序、实体、关系和选项在单个JDL文件中导出。

注意：您也不能为子生成器提供文件名，导出的JDL文件将以应用程序的基本名称命名。 例如，如果您的应用程序名为`mySuperApp`，则您的JDL文件将为`mySuperApp.jdl`。
