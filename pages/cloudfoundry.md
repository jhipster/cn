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

该子生成器允许将您的JHipster应用程序自动部署到[Cloud Foundry PaaS](http://cloudfoundry.org/)。

它与MySQL，PostgreSQL和MongoDB云提供商一起使用。

## 支持的云

[![]({{ site.url }}/images/logo/logo-pws.png)](http://run.pivotal.io/)

由于此子生成器使用Cloud Foundry命令行工具，因此可以部署到所有Cloud Foundry实例：

*   [Pivotal Web Services](http://run.pivotal.io/), 它是JHipster的正式赞助商，因此这是我们唯一可以测试并提供支持的
*   [Atos Canopy](https://canopy-cloud.com/)
*   [IBM Bluemix](https://console.ng.bluemix.net/)
*   如果您决定自己安装Cloud Foundry，还有您自己的私有Cloud Foundry实例！

## 运行子生成器

在运行子生成器之前，您需要安装[cf命令行界面（CLI）](http://docs.cloudfoundry.org/devguide/installcf/)，并创建一个Cloud Foundry帐户。

要将您的应用程序部署到Cloud Foundry，请输入：

`jhipster cloudfoundry`

您将需要回答几个问题来配置数据库，询问您数据库服务的名称和要使用的计划。可用的数据库取决于您当前的Cloud Foundry安装，输入`cf marketplace`以了解Cloud Foundry市场上可用的服务和计划。默认情况下，所选数据库和计划是公共Pivotal Cloud Foundry实例上ElephantSQL提供的免费PostgreSQL服务，因为它们是JHipster的赞助者。

这应该打包您的应用程序（在生产或开发模式下），创建Cloud Foundry应用程序（与数据库），上传代码并启动该应用程序。

## 更新已部署的应用程序

在部署了应用程序之后，可以通过运行以下命令正常构建来重新部署它：

**使用Maven：**

`./mvnw -Pprod package`

`cf push -f ./deploy/cloudfoundry/manifest.yml -p target/*.jar`

**使用Gradle:**

`./gradlew -Pprod bootJar`

`cf push -f ./deploy/cloudfoundry/manifest.yml -p build/libs/*.jar`

您还可以通过再次运行子生成器：

`jhipster cloudfoundry`

## 更多信息

*   [Spring Boot Cloud Foundry文档](http://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment.html)
*   [Spring Cloud连接器](http://cloud.spring.io/spring-cloud-connectors/)

