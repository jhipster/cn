---
layout: default
title: 创建服务
permalink: /creating-a-spring-service/
redirect_from:
  - /creating_a_service.html
  - /creating-a-service/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 创建Spring服务

## 介绍

_Note: 这个子生成器比 [entity sub-generator]({{ site.url }}/creating-an-entity/) 生成完整的CRUD实体类更简单_

这个子生成器生成一个SpringServiceBean，在这个bean中应该对应用程序的业务逻辑进行编码。

为了生成"Bar"服务bean，只需键入：

`jhipster spring-service Bar`

_这将生成一个简单的“BarService”：代码行很少，但通常会有很多问题。我们试图回答下面最常见的问题。_

## 为什么“实体”生成器不生成服务类？

我们有两个主要的架构原则：

*   我们不希望促进创建无用的服务：如果您所需要的只是数据库中的基本CRUD，那么就不需要服务bean。这就是为什么，默认情况下，JHipster不生成它们。
*   我们相信服务bean比存储库更粗粒度。一个服务bean将使用多个存储库在它们之上提供业务价值。这就是为什么不能用实体生成服务bean的原因。

## 我们应该使用与服务bean的接口吗？

简短回答: **不**.

如果你想要长的答案，这里是：

使用Spring的主要兴趣之一是AOP。这是一种允许Spring在bean上添加新行为的技术：例如，这就是事务或安全性的工作方式。

为了添加这些行为，Spring需要在类上创建一个代理，并且有两种创建代理的方法：

*   如果您的类使用接口，Spring将使用Java提供的标准机制来创建动态代理。
*   如果您的类不使用接口，Spring将立即使用CGLIB生成一个新类：这不是一个标准的Java机制，但它和标准机制一样有效。

有些人还认为接口对于编写测试更好，但是我们认为我们不应该修改我们的测试生产代码，并且所有新的模拟框架（比如easymock）都允许您创建非常好的单元测试，而不需要任何接口。

因此，最后，我们发现您的服务bean的接口大多是无用的，这就是我们不推荐它们的原因（但我们留给您生成它们的选项！）.

## 为什么要使用事务来获取懒惰的JPA关系？

默认情况下，JPA使用一对多和多对多实体关系的延迟初始化。如果使用此默认配置，则可能会看到可怕的“lazyinitializationException”：这意味着您已尝试在事务外部使用未初始化的关系。

由于生成的服务类默认具有“@transactional”批注，因此其所有方法都是事务性的。这意味着您可以在这些业务方法中获取所有必需的惰性关系，而不需要任何“lazyinitializationException”。

_Tip:_ 如果不修改任何数据，请对方法使用“@transactional（readonly=true）”。这是一个很好的性能优化（Hibernate不需要刷新其一级缓存，因为我们不修改任何内容），以及一些JDBC驱动程序的质量增强（Oracle不允许您发送insert/update/delete语句）

## 我们能为服务bean增加安全性吗？

对！只需在类或方法上添加spring security的“@secured”注释，并使用提供的“authoritiescostants”类限制对特定用户权限的访问。
