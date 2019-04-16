---
layout: default
title: 过滤
permalink: /entities-filtering/
sitemap:
    priority: 0.7
    lastmod: 2017-08-22T00:00:00-00:00
---

# <i class="fa fa-filter"></i> 过滤您的实体类

## 简介

在为一个实体实现了基本的CRUD功能之后，有一个非常常见的请求为该实体的属性创建各种过滤器，
因此，可以更有效地使用服务器。这些过滤器应该作为请求参数发送，因此任何客户机和任何浏览器都可以轻松地使用它。
此外，这些过滤器应该遵循一个健全、简洁的模式，并且必须允许它们自由组合。

## 如何激活

使用`jhipster entity`命令生成实体时，请选择服务或服务实现以对此实体启用筛选。

如果要为现有实体启用筛选，可以修改项目`.jhipster`目录中的实体配置， 将 `service` 从`no` 设置为 `serviceClass` 或 `serviceImpl`, `jpaMetamodelFiltering` 为 `true` 然后使用 `jhipster entity <entity name>`重新生成实体类.

使用JDL时，请在JDL文件中添加一行`filter<entity name>`，然后使用`jhipster import jdl`命令重新导入定义。

## 公共接口

对于每个实体，可以在实体生成器中启用筛选，之后，可以使用以下参数调用`/api/my entity` get endpoint：

* For each *xyz* field
    * *xyz.equals=someValue*
        - To list all the entities, where xyz equals to 'someValue'
    * *xyz.in=someValue,otherValue*
        - To list all the entities, where xyz equals to 'someValue' or 'otherValue'
    * *xyz.specified=true*
        - To list all the entities, where xyz is not null, specified.
    * *xyz.specified=false*
        - To list all the entities, where xyz is null, unspecified.
* If *xyz*'s type is string:
    * *xyz.contains=something*
        - To list all the entities, where xyz contains 'something'.
* If *xyz*'s is either any of the number types, or the date types.
    * *xyz.greaterThan=someValue*
        - To list all the entities, where xyz is greater than 'someValue'.
    * *xyz.lessThan=someValue*
        - To list all the entities, where xyz is less than 'someValue'.
    * *xyz.greaterOrEqualThan=someValue*
        - To list all the entities, where xyz is greater than or equal to 'someValue'.
    * *xyz.lessOrEqualThan=someValue*
        - To list all the entities, where xyz is less than or equal to 'someValue'.

当然，它们可以自由组合。

体验这个过滤器API的表现力的一个好方法是在JHipster应用程序的api-docs页面中的自大用户界面中使用它。

![]({{ site.url }}/images/entities_filtering_swagger.png)

## 实现

启用此功能后，将生成名为`EntityQueryService`和`EntityCriteria`的新服务。Spring会将请求参数转换为`EntityCriteria`类的字段。

在`EntityQueryService`, 我们将Criteria对象转换为静态的、类型安全的JPA查询对象。为此, 它 **需要** 在构建过程中设置**static metamodel generation 为 enabled**. 详见 [JPA静态元模型生成器文档](http://docs.jboss.org/hibernate/orm/current/topical/html_single/metamodelgen/MetamodelGenerator.html) for details.

为了证明生成的标准有效，并且Spring配置良好，`EntityResourceInttest`扩展了许多测试用例，每个筛选器一个。

## 局限性

目前只支持SQL数据库（带JPA），并有单独的服务或单独的服务实现/接口组合。
