---
layout: default
title: 筛选
permalink: /entities-filtering/
sitemap:
    priority: 0.7
    lastmod: 2017-08-22T00:00:00-00:00
---

# <i class="fa fa-filter"></i> 筛选实体

## 介绍

在为实体实现基本的CRUD功能之后，非常常见的请求是为实体的属性创建各种过滤器，因此可以更有效地使用服务。
这些过滤器应作为请求参数发送，因此任何前端-和任何浏览器-都可以使用它。
此外，这些过滤器应遵循合理而简洁的模式，并且必须允许它们自由组合。

## 如何激活

使用`jhipster entity`命令生成实体时，请选择服务或服务实现以对此实体启用过滤。

如果要启用对现有实体的过滤，可以通过将`service`从`no`设置为`serviceClass`或`serviceImpl`并将`jpaMetamodelFiltering`设置为`true`，然后使用`jhipster entity <entity name>`>重新生成，来修改项目`.jhipster`目录中的实体配置。

使用JDL时，请在您的JDL文件中添加一行`filter <entity name>`，然后使用`jhipster import-jdl`命令重新导入定义。

## 公共接口

对于每个实体，您可以在实体生成器中启用过滤，然后，可以使用以下参数调用`/api/my-entity`GET端点：

* 对于每个*xyz*字段
    * *xyz.equals=someValue*
        - 列出所有xyz等于'someValue'的实体
    * *xyz.in=someValue,otherValue*
        - 列出所有xyz等于'someValue'或'otherValue'的实体
    * *xyz.specified=true*
        - 列出所有xyz不为null的实体
    * *xyz.specified=false*
        - 列出所有xyz为null的实体
* 如果*xyz*类型为字符串:
    * *xyz.contains=something*
        - 列出所有实体，其中xyz包含'something'
* 如果*xyz*是任何数字类型或日期类型
    * *xyz.greaterThan=someValue*
        - 列出所有实体，其中xyz大于'someValue'
    * *xyz.lessThan=someValue*
        - 列出所有实体，其中xyz小于'someValue'
    * *xyz.greaterOrEqualThan=someValue*
        - 列出所有实体，其中xyz大于或等于'someValue'
    * *xyz.lessOrEqualThan=someValue*
        - 列出所有实体，其中xyz小于或等于'someValue'

它们可以自由组合。

体验此过滤器API的表达力的一种好方法是在JHipster应用程序的API文档页面的swagger-ui中使用它。

![]({{ site.url }}/images/entities_filtering_swagger.png)

## 实现

启用此功能后，将生成一个名为`EntityQueryService`和`EntityCriteria`的新服务。Spring会将请求参数转换为`EntityCriteria`类的字段。

在`EntityQueryService`中，我们将条件对象转换为静态对象、类型安全的JPA查询对象。为此，**需要**在构建中**启用静态元模型生成**。有关详细信息，请参见[JPA静态元模型生成器文档](http://docs.jboss.org/hibernate/orm/current/topical/html_single/metamodelgen/MetamodelGenerator.html)。

为了证明所生成的条件是正确的，并且Spring配置正确，对`EntityResourceIntTest`进行了扩展，增加了许多测试用例，每个过滤器一个测试用例。

### Angular
使用Angular时，利用此有用功能的正确方法如下所示：
* Equals (`contains` 和 `notEquals`相同)
```javascript
this.bookService.query({'title.equals':someValue}).subscribe(...);
```
* greaterThan (同样适用于`lessThan`、`greaterOrEqualThan`、`lessOrEqualThan`，数据类型`date` 和 `number` 适用)
```javascript
this.bookService.query({'id.greaterThan':value}).subscribe(...);
this.bookService.query({'birthday.lessOrEqualThan':value}).subscribe(...);
```
* In (同样适用于`notIn`)
```javascript
this.bookService.query({'id.in':[value1, value2]}).subscribe(...);
```
* Specified
```javascript
this.bookService.query({'author.specified':true}).subscribe(...);
```

## 局限性

当前，仅支持SQL数据库（带有JPA）以及单独的服务或单独的服务实现/接口组合。
