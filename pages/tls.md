---
layout: default
title: 使用TLS和HTTP/2
permalink: /tls/
sitemap:
    priority: 0.7
    lastmod: 2018-10-04T00:00:00-00:00
---

# <i class="fa fa-lock"></i> 在开发中使用TLS和HTTP/2

## 介绍

此页面用于在开发中使用TLS和HTTP/2（主要用于测试目的）。对于生产配置，请阅读[生产文档中的安全性部分]({{ site.url }}/production/#security)。

TLS是具`https://` URL时使用的协议，并且在现代浏览器中使用HTTP/2是必需的。

主要出于性能原因，在测试应用程序时使用这些协议很有用。

## 在Spring Boot中使用TLS和HTTP/2

JHipster具有用于配置TLS和HTTP/2的特定配置（请参阅[通用应用程序属性文档]({{ site.url }}/common-application-properties/))），并且使事情变得更加简单：

- JHipster在应用程序生成时生成自签名证书
- 提供了特定的`tls`配置文件（请参阅[配置文件文档]({{ site.url }}/profiles/)）

为了使用提供的自签名证书（启用了TLS和HTTP/2）运行JHipster，您只需要使用以下`tls`配置文件：

*   使用Maven: `./mvnw -Pdev,tls`
*   使用Gradle: `./gradlew -Ptls`

该应用程序将在`https://localhost:8080/`上可用。

由于证书是自签名的，因此浏览器将发出警告，并且您将需要忽略它（或将其导入）以访问该应用程序。

## 在Angular或React或Vue.js中使用TLS和HTTP/2

无需使用`npm start`来运行前端（使用Webpack和BrowserSync），只需运行`npm run start-tls`，它将连接`https://localhost:8080/`上运行的后端。

然后，所有内容应与没有使用TLS和HTTP/2的情况相同。