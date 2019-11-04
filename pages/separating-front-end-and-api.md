---
layout: default
title: 分离前端和API服务器
permalink: /separating-front-end-and-api/
sitemap:
    priority: 0.7
    lastmod: 2019-01-29T00:00:00-00:00
---

# <i class="fa fa-unlink"></i> 分离前端和API服务器

## 介绍

JHipster是一个全栈开发工具，其目标是使您可以有效地使用前端代码（Angular/React）和后端代码（Spring Boot）。

但是，通常需要分离前端和后端代码，这通常是因为它们由不同的团队开发并且具有不同的生命周期。

**请注意** 这不是JHipster的默认工作方式：这并不复杂，并且效果很好，但这是一个高级主题。如果您刚刚开始使用JHipster，我们建议您首先使用我们的标准工作方式。

## 仅生成前端或后端应用程序

您可以选择仅生成JHipster后端或JHipster前端应用程序。在生成时，这仅是选择标志的问题，这些标志在我们的[应用程序生成文档]({{ site.url }}/creating-an-app/)中进行了说明：

- `jhipster --skip-client` 只会生成一个后端应用程序（这通常是JHipster微服务）
- `jhipster --skip-server` 只会生成一个前端应用程序

这仅适用于monoliths，因为这对于微服务（无论如何都没有前端）和网关（基本上是启用了Zuul网关服务的monolith）没有多大意义。

## 目录布局

JHipster使用标准的Maven目录布局。在后端上工作时，您只需阅读[Maven标准目录布局文档](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)即可。

在前端工作时，您需要知道两个目录：

- `src/main/webapp` 是开发前端应用程序的地方
- `target/www` 是您的前端应用程序将被打包的位置

如果您有分别在前端和后端工作的团队，则有两种解决方案：

- 两个团队可以从事同一个项目。由于目录是分开的，因此团队之间不会有太多冲突。为了使事情变得更加清洁，两个团队可以在不同的分支上开发。

- 前端代码可以存储在一个特定的Git项目中，然后作为Git子模块导入到主后端项目中。这将需要移动前端构建脚本，但这是一个简单的重构。

## HTTP请求路由和缓存

一旦前端和后端分离，问题将是如何处理HTTP请求：

- 所有API调用都将使用`/api`前缀。如果您使用的是Angular，则还可以在`webpack.common.js`配置中定义一个特定的`SERVER_API_URL`常量，该常量可以丰富此前缀配置。例如，您可以将`"http://api.jhipster.tech:8081/"`用作后端API服务器（如果这样做，请阅读下面有关CORS的文档）。
- 调用`/`提供的静态资源（从前端），而不应由浏览器缓存。
- 对`/app`（包含前端应用程序）和`/content`（包含静态内容，如图像和CSS）的调用应在生产中进行缓存，因为这些资产是经过哈希处理的。
- 调用不存在的路由应将请求转发到`index.html`。这通常在后端通过`ClientForwardController`处理。单独部署前端时，需要进行额外配置。有关几个示例，请参见[Angular](https://angular.io/guide/deployment#server-configuration)或[React](https://facebook.github.io/create-react-app/docs/deployment)文档。

# 使用BrowserSync

在`dev`模式下，JHipster使用BrowserSync来热重载前端应用程序。BrowserSync有一个代理（[这里是其文档](https://www.browsersync.io/docs/options#option-proxy)），该代理会将请求从`/api`路由到后端服务器（默认情况下为`http://127.0.0.1:8080`）。

这仅在`dev`模式下有效，但这是从前端访问不同API服务器的非常有效的方法。

## 使用CORS

CORS（[跨域请求共享](https://wikipedia.org/wiki/Cross-origin_resource_sharing))允许访问相同前端下的不同后端服务器，而无需配置代理。

这是一个易于使用的解决方案，但是在生产中可能不太安全。

JHipster提供了开箱即用的CORS配置：

- 可以使用[jHipster通用应用程序属性]({{ site.url }}/common-application-properties/)中定义的`jhipster.cors`属性来配置CORS。
- 默认情况下，在`dev`模式下对monoliths和网关启用该功能。对于微服务，默认情况下禁用此功能，因为您应该通过网关访问它们。
- 出于安全原因，在`prod`模式下默认禁用该功能。

## 使用NGinx

分离前端代码和后端代码的另一种解决方案是使用代理服务器。这在生产中很常见，有些团队也在开发中使用了该技术。

此配置将根据您的特定用例进行更改，因此生成器无法自动进行此配置，这在下面的可用配置下。

创建一个`src/main/docker/nginx.yml`Docker Compose文件：

    version: '2'
    services:
      nginx:
        image: nginx:1.15-alpine
        volumes:
        - ./../../../target/www:/usr/share/nginx/html
        - ./nginx/site.conf:/etc/nginx/conf.d/default.conf
        ports:
        - "8000:80"

此Docker镜像将配置NGinx服务器，该服务器从`target/www`读取静态资源：这是默认情况下生成JHipster前端应用程序的位置。在生产环境中，您可能为此需要一个特定的文件夹。

它还读取一个`./nginx/site.conf`文件：这是NGinx特定的配置文件。

### 配置lambda
这是一个示例`site.conf`：

    server {
        listen 80;
        index index.html;
        server_name localhost;
        error_log  /var/log/nginx/error.log;

        root /usr/share/nginx/html;

        location /api {
            proxy_pass http://api.jhipster.tech:8081/api;
        }
        location /management {
            proxy_pass http://api.jhipster.tech:8081/management;
        }
        location /swagger-resources {
            proxy_pass http://api.jhipster.tech:8081/swagger-resources;
        }        
        location /v2 {
           proxy_pass http://api.jhipster.tech:8081/v2;
        }
        location /auth {
           proxy_pass http://api.jhipster.tech:8081/auth;
        }
 
        location / {
            try_files $uri $uri/ /index.html;
        }
    }

此配置意味着：

- NGinx将在端口`80`上运行
- 它将读取文件夹`/usr/share/nginx/html`中的静态资源，并且
- 它将作为从`/api`到`http://api.jhipster.tech/services/back`的代理
- 任何未处理的请求将转发到`index.html`

根据您的特定需求，此配置将需要进行一些调整，但对于大多数应用程序来说，这应该是一个足够好的起点。

### 使用Oauth 2.0和traefik进行配置

这是Oauth 2.0的示例`site.conf`：
如果服务器基本名称为`back`，并且托管traefik的服务器名称为`api.jhipster.tech`。
如果此配置用于docker镜像，请不要使用`localhost`代替`api.jhipster.tech`，因为它是在容器而不是主机中解析的。

    server {
        listen 80;
        index index.html;
        server_name localhost;
        error_log  /var/log/nginx/error.log;

        root /usr/share/nginx/html;

        location ~* ^/api(.*) {
            proxy_pass http://api.jhipster.tech/services/back/api$1;
        }
        location ~* ^/management(.*) {
            proxy_pass http://api.jhipster.tech/services/back/management$1;
        }
        location ~* ^/swagger-resources(.*) {
            proxy_pass http://api.jhipster.tech/services/back/swagger-resources$1;
        }        
        location ~* ^/v2/api-docs(.*) {
           proxy_pass http://api.jhipster.tech/services/back/v2/api-docs$1;
        }
        location ~* ^/auth(.*) {
           proxy_pass http://api.jhipster.tech/services/back/auth$1;
        }
        location ~* ^/oauth2(.*) {
           proxy_pass http://api.jhipster.tech/services/back/oauth2$1;
        }
        location ~* ^/login(.*) {
           proxy_pass http://api.jhipster.tech/services/back/login$1;
        }
 
        location / {
            try_files $uri $uri/ /index.html;
        }
    }

此配置意味着：

- NGinx将在端口`80`上运行
- 它将读取文件夹`/usr/share/nginx/html`中的静态资源，并且
- 它将作为从`/api`到`http://api.jhipster.tech/services/back`的代理
- traefik提供了`http://api.jhipster.tech/services/back`的负载均衡
- 任何未处理的请求将转发到`index.html`
