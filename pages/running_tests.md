---
layout: default
title: 运行测试
permalink: /running-tests/
redirect_from:
  - /running_tests.html
sitemap:
    priority: 0.7
    lastmod: 2015-04-20T00:00:00-00:00
---

# <i class="fa fa-shield"></i> 运行测试

## 介绍

JHipster提供了一组广泛的测试，每个生成的应用程序都有：

*   使用Spring测试上下文框架进行集成测试。
*   UI tests [Jest](https://facebook.github.io/jest/).

或者，JHipster还可以生成：

*   性能测试[Gatling.](http://gatling.io/)
*   行为驱动测试 [Cucumber](https://cucumber.io/)
*   Angular/React集成测试 [Protractor](https://angular.github.io/protractor/#/).

在生成这些测试时，我们有两个目标：

*   帮助每个Jhipster用户遵循最佳实践，因为我们相信测试是每个应用程序的一个非常有用的部分
*   验证正在生成的内容是否正确。因此，即使您根本不打算使用这些测试，在生成应用程序后只进行`./mvnw clean test`和` npm test`是一种了解是否一切正常的好方法。如果您认为测试是浪费时间的话，那么您可以随意忽略这些测试！

所有这些测试都将在标准maven`src/test`文件夹中生成。

## 集成测试

使用Spring测试上下文框架进行集成测试，并位于`SRC/Test/Java`文件夹中。JHipster将启动一个特定的Spring测试上下文，该上下文将在所有测试中重复使用，如下所示：

*   您的SpringBean应该是无状态的和线程安全的，因此可以在不同的测试套件中重用。
*   如果比为每个测试启动新的Spring上下文快得多，那么只为所有测试启动一个Spring上下文。

此Spring测试上下文将使用特定的测试数据库来执行其测试：

*   如果使用SQL数据库，JHipster将启动内存中的h2实例，以便使用临时数据库进行集成测试。Liquibase将自动运行，并生成数据库模式。
*   如果使用cassandra，JHipster将使用 [CassandraUnit](https://github.com/jsevellec/cassandra-unit).
*   如果使用MongoDB, JHipster将会启动一个内存MongoDB的实例 [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo).
*   如果使用ElasticSearch，jhipster将使用SpringData ElasticSearch启动内存中的ElasticSearch实例。
*   如果使用Couchbase，JHipster将使用docker启动Couchbase的Docker版本。 [Couchbase TestContainers](https://github.com/differentway/testcontainers-java-module-couchbase).

这些测试可以直接在您的IDE中运行，方法是右键单击每个测试类，或者运行`./mvnw clean test`（如果运行gradle，则运行`./gradlew test`）。

**限制：**  如果生成的实体启用了验证，则JHipster无法根据验证规则生成正确的值。这些规则可能非常复杂，例如，如果使用了regex模式，就不可能做到这一点。在这种情况下，测试将无法通过验证，并且测试中使用的默认值需要手动更改，以便通过验证规则。

## UI测试

JHipster提供了两种类型的UI测试：带有jest的单元测试和带有量角器的集成测试。默认情况下只提供jest，但是如果您希望对应用程序有一个良好的测试覆盖范围，我们建议您同时使用这两个工具。

### Jest

用户界面单元测试位于`src/test/javascript/spec`文件夹中。他们使用 [Jest](https://facebook.github.io/jest/).

这些测试将模拟对应用程序的REST端点的访问，因此您可以在不必启动Java后端的情况下测试UI层。

*   这些测试可以使用`NPM测试`运行。
*   提示：如果您想专注于单个测试，请将模块描述从 `describe('...', function() {` 更改为 `fdescribe('...', function() {` 并且Jest将只运行此测试。

### Protractor

用户界面集成测试是用 [Protractor](https://angular.github.io/protractor/#/)完成的，, 并且位于 `src/test/javascript/e2e` 文件夹中。

这些测试将启动一个Web浏览器，并像真正的用户那样使用该应用程序，因此您需要运行一个真正的应用程序及其数据库设置。

这些测试可以使用`npm run e2e`.

## 性能测试

性能测试是使用 [Gatling](http://gatling.io/)完成的，并且位于 `src/test/gatling` 文件夹中。它们是为每个实体生成的，并允许使用大量并发用户请求来测试每个实体。

要运行Gatling测试，必须首先安装Gatling: 请转到[Gatling download page](https://gatling.io/download/)并按照此处的说明进行操作。请注意，我们不允许从Maven或Gradle运行Gatling，因为它会导致其他插件出现一些类路径问题（主要是因为使用scala）。

**注意** 我们目前仅支持Gatling 2.x。您可以直接从 [maven central](https://repo1.maven.org/maven2/io/gatling/highcharts/gatling-charts-highcharts-bundle/2.3.1/gatling-charts-highcharts-bundle-2.3.1-bundle.zip)下载最新的2.x版本

**警告!** 目前，这些测试没有考虑到您可能对实体实施的验证规则。此外，创建与另一个实体具有所需关系的实体的测试也将失败。根据您的业务规则，您无论如何都需要更改这些测试，因此以下是一些改进测试的提示：

*   在正在运行的应用程序上，转到`administration>logs`幕，并将`org.springframework`置于`debug`模式。例如，您将看到验证错误。
*   正常使用应用程序并打开chrome的`控制台日志`：您将能够看到其余的请求及其所有参数，包括HTTP头。

要在微服务应用程序上运行Gatling测试，必须：

*   运行注册表
*   运行网关
*   运行微服务应用程序
*   然后，您可以运行Gatling测试

## 行为驱动开发（BDD）

行为驱动开发（BDD）可以使用 [Cucumber](https://cucumber.io/), 及其 [JVM implementation](https://github.com/cucumber/cucumber-jvm)来实现。

[Gherkin](https://docs.cucumber.io/gherkin/reference/) 功能列表在 `src/test/features` 目录.
