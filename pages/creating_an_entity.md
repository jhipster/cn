---
layout: default
title: 创建实体
permalink: /creating-an-entity/
redirect_from:
  - /creating_an_entity.html
sitemap:
    priority: 0.7
    lastmod: 2018-09-04T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> Creating an entity

_**请查阅我们的 [video tutorial]({{ site.url }}/video-tutorial/) 关于创建一个新的 Jhipster 应用程序的视频教程!**_

**要点** 如果您希望您的 JavaScript/TypeScript 代码被 “实时加载”（live reload），您需要运行 `npm start` 或者 `yarn start`. 您可以访问[开发环境的使用]({{ site.url }}/development/)页面获取更多信息.

## 介绍

创建应用程序后，您将需要创建 _entities_。例如，您可能想要创建 _Author_ 和 _Book_ 实体。对于每个实体，您将需要：

*   一个数据库表
*   一个 Liquibase 更改集（change set）
*   一个 JPA 实体（Entity）
*   一个 Spring Data JPA 资源库（Repository）
*   一个 Spring MVC REST 控制器（Controller）, 它具有基本的 CRUD 操作
*   一个 Angular 路由器（router）, 一个组件（component）以及一个服务（service）
*   一个 HTML 视图（view）
*   集成测试, 确保一切按预期运行
*   性能测试，看看一切是否流畅运行

如果您有多个实体，您可能希望在它们之间建立关系。为此，您需要：

*   一个数据库外键（foreign key）
*   用于管理此关系的特定 JavaScript 和 HTML 代码

“实体”子生成器将创建所有需要的文件，并为每个实体提供CRUD前端（参见 [Angular 项目结构]({{ site.url }}/using-angular/)和 [React 项目结构]({{ site.url }}/using-react/)）。可以通过运行 `jhipster entity <entityName> --[options]` 来调用子生成器。可以通过键入 `jhipster entity --help` 参考可使用的选项。

以下是支持的选项.

*   `--table-name <table_name>` - 默认情况下，JHipster 将根据您的实体名称生成一个数据库表名，您可以通过此选项传递不同的表名。
*   `--angular-suffix <suffix>` - 如果您希望所有 Angular 路由都具有自定义的后缀，则可以使用此选项传递该路径。
*   `--client-root-folder <folder-name>` - 在客户端上对实体指定根文件夹名。默认情况下，monolith 应用没有此文件夹，而在 gateway 应用中此文件夹由微服务名来命名。
*   `--regenerate` - 这将重新生成已有实体，但却不会问任何问题。
*   `--skip-server` - 这将跳过服务器端，仅生成客户端代码。
*   `--skip-client` - 这将跳过客户端，仅生成服务器端代码。
*   `--db` - 在选择跳过服务器端生成时用来指定数据库，除次以外没有任何效果。

<div class="alert alert-warning"><i>警告: </i>

不要为您的实体选择过短的名称（请参阅此<a href="https://github.com/jhipster/generator-jhipster/issues/8446" target="_blank">问题</a>）。

</div>

## JHipster UML 和 JDL Studio

本页介绍如何通过 JHipster 使用命令行界面（command-line interface）来创建实体。您可能会更喜欢使用图形工具来创建多个实体。

在这种情况下，有两种选择：

*   [JHipster UML]({{ site.url }}/jhipster-uml/), 它允许您使用UML编辑器.
*   [JDL Studio](https://start.jhipster.tech/jdl-studio/), 我们的在线工具，使用我们的特定领域语言创建实体和关系 [JDL]({{ site.url }}/jdl/).

如果您使用的是 JDL Studio：

*   您可以使用 `import-jdl` 子生成器通过运行 `jhipster import-jdl your-jdl-file.jh` 从 JDL 文件生成实体。

    * 如果您不想重新生成实体，则在导入 JDL 时，可以使用 `--json-only` 标志跳过实体创建部分，并仅在 `.jhipster` 文件夹中生成 json 文件。

    ```
    jhipster import-jdl ./my-jdl-file.jdl --json-only
    ```

    * 默认情况下，`import-jdl` 仅重新生成已更改的实体，如果需要重新生成所有的实体，则传递 `--force` 标志。请注意，这将覆盖对实体文件的所有本地更改。

    ```
    jhipster import-jdl ./my-jdl-file.jdl --force
    ```

*   如果你想使用 JHipster UML 而不是 `import-jdl` 子生成器，你需要通过运行 `npm install -g jhipster-uml` 来安装它，然后运行 `jhipster-uml yourFileName.jh`。

## 实体字段

对于每个实体，您可以根据需要添加任意数量的字段。您需要输入字段名称及其类型，JHipster 将为您生成所有必需的代码和配置，从 Angular HTML 的视图到 Liquibase 的更改日志。

这些字段不能包含您正在使用的技术中的保留关键字。例如，如果您使用 MySQL：

*   您不能使用 Java 的保留关键字（因为您的代码将无法编译）
*   您不能使用 MySQL 的保留关键字（因为您的数据库架构（database schema）更新将会失败）

## 字段类型

JHipster支持多种字段类型。由于这种支持取决于您的数据库后端，因此我们选择使用 Java 类型来描述它们：比如 Java 的`String` 将以不同的方式存储在 Oracle 或 Cassandra 中，而 JHipster 将为您生成正确的数据库访问代码，这正是 JHipster 的优势之一。

*   `String`: 一个 Java String 对象。它的默认大小取决于底层后端（如果使用JPA，默认情况下为255），但您可以添加验证规则来更改它（例如，设置 `max` 值为1024）。
*   `Integer`: 一个 Java Integer 对象。
*   `Long`: 一个 Java Long 对象。
*   `Float`: 一个 Java Float 对象。
*   `Double`: 一个 Java Double 对象。
*   `BigDecimal`: 一个 [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html) 对象，使用在需要精确的数学计算时（通常用于金融业务）。
*   `LocalDate`: 一个 [java.time.LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html) 对象，用于在 Java 中正确管理日期。
*   `Instant`: 一个 [java.time.Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html) 对象, 用于表示时间戳，即时间线上的一个瞬时点。
*   `ZonedDateTime`: 一个 [java.time.ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html) 对象, 用于表示给定时区中的本地日期时间（典型的用途比如日历上的约会时间）。请注意，REST 和持久层都不支持时区，因此您最有可能使用 `Instant` 代替。
*   `Boolean`: 一个 Java Boolean 对象。
*   `Enumeration`: 一个 Java Enumeration 对象。选择此类型后，子生成器将询问您在枚举中想要的值，并创建一个特定的 `enum` 类来存储它们。
*   `Blob`: 一个 Blob object 对象，用于存储一些二进制数据。选择此类型后，子生成器将询问您是想要存储通用二进制数据，图像对象或 CLOB（长文本）。图像将会在 Angular 端专门处理，这样就可以显示给最终用户。

## 验证

可以为每个字段设置验证。字段类型不同，提供验证选项也会不同。

验证将会自动生成在：

*   HTML 视图，使用 Angular 或 React 验证机制
*   Java 域对象（domain object），使用 [Bean Validation](http://beanvalidation.org/)

然后，Bean 验证将在以下情况下自动验证域对象：

*   Spring MVC REST 控制器（使用 `@Valid` 注释）
*   Hibernate/JPA（实体在保存之前自动验证）

验证信息还将用于生成更精确的数据库列的元数据（metadata）：

*   必填字段将标记为不可为空（non-nullable）
*   唯一字段将创建唯一约束（unique constraint）
*   设有最大长度的字段将具有相同的列长度

验证有一些限制：

*   我们不支持 Angular，React 和 Bean Validation 的所有验证选项，因为我们只支持客户端和服务器 API 共有的那些验证选项。
*   正则表达式在 JavaScript 和 Java 中的工作方式不同，因此如果配置，则可能需要调整其中一个生成的模式。
*   JHipster 在不知道验证规则的情况下生成实体的通用单元测试：生成的测试可能无法通过验证规则。在这种情况下，您需要更新单元测试中使用的样本值，以便它们通过验证规则。

## 实体关系

实体关系仅适用于 SQL 数据库。这是一个相当复杂的主题，它有自己的文档页面：[配置实体类关系]({{ site.url }}/managing-relationships/).

## 为您的业务逻辑生成单独的服务类

拥有一个单独的服务类允许拥有更复杂的逻辑，只需直接使用 Spring REST Controller。拥有服务层（有或没有接口）将允许您使用 DTO（请参阅下一节）。

这与使用 [Spring service 子生成器]({{ site.url }}/creating-a-spring-service/)的逻辑相同，因此我们建议您阅读其文档以获取更多信息。

## 数据传输对象（DTO）

默认情况下，JHipster实体不使用DTO，但如果您选择拥有服务层，则它们可作为选项提供（请参阅上一节）。以下是文档：[创建 DTO]({{ site.url }}/using-dtos/)。

## 过滤

（可选）可以使用 JPA 过滤存储在 SQL 数据库中的实体。以下是文档：[过滤实体类]({{ site.url }}/entities-filtering/)。

## 分页

请注意，如果您使用 [Cassandra]({{ site.url }}/using-cassandra/) 创建了应用程序，则无法进行分页。当然，这将在未来的版本中添加。

分页使用 [the Link header](http://tools.ietf.org/html/rfc5988)，如 [GitHub API](https://developer.github.com/v3/#pagination)。JHipster 在服务器端（Spring MVC REST）和客户端（Angular / React）方面提供了该规范的自定义实现。

生成实体时，JHipster 提供4个分页选项：

*   没有分页（在这种情况下，后端不会被分页）
*   一个基于 [the Bootstrap pager](http://getbootstrap.com/components/#pagination-pager) 的简单的分页
*   一个基于 [the Bootstrap pagination component](http://getbootstrap.com/components/#pagination) 的完整分页系统
*   一个基于 [the infinite scroll directive](http://sroze.github.io/ngInfiniteScroll/) 的无限滚动系统

## 更新现有实体

实体配置保存在 `.jhipster` 目录中的特定 `.json` 文件中。因此，如果使用现有实体名称再次运行子生成器，则可以更新或重新生成现有实体。

当您为现有实体运行实体子生成器时，系统会询问您“是否要更新实体？” 这将替换此实体的现有文件，将使用以下选项覆盖所有自定义代码：

*   `Yes, re generate the entity` - 这将重新生成您的实体。提示：此选项可通过在运行子生成器时传递 `--reraterate` 标志来强制执行
*   `Yes, add more fields and relationships` - 此选项将询问您希望添加的字段和关系
*   `Yes, remove fields and relationships` - 此选项将询问您希望从实体中删除的现有字段和关系
*   `No, exit` - 这将退出子生成器而不会改变任何东西

您可能会因为以下原因希望更新您的实体：

*   您想要添加或者删除现有实体的字段和关系
*   您想要将实体代码重置为其原始状态
*   您已更新 JHipster，并希望使用新模板生成您的实体
*   您已修改 `.json` 配置文件（它的格式非常接近实体生成器提出的问题，所以直接修改它不是很复杂），因此您希望应用实体的新版本
*   您已复制或者粘贴 `.json` 文件，并希望生成一个与被复制的实体非常接近的新实体

提示：要一次性重新生成所有实体，可以使用以下命令（删除 `--force` 以在文件发生更改时显示询问问题）。

*   Linux & Mac: ``for f in `ls .jhipster`; do jhipster entity ${f%.*} --force ; done``
*   Windows: `for %f in (.jhipster/*) do jhipster entity %~nf --force`

## 教程

这是小教程将创建两个具有一对多关系的实体（a Author and a Book）。

**要点** 如果您希望您的 JavaScript/TypeScript 代码被 “实时加载”（live reload），您需要运行 `npm start` 或者 `yarn start`. 您可以访问[开发环境的使用]({{ site.url }}/development/)页面获取更多信息.

### 创建 "Author" 实体

由于我们希望在作者实体和书籍实体之间建立一对多的关系（一位作者可以写很多书），我们需要先创建作者实体。在数据库中，JHipster 将在 Book 表上添加外键，链接到 Author 表。

`jhipster entity author`

接着请回答有关该实体字段的问题，作者实体有：

*   一个 “String” 类型的 “name” 字段
*   一个 “LocalDate” 类型的 “birthDate” 字段

然后回答有关实体关系的问题，作者实体有：

*   与 “book” 实体的一对多关系（书籍实体尚不存在）

### 创建 "Book" 实体

`jhipster entity book`

接着请回答有关该实体字段的问题，书籍实体有：

*   一个 “String” 类型的 “title” 字段
*   一个 “String” 类型的 “description” 字段
*   一个 “LocalDate” 类型的 “publicationDate” 字段
*   一个 “BigDecimal” 类型的 “price” 字段

然后回答有关实体关系的问题，书籍实体有：

*   与 “author” 实体有多对一的关系
*   此关系使用来自作者实体 “name” 字段进行显示

### 检查生成的代码

使用 `mvn test` 运行生成的测试套件，它将测试作者实体和书籍实体。

启动应用程序（例如使用 `mvn` 命令），登录并在 “实体” 菜单中选择 “Author” 和 “Book” 实体。

检查数据库表，查看数据是否被正确插入。

### 改进生成的代码

生成的文件包含所有基本的CRUD操作，如果您的需求很简单，则无需进行修改。

如果要修改生成的代码或数据库模式，则应遵循我们的[开发指南]({{ site.url }}/development/)

如果您想要一些更复杂的业务行为，您可能需要使用 [service 子生成器]({{ site.url }}/creating-a-service/) 来添加Spring `@Service` 类。

### 您完成教程了!

您生成的 CRUD 页面应如下所示：

![]({{ site.url }}/images/screenshot_5.png)
