---
layout: default
title: 配置文件
permalink: /profiles/
redirect_from:
  - /profiles.html
sitemap:
    priority: 0.7
    lastmod: 2014-11-26T00:00:00-00:00
---

# <i class="fa fa-group"></i> 配置文件

JHipster带有两个[Spring配置文件](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html)：

*   `dev` 用于开发：专注于简化开发和提高生产率
*   `prod` 用于生产：专注于性能和可扩展性

这些配置文件有两种不同的配置：

*   Maven/Gradle配置文件在构建时使用。例如`./mvnw -Pprod package`或`./gradlew -Pprod bootJar`将打包生产应用程序。
*   Spring配置文件在运行时工作。一些Spring bean的行为会有所不同，具体取决于配置文件。

Spring配置文件由Maven/Gradle设置，因此我们在两种方法之间具有一致性：您将同时在Maven/Gradle和Spring上有一个`prod`配置文件。

Spring配置文件用于配置JHipster应用程序属性，因此您应该对阅读我们的[通用程序属性文档]({{ site.url }}/common-application-properties/)感兴趣。

## 默认情况下，JHipster将使用`dev`配置文件

如果您在没有Maven/Gradle的情况下运行该应用程序，请启动"Application"类（您可以通过右键单击它来从IDE中直接运行它）。

如果您使用Maven运行该应用程序，请运行`./mvnw`使用我们的Maven包装器，或者运行`mvn`使用您自己安装的Maven。

如果您使用Gradle运行应用程序，请运行`./gradlew`以使用我们的Gradle包装器，或`gradle`以使用您自己安装的Gradle。

使用Angular 2+和Maven时，如果需要在为`dev`配置文件启用了webpack编译的情况下进行全新运行，则可以按以下方式传递`webapp`参数

  `./mvnw -Pdev,webapp`

**注意**如果前端发生了变化，Gradle会在`dev`配置文件中自动运行webpack编译（仅在启动时，对于实时加载，请使用`npm start`或`yarn start`）。

## 在生产中，JHipster必须使用`prod`配置文件运行

您可以使用Maven或Gradle直接在生产中运行JHipster：

*   使用Maven，运行 `./mvnw -Pprod` (或 `mvn -Pprod`)
*   使用Gradle，运行 `./gradlew -Pprod` (或 `gradle -Pprod`)

如果要将应用程序打包为可执行的WAR文件，则应为Maven或Gradle提供一个配置文件。例如：

*   使用Maven，运行 `./mvnw -Pprod package` (或 `mvn -Pprod package`)
*   使用Gradle，运行 `./gradlew -Pprod bootJar` (或 `gradle -Pprod bootJar`)

从WAR文件运行生产应用程序时，默认设置是使用与打包期间相同的配置文件。如果要覆盖此参数，则可以在VM参数中显式提供替代方法：

*   `java -jar jhipster-0.0.1-SNAPSHOT.jar --spring.profiles.active=...`

## Spring配置文件切换

JHipster附带了三个附加配置文件用于切换：

*   `api-docs` 启用swagger
*   `no-liquibase` 禁用liquibase
*   `tls` 启用TLS安全并使用HTTP/2协议（请参阅[TLS和HTTP/2文档]({{ site.url }}/tls/)）

这些可以与`dev`和`prod`配置文件一起使用。请注意，默认情况下，通过在`application.yml`中设置`application.yml`属性，可以在`prod`中禁用`api-docs`配置文件，在`dev`中启用它。

`api-docs`, `no-liquibase`, `tls`仅在运行时使用：

*   在您的IDE中，使用`spring.profiles.active=dev,no-liquibase`运行主应用程序类（请注意，您需要显式包括`dev`或`prod`配置文件）
*   对于打包后的应用程序：`./java -jar jhipster-0.0.1-SNAPSHOT.war --spring.profiles.active=prod,no-liquibase`

使用Maven，您还可以直接使用这些配置文件：

*   `./mvnw -Pprod,api-docs,no-liquibase`
*   `./mvnw -Pdev,no-liquibase`

使用Gradle，您还可以直接使用这些配置文件：

*   `./gradlew -Pprod -Papi-docs -Pno-liquibase`
*   `./gradlew -Pno-liquibase`
