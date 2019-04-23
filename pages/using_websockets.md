---
layout: default
title: 使用Websockets
permalink: /using-websockets/
redirect_from:
  - /using_websockets.html
sitemap:
    priority: 0.7
    lastmod: 2015-08-31T18:40:00-00:00
---

# <i class="fa fa-envelope"></i> 使用WebSockets

WebSockets对于具有非常动态的应用程序非常有用，在该应用程序中，服务器及其客户机之间几乎实时共享数据。

JHipster目前使用Spring WebSockets作为其实现，因此您可以在[Spring WebSockets website](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html)上找到更多关于此功能的信息。

此选项有一些限制：

- 默认情况下，我们使用SpringWebSockets提供的调度器，这是一个内存中的实现。显然，如果您想使用多个服务器，它将不会扩展。如果您想这样做，请查看SpringWebSockets文档，该文档解释了如何配置外部代理。

## "Tracker" 示例

JHipster提供了一个现成的简单“跟踪器”示例。位于`admin`菜单中，它将跟踪其他用户的行为：您将看到他们的登录名和IP，以及他们当前正在查看的页面。

- 这是作为一个例子提供的，因此您可以很容易地开始使用WebSockets，而不是作为一个“生产就绪”的用户跟踪器，但它工作得相当好。
- 它将向您展示如何将WebSockets与Spring安全集成，这是一个非常复杂的主题。
- 这是因为JHipster是一个单页的Web应用程序，所以每个页面之间的WebSockets连接不会重新初始化：这是您从Jhipster的体系结构中获得最大好处的地方之一。
