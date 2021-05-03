---
layout: default
title: 创建一个应用程序
sitemap:
priority: 0.5
lastmod: 2021-01-07T08:40:00-00:00
---

# 创建一个应用程序

## 快速上手

首先，创建一个空目录，您将在其中创建应用程序：

`mkdir my-quarkus-application`

转到该目录：

`cd my-quarkus-application`

要生成您的JHipster Quarkus应用程序，请输入：

`jhipster-quarkus`

## 进阶

`jhipster-quarkus`内置`jhipster`依赖关系，这意味着您不必自己安装`jhipster`。
`jhipster-quarkus`的主要好处是确保JHipster Quarkus方案与下面的JHipster之间的兼容性。

但是，如果要使用自定义的`jhipster`安装，则可以使用`--blueprint`标志，如下所示：

`jhipster --blueprints quarkus`

请记住，在这种配置下，您可能会遇到兼容性问题，因此我们不建议您使用此用法。

## 生成应用程序时的问题

在JHipster Quarkus创建期间提出的问题与标准Quarkus相同。

请参考相应的文档：[生成应用时的问题]({{ site.url }}/creating-an-app/#2)
