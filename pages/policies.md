---
layout: default
title: 规范
permalink: /policies/
redirect_from:
  - /policies.html
sitemap:
    priority: 0.7
    lastmod: 2015-07-31T18:40:00-00:00
---

# <i class="fa fa-gavel"></i> 规范

JHipster开发团队遵循一些编码规范。您可以将它们视为“最佳做法”或“指南”。它们是在项目本身而不是生成的代码上强制执行的：如果仅使用JHipster生成项目，则绝对不必遵循它们！

这些规范由[开发团队]({{ site.url }}/team/)遵循，如果您提交Pull Request，则应遵循这些风格。

## 规范0：政策由开发团队投票决定

开发团队可以在[邮件列表](https://groups.google.com/forum/?hl=en#!forum/jhipster-dev)中讨论或修改每个规范。任何重大更改必须进行表决（如果您同意，则为+1；如果不同意，则为-1）。

## 规范1：JHipster使用的技术尽可能使用其默认配置

例如，我们以“通常方式”使用JPA，Spring，Angular和React，而没有一些繁琐的配置选项以及它们通常的命名和编码约定。我们这样做是：

- 通常，每种技术都有很好采用默认设置的理由
- 如果我们不重新配置所有内容，则更容易了解JHipster的工作原理

仅当默认配置与JHipster使用的其他技术产生问题时，我们才可能更改默认配置。例如，要让Spring Security和Angular一起工作，我们必须更改Spring Security的默认配置。

## 规范2：仅在生成的代码中有足够的附加值时添加选项

生成项目时，JHipster有许多选项。仅当这些选项很复杂并且暗示配置或编码多个组件时，我们才添加它们。

添加选项仅是因为它节省了几行代码，但这并不是JHipster的好用法：

- 手动编写这些行比学习新的JHipster选项要容易
- 这只会使我们的生成器更加复杂，而不会增加任何价值

## 规范3：对于Java代码，请遵循默认的Intellij IDEA编码样式

有很多方法可以格式化代码。我们遵循Intellij IDEA提供的默认规则。

## 政策4：对第三方库使用严格的版本

库版本存在很多问题，会引起冲突。这主要是一个JavaScript问题，因此需要明确：我们在`package.json`文件中使用了固定的库版本。
