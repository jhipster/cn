---
layout: default
title: 创建一个服务
permalink: /creating-a-spring-service/
redirect_from:
  - /creating_a_service.html
  - /creating-a-service/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 创建一个Spring服务

## 介绍

_注意：此子生成器比创建完整CRUD实体的[实体子生成器]({{ site.url }}/creating-an-entity/)简单得多_

该子生成器生成一个Spring Service bean，您应该在此bean中编写应用程序的业务逻辑。

生成"Bar"的Service bean, 只需输入：

`jhipster spring-service Bar`

_这将生成一个简单的“ BarService”：很少的代码行，但是它们通常会带来很多疑问。我们尝试回答以下最常见的问题。_

## 为什么服务类不是由“entity”生成器生成的？

这里有两个主要的架构原则：

*   我们不想提倡创建无用的服务：如果您所需要的只是数据库上的基本CRUD，则不需要Service Bean。因此，默认情况下，JHipster不会生成它们。

*   我们认为Service Bean比repository更解耦。Service Bean将使用多个repository在它们之上提供业务逻辑。这就是为什么无法直接使用实体生成Service Bean的原因。

## 我们应该在Service Bean中使用接口吗？

简而言之: **No**.

如果您想得到详细答案，这里是：

使用Spring的主要兴趣之一是AOP。这项技术使Spring可以在Bean之上添加新行为：例如，这就是事务或安全的工作方式。

为了添加这些行为，Spring需要在您的类上创建一个代理，并且有两种创建代理的方法：

*   如果您的类使用接口，则Spring将使用Java提供的标准机制来创建动态代理。

*   如果您的类不使用接口，则Spring将使用CGLIB即时生成一个新类：这不是标准的Java机制，但其工作原理与标准机制一样。

还会有人认为接口更适合编写测试，但是我们认为我们不应该为了测试的而修改我们的生产代码，而且所有新的模拟框架（例如EasyMock）都允许您创建非常好的单元测试，在没有任何接口的情况下。

因此，最后，我们发现Service Bean的接口几乎没有用，这就是为什么我们不推荐它们的原因（但是我们还是为您保留了选择生成它们的选项！）。

## 为什么要使用事务来获取惰性的JPA关系？

默认情况下，JPA使用一对多和多对多实体关系的惰性初始模式。如果使用此默认配置，则可能会看到可怕的`LazyInitializationException`：这意味着您试图在事务外部使用未初始化的关系。

由于生成的Service类默认具有`@Transactional`注解，因此其所有方法都是事务性的。这意味着您可以在这些业务方法中获取所有必需的惰性关系，而无不用担心遇见`LazyInitializationException`。

_提示:_ 如果您不修改任何数据，请在方法上使用`@Transactional(readOnly = true)`。这是一个不错的性能优化（Hibernate不需要刷新其一级缓存，因为我们没有进行任何修改），并且通过某些JDBC驱动程序提高了质量（Oracle不允许您发送INSERT/UPDATE/DELETE语句）

## 我们可以为Service Bean添加安全特性吗？

是!只需在您的类或方法上添加Spring Security的 `@Secured`批注，然后使用提供的`AuthoritiesConstants`类即可限制对特定用户权限的访问。
