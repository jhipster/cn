---
layout: default
title: 使用TLS and HTTP/2
permalink: /tls/
sitemap:
    priority: 0.7
    lastmod: 2018-10-04T00:00:00-00:00
---

# <i class="fa fa-lock"></i> 使用

## 介绍

此页用于在开发中使用TLS和HTTP/2（主要用于测试目的）。有关生产配置，请阅读[security section in the production documentation]({{ site.url }}/production/#security) .

TLS是在具有`https://` URL时使用的协议, 在现代浏览器上使用HTTP/2。

在测试应用程序时使用这些协议非常有用，主要是出于性能原因。

## 在Spring Booth中使用TLS and HTTP/2

JHipster有一个特定的配置，用于配置TLS和HTTP/2 (请参见[common application properties documentation]({{ site.url }}/common-application-properties/)):

- JHipster在应用程序生成时生成自签名证书
- 提供了特定的`tls`配置文件(请参见[profiles documentation]({{ site.url }}/profiles/))

为了在启用了TLS and HTTP/2 的情况下使用提供的自签名证书运行JHipster， 只需使用此`tls`配置:

*   with Maven: `./mvnw -Pdev,tls`
*   with Gradle: `./gradlew -Ptls`

该应用程序将在`https://localhost:8080/`.

由于证书是自签名的，浏览器将发出警告，您需要忽略它（或导入它）才能访问应用程序。

## 使用带有Angular或React的TLS和HTTP/2

Instead of using `npm start` in order to run the front-end (with Webpack and BrowserSync), just run `npm run start-tls`, and it will connect to the back-end running on `https://localhost:8080/`.

Everything should then work the same as without TLS and HTTP/2.
