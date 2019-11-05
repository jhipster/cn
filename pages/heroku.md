---
layout: default
title: 部署到Heroku
permalink: /heroku/
redirect_from:
  - /heroku.html
sitemap:
    priority: 0.7
    lastmod: 2014-09-08T00:00:00-00:00
---

# 部署到Heroku

该子生成器允许将您的JHipster应用程序部署到[Heroku云](https://www.heroku.com/)。

[![]({{ site.url }}/images/logo/logo-heroku.png)](https://www.heroku.com/)

Heroku通过两种方式帮助JHipster：

- Heroku的Joe Kutner目前正在维护此子生成器
- Heroku提供了免费的信用额度，使我们能够使用复杂的高端设置来测试生成的应用程序，以确保所有普通用户都能正常使用

## 运行子生成器

在运行子生成器之前，您必须安装[Heroku CLI](https://cli.heroku.com/)，并创建一个Heroku帐户。

您还必须[创建一个Heroku帐户](http://signup.heroku.com/)并通过运行以下命令使用CLI登录：

<pre>**$ heroku login**
Enter your Heroku credentials.
Email: YOUR_EMAIL
Password (typing will be hidden): YOUR_PASSWORD
Authentication successful.
</pre>

要将应用程序部署到Heroku，请运行以下命令：

`jhipster heroku`

这应该以"production"模式打包您的应用程序，使用数据库创建一个Heroku应用程序，上传您的代码，然后启动该应用程序。

请注意，如果您的应用程序是微服务，系统将提示您提供registryURL。向下滚动以了解如何执行此操作。

_请注意，您的应用程序必须在90秒内启动，否则将被终止。根据平台负载，当然不能保证在60秒以内开始！_

## 更新已部署的应用程序

### 准备新的部署

在部署了应用程序之后，可以通过输入以下内容准备新的部署：

`./mvnw package -Pprod -DskipTests`

使用gradle:

`./gradlew -Pprod bootJar -x test`

### 推送到生产

_注意：假定您已在执行此命令的计算机上运行了生成器。如果尚未安装，则需要按照说明安装[Heroku Java CLI](https://devcenter.heroku.com/articles/deploying-executable-jar-files)。_

要推送生产，请输入：

`heroku deploy:jar target/*.jar`

使用gradle:

`heroku deploy:jar build/libs/*jar`

## 部署微服务

JHipster微服务需要[使用JHipster进行微服务](/microservices-architecture/)文档中所述的JHipster Registry。您可以通过单击以下按钮将registry部署到Heroku：

[![部署到Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

部署registry后，您可以对微服务或网关运行`jhipster heroku`命令。Heroku子生成器将提示您输入registry的URL，其格式为`https://[appname].herokuapp.com`。

在Heroku上运行的registry有一些限制，包括：

*   registry仅适用于本机配置（不适用于Git配置）。
*   registry服务不能扩展多个dyno以提供冗余。您必须部署多个应用程序（即多次单击按钮）。这是因为Eureka需要不同的URL才能在实例之间同步内存中状态。

### 在Heroku上使用JHipster Registry的安全性

要在JHipster Registry上获取自动生成的管理员密码，请输入：

`heroku config:get JHIPSTER_PASSWORD`

要使用此密码，请通过运行以下命令来更新所有微服务和网关，以使用registry的凭据：

`heroku config:set JHIPSTER_REGISTRY_URL="https://admin:[password]@[appname].herokuapp.com"`

## 故障排除

如果在应用Liquibase变更日志时您的应用程序被Heroku杀死，则Liquibase将数据库标记为"locked"。您将需要手动清理锁定表。在Postgres上，请确保[已安装本地Postgres客户端](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)，然后运行以下命令：

`heroku pg:psql -c "update databasechangeloglock set locked=false;"`

Heroku的默认启动超时限制为90秒。如果您的应用花费的时间超过此时间，Heroku将终止该进程，这可能会使数据库处于锁定状态。如果问题仍然存在，请尝试与[Heroku支持](http://help.heroku.com)联系，以请求为您的应用设置更长的启动限制。

## 更多信息

*   [应用范例](https://github.com/kissaten/jhipster-example)
*   [Spring Boot Heroku文档](http://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment.html#cloud-deployment-heroku)

