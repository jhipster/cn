---
layout: default
title:
permalink: /managing-server-errors/
sitemap:
    priority: 0.7
    lastmod: 2018-03-07T00:00:00-00:00
---

# <i class="fa fa-fire-extinguisher"></i> 管理服务器错误

JHipster对错误处理提供一等的支持：它提供错误页面和自定义机制来处理服务器端的业务和技术错误。

## 错误页面

JHipster会生成一个单页应用程序（SPA），但对于不（或无法）访问该应用程序的人，它仍然需要自定义错误页面。

### 动态错误页面

JHipster提供了一个通用错误页面，它是 [Thymeleaf](https://www.thymeleaf.org/)模板，位于`src/main/resources/templates/error.html`。

此页面将显示服务器端错误消息，例如，如果用户尝试访问不存在的页面，则该页面将显示404错误，告知用户未找到该页面。

### 静态404错误页面

JHipster提供了一个特定的静态404错误页面，该页面位于`src/main/webapp/404.html`。默认情况下，JHipster不会使用此页面：此页面用于在JHipster之前使用代理软件中（Apache/NGinx/等等。），因此即使JHipster应用程序不可用，代理软件也可以显示404错误页面。

需要在前端代理上对其进行专门配置。

## API错误

为了处理Spring MVC REST错误，JHipster使用[Zalando的Problem Spring Web库](https://github.com/zalando/problem-spring-web)来提供丰富的，基于JSON的错误消息。

为了帮助终端用户，对于每个已知问题，该库都将提供指向特定错误页面的链接，该页面将提供更多详细信息。这些链接在`ErrorConstants`类中配置，默认情况下指向该网站。在您的应用程序中，您应该自定义这些链接，并将它们指向您自己的API文档。

以下是可用的错误链接：

- [带有消息提示的错误]({{ site.url }}/problem/problem-with-message)
- [违反约束]({{ site.url }}/problem/constraint-violation)
- [参数化消息出现问题]({{ site.url }}/problem/parameterized)
- [找不到实体]({{ site.url }}/problem/entity-not-found)
- [无效的密码]({{ site.url }}/problem/invalid-password)
- [电子邮件已经使用]({{ site.url }}/problem/email-already-used)
- [登录名已使用]({{ site.url }}/problem/login-already-used)
- [电子邮件无法找到]({{ site.url }}/problem/email-not-found)
