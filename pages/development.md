---
layout: default
title: 在开发中使用JHipster
permalink: /development/
redirect_from:
  - /development.html
sitemap:
    priority: 0.7
    lastmod: 2016-12-01T00:00:00-00:00
---

# <i class="fa fa-code"></i> 在开发中使用JHipster

_**请查看我们的 [视频教程]({{ site.url }}/video-tutorial/) 创建新的Jhipster应用程序！**_

## 概要

1.  [通用配置](#general-configuration)
2.  [运行Java服务器](#running-java-server)
3.  [使用Angular/React](#working-with-angular)
4.  [使用数据库](#using-a-database)
5.  [国际化](#internationalization)

## <a name="general-configuration"></a> 通用配置

### IDE配置

如果您还没有配置您的IDE，请转到[配置您的IDE]({{ site.url }}/configuring-ide/) page.

### 应用程序配置

默认情况下，JHipster使用“开发”概要文件，因此您不必配置任何内容。

如果您需要有关可用配置文件的更多信息，请转到标题为"[Profiles]({{ site.url }}/profiles/)".

如果要配置某些特定的JHipster属性，请查看 [常用应用程序属性]({{ site.url }}/common-application-properties/) 。

## <a name="running-java-server"></a> 运行Java服务器

### As a "main" Java class

从IDE中，右键单击Java包层次结构的根上的“应用程序”类，并直接运行它。您还应该能够轻松地调试它。

应用程序将运行在 [http://localhost:8080](http://localhost:8080).

默认情况下，这个应用程序将启用“热加载”，因此如果编译一个类，那么Spring应用程序上下文应该自动刷新自己，而不需要重新启动服务器。

### 作为Maven项目

您可以使用Maven启动Java服务器。JHipster提供了一个Maven包装器，因此您不需要安装Maven，并且您可以保证所有项目用户都具有相同的Maven版本：

`./mvnw` (on Mac OS X/Linux) of `mvnw` (on Windows)

(这将运行我们的默认maven任务, `spring-boot:run`)

该应用程序将运行在[http://localhost:8080](http://localhost:8080).

或者，如果您安装了Maven，则可以用Maven启动Java服务器：

`mvn`

如果您想了解更多关于使用maven的信息，请访问 [http://maven.apache.org](http://maven.apache.org)

### （可选）作为Gradle项目

如果您选择了Gradle选项，JHipster提供了一个Gradle包装器，因此您不需要安装Gradle，并且您可以保证所有项目用户都具有相同的Gradle版本：

`./gradlew` (on Mac OS X/Linux) of `gradlew` (on Windows)

(这将运行默认Gradle task, `bootRun`)

或者，如果您安装了Gradle，您可以使用Gradle启动Java服务器：

`gradle`

该应用程序将运行在 [http://localhost:8080](http://localhost:8080).

如果您想了解更多关于使用Gradle的信息，请访问 [https://gradle.org](https://gradle.org)

## <a name="working-with-angular"></a> 使用 Angular/React

### 运行 Webpack

_此步骤是必需的，以查看类型脚本代码中的更改并实时重新加载客户端代码。_

运行webpack是`package.json`文件中的默认任务，因此只需运行：

`npm start`

(或者，如果你使用Yarn, `yarn start`).

这提供了非常令人印象深刻的功能：

*   一旦你修改了一个 HTML/CSS/TypeScript文件，你的浏览器就会自动刷新
*   当您在几个不同的浏览器或设备上测试应用程序时，您的所有点击/滚动/输入都应在所有屏幕上自动同步。

这将启动：

- 一个Webpack任务，它将自动将typescript代码编译为javascript
- 一个Webpack "热加载模块" 服务器，它将运行在 [http://localhost:9060/](http://localhost:9060/) (并且具有代理 [http://127.0.0.1:8080/api](http://127.0.0.1:8080/api) 来访问java后台)
- BrowserSync任务将运行在 [http://localhost:9000/](http://localhost:9000/), 并且有一个代理 [http://localhost:9060/](http://localhost:9060/) (Webpack "热模块加载" 服务器), 它将同步用户的clicks/scrolls/inputs
- BrowserSync UI, 它将运行在 [http://localhost:3001/](http://localhost:3001/)

### 运行 NPM

直接项目依赖项配置为 `package.json`,，但可传递依赖项定义为`package-lock.json`文件, 该文件在运行 `npm install` 时生成.

建议将 `package-lock.json`[https://docs.npmjs.com/files/package-lock.json] 文件添加到源代码版本管理服务中, 以便项目的所有团队成员都具有相同版本的所有依赖项。 再次运行 `npm install` 将使用最新版本的可传递依赖项重新生成 `package-lock.json`。

### 其他 NPM/Yarn 任务

无论您使用 NPM 或 Yarn这些任务都是相同的，我们使用`npm`命令作为示例， 但您可以用`yarn`替换它。

- `npm run lint`: 检查typescript代码中的代码样式问题
- `npm run lint:fix`: 尝试自动更正typescript lint问题
- `npm run tsc`: 编译TypeScript代码
- `npm run test`: 用jest运行单元测试
- `npm run test:watch`: 保持Jest单元测试运行，以便在代码更改时获得实时反馈
- `npm run e2e`: 使用Protractor运行 "end to end" 测试(仅在生成项目时选择了量角器选项时有效)

## <a name="using-a-database"></a> 使用数据库

### 运行数据库

如果使用非嵌入式数据库，如 MySQL, MariaDB, PostgreSQL, MSSQL, MongoDB, Cassandra 或 Couchbase, 则需要安装和配置该数据库。

JHipster最简单和推荐的方法是使用Docker Compose。[Follow our Docker Compose guide here.]({{ site.url }}/docker-compose/)

如果您更喜欢手动安装和配置数据库，请不要忘记在`src/main/resources/config/application-*.yml`文件中相应地配置您的Spring引导属性（例如数据库URL、登录名和密码）。

### 在开发中使用H2数据库

如果选择H2数据库，则应用程序内部将运行内存中的数据库，默认情况下，您可以在 [http://localhost:8080/h2-console](http://localhost:8080/h2-console)访问其控制台.

要连接到数据库，请选择预先配置的选项：

*   Driver Class: org.h2.Driver
*   JDBC URL: jdbc:h2:mem:jhipster
*   User name: <blank>
*   Password: <blank>

![]({{ site.url }}/images/h2.png)

### 在开发中使用MySQL, MariaDB or PostgreSQL

这个选项比使用H2要复杂一些，但是您有一些重要的好处：

*   您的数据在应用程序重新启动时保留
*   您的应用程序启动速度快一点
*   您可以使用`./mvnw liquibase:diff` 目标（见下文）

**注意**: 对于MySQL, 您可能需要使用以下选项启动数据库：

*   `--lower_case_table_names=1` : see the [documentation](https://dev.mysql.com/doc/refman/5.7/en/identifier-case-sensitivity.html)
*   `--skip-ssl` : see the [documentation](https://dev.mysql.com/doc/refman/5.7/en/encrypted-connection-options.html#option_general_ssl)
*   `--character_set_server=utf8` : see the [documentation](https://dev.mysql.com/doc/refman/5.7/en/server-options.html#option_mysqld_character-set-server)
*   `--explicit_defaults_for_timestamp` : see the [documentation](https://dev.mysql.com/doc/refman/5.6/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp)

命令是：

    mysqld --lower_case_table_names=1 --skip-ssl --character_set_server=utf8 --explicit_defaults_for_timestamp

## Database更新

如果添加或修改JPA实体，则需要更新数据库模式。

JHipster 使用 [Liquibase](http://www.liquibase.org)来管理数据库更新, 并将配置存储在 `/src/main/resources/config/liquibase/` 目录.使用liquibase有三种方法：使用实体子生成器、使用liquibase:diff maven目标或手动更新配置文件。

### 使用实体子生成器更新数据库

如果您使用 [entity sub-generator]({{ site.url }}/creating-an-entity/),以下是开发工作流：

*   运行 [entity sub-generator]({{ site.url }}/creating-an-entity/)
*   在 `src/main/resources/config/liquibase/changelog` 目录中创建了一个新的“更改日志”，, 并已自动添加到 `src/main/resources/config/liquibase/master.xml` 文件中。
*   查看此更改日志，它将在下次运行应用程序时应用。

### 使用maven liquibase更新数据库:diff goal

如果您在开发中选择使用MySQL, MariaDB or PostgreSQL, 可以使用`./mvnw liquibase:diff`目标自动生成变更日志。

如果您使用基于磁盘的持久性运行H2，则此工作流尚未完全工作，但您可以开始尝试使用它（并向我们发送反馈！）.

[Liquibase Hibernate](https://github.com/liquibase/liquibase-hibernate) 是在pom.xml中配置的maven插件，与spring application.yml文件无关，因此如果更改了默认设置（例如更改了数据库密码），则需要修改这两个文件。

以下是开发工作流：

*   修改JPA实体（添加字段、关系等）
*   编译你的应用程序（这是在编译的Java代码上工作的，所以别忘了编译！）
*   运行 `./mvnw liquibase:diff` (或 `./mvnw compile liquibase:diff` 来编译)
*   在`src/main/resources/config/liquibase/changelog` 目录中创建了一个新的“更改日志”
*   查看此更改日志并将其添加到 `src/main/resources/config/liquibase/master.xml` 文件中，以便下次运行应用程序时应用它

如果使用Gradle而不是Maven，则可以通过运行 `./gradlew liquibaseDiffChangelog -PrunList=diffLog`, 来使用相同的工作流，如果需要，还可以在liquibase配置的'build.gradle'中更改数据库配置。

### 通过手动编辑更改日志来更新数据库

如果您喜欢（或需要）手动更新数据库，以下是开发工作流：

*   修改JPA实体（添加字段、关系等）
*   在`src/main/resources/config/liquibase/changelog` 目录中创建一个新的“更改日志”。该目录中的文件以其创建日期(格式为 yyyyMMddHHmmss), 然后具有一个描述它们所做操作的标题。 例如, `20141006152300_added_price_to_product.xml`是一个不错的名字.
*   将此“更改日志”文件添加到“src/main/resources/config/liquibase/master.xml”文件中，以便下次运行应用程序时应用此文件。

如果您想了解有关使用liquibase的更多信息，请访问 [http://www.liquibase.org](http://www.liquibase.org).

## <a name="internationalization"></a> 国际化

国际化（或I18N）是Jhipster的一流公民，我们认为它应该在项目开始时建立（而不是事后诸葛亮）。

使用非常简单：

- 使用Angular, 多亏了[NG2 translate](https://github.com/ocombe/ng2-translate) 和一个特定的JHipster组件，它使用简单的json文件进行翻译
- 使用React, 由于特定的JHipster组件，其工作方式与角度组件相同，并且使用相同的文件

例如，要将翻译添加到“first name”字段中，只需添加一个带有键的“translate”属性：`<label jhiTranslate="settings.form.firstname">First Name</label>`

这个键引用了一个JSON文档，它将返回翻译后的字符串。然后，Angular/React将用翻译版本替换“first name”字符串。

如果您想了解更多有关使用语言的信息，请阅读我们的[安装新语言文档]({{ site.url }}/installing-new-languages/).
