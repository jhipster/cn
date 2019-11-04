---
layout: default
title: 运行测试
permalink: /running-tests/
redirect_from:
  - /running_tests.html
sitemap:
    priority: 0.7
    lastmod: 2019-04-19T00:00:00-00:00
---

# <i class="fa fa-shield"></i> 运行测试

## 介绍

JHipster附带了一组全面的测试，并且每个生成的应用程序都具有：

*   使用[JUnit 5](https://junit.org/junit5/){:target="_blank"}进行单元测试。
*   使用Spring Test Context框架进行集成测试。
*   用[Jest](https://facebook.github.io/jest/){:target="_blank"}进行UI测试。
*   使用[ArchUnit](https://www.archunit.org/){:target="_blank"}进行架构测试。

可选地，JHipster还可以生成：

*   用[Gatling](http://gatling.io/){:target="_blank"}进行性能测试。
*   行为驱动的[Cucumber](https://cucumber.io/){:target="_blank"}测试。
*   用[Protractor](https://angular.github.io/protractor/#/){:target="_blank"}进行 Angular/React/Vue集成测试

生成这些测试有两个目标：

*   帮助每个JHipster用户遵循最佳实践，因为我们认为测试是每个应用程序中非常有用的一部分
*   验证所生成的内容正确无误。因此，即使您根本不打算使用这些测试，在生成应用程序后仅进行`./mvnw clean verify`和`npm test`也是了解一切正常的一种好方法。如果您认为测试浪费时间，那么您可以自由地忽略那些测试！

所有这些测试都将在标准`src/test`文件夹中生成。

## 集成测试

集成测试是通过Spring Test Context框架完成的，位于`src/test/java`文件夹中。JHipster将启动特定的Spring测试上下文，该上下文将在所有测试中重复使用，如下所示：

*   您的Spring bean应该是无状态的并且是线程安全的，因此可以在不同的测试套件中重复使用。
*   与为每个测试启动一个新的Spring上下文相比，为所有测试仅启动一个Spring上下文快得多。

这个Spring测试上下文将使用特定的测试数据库来执行其测试：

*   如果使用SQL数据库，则JHipster将启动内存中的H2实例，以便将临时数据库用于其集成测试。Liquibase将自动运行，并将生成数据库模式。
*   如果使用Cassandra，JHipster将使用 [Testcontainers](https://www.testcontainers.org){:target="_blank"}与Docker一起启动Cassandra的容器化版本。
*   如果使用MongoDB，JHipster将使用 [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo){:target="_blank"}启动内存中的MongoDB实例。
*   如果使用Elasticsearch，则JHipster将使用Spring Data Elasticsearch启动内存中的Elasticsearch实例。
*   如果您使用Couchbase，则JHipster将使用 [Couchbase TestContainers](https://github.com/differentway/testcontainers-java-module-couchbase){:target="_blank"}与Docker启动Couchbase的容器化版本。

这些测试可以直接在您的IDE中运行，方法是右键单击每个测试类，或者通过运行`./mvnw clean verify`（如果使用Gradle，则可以运行`./gradlew test integrationTest`）。

**限制:** 如果生成的实体启用了校验，则JHipster可能不能根据校验规则生成正确的值。这些规则可能非常复杂，例如，如果使用了Regex模式，就不可能实现。在这种情况下，测试将无法通过校验，并且测试中使用的默认值将需要手动更改，以便它们可以通过校验规则。

## UI测试

JHipster的UI测试有两种形式：Jest的单元测试和Protractor的集成测试。默认情况下仅提供Jest，但是如果您希望对应用程序进行良好的测试，我们建议您同时使用这两种工具。

### Jest

UI单元测试位于`src/test/javascript/spec`文件夹中。他们使用[Jest](https://facebook.github.io/jest/){:target="_blank"}。

这些测试将模拟对应用程序REST端点的访问，因此您可以测试UI层而不必启动Java后端。

*   可以使用`npm test`运行这些测试。
*   提示: 如果您只关注单个测试，请将模块描述从`describe('...', function() {`更改为`fdescribe('...', function() {`，Jest将仅运行此测试。

### Protractor

UI集成测试是使用[Protractor](https://angular.github.io/protractor/#/){:target="_blank"}完成的，位于`src/test/javascript/e2e`文件夹中。

这些测试将启动Web浏览器并像真实用户一样使用该应用程序，因此您需要运行一个具有数据库设置的真实应用程序。

可以使用`npm run e2e`运行这些测试。

## Architecture tests

使用[ArchUnit](https://www.archunit.org/){:target="_blank"}可以进行强制某些约束和最佳实践的架构测试。您可以按照[官方文档](https://www.archunit.org/userguide/html/000_Index.html){:target="_blank"}在构建时轻松编写自己的规则来检查架构的自定义约束。

## 性能测试

性能测试是使用[Gatling](http://gatling.io/){:target="_blank"}完成的，位于`src/test/gatling`文件夹中。它们是为每个实体生成的，并允许使用大量并发的用户请求对其进行测试。

要运行Gatling测试，您必须首先安装Gatling：请转到[Gatling下载页面](https://gatling.io/open-source/){:target="_blank"}并按照其中的说明进行操作。请注意，我们不允许从Maven或Gradle运行Gatling，因为它会导致其他插件出现类路径问题（主要是因为使用Scala）。

**警告!** 目前，这些测试未考虑您可能对实体执行的校验规则。同样，创建与其他实体具有必需关系的实体的测试开箱即用也会失败。无论如何，您都需要根据您的业务规则更改那些测试，因此这里有一些改善测试的技巧：

*   在正在运行的应用程序上，转到`Administration > Logs`屏幕，然后将`org.springframework`置于`debug`模式。例如，您将看到验证错误。
*   正常使用该应用程序，然后打开Chrome `console log`：您将能够看到REST请求及其所有参数，包括HTTP标头。

为了在微服务应用程序上运行Gatling测试，您必须：

*   运行registry
*   运行网关
*   运行微服务应用
*   然后，您可以运行Gatling测试

## 行为驱动开发（BDD）

使用[Cucumber](https://cucumber.io/){:target="_blank"}及其[JVM实现](https://github.com/cucumber/cucumber-jvm){:target="_blank"}，可以进行行为驱动开发（BDD）。

[Gherkin](https://docs.cucumber.io/gherkin/reference/){:target="_blank"}功能必须写在`src/test/features`目录中。