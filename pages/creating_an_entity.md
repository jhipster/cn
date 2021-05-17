---
layout: default
title: 创建一个实体
permalink: /creating-an-entity/
redirect_from:
  - /creating_an_entity.html
sitemap:
    priority: 0.7
    lastmod: 2018-09-04T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 创建一个实体

_**请查看有关创建新JHipster应用程序的[视频教程]({{ site.url }}/video-tutorial/)！**_
如果要实时重载JavaScript/TypeScript代码，则需要运行`npm start`或`yarn start`。您可以转到[在开发过程中使用JHipster]({{ site.url }}/development/)页面以获取更多信息。

## 介绍

创建应用程序后，将需要创建 _实体_。例如，您可能要创建一个 _Author_ 和 _Book_ 实体。对于每个实体，您将需要：

*   数据库表
*   Liquibase变更集
*   JPA实体
*   Spring Data JPA Repository
*   Spring MVC REST控制器，具有基本的CRUD操作
*   Angular路由器，组件和服务
*   HTML视图
*   集成测试，以验证一切正常
*   性能测试，看一切是否顺利

如果您有多个实体，则可能需要在它们之间建立关系。为此，您将需要：

*   数据库外键
*   用于管理这种关系的特定JavaScript和HTML代码

"entity"子生成器将创建所有必要的文件，并为每个实体提供一个CRUD前端（请参阅[Angular项目结构]({{ site.url }}/using-angular/)和[React项目结构]({{ site.url }}/using-react/))）。可以通过运行`jhipster entity <entityName> --[options]`来调用子生成器。可以通过输入`jhipster entity --help`找到这些选项的参考。

以下是受支持的选项。

*   `--table-name <table_name>` - 默认情况下，JHipster将根据您的实体名称生成一个表名，如果您希望使用其他表名，则可以通过传递此选项来实现。
*   `--angular-suffix <suffix>` - 如果您希望所有Angular路由都具有自定义后缀，则可以使用此选项传递该后缀。
*   `--client-root-folder <folder-name>` - 指定前端侧实体使用的根文件夹名称。对于富应用和微服务中的网关，默认情况下为空。
*   `--regenerate` - 不询问任何问题重新生成现有实体。
*   `--skip-server` - -这将跳过服务器端代码，仅生成前端代码。
*   `--skip-client` - 这将跳过前端代码，仅生成服务器端代码。
*   `--skip-db-changelog` - 这将跳过数据库更改日志的生成（对于SQL数据库使用Liquibase）。
*   `--db` - -跳过服务器端生成时，指定的数据库，其他时候无效。

<div class="alert alert-warning"><i>注意: </i>

不要为您的实体选择一个简称（请参见<a href="https://github.com/jhipster/generator-jhipster/issues/8446" target="_blank" rel="noopener">此问题</a>）。
</div>

## JHipster UML与JDL Studio

本页介绍如何使用标准命令行界面通过JHipster创建实体。如果要创建多个实体，则可能更喜欢使用图形界面工具。

在这种情况下，有两个选项可用：

*   [JHipster UML]({{ site.url }}/jhipster-uml/), 它允许您使用UML编辑器。
*   [JDL Studio](https://start.jhipster.tech/jdl-studio/), 我们的在线工具，使用我们的领域特定语言[JDL]({{ site.url }}/jdl/)创建实体和关系。

如果您使用了JDL Studio：

*   您可以使用`jdl`子生成器通过运行`jhipster jdl your-jdl-file.jh`从JDL文件生成实体。

    * 如果您不想在导入JDL时重新生成实体，则可以使用`--json-only`标识来跳过实体创建部分，仅在`.jhipster`文件夹中生成json文件。
    
    ```
    jhipster jdl ./my-jdl-file.jdl --json-only
    ```

    * 默认情况下， `jdl`仅重新生成已更改的实体，如果要重新生成所有实体，则传递`--force`标识。请注意，这将覆盖您对实体文件的所有本地更改

    ```
    jhipster jdl ./my-jdl-file.jdl --force
    ```

*   如果要使用JHipster UML代替`jdl`子生成器，则需要先通过运行`npm install -g jhipster-uml`来安装它，然后运行`jhipster-uml yourFileName.jh`。

## Entity字段

对于每个实体，您可以根据需要添加任意多个字段。您将需要提供字段名称及其类型，JHipster将为您生成所有所需的代码和配置，从Angular的HTML视图到Liquibase变更文件。

这些字段不包含您使用技术中的保留关键字。例如，如果您使用MySQL：
*   您不能使用Java保留关键字（因为您的代码将无法编译）
*   您不能使用MySQL保留关键字（因为数据库表结构更新将失败）

## 字段类型

JHipster支持许多字段类型。这种支持取决于您的数据库后端，因此我们使用Java类型来描述它们：Java`String`将以不同的方式存储在Oracle或Cassandra中，这是JHipster的优势之一，可以为您生成正确的数据库访问代码。
*   `String`: Java字符串。它的默认大小取决于基础后端（如果使用JPA，默认情况下为255），但是您可以使用校验规则进行更改（例如，修改 `max`大小为1024）。
*   `Integer`: Java整数。
*   `Long`: Java长整数。
*   `Float`: Java浮点数.
*   `Double`: Java双精度浮点数.
*   `BigDecimal`: [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html)对象, 当您需要精确的数学计算时使用（通常用于财务操作）。
*   `LocalDate`: [java.time.LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html)对象, 用于正确管理Java中的日期。
*   `Instant`: [java.time.Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html)对象, 用于表示时间戳，即时间线上的瞬时点。
*   `ZonedDateTime`: [java.time.ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html)对象, 用于表示给定时区（通常是日历中会议、约定）中的本地日期时间。请注意，REST和持久层都不支持时区，因此您很可能应该使用`Instant`。
*   `Duration`: [java.time.Duration](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html)对象, 用于表示时间量。
*   `UUID`: [java.util.UUID](https://docs.oracle.com/javase/8/docs/api/java/util/UUID.html)对象.  
*   `Boolean`: Java布尔型.
*   `Enumeration`:Java枚举对象。选择此类型后，子生成器将询问您要在枚举中使用哪些值，并将创建一个特定的`enum`类来存储它们。
*   `Blob`: Blob对象，用于存储一些二进制数据。选择此类型时，子生成器将询问您是否要存储通用二进制数据，图像对象或CLOB（长文本）。图像将专门在Angular侧进行优化处理，因此可以将其正常显示给最终用户。

## 校验

可以为每个字段设置校验。根据字段类型，将提供不同的校验选项。
    
校验将在以下地方自动生成：

*   HTML视图，使用Angular或React或Vue校验机制
*   Java domain对象, 使用[Bean Validation](http://beanvalidation.org/)

然后，在以下情况下使用Bean校验时，将使用它们进行自动校验：

*   Spring MVC REST控制器(使用`@Valid`注解)
*   Hibernate/JPA (实体在保存之前会自动进行校验)

校验信息还将用于生成更精确的数据库列元数据：

*   必填字段将被标记为不可为空

*   唯一字段将创建唯一约束

*   具有最大长度的字段将具有相同的列长

校验也有一些限制：

*   我们不支持Angular，React和Bean Validation的所有校验选项，因为我们仅支持前端和后端API通用的选项
*   正则表达式模式在JavaScript和Java中的工作方式不同，因此，如果您配置了其中一个，则可能需要取调整另一个生成的模式。
*   JHipster会在不知道您的验证规则的情况下生成适用于通用实体的单元测试：生成的测试可能未必能通过校验规则。在这种情况下，您将需要更新单元测试中使用的样例数据，以使它们通过校验规则。

## Entity关系

实体关系仅适用于SQL数据库。这是一个相当复杂的话题，它具有自己单独的文档页面：[管理关系]({{ site.url }}/managing-relationships/)。

## 为您的业务逻辑生成单独的服务类

与单独使用Spring REST控制器相比，拥有一个单独的服务类可以拥有更复杂的逻辑。拥有服务层（基于或不基于接口）将使您能够使用DTO（请参阅下一节）。

这与使用[Spring服务子生成器]({{ site.url }}/creating-a-spring-service/)的逻辑相同，因此我们建议阅读其文档以获取更多信息。

## 数据传输对象（DTO）

默认情况下，JHipster实体不使用DTO，但如果您选择使用服务层，则可以将它们作为选项使用（请参见上一节）。这里是使用文档：[使用DTO]({{ site.url }}/using-dtos/)。

## 过滤

（可选）可以使用JPA过滤存储在SQL数据库中的实体。这里是文档：[筛选实体]({{ site.url }}/entities-filtering/)。

## 分页

请注意，如果使用[Cassandra]({{ site.url }}/using-cassandra/)创建应用程序，则分页不可用。它将在未来的版本中添加。

分页使用[GitHub API](https://developer.github.com/v3/#pagination)中[the Link header](http://tools.ietf.org/html/rfc5988)规范，。JHipster在后端（Spring MVC REST）和前端（Angular / React）都提供了该规范的定制实现。

生成实体时，JHipster提供3个分页选项：

*   没有分页（在这种情况下，后端将不会分页）
*   基于[Bootstrap分页组件](https://getbootstrap.com/docs/4.3/components/pagination/) {: target="_blank"} 的完整分页系统
*   基于[无限滚动指令](http://sroze.github.io/ngInfiniteScroll/) 的无限滚动系统

## 更新现有实体

实体配置保存在`.jhipster`目录中的特定`.json`文件中。因此，如果使用现有实体名称再次运行子生成器，则可以更新或重新生成实体。

当您为现有实体运行实体子生成器时，系统会询问您“Do you want to update the entity? This will replace the existing files for this entity, all your custom code will be overwritten”(您确定需要更新实体吗？这将替换该实体的现有文件，所有自定义代码将被覆盖)，并具有以下选项：

*   `Yes, re generate the entity` - 这将重新生成您的实体。提示：这可以通过在运行子生成器时传递`--regenerate`标志来强制执行
*   `Yes, add more fields and relationships` - 这将需要您回答一些问题，以添加更多字段和关系
*   `Yes, remove fields and relationships` - 这将需要您回答一些问题，以便从实体中删除现有字段和关系
*   `No, exit` - 这将存在子生成器而无需更改任何内容

您可能由于以下原因而要更新您的实体：

*   您想要向现有实体添加/删除字段和关系
*   您想将实体代码重置为原始状态
*   您已经更新了JHipster，并希望使用新模板生成您的实体
*   您已经修改了`.json`配置文件（此文件格式与生成器所提出的问题非常接近，容易修改，因此并不是很复杂），想使用修改后的新版本实体
*   您已经复制/粘贴了`.json`文件，并且想要一个与复制文件对应实体非常接近的新实体

提示：要立即重新生成所有实体，可以使用以下命令（不提供`--force`标识会在文件更改时询问覆盖选项）。

*   Linux & Mac: ``for f in `ls .jhipster`; do jhipster entity ${f%.*} --force ; done``
*   Windows: `for %f in (.jhipster/*) do jhipster entity %~nf --force`

## 教程

这是一个简短的教程，介绍如何创建具有一对多关系的两个实体（Author和Book）。

**重要提示** 如果需要要实时重新加载JavaScript/TypeScript代码，则需要运行`npm start`或`yarn start`。您可以转到[在开发中使用JHipster]页面以获取更多信息。

### 生成"Author"实体

因为我们希望在作者和书籍之间建立一对多的关系（一个作者可以写很多本书），所以我们需要首先创建作者。然后，在数据库级别，JHipster将能够在Book表上添加外键，从而链接到Author表。

`jhipster entity author`

接下来回答有关该实体字段的问题，author实体包括以下字段：

*   "name"字段， "String"类型
*   "birthDate"字段，"LocalDate"类型

然后回答有关实体关系的问题，作者包括：

*   与“book”实体之间的一对多关系（尚不存在， 因为book实体还未创建）

### 生成"Book"实体

`jhipster entity book`

接下来回答有关该实体字段的问题，book实体包括以下字段：

*   "title"字段, "String"类型
*   "description"字段, "String"类型
*   "publicationDate"字段, "LocalDate"类型
*   "price"字段, "BigDecimal"类型

然后回答有关实体关系的问题，book：

*   与”author“实体具有多对一关系
*   并且此关系使用"name"字段（来自Author实体）显示

### 检查生成的代码

使用`mvn test`运行生成的测试集，该测试集将测试Author实体和Book实体。

启动应用程序（例如，使用`mvn`），在前端登录，并在“Entity”菜单中选择"Author"和"Book"实体。

检查数据库表，查看是否正确插入了数据。

### 改进生成的代码

生成的文件包含所有基本的CRUD操作，如果您无需CRUD以外的操作，则无需修改。

如果要修改生成的代码或数据库架构，则应遵循我们的[开发指南]({{ site.url }}/development/)

如果您想要实现一些更复杂的业务行为，则可能需要使用[服务子生成器]({{ site.url }}/creating-a-service/)添加Spring`@Service`类。

### 完成了！

您生成的CRUD页面应如下所示：

![]({{ site.url }}/images/screenshot_5.png)
