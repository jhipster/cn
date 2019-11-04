---
layout: default
title: JHipster域语言
permalink: /jdl/
sitemap:
    priority: 0.5
    lastmod: 2019-08-17T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster域语言（JDL）


JDL是JHipster特定的领域语言，您可以在一个文件（或多个文件）中，使用简单易用的语法描述所有应用程序、部署、实体及其关系。

您可以使用我们的在线[JDL-Studio](https://start.jhipster.tech/jdl-studio/)或[JHipster IDE](https://www.jhipster.tech/jhipster-ide/)插件/扩展（可用于[Eclipse](https://marketplace.eclipse.org/content/jhipster-ide), [VS Code](https://marketplace.visualstudio.com/items?itemName=jhipster-ide.jdl)和[Atom](https://atom.io/packages/ide-jhipster)）来创建JDL文件及其UML可视化。您也可以创建和导出JDL模型，或共享JDL模型的URL。

您可以通过运行`jhipster import-jdl your-jdl-file.jdl`使用`import-jdl`子生成器从JDL文件生成应用程序，部署和实体。

如果您有一个现有项目（使用`jhipster import-jdl`创建或通过`jhipster`命令行生成），则可以通过运行`jhipster import-jdl your-jdl-file.jdl`来为该项目生成实体。确保在您的当前JHipster项目下执行此命令。

您还可以通过从生成的JHipster应用程序根目录运行`jhipster-uml your-xmi-file.xmi --to-jdl`来生成应用程序，实体，并使用[JHipster UML]({{ site.url }}/jhipster-uml/)将它们导出为JDL文件。要了解有关JHipster UML的更多信息并进行安装，请转到[JHipster UML文档]({{ site.url }}/jhipster-uml/)。

这可以替代使用[实体子生成器]({{ site.url }}/creating-an-entity/)，并且这是推荐的方法。这个思路是，使用视觉工具来[管理关系]({{ site.url }}/managing-relationships/)比使用经典的Yeoman问答更容易。

JDL项目[可在GitHub上获得](https://github.com/jhipster/jhipster-core/)，与JHipster（Apache 2.0许可证）一样，它也是一个开源项目，。它也可以用作执行JDL解析的node库。

_如果您喜欢[JHipster域语言](https://github.com/jhipster/jhipster-core/)，[JDL Studio](https://github.com/jhipster/jdl-studio/)或者[JHipster IDE](https://github.com/jhipster/jhipster-ide/)，请不要忘记在GitHub上给它们加星-谢谢！_!

***

以下便是JDL文档：

1. [JDL示例](#sample)
1. [如何使用它](#howtojdl)
   1. [导入JDL文件](#importingjdl)
   1. [导出到JDL文件](#exportingjdl)
1. [语言](#jdllanguage)
   1. [申请声明](#applicationdeclaration)
   1. [实体声明](#entitydeclaration)
   1. [关系声明](#relationshipdeclaration)
   1. [枚举](#enumerationdeclaration)
   1. [Blobs](#blobdeclaration)
   1. [选项声明](#optiondeclaration)
   1. [与微服务相关的选项](#microserviceoptions)
   1. [注解](#annotations)
   1. [部署声明](#deploymentdeclaration)
1. [注释](#commentingjdl)
1. [所有关系](#jdlrelationships)
1. [常数](#constants)
1. [工作流程](#workflows)
1. [备注](#annexes)
   1. [可用的应用程序选项](#application_options)
   1. [可用的部署选项](#deployment_options)
   1. [可用的字段类型和约束](#types_and_constraints)
   1. [可用选项](#all_options)
1. [故障排除](#troubleshooting)
1. [问题与错误](#issues)

***

## <a name="sample"></a> JDL示例

Oracle的"人力资源"示例应用程序已转换为JDL，可在[此处](https://github.com/jhipster/jdl-samples/blob/master/Oracle-Human-Resources-sample.jdl)获得。
默认情况下，[JDL-Studio](https://start.jhipster.tech/jdl-studio/)和[JHipster IDE](https://www.jhipster.tech/jhipster-ide/)也会加载这个例子。

如果您正在寻找更多示例，[这里](https://github.com/jhipster/jdl-samples)有一仓库例子。

## <a name="howtojdl"></a> 如何使用它

###  <a name="importingjdl"></a> 导入JDL文件
然后，您可以使用JDL文件生成实体：
  - 只需创建扩展名为'.jh'或'.jdl'的文件，
  - 使用[JDL-Studio](https://start.jhipster.tech/jdl-studio/)或[JHipster IDE](https://www.jhipster.tech/jhipster-ide/)声明您的应用程序，部署，实体和关系，或创建和下载文件，
  - 如果仅在其中创建实体，则在JHipster应用程序的根文件夹中运行`jhipster import-jdl my_file.jdl`。
  - 如果要创建应用程序，则只需在文件夹中运行`jhipster import-jdl my_file.jdl`。
  
*没错！*，您完成了！

如果您在团队中工作，也许您希望拥有多个文件而不是一个文件。
我们添加了此选项，因此您不必手动将所有文件合并在一起，
而只需运行即可。

    jhipster import-jdl my_file1.jdl my_file2.jdl

如果不想在导入JDL时重新生成实体，则可以使用`--json-only`标志跳过实体创建部分，仅在`.jhipster`文件夹中创建json文件。

    jhipster import-jdl ./my-jdl-file.jdl --json-only

默认情况下，`import-jdl`仅重新生成已更改的实体，如果要重新生成所有实体，则传递`--force` 标志。
请注意，这将覆盖您对实体文件的所有本地更改

    jhipster import-jdl ./my-jdl-file.jdl --force

如果要在项目中使用它，可以通过执行以下操作来添加它：
  - NPM: `npm install jhipster-core --save`
  - Yarn: `yarn add jhipster-core`

将其安装在本地，并将其保存在`package.json`文件中。

###  <a name="exportingjdl"></a> 导出到JDL文件

如果您的应用程序中已经有实体并且希望拥有JDL文件，请不要担心！您无需从头开始编写它，因为有一个子生成器可以为您完成此任务。

只需在应用程序的根文件夹中运行`jhipster export-jdl <FILE_NAME>`，即可将所有实体，关系和选项导出到单个JDL文件中。
注意：您也可以不能为子生成器提供文件名，其将选择默认名称。

---

## <a name="jdllanguage"></a> 语言
我们试图使语法对开发人员尽可能友好。
您可以使用它们执行以下操作：
  - 使用选项和实体声明应用程序，
  - 声明实体及其属性，
  - 声明他们之间的关系，
  - 并声明一些JHipster特定的选项。

如果您想查看JDL的语法，[这里](https://github.com/jhipster/jhipster-core/blob/master/lib/dsl/gen/grammar.html).有一个HTML文件。


### <a name="applicationdeclaration"></a> 应用声明

从v2.0.0开始，可以进行应用程序声明（与JHipster v5兼容）。

_要导入一个或多个应用程序，您不必位于JHipster应用程序文件夹中。_

最基本的声明如下：s

```
application {
  config {}
}
```

JHipster应用程序带有一个默认配置，
并且使用预先的语法将确保您的应用程序使用默认值（就像您没有做出任何特定选择一样）。
生成的应用程序将具有：

  - baseName: `jhipster`
  - applicationType: `monolith`
  - databaseType: `sql`
  - etc.

现在，如果您需要一些自定义选项：

```
application {
  config {
    baseName myapp
    applicationType microservice
    prodDatabaseType postgresql
    buildTool gradle
  }
}
```

这些选项只是JDL中可用选项的一个示例。
选项的完整列表在[此处](#annexes)的附件中。

如果您需要多个应用程序，请按以下步骤操作：

```
application { // 将在“ myFirstApp”文件夹下生成
  config {
    baseName myFirstApp
  }
}

application { // 将在“ mySecondApp”文件夹下生成
  config {
    baseName mySecondApp
    applicationType microservice
  }
}
```

您可以在任意数量的文件中拥有任意数量的应用程序：没有限制。

声明实体是最基本的方法，
现在您可以设置要在所需的应用程序中生成的实体。

让我们改进前面的示例：

```
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

现在，生成这些应用程序和文件夹时将发生几件事：
  - 将创建四个应用程序：
    - myMonolith位于`./myMonolith`，服务端口为`8080`
    - myGateway位于`./myGateway`，服务端口为`9042`
    - microserviceA位于`./microserviceA`，服务端口为`8081`
      - 即使我们未指定服务端口，JHipster也会默认设置一个端口。
      - 对于微服务，默认值是`8081`
      - 对于网关和整体而言，它是`8080`
      - 对于UAA应用，为9999
    - microserviceB位于`./microserviceB`，服务端口为`8082`
  - 将生成四个实体
    - monolith中的`A`和`B`
    - 网关中的`C`和`D`
      - 第一个微服务中的`C`
      - 第二个微服务中的`D`
  - `microservice`选项对于`C`和`D`是隐式的
    - 由于它们是在两个微服务上生成的，因此默认情况下将设置此选项。
  - 选项的工作方式与以前相同

请注意，如果默认值不存在，则生成器会设置默认值（例如`databaseType`）。

JHipster核心功能完全相同。

### <a name="entitydeclaration"></a> 实体声明

实体声明如下：

    entity <entity name> {
      <field name> <type> [<validation>*]
    }

  - `<entity name>` 是实体的名称，
  - `<field name>` 实体一个字段的名称，
  - `<type>` JHipster支持的字段类型，
  - 以及作为`<validation>`选项的字段验证。

可能的类型和验证可参照[此处](#annexes)，如果验证需要一个值，只需在验证名称后添加（<value>）。

这是一个JDL代码示例：

```
entity A
entity B
entity C
entity D {
  name String required
  address String required maxlength(100)
  age Integer required min(18)
}
```

正则表达式有点特殊，它们的用法如下（来自v1.3.6）：

```
entity A {
  myString String required minlength(1) maxlength(42) pattern(/[A-Z]+/)
}
```
如果您使用的是v4.9.X之前的生成器，则需要使用像这种模式`pattern('[A-Z]+'`)。

因为JDL的易于使用和可读，所以如果您的实体为空（无字段），则只需声明`entity A`或`entity A {}`即可。

请注意，JHipster添加了默认的`id`字段，因此您不必担心。

### <a name="relationshipdeclaration"></a> 关系声明

关系声明如下：

    relationship (OneToMany | ManyToOne | OneToOne | ManyToMany) {
      <from entity>[{<relationship name>[(<display field>)]}] to <to entity>[{<relationship name>[(<display field>)]}]
    }

  - `(OneToMany | ManyToOne| OneToOne | ManyToMany)`是关系类型
  - `<from entity>`是关系的实体所有者的名称：来源，
  - `<to entity>` 是关系要到达的实体的名称：目的地，
  - `<relationship name>` 是具有另一端类型的字段名称，
  - `<display field>` 是应显示在选择框中的字段名称（默认值：`id`），
  - `required` 是否字段是必须的
  - `with jpaDerivedIdentifier` `@MapsId`是否用于关联（仅适用于一对一）

这是一个简单的示例：

    entity Book
    entity Author

    relationship ManyToOne {
      Book to Author
    }

声明外键字段是可选的，因为默认情况下会根据需要设置一个（或两个）。
前面的示例与此等效：

    entity Book
    entity Author

    relationship ManyToOne {
      Book{author} to Author
    }

让我们举个更复杂的例子。
一本书必需有一个作者，一个作者可以写几本书。

    entity Book
    entity Author {
      name String required
    }

    relationship OneToMany {
      Author{book} to Book{writer(name) required}
    }

在这里，`Book`类将具有一个名为`writer` 的**必填**字段，该字段将通过`Author`的`name`字段进行连接。

当然，在实际情况下，实体间将有很多关系，总是写相同的三行可能很乏味。因此，您可以参照以下内容来声明：

```
entity A
entity B
entity C
entity D

relationship OneToOne {
  A{b} to B{a}
  B{c} to C
}
relationship ManyToMany {
  A{d} to D{a}
  C{d} to D{c}
}
```

默认始终使用`id`字段完成连接，该字段也是在前端编辑关系时显示的默认字段。如果需要显示另一个字段，则可以这样指定：

```
entity A {
  name String required
}
entity B


relationship OneToOne {
  A{b} to B{a(name)}
}
```

JPA Derived Identifier-@MapsId可以声明为以下形式，当前仅一对一支持：

```
entity A {
  name String required
}
entity B


relationship OneToOne {
  A{b} to B{a(name)} with jpaDerivedIdentifier
}
```

这使得JHipster生成一个REST资源，该资源将连接实体的`id`和`name`都返回到前端，因此可以将名称显示给用户。

### <a name="enumerationdeclaration"></a> 枚举

要使用JDL枚举，请执行以下操作：

- 在文件中的相应位置声明一个枚举：

        enum Language {
          FRENCH, ENGLISH, SPANISH
        }

- 在实体中，添加以Enum作为类型的字段：

        entity Book {
          title String required,
          description String,
          language Language
        }


### <a name="blobdeclaration"></a> Blob (byte[])
JHipster提供了可以在图像类型或任何二进制类型之间进行自由选择的选项。JDL允许您执行相同的操作。只需使用编辑器就可以创建一个自定义类型（请参见DataType），然后根据以下约定对其进行命名：
  - `AnyBlob`或`Blob`创建一个任意二进制类型字段;
  - `ImageBlob`创建一个标识为图片二进制字段。
  - `TextBlob`创建CLOB（长文本）字段。

您可以根据需要，创建任意数量的数据类型。

### <a name="optiondeclaration"></a> 选项声明

在JHipster中，您可以为实体指定选项，例如分页或DTO。
在JDL中您可以执行相同的操作：

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

关键字`dto`, `paginate`, `service`和`with`已被添加到语法中来以支持这些修改。如果指定了错误的选项，JDL会用红色的消息通知您，并且会忽略这个错误的选项，避免损坏JHipster的JSON文件。

#### 服务选项

指定的服务不会创建将直接调用repository接口的resource类。这是默认和最简单的选项，请参阅A。
带有serviceClass的Service（请参见B）将使资源调用服务类，后者将调用repository接口。
带serviceImpl的Service（请参阅C）将创建一个服务接口，
该接口将由资源类使用。该接口由将调用存储库接口的具体类实现。

除非确定，否则不使用任何服务，这对CRUD来说是最简单的选择。如果您将有很多业务逻辑，这些业务逻辑将使用多个存储库，则非常适合将服务与类一起使用，这使其成为服务类的理想选择。Jhipster不喜欢不需要的接口，但是如果您喜欢它们，请使用impl进行服务。

    entity A
    entity B
    entity C

    // no service for A
    service B with serviceClass
    service C with serviceImpl


JDL还支持批量设置选项。可以这样做：

    entity A
    entity B
    ...
    entity Z

    dto * with mapstruct
    service all with serviceImpl
    paginate C with pagination

请注意，`*`和`all`是等效的。
最新版本引入了排除功能（在为每个实体设置选项时，这是一个功能强大的选项）：

    entity A
    entity B
    ...
    entity Z

    dto * with mapstruct except A
    service all with serviceImpl except A, B, C
    paginate C with pagination

使用JHipster，您还可以设置是否不需要任何客户端代码或服务器代码。
即使您想在与Angular相关的文件中添加后缀，也可以在JHipster中操作。
可以在每个实体的基础上激活[Filtering](https://www.jhipster.tech/entities-filtering/)选项：filter `<entity name>`，或对于所有实体：filter `*`。
在您的JDL文件中，只需添加以下几行即可：
```
entity A
entity B
entity C

skipClient A
skipServer B
angularSuffix * with mySuperEntities
filter C
```

最后，还可以指定表名（默认使用实体名称）：

```
entity A // A is the table's name here
entity B (the_best_entity) // the_best_entity is the table's name
```


### <a name="microserviceoptions"></a> 与微服务相关的选项

从JHipster v3开始可以创建微服务。您可以指定一些选项以在JDL中生成您的实体：微服务的名称和搜索引擎。
您可以通过以下方法指定微服务的名称（JHipster应用的名称）：

```
entity A
entity B
entity C

microservice * with mysuperjhipsterapp except C
microservice C with myotherjhipsterapp
search * with elasticsearch except C
```

第一个选项用于告诉JHipster您希望微服务处理您的实体，而第二个选项指定如何，以及是否希望搜索实体。

### <a name="annotations"></a> 注解

从JHipster v5开始可以使用注释。注释与Java中的功能类似，因此注释的工作方式相同，因此您可以使用注释选项对实体进行注释。

以这个JDL代码为例：
```
entity A
entity B
entity C

dto C with mapstruct
paginate * with pager except C
search A with elasticsearch
```

这与注解等效：

```
@paginate(pager)
@search(elasticsearch)
entity A

@paginate(pager)
entity B

@dto(mapstruct)
entity C
```

尽管添加的代码多于实际删除的代码，但在使用多个JDL文件（例如用于微服务）时，它实际上很有用。

### <a name="deploymentdeclaration"></a> 部署声明

从v3.6.0开始，可以进行部署声明（与JHipster v5.7或更高版本兼容）。

_要导入一个或多个部署，您不必位于JHipster应用程序文件夹中。_

最基本的声明如下：

```
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

JHipster部署的配置具有所有其他属性的默认值，并且使用以前的语法将确保您的部署将使用默认值（就像您没有做出任何特定选择一样）。
最终的部署将具有：
The resulting deployment will have:
  - deploymentType: `docker-compose`
  - appsFolders: `foo, bar`
  - dockerRepositoryName: `yourDockerLoginName`
  - serviceDiscoveryType: `eureka`
  - gatewayType: `zuul`
  - directoryPath: `../`
  - etc.

现在，如果您需要一些自定义选项：

```
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

这些选项只是JDL中可用选项的一个示例。选项的完整列表在[此处](#annexes)的附件中。

如果您需要多个部署，请按以下步骤进行：

```
// will be created under 'docker-compose' folder
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}

// will be created under 'kubernetes' folder
deployment {
  deploymentType kubernetes
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

You can have one deployment per deploymentType. The applications defined in `appsFolders` should be in the same folder where you are creating deployments or in the folder defined in `directoryPath`. For example for above you need to have a folder structure like this

每个DeploymentType可以有一个部署。`appsFolders`中定义的应用程序应位于创建部署所在的文件夹中，或位于`directoryPath`中定义的文件夹中。例如，对于上面的示例，您需要具有这样的文件夹结构

```
.
├── yourJdlFile.jdl
├── foo
├── bar
├── kubernetes // will created by the JDL
└── docker-compose // will created by the JDL
```

## <a name="commentingjdl"></a> 注释 & Javadoc

可以将Javadoc和注释添加到JDL文件。

就像在Java中一样，此示例演示了如何添加Javadoc注释：

    /**
     * Class comments.
     * @author The JHipster team.
     */
    entity MyEntity { // another form of comment
      /** A required attribute */
      myField String required
      mySecondField String // another form of comment
    }

    /**
     * Second entity.
     */
    entity MySecondEntity {}

    relationship OneToMany {
      /** This is possible too! */
      MyEntity{mySecondEntity}
      to
      /**
       * And this too!
       */
      MySecondEntity{myEntity}
    }

这些注释稍后将由JHipster添加为Javadoc注释。

JDL内部一种类型评论：

    // an ignored comment
    /** not an ignored comment */

因此，以 `// `开头的任何内容都被视为JDL的内部注释，因此不会被视为Javadoc。

请注意，在解析期间，以 `#`开头的JDL Studio指令将被忽略。

注释的另一种形式是以下注释：
```
entity A {
  name String /** My super field */
  count Integer /** My other super field */
}
```

在这里，A的名称将用`My super field`进行注释，B则用`My other super field`进行注释。
是的，逗号不是强制性的，但最好使用逗号，以免在代码中犯错误。
如果您想混合使用逗号和以下注释，请当心！
```
entity A {
  name String, /** My comment */
  count Integer
}
```

A的名字将不会有评论，因为count字段会有。

## <a name="jdlrelationships"></a>所有关系

有关如何使用JDL创建关系的说明。

### 一对一

双向关系，其中汽车有驾驶员，而驾驶员也有汽车。

    entity Driver
    entity Car
    relationship OneToOne {
      Car{driver} to Driver{car}
    }

一个单向示例，一个公民拥有一个护照，但该护照无法独占其所有者。

    entity Citizen
    entity Passport
    relationship OneToOne {
      Citizen to Passport
    }

    // using @MapsId
    relationship OneToOne {
          Citizen to Passport with jpaDerivedIdentifier
    }

### 一对多

双向关系，其中所有者0个，一个或多个Car对象，并且Car知道其所有者。

    entity Owner
    entity Car
    relationship OneToMany {
      Owner{car} to Car{owner}
    }

JHipster不支持一对多的单向版本，但是看起来像这样：

    entity Owner
    entity Car
    relationship OneToMany {
      Owner to Car
    }


### 多对一

一对多关系的相反版本，
汽车认识车主的单向版本：

    entity Owner
    entity Car
    relationship ManyToOne {
      Car to Owner
    }


### 多对多

最后，在此示例中，我们的汽车知道其驾驶员，并且驾驶员对象也可以访问其汽车。

    entity Driver
    entity Car
    relationship ManyToMany {
      Car{driver} to Driver{car}
    }

请注意，关系的拥有方必须在左侧

## <a name="constants"></a>常量

从JHipster Core v1.2.7开始，JDL支持数字常量。
这是一个例子：

```
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

## <a name="workflows"></a>工作流程

## <a name="workflow_monolith"></a>Monolith工作流程

这里没有特殊的工作流程：
  - 创建你的应用
  - 创建您的JDL文件
  - 导入

## <a name="workflow_microservice"></a>微服务工作流程

处理微服务有点棘手，但是JDL为您提供了一些处理您认为合适的实体选项。

通过`microservice <ENTITIES> with <MICROSERVICE_APP_NAME>`，您可以指定在哪个微服务中生成哪个实体。
以以下设置为例：
```
entity A
entity B
entity C

microservice A with firstMS
microservice B with secondMS
```

给定两个JHipster应用程序（'firstMS'和'secondMS'），如果在两个应用程序中导入JDL文件，将获得以下内容：
  - 在'firstMS'中，将生成实体`A`和`C`。
  - 在'secondMS'中，将生成实体`B`和`C`。

两者都会生成`C` ，因为如果没有微服务选项指定该实体的生成位置，那么它将在各处生成。
如果您决定将这个JDL导入Monolith应用程序中，则会生成每个实体（Monolith在JDL中没有限制选项）。

注意：如果要在两个不同的微服务中生成同一实体，则可以编写两个JDL文件而不是每次更新JDL文件。

前面的示例不能这样写：
``` 
entity A
entity B
entity C

microservice * except B with firstMS
microservice * except A with secondMS
```
结果如下：
  - 在'firstMS'，只会生成实体 `C` 
  - 在'secondMS'中，将生成实体`B`和`C`。这是因为，在解析时，如果一个选项与另一个选项重叠，则后者优先。

您还可以使用JDL创建整个微服务框架，例如，请[参考此博客文章](https://medium.com/@deepu105/create-full-microservice-stack-using-jhipster-domain-language-under-30-minutes-ecc6e7fc3f77)。

---

## <a name="annexes"></a>备注

## <a name="application_options">可用的应用程序选项

这是JDL支持的应用程序选项：

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL选项名称</th>
    <th>默认值</th>
    <th>可选值</th>
    <th>备注</th>
  </tr>
  <tr>
    <td>applicationType</td>
    <td>monolith</td>
    <td>monolith, microservice, gateway, uaa</td>
    <td></td>
  </tr>
  <tr>
    <td>authenticationType</td>
    <td>jwt or uaa</td>
    <td>jwt, session, uaa, oauth2</td>
    <td>uaa指定UAA应用，否则为jwt</td>
  </tr>
  <tr>
    <td>baseName</td>
    <td>jhipster</td>
    <td></td>
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
    <td>ehcache, hazelcast, infinispan, no</td>
    <td>用于整体和网关的ehcache，否则为hazelcast</td>
  </tr>
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
    <td>您可以输入所需的任何值，前提是您知道它会起作用（例如dark或light），也可以为空</td>
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
    <td>* + prod数据库类型</td>
  </tr>
  <tr>
    <td>dtoSuffix</td>
    <td>DTO</td>
    <td></td>
    <td>DTO的后缀。对于空字符串，为false。</td>
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
    <td>实体的后缀。对于空字符串，为false。</td>
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
    <td>JHipster中可用的语言</td>
    <td>Braces are mandatory</td>
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
    <td>设置packageFolder选项</td>
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
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>testFrameworks</td>
    <td>[]</td>
    <td>protractor, cucumber, gatling</td>
    <td>Braces mandatory</td>
  </tr>
  <tr>
    <td>uaaBaseName</td>
    <td></td>
    <td></td>
    <td>如果auth类型为uaa，则对于网关和微服务是必需的，必须在包含双引号之间</td>
  </tr>
  <tr>
    <td>useSass</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>websocket</td>
    <td>false</td>
    <td>spring-websocket, false</td>
    <td></td>
  </tr>
</table>

---

## <a name="deployment_options">可用的部署选项

这是JDL支持的应用程序选项：

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL选项名称</th>
    <th>默认值</th>
    <th>可选值</th>
    <th>备注</th>
  </tr>
  <tr>
    <td>deploymentType</td>
    <td>docker-compose</td>
    <td>docker-compose, kubernetes, openshift</td>
    <td></td>
  </tr>
  <tr>
    <td>directoryPath</td>
    <td>"../"</td>
    <td></td>
    <td>相对路径。必须用双引号括起来</td>
  </tr>
  <tr>
    <td>appsFolders</td>
    <td>[]</td>
    <td></td>
    <td>应用程序的目录名称，以逗号分隔。必须是列表，例如[foo，bar]</td>
  </tr>
  <tr>
    <td>clusteredDbApps</td>
    <td>[]</td>
    <td></td>
    <td>具有集群数据库的应用程序的目录名称，以逗号分隔。必须是列表，例如[foo，bar]</td>
  </tr>
  <tr>
    <td>gatewayType</td>
    <td>zuul</td>
    <td>zuul, traefik</td>
    <td>当serviceDiscoveryType为`no`时，将忽略该值</td>
  </tr>
  <tr>
    <td>monitoring</td>
    <td>no</td>
    <td>no, elk, prometheus</td>
    <td></td>
  </tr>
  <tr>
    <td>consoleOptions</td>
    <td>[]</td>
    <td>[curator, zipkin]</td>
    <td>必须是列表</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>eureka</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>dockerRepositoryName</td>
    <td></td>
    <td></td>
    <td>docker仓库的名称或URL。必须用双引号括起来</td>
  </tr>
  <tr>
    <td>dockerPushCommand</td>
    <td>"docker push"</td>
    <td></td>
    <td>要使用的docker push命令。必须用双引号括起来</td>
  </tr>
  <tr>
    <td>kubernetesNamespace</td>
    <td>default</td>
    <td></td>
    <td>仅当DeploymentType为kubernetes时适用</td>
  </tr>
  <tr>
    <td>kubernetesServiceType</td>
    <td>LoadBalancer</td>
    <td>LoadBalancer, NodePort, Ingress</td>
    <td>仅当DeploymentType为kubernetes时适用</td>
  </tr>
  <tr>
    <td>ingressDomain</td>
    <td></td>
    <td></td>
    <td>设置Ingress Domain, 当kubernetesServiceType为`Ingress`时，。必须用双引号引起来。仅当DeploymentType为kubernetes时适用</td>
  </tr>
  <tr>
    <td>istio</td>
    <td>no</td>
    <td>no, manualInjection, autoInjection</td>
    <td>仅当DeploymentType为kubernetes时适用</td>
  </tr>
  <tr>
    <td>openshiftNamespace</td>
    <td>default</td>
    <td></td>
    <td>仅当DeploymentType为openshift时适用</td>
  </tr>
  <tr>
    <td>storageType</td>
    <td>ephemeral</td>
    <td>ephemeral, persistent</td>
    <td>仅当DeploymentType为openshift时适用</td>
  </tr>
</table>

## <a name="types_and_constraints"></a>可用的字段类型和约束

以下是JDL支持的类型：

常用数据库：
  - PostgreSQL
  - MySQL
  - MariaDB
  - Oracle
  - MsSQL
  - MongoDB
  - Couchbase

<table class="table table-striped table-responsive">
  <tr>
    <th>通用数据库</th>
    <th>Cassandra</th>
    <th>验证方式</th>
  </tr>
  <tr>
    <td>String</td>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern, unique</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td>Integer</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td>Long</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td>Float</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td>Double</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>required, unique</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td>Date</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Duration</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>UUID</td>
    <td>UUID</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Instant</td>
    <td>Instant</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
</table>

---

## <a name="all_options"></a> 可用选项

### 一元选项

这些选项不需要指定值：
  - `skipClient`
  - `skipServer`
  - `noFluentMethod`
  - `filter`

可以这样使用它们：`<OPTION> <ENTITIES | * | all> except? <ENTITIES>`

### 二元选项

这些选项采用以下值：
  - `dto` (`mapstruct`)
  - `service` (`serviceClass`, `serviceImpl`)
  - `paginate` (`pager`, `pagination`, `infinite-scroll`)
  - `search` (`elasticsearch`)
  - `microservice` (自定义值)
  - `angularSuffix` (自定义值)
  - `clientRootFolder` (自定义值)

---

## <a name="troubleshooting"></a>故障排除

### 匹配MS baseName时，JDL导入仅找到一个实体

这是解析系统的已知问题，解决它很棘手。
显而易见的解决方法是为微服务和内部实体使用不同的名称。

有关更多信息，请参见[JHipster Core issue #308](https://github.com/jhipster/jhipster-core/issues/308)。

---

## <a name="issues"></a>问题与错误

JDL[在GitHub上可用](https://github.com/jhipster/jhipster-core)，并[遵循与JHipster相同的贡献准则]( https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md)。

请使用我们的项目提交有关库本身的问题和Pull Requests。

- [JDL issue tracker](https://github.com/jhipster/jhipster-core/issues)
- [JDL Pull Requests](https://github.com/jhipster/jhipster-core/pulls)

提交任何内容时，您都必须尽可能精确：
  - **一个isuue必须只包含一个问题** (一个需求或一个问题);  
  - 欢迎Pull requests，但是提交日志必须简洁明了，具有'原子'可读性。
