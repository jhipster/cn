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

_**请查看有关创建新JHipster应用程序的[视频教程]({{ site.url }}/video-tutorial/)！**_

## 概要

1.  [常规配置](#general-configuration)
2.  [运行Java服务](#running-java-server)
3.  [使用Angular/React](#working-with-angular)
4.  [使用数据库](#using-a-database)
5.  [国际化](#internationalization)

## <a name="general-configuration"></a> 常规配置

### IDE配置

如果尚未配置IDE，请转到[配置IDE]({{ site.url }}/configuring-ide/)页面。

### 应用配置

默认情况下，JHipster使用"development"配置文件，因此您无需进行任何配置。

如果您想要更多有关可用配置文件的信息，请转到标题为"[配置文件]({{ site.url }}/profiles/)"的部分。

如果要配置某些特定的JHipster属性，请查看[常规应用属性]({{ site.url }}/common-application-properties/)页面。

## <a name="running-java-server"></a> 运行Java服务

### 作为"main"Java类

在您的IDE中，右键单击Java包层次结构根目录下的"Application"类，然后直接运行它。您还可以轻松调试它。

该应用程序将在[http://localhost:8080](http://localhost:8080)上可用。

默认情况下，此应用程序将启用"热重载"，因此，如果编译一个类，Spring应用程序上下文会自动刷新本身，而无需重新启动服务器。

### 作为Maven项目

您可以使用Maven启动Java服务。JHipster提供了一个Maven包装器，因此您无需安装Maven，并且可以保证所有项目用户都具有相同的Maven版本：

`./mvnw` (在Mac OS X/Linux) of `mvnw` (在Windows)

(这将运行我们的默认Maven任务, `spring-boot:run`)

该应用程序将在[http://localhost:8080](http://localhost:8080)上可用。

另外，如果您已经安装了Maven，则可以使用Maven启动Java服务：

`mvn`

如果您想了解有关使用Maven的更多信息，请访问[http://maven.apache.org](http://maven.apache.org)。

### （可选）作为Gradle项目

如果选择了Gradle选项，则JHipster将提供Gradle包装器，因此您无需安装Gradle，并且可以保证所有项目用户都具有相同的Gradle版本：

`./gradlew` (在Mac OS X/Linux) of `gradlew` (在Windows)

(这将运行我们的默认Gradle任务, `bootRun`)

另外，如果已经安装了Gradle，则可以使用Gradle启动Java服务：

`gradle`

该应用程序将在[http://localhost:8080](http://localhost:8080)上可用。

如果您想了解有关使用Gradle的更多信息，请访问[https://gradle.org](https://gradle.org)

## <a name="working-with-angular"></a> 使用Angular/React

### 运行Webpack

_若要查看TypeScript代码更改，并实时重新加载前端代码，则需要执行此步骤。_

运行Webpack是`package.json`文件中的默认任务，因此您只需要运行：

`npm start`

(或者，如果您使用Yarn， `yarn start`).

这提供了非常令人印象深刻的功能：

*   修改HTML/CSS/TypeScript文件后，浏览器将自动刷新
*   当您在几种不同的浏览器或设备上测试应用程序时，所有点击/滚动/输入应在所有屏幕上自动同步

这将启动：

- 一个Webpack任务，它将自动将TypeScript代码编译为JavaScript
- 将在[http://localhost:9060/](http://localhost:9060/)上运行的Webpack的 "hot module reload"服务（并具有[http://127.0.0.1:8080/api](http://127.0.0.1:8080/api) 的代理以访问Java后端）
- 一个BrowserSync任务，它将在[http://localhost:9000/](http://localhost:9000/)上运行，该任务具有 [http://localhost:9060/](http://localhost:9060/)（Webpack "hot module reload"服务）的代理，并且将同步用户的点击/滚动/输入
- BrowserSync UI，将在[http://localhost:3001/](http://localhost:3001/)上提供

### 运行NPM

直接项目依赖项配置在`package.json`中，但是传递性依赖项定义在`package-lock.json`文件中，该文件在运行`npm install`时生成。

建议将`package-lock.json`[https://docs.npmjs.com/files/package-lock.json]归入到源代码管理中，以便项目的所有团队成员都具有相同版本的所有依赖项。再次运行`npm install`将使用最新版本的传递依赖项重新生成`package-lock.json`。

### 其他NPM/Yarn任务

无论您使用NPM还是Yarn，这些任务都是相同的，我们以`npm`命令为例，但是您可以将其替换为`yarn`。

- `npm run lint`: 检查TypeScript代码中的代码样式问题
- `npm run lint:fix`: 尝试自动更正TypeScript lint问题
- `npm run tsc`: 编译TypeScript代码
- `npm run test`: 用Jest运行单元测试
- `npm run test:watch`: 保持Jest单元测试的运行状态，以便在更改代码时获得实时反馈
- `npm run e2e`: 使用Protractor运行"端到端"测试（仅在生成项目时选择了Protractor选项时有效）

## <a name="using-a-database"></a> 使用数据库

### 运行数据库

如果您使用非嵌入式数据库，例如MySQL，MariaDB，PostgreSQL，MSSQL，MongoDB，Cassandra或Couchbase，则需要安装和配置该数据库。

使用JHipster的最简单和推荐的方法是使用Docker Compose。在此处[遵循我们的Docker Compose指南]({{ site.url }}/docker-compose/)。

如果您希望手动安装和配置数据库，请不要忘记在`src/main/resources/config/application-*.yml`文件（例如，数据库URL，登录名和密码）中相应地配置Spring Boot属性。

### 在开发中使用H2数据库

如果选择H2数据库，则将在应用程序内部运行一个内存数据库，默认情况下，您可以在[http://localhost:8080/h2-console](http://localhost:8080/h2-console)访问其控制台。

要连接到数据库，请选择预配置的选项：

*   Driver Class: org.h2.Driver
*   JDBC URL: jdbc:h2:mem:jhipster
*   User name: <blank>
*   Password: <blank>

![]({{ site.url }}/images/h2.png)

### 在开发中使用MySQL，MariaDB或PostgreSQL

该选项比使用H2更为复杂，但是可以为您带来一些重要的好处：

*   您的数据将在应用程序重新启动时保存
*   您的应用程序启动速度更快
*   您可以使用出色的`./mvnw liquibase:diff` goal（请参见下文）

**注意**：对于MySQL，您可能需要使用以下选项启动数据库：

*   `--lower_case_table_names=1` : 请参阅[文档](https://dev.mysql.com/doc/refman/5.7/en/identifier-case-sensitivity.html)
*   `--skip-ssl` : 请参阅[文档](https://dev.mysql.com/doc/refman/5.7/en/encrypted-connection-options.html#option_general_ssl)
*   `--character_set_server=utf8` : 请参阅[文档](https://dev.mysql.com/doc/refman/5.7/en/server-options.html#option_mysqld_character-set-server)
*   `--explicit_defaults_for_timestamp` : 请参阅[文档](https://dev.mysql.com/doc/refman/5.6/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp)

该命令是：

    mysqld --lower_case_table_names=1 --skip-ssl --character_set_server=utf8 --explicit_defaults_for_timestamp

## 数据库更新

如果添加或修改JPA实体，则需要更新数据库结构。

JHipster使用[Liquibase](http://www.liquibase.org)来管理数据库更新，并将其配置存储在`/src/main/resources/config/liquibase/`目录中。使用Liquibase的方法有3种：使用实体子生成器，使用liquibase：diff Maven goal或手动更新配置文件。

### 使用实体子生成器进行数据库更新

如果使用[实体子生成器]({{ site.url }}/creating-an-entity/)，则开发流程如下：

*   运行[实体子生成器]({{ site.url }}/creating-an-entity/)
*   在您的`src/main/resources/config/liquibase/changelog`目录中创建了一个新的"change log"，并已自动将其添加到`src/main/resources/config/liquibase/master.xml`文件中
*   查看此更改日志，它将在您下次运行应用程序时应用

### 使用Maven liquibase：diff goal进行数据库更新

如果您选择在开发中使用MySQL，MariaDB或PostgreSQL，则可以使用`./mvnw liquibase:diff` goal来自动生成变更日志。

如果您正在使用基于磁盘的持久性运行H2，则该工作流程尚不能完美运行，但是您可以开始尝试使用它（并向我们发送反馈！）。

[Liquibase Hibernate](https://github.com/liquibase/liquibase-hibernate)是在pom.xml中配置的Maven插件，它独立于Spring application.yml文件，因此，如果您更改了默认设置（例如，更改了数据库密码），则需要同步修改这两个文件。

这是开发工作流程：

*   修改您的JPA实体（添加字段，关系等）
*   编译您的应用程序（这适用于已编译的Java代码，因此请不要忘记编译！）
*   运行`./mvnw liquibase:diff` (或者`./mvnw compile liquibase:diff`预编译)
*   在您的`src/main/resources/config/liquibase/changelog`目录中创建一个新的"change log"
*   查看此更改日志并将其添加到您的 `src/main/resources/config/liquibase/master.xml`文件中，以便在下次运行应用程序时应用它

如果使用Gradle而不是Maven，则可以通过运行`./gradlew liquibaseDiffChangelog -PrunList=diffLog`使用相同的工作流，并根据需要在`build.gradle`中更改liquibase配置中的数据库配置。

### 通过手动编辑更改日志来更新数据库

如果您希望（或需要）手动进行数据库更新，请参考以下开发流程：

*   修改您的JPA实体（添加字段，关系等）
*   在`src/main/resources/config/liquibase/changelog`目录中创建一个新的"change log"。该目录中的文件以其创建日期（yyyyMMddHHmmss格式）为前缀，然后有一个标题来说明它们的作用。例如，`20141006152300_added_price_to_product.xml`是一个不错的名字。
*   将此"change log"文件添加到`src/main/resources/config/liquibase/master.xml`文件中，以便在下次运行应用程序时应用

如果您想了解有关使用Liquibase的更多信息，请访问[http://www.liquibase.org](http://www.liquibase.org)。

## <a name="internationalization"></a> 国际化

国际化（或i18n）是JHipster中的一等公民，因为我们认为应该在项目开始时就进行设置（而不是事后考虑）。

使用非常简单：

- 使用Angular，得益于[NG2 translate](https://github.com/ocombe/ng2-translate)和特定的JHipster组件，该组件使用简单的JSON文件进行翻译
- 使用React，得益于特定的JHipster组件，该组件的工作方式与Angular组件相同，并且使用相同的文件

例如，要将翻译添加到"first name"字段，只需添加一个带有关键字的"translate"属性即可：`<label jhiTranslate="settings.form.firstname">First Name</label>`

该键引用一个JSON文档，该文档将返回已转换的字符串。然后，Angular/React将用翻译后的版本替换"First Name"字符串。

如果您想了解有关使用语言的更多信息，请阅读我们的[安装新语言文档]({{ site.url }}/installing-new-languages/)。
