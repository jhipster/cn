---
layout: default
title:  生产环境的微服务
permalink: /microservices-in-production/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-cloud"></i> 生产环境的微服务

微服务是一种特定的JHipster应用程序。请参考我们[在生产环境使用Jhipster]({{ site.url }}/production)，以获取有关进行生产环境构建，对其进行优化和保护的更多信息。

## <a name="elk"></a> 微服务监控

请参考我们的[JHipster Registry文档]({{ site.url }}/jhipster-registry)，以了解哪些运行期仪表板可用，以及如何使用它们。

我们的[监控文档]({{ site.url }}/monitoring)对于使用以下方面的特定信息也非常重要：

- ELK收集您的微服务日志
- Prometheus收集您的微服务指标
- Zipkin跟踪整个服务中的HTTP请求

## <a name="docker_compose"></a> 使用Docker Compose开发和部署

在微服务架构上工作意味着您将需要几个不同的服务和数据库一起工作，在这种情况下，Docker Compose是一个很好的工具，可以管理您的开发，测试和生产环境。

[Docker Compose文档]({{ site.url }}/docker-compose#microservices)中包含有关微服务的特定部分，我们强烈建议您在使用微服务架构时熟悉它。

由于Docker Swarm使用与Docker Machine相同的API，因此在云中部署微服务架构与在本地计算机上部署微服务架构完全相同。请遵循我们的[Docker Compose文档 ]({{ site.url }}/docker-compose/)，以了解有关将Docker Compose与JHipster结合使用的更多信息。

## <a name="cloudfoundry"></a> 使用Cloud Foundry进行生产

[Cloud Foundry子生成器]({{ site.url }}/cloudfoundry/)与微服务架构的工作原理相同，主要区别在于您需要部署更多应用程序：

- 使用[Cloud Foundry子生成器]({{ site.url }}/cloudfoundry/)首先部署JHipster Registry（这是一个普通的JHipster应用程序）。
- 请注意在其上部署JHipster Registry的URL。您的应用程序都必须指向该URL：
  - 在`bootstrap-prod.yml`文件中，`spring.cloud.config.uri`必须指向`http(s)://<your_jhipster_registry_url>/config/`
  - 在`application-prod.yml` 文件中, `eureka.client.serviceUrl.defaultZone`必须指向`http(s)://<your_jhipster_registry_url>/eureka/`
- 部署您的网关和微服务
- 使用Cloud Foundry像往常一样扩展应用程序

需要记住的重要一点是，默认情况下，JHipster Registry不受保护，并且不应从外部访问微服务，因为用户应该使用网关来访问您的应用程序。

有两种解决方案可以解决此问题：

- 使用特定路由保护您的Cloud Foundry。
- 使所有内容保持公开，但在所有地方都使用HTTPS，并使用Spring Security的基本身份验证支持来保护JHipster Registry

## <a name="heroku"></a> 使用Heroku进行生产

[Heroku子生成器]({{ site.url }}/heroku/)与微服务体系结构几乎相同，主要区别在于您需要部署更多应用程序：

一键直接部署JHipster Registry：

[![Deploy to Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

请遵循[Heroku子生成器文档]({{ site.url }}/heroku/)，以了解如何保护JHipster Registry。

请注意在其上部署JHipster Registry的URL。您的应用程序都必须在其`application-prod.yml`文件中都指向该URL。将该配置更改为：

    eureka:
        instance:
            hostname: https://admin:[password]@[appname].herokuapp.com
            prefer-ip-address: false

现在，您可以部署和扩展网关和微服务。Heroku子生成器将询问您一个新问题，以得知您的JHipster Registry的URL：这将使您的应用程序能够在Spring Cloud Config服务器上获取其配置。
