---
layout: default
title:
permalink: /managing-server-errors/
sitemap:
    priority: 0.7
    lastmod: 2018-03-07T00:00:00-00:00
---

# <i class="fa fa-fire-extinguisher"></i> 管理服务器错误

JHipster对错误处理有一流的支持：它提供错误页面和自定义机制来处理服务器端的业务和技术错误。

## Error pages

JHipster生成一个单页应用程序（SPA），但它仍然需要为不（或无法）访问该应用程序的用户自定义错误页。

### Dynamic error pages

提供了一个通用错误页，它是 [Thymeleaf](https://www.thymeleaf.org/) template, located at `src/main/resources/templates/error.html`.

此页面将显示服务器端错误消息，例如，如果用户试图访问一个不存在的页面，它将显示404错误，告诉用户找不到该页面。

### Static 404 error page

jhipster提供了一个特定的静态404错误页面，位于`src/main/webapp/404.html`。默认情况下，JHipster不使用此页面：这里是用于在JHipster之前使用代理的项目（apache/nginx/etc），这样即使JHipster应用程序不可用，代理也可以显示404错误页面。

它需要在前端代理上进行专门的配置。

## API errors

为了处理SpringMVC REST错误，JHipster使用了[Zalando's Problem Spring Web  library](https://github.com/zalando/problem-spring-web),以便提供基于JSON的丰富错误消息。

为了帮助最终用户，对于每个已知问题，此库将提供一个指向特定错误页的链接，该链接将提供更多详细信息。这些链接在`errorConstants`类中配置，并默认指向此网站。在应用程序中，您应该自定义这些链接，并将它们指向您自己的API文档。

以下是可用的错误链接：

- [Problem with message]({{ site.url }}/problem/problem-with-message)
- [Constraint violation]({{ site.url }}/problem/constraint-violation)
- [Problem with a parameterized message]({{ site.url }}/problem/parameterized)
- [Entity not found]({{ site.url }}/problem/entity-not-found)
- [Invalid password]({{ site.url }}/problem/invalid-password)
- [E-mail already used]({{ site.url }}/problem/email-already-used)
- [Login already used]({{ site.url }}/problem/login-already-used)
- [E-mail not found]({{ site.url }}/problem/email-not-found)
