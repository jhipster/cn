---
layout: default
title: 部署到Cloud Foundry
permalink: /cloudfoundry/
redirect_from:
  - /cloudfoundry.html
sitemap:
    priority: 0.7
    lastmod: 2014-11-04T00:00:00-00:00
---

# 部署到Cloud Foundry

此子生成器允许自动将JHipster应用程序部署到[Cloud Foundry PaaS](http://cloudfoundry.org/).

与MySQL, PostgreSQL 和 MongoDB 云提供程序可以一起工作.

## 支持的clouds

[![]({{ site.url }}/images/logo/logo-pws.png)](http://run.pivotal.io/)

由于此子生成器使用Cloud Foundry命令行工具，因此它可以部署到所有Cloud Foundry实例：

*   [Pivotal Web Services](http://run.pivotal.io/), 它是JHipster的官方赞助商，所以它是我们唯一可以测试和提供支持的
*   [Atos Canopy](https://canopy-cloud.com/)
*   [IBM Bluemix](https://console.ng.bluemix.net/)
*   当然，如果您决定自己安装Cloud Foundry，您自己的私有Cloud Foundry实例也是如此！

## 运行子命令ub-generator

在运行子生成器之前，需要安装 [cf Command Line Interface (CLI)](http://docs.cloudfoundry.org/devguide/installcf/), 并创建一个cloud foundry帐户。

要将应用程序部署到Cloud Foundry，请键入：

`jhipster cloudfoundry`

您将有几个问题来配置数据库，询问数据库服务的名称和要使用的计划。可用的数据库取决于您当前的Cloud Foundry安装，键入“cf marketplace”以了解您的Cloud Foundry市场上可用的服务和计划。默认情况下，所选的数据库和计划是公共Pivotal Cloud Foundry实例上来自elephantsql的免费PostgreSQL服务，因为它们是JHipster的赞助商。

这应该打包您的应用程序（在生产或开发模式下），创建一个云铸造应用程序（带数据库），上传您的代码，然后启动应用程序。

## 更新已部署的应用程序

当您的应用程序已部署时，您可以通过运行以下命令，通过正常构建它来重新部署：

**With Maven:**

`./mvnw -Pprod package`

`cf push -f ./deploy/cloudfoundry/manifest.yml -p target/*.war`

**With Gradle:**

`./gradlew -Pprod bootWar`

`cf push -f ./deploy/cloudfoundry/manifest.yml -p build/libs/*.war`

You can also run the sub-generator again, by typing another time:

`jhipster cloudfoundry`

## More information

*   [Spring Boot Cloud Foundry documentation](http://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment.html)
*   [Spring Cloud Connectors](http://cloud.spring.io/spring-cloud-connectors/)
