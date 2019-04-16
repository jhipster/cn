---
layout: default
title: 策略
permalink: /policies/
redirect_from:
  - /policies.html
sitemap:
    priority: 0.7
    lastmod: 2015-07-31T18:40:00-00:00
---

# <i class="fa fa-gavel"></i> 策略

JHipster开发团队遵循一些编码策略。您可以将它们视为“最佳实践”或“指南”。它们是在项目本身上强制执行的，而不是在生成的代码上强制执行的：如果您只是使用JHipster来生成项目，那么您绝对不必遵循它们！

这些策略由 [development team]({{ site.url }}/team/)遵循，如果提交请求，则应遵循这些策略。

## 策略0：策略由开发团队投票决定

开发团队可以在[邮件列表]上讨论或修改每个策略[mailing list](https://groups.google.com/forum/?hl=en#!forum/jhipster-dev)。任何重大变化都必须投票（+1如果你同意，1如果你不同意）。

## 策略1:Jhipster使用的技术尽可能使用其默认配置

例如，我们使用JPA、Spring、Angular和React这两种“常规方式”，没有一些重要的配置选项，也没有它们通常的命名和编码约定。我们这样做是：

-每种技术通常都有一个非常好的理由来设置这些默认值
-如果我们不重新配置所有内容，就更容易理解jhipster是如何工作的。

如果默认配置与JHipster使用的其他技术产生了一些问题，那么我们可能只会更改它。例如，为了让弹簧安全性和角度协同工作，我们必须更改弹簧安全性的默认配置。

## 策略2:仅在生成的代码中有足够的附加值时添加选项

JHipster在生成项目时有许多选项。我们只在这些选项复杂并且意味着配置或编码多个组件时添加它们。

添加一个选项仅仅是因为它可以为代码节省几行代码，这并不是JHipster的一个好用法：

- 手动编码这些行比学习新的jhipster选项更容易。
- 它只会使我们的生成器更复杂，而不增加任何值

## 策略3：对于Java代码，遵循默认的Intellij IDEA编码风格

有很多方法可以格式化代码。我们遵循Intellij IDEA提供的默认规则。

## 策略4:对第三方库使用严格的版本

我们在组件库版本产生冲突方面遇到了很多问题。这主要是一个javascript问题，所以要清楚：在您的'bower.json'和'package.json'文件中使用固定的库版本。
