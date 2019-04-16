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

All those tests will be generated in the standard Maven `src/test` folder.

## Integration tests

Integration tests are done with the Spring Test Context framework, and are located in the `src/test/java` folder. JHipster will launch a specific Spring test context, which will be re-used along all tests, as:

*   Your Spring beans should be stateless and thread-safe, and thus can be re-used across your different tests suites.
*   Launching just one Spring context for all tests if a lot faster than launching a new Spring context for each test.

This Spring test context will use a specific test database to execute its tests:

*   If you use an SQL database, JHipster will launch an in-memory H2 instance in order to use a temporary database for its integration tests. Liquibase will be run automatically, and will generate the database schema.
*   If you use Cassandra, JHipster will launch an in-memory Cassandra instance using [CassandraUnit](https://github.com/jsevellec/cassandra-unit).
*   If you use MongoDB, JHipster will launch an in-memory MongoDB instance using [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo).
*   If you use Elasticsearch, JHipster will launch an in-memory Elasticsearch instance using Spring Data Elasticsearch.
*   If you use Couchbase, JHipster will launch a containerized version of Couchbase with Docker using [Couchbase TestContainers](https://github.com/differentway/testcontainers-java-module-couchbase).

Those tests can be run directly in your IDE, by right-clicking on each test class, or by running `./mvnw clean test` (or `./gradlew test` if you run Gradle).

**Limitations:** if the generated entities have validation enabled, JHipster is not enable to generate the correct values depending on the validation rules. Those rules can be so complex, for example if a Regex pattern is used, that this just not possible. In this case, the tests will fail validation, and the default values used in the test will need to changed manually, so they can pass the validation rules.

## UI tests

UI tests come in two flavors with JHipster: unit tests with Jest, and integration tests with Protractor. Only Jest is provided by default, but if you want to have a good test coverage of your application, we recommend that you use both tools together.

### Jest

UI unit tests are located in the `src/test/javascript/spec` folder. They use [Jest](https://facebook.github.io/jest/).

Those tests will mock up the access to the application's REST endpoints, so you can test your UI layer without having to launch the Java back-end.

*   Those tests can be run using `npm test`.
*   Tip: if you want to focus on a single test change the module description from `describe('...', function() {` to `fdescribe('...', function() {` and Jest will run this test only.

### Protractor

UI integration tests are done with [Protractor](https://angular.github.io/protractor/#/), and are located in the `src/test/javascript/e2e` folder.

Those tests will launch a Web browser and use the application like a real user would do, so you need to have a real application running, with its database set-up.

Those tests can be run using `npm run e2e`.

## Performance tests

Performance tests are done with [Gatling](http://gatling.io/), and are located in the `src/test/gatling` folder. They are generated for each entity, and allows to test each of them with a lot of concurrent user requests.

To run Gatling tests, you must first install Gatling: please go to the [Gatling download page](https://gatling.io/download/) and follow the instructions there. Please note we do not allow to run Gatling from Maven or Gradle, as it causes some classpath issues with other plugins (mainly because of the use of Scala).

**NOTE** We currently support Gatling 2.x only. You can download the latest 2.x version directly from [maven central](https://repo1.maven.org/maven2/io/gatling/highcharts/gatling-charts-highcharts-bundle/2.3.1/gatling-charts-highcharts-bundle-2.3.1-bundle.zip).

**Warning!** At the moment, those tests do not take into account the validation rules you may have enforced on your entities. Also tests for creating entities that have a required relationship with another entity will fail out of the box. You will anyway need to change those tests, according to your business rules, so here are few tips to improve your tests:

*   On your running application, go to the `Administration > Logs` screen, and put `org.springframework` in `debug` mode. You will see the validation errors, for example.
*   Use the application normally and open the Chrome `console log`: you will be able to see the REST requests with all their parameters, including the HTTP headers.

For running Gatling tests on a microservice application, you have to:

*   Run a registry
*   Run a gateway
*   Run the microservice application
*   Then, you can run Gatling tests

## Behaviour-driven development (BDD)

Behaviour-driven development (BDD) is available using [Cucumber](https://cucumber.io/), with its [JVM implementation](https://github.com/cucumber/cucumber-jvm).

[Gherkin](https://docs.cucumber.io/gherkin/reference/) features will have to be written in your `src/test/features` directory.
