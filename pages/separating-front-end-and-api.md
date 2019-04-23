---
layout: default
title: 分离前端和API服务器
permalink: /separating-front-end-and-api/
sitemap:
    priority: 0.7
    lastmod: 2017-12-28T00:00:00-00:00
---

# <i class="fa fa-unlink"></i> 分离前端和API服务器

## 介绍

JHipster是一个“全栈”开发工具，它的目标是使您能够有效地处理前端代码（angular/react）和后端代码（spring boot）。

但是，将前端和后端代码分开是一个常见的需求，这通常是因为它们由不同的团队开发，并且具有不同的生命周期。

**请注意** 这不是默认的JHipster工作方式：这并不复杂，而且工作得很好，但这是一个高级主题。如果您刚开始使用JHipster，我们建议您从使用我们的标准工作方式开始。

## 仅生成前端或后端应用程序

您可以选择只生成JHipster后端或JHipster前端应用程序。在生成时，这只是选择标记的问题，这些标记在我们的 [application generation documentation]({{ site.url }}/creating-an-app/)中描述：

- `jhipster --skip-client` 只会生成后端应用程序（这通常是jhipster微服务的特点）
- `jhipster --skip-server` 将只生成前端应用程序

这只适用于单块，因为这对于微服务（无论如何都没有前端）和网关（基本上是启用zuul网关服务的单块）没有多大意义。

## 目录布局

JHipster使用标准的maven目录布局。在后端工作时，您只需阅读[Maven standard directory layout documentation](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html).

在前端工作时，您需要知道两个目录：

- `src/main/webapp` 是开发客户端应用程序的地方
- `target/www` 客户端应用程序的打包位置

如果您有独立的团队在前端和后端工作，那么您有两个解决方案：

- 两个团队可以在同一个项目上工作。由于目录是分开的，所以团队之间不会有太多冲突。为了使事情更干净，两个团队可以在不同的分支上工作。
- 前端代码可以存储在特定的Git项目中，然后作为Git子模块导入到主后端项目中。这需要移动客户端构建脚本，但这只是一个简单的重构。

## HTTP requests routing and caching

一旦前端和后端分离，问题将是如何处理HTTP请求：

- 所有API调用都将使用`/api`前缀。如果您使用的是angular，那么在“webpack.common.js”配置中还定义了一个特定的“server-api-url”常量，它可以丰富这个前缀。例如，您可以使用`“http://api.jhipster.tech:8081/”`作为后端API服务器（如果这样做，请阅读下面关于CORS的文档）。
- 调用`/`服务静态资产（从前端），浏览器不应缓存这些资产。
- 对`/app`（包含客户端应用程序）和`/content`（包含静态内容，如图像和CSS）的调用应在生产中缓存，因为这些资产是散列的。

# 使用BrowserSync

在 `dev` 模式下, JHipster使用BrowserSync对前端应用程序进行热重新加载。BrowserSync有一个代理 ([here is its documentation](https://www.browsersync.io/docs/options#option-proxy)) that will route requests from `/api` to a back-end server (by default, `http://127.0.0.1:8080`).

这只在`dev`模式下工作，但这是一种从前端访问不同API服务器的非常强大的方法。

## 使用CORS

CORS ([Cross-origin request sharing](https://wikipedia.org/wiki/Cross-origin_resource_sharing)) 允许访问具有相同前端的不同后端服务器，而无需配置代理。

这是一个易于使用的解决方案，但在生产中可能不太安全。

JHipster提供开箱即用的CORS配置：

- 可以使用`jhipster.cors`属性配置CORS，如[the JHipster common application properties]({{ site.url }}/common-application-properties/)
- 它默认在`dev`模式下为单片和网关启用。默认情况下，它对微服务是禁用的，因为您应该通过网关访问它们。
- 出于安全原因，它在默认情况下在`prod`模式下被禁用。

## 使用NGinx

分离前端和后端代码的另一个解决方案是使用代理服务器。这在生产中很常见，一些团队在开发中也使用了这种技术。

此配置将根据您的特定用例而更改，因此生成器无法自动执行此配置，下面是一个工作配置。

Create a `src/main/docker/nginx.yml` Docker Compose file:

    version: '2'
    services:
      nginx:
        image: nginx:1.13-alpine
        volumes:
        - ./../../../target/www:/usr/share/nginx/html
        - ./nginx/site.conf:/etc/nginx/conf.d/default.conf
        ports:
        - "8000:80"

这个docker映像将配置一个Nginx服务器，从“target/www”读取静态资产：这是默认情况下生成JHipster前端应用程序的地方。在生产环境中，您可能有一个特定的文件夹。

它还读取一个`./nginx/site.conf`文件：这是一个特定于nginx的配置文件。以下是`site.conf`示例：

    server {
        listen 80;
        index index.html;
        server_name localhost;
        error_log  /var/log/nginx/error.log;

        location / {
            root /usr/share/nginx/html;
        }
        location /api {
            proxy_pass http://api.jhipster.tech:8081/api;
        }
        location /management {
            proxy_pass http://api.jhipster.tech:8081/management;
        }
        location /v2 {
           proxy_pass http://api.jhipster.tech:8081/v2;
        }
        location /swagger-ui {
            proxy_pass http://api.jhipster.tech:8081/swagger-ui;
        }
        location /swagger-resources {
            proxy_pass http://api.jhipster.tech:8081/swagger-resources;
        }
    }

This configuration means that:

- NGinx will run on port `80`
- It will read the static assets in folder `/usr/share/nginx/html`, and
- It will act as a proxy from `/api` to `http://api.jhipster.tech:8081/api`

This configuration will require some tuning depending on your specific needs, but should be a good enough starting point for most applications.
