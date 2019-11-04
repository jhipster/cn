---
layout: default
title: 使用WebSockets
permalink: /using-websockets/
redirect_from:
  - /using_websockets.html
sitemap:
    priority: 0.7
    lastmod: 2015-08-31T18:40:00-00:00
---

# <i class="fa fa-envelope"></i> 使用WebSockets

WebSockets对于具有非常动态的应用程序很有用，在该应用程序中，服务器及其前端之间几乎实时地共享数据。

JHipster当前使用Spring WebSockets作为其实现，因此您可以在[Spring WebSockets网站](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html)上找到有关此功能的更多信息。

此选项有一些限制：

- 默认情况下，我们使用Spring Websockets提供的调度程序，该调度程序是内存中的实现。显然，如果要使用多个服务器，它将无法扩展。如果要这样做，请查看Spring WebSockets文档，该文档说明了如何配置外部代理。

## Tracker示例

JHipster提供了一个开箱即用的简单Tracker示例。位于`admin`菜单中，它将跟踪其他用户的行为：您将看到他们的登录名和IP，以及他们当前正在查看的页面。

- 这是作为示例提供的，因此您可以轻松地开始使用WebSockets，而不必将其用作生产就绪的用户跟踪器，但效果很好。
- 它将向您展示如何将WebSocket与Spring Security集成，这是一个相当复杂的主题
- 之所以可行，是因为JHipster是单页Web应用程序，因此不会在每个页面之间重新初始化WebSockets连接：这是您使用JHipster体系结构的一大好处的地方
