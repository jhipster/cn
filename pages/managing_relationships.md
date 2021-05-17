---
layout: default
title: 管理关系
permalink: /managing-relationships/
redirect_from:
  - /managing_relationships.html
sitemap:
    priority: 0.7
    lastmod: 2019-02-07T18:40:00-00:00
---

# <i class="fa fa-sitemap"></i> 管理关系

使用JPA时，[实体子生成器]({{ site.url }}/creating-an-entity/)可以为实体之间创建关系。

## 介绍

关系仅在使用JPA时有效。如果您选择使用[Cassandra]({{ site.url }}/using-cassandra/)他们将不可用。万一你用[MongoDB]({{ site.url }}/using-mongodb/) 、 [Couchbase]({{ site.url }}/using-couchbase/)或者[Neo4j]({{ site.url }}/using-neo4j)关系具有不同的语义，但它们都可以使用。有关Couchbase和MongoDB关系的更多信息，请参阅[Couchbase和MongoDB的嵌入式实体](#embedded-entities-for-couchbase-and-mongodb)。

两个实体之间存在关系，JHipster将为生成以下代码：

- 使用JPA管理生成实体中的关系
- 创建正确的Liquibase变更日志，确认实体的关系存同步到数据库中
- 生成Angular/React前端，以便您可以在用户界面中以图形方式管理此关系

## JHipster UML与JDL Studio

本页描述如何使用标准命令行界面与JHipster建立关系。如果要创建多个实体和关系，则可能更喜欢使用图形界面工具。

在这种情况下，有三个选项可用：

- [JDL Studio](https://start.jhipster.tech/jdl-studio/), 我们的在线工具，可以使用我们特定于域的语言来创建实体和关系。
- [JHipster IDE]({{site.url}}/jhipster-ide/) ，一个插件，为流行的IDE提供JDL文件的文本编辑支持。
- 不推荐：[JHipster UML]({{ site.url }}/jhipster-uml/), 它允许您使用UML编辑器。

您可以使用`jdl`子生成器通过运行`jhipster jdl your-jdl-file.jh`从JDL文件生成具有关系的实体。

## 支持的关系

当我们使用JPA时，可以使用通常的一对多，多对一，多对多和一对一的关系：

- [<i class="fa fa-sitemap"></i>管理关联关系](#i-classfa-fa-sitemapi-managing-relationships)
  - [介绍](#presentation)
  - [JHipster UML和JDL Studio](#jhipster-uml-and-jdl-studio)
  - [可用关系](#available-relationships)
  - [双向一对多关系](#a-bidirectional-one-to-many-relationship)
  - [双向多对一关系](#a-bidirectional-many-to-one-relationship)
  - [单向多对一关系](#a-unidirectional-many-to-one-relationship)
  - [单向一对多关系](#a-unidirectional-one-to-many-relationship)
  - [同一对实体上的两个一对多关系](#two-one-to-many-relationships-on-the-same-two-entities)
  - [多对多关系](#a-many-to-many-relationship)
  - [一对一关系](#a-one-to-one-relationship)
  - [单向一对一关系](#a-unidirectional-one-to-one-relationship)
    - [使用JPA派生标识符（@MapsId）进行一对一关系](#using-jpa-derived-identifiersmapsid-for-one-to-one-relationship)
    - [将获取数据策略设置为全部抓取（FetchType.EAGER）](#setting-fetching-data-strategy-to-eager-fetchtypeeager)
  - [Couchbase和MongoDB的嵌入式实体](#embedded-entities-for-couchbase-and-mongodb)

_提示: `User`实体_

关于它的信息位于[用户实体]({{site.url}}/user-entity/) 。

**关于实体和关系生成的小警告**：在以下示例中，您会注意到在某些情况下 _可能_ 编译会失败，因为未生成目标实体，这很正常（可以忽略此警告）。

有两种方法可以避免这种情况：
- 首先生成实体，然后生成关系
- 使用JDL

---

## <a name="a-bidirectional-one-to-many-relationship"></a> 双向一对多关系

让我们从两个实体开始，一个`Owner`和一个`Car`。一位所有者可以拥有多辆汽车，一辆汽车只能拥有一位所有者。

因此，这是一种一对多关系（一个所有者有很多车），而另一侧是多对一的关系（多辆汽车车主是一位）：

    Owner (1) <-----> (*) Car
    
我们将先创建`Owner`。以下是与`Owner`创建时JHipster提出的问题：

    jhipster entity Owner
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? owner

请注意，我们选择使用默认的关系名称。

现在我们生成 `Car`：

    jhipster entity Car
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Owner
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with Angular, which field from 'Owner' do you want to use? id


使用下面的JDL语句也可以实现相同的目的

    entity Owner
    entity Car

    relationship OneToMany {
      Owner{car} to Car{owner}
    }

就是这样，您现在在这两个实体之间建立了一对多关系！在生成的Angular/React前端UI上，您将在`Car`下拉菜单中选择`Owner`。

## <a name="a-bidirectional-many-to-one-relationship"></a> 双向多对一关系

在反转JDL文件中的边之后，这等效于双向一对多关系：

    entity Owner
    entity Car

    relationship ManyToOne {
      Car{owner} to Owner{car}
    }


## <a name="a-bidirectional-many-to-one-relationship"></a> 单向多对一关系

在前面的示例中，我们有一个双向关系：从`Car`实例中可以找到它的所有者，从`Owner`实例中可以得到它的所有汽车。

多对一的单向关系意味着汽车知道其所有者，但反向不行。

    Owner (1) <----- (*) Car

您之所以会建立这种关系，有两个原因：

- 从业务角度来看，您以这种方式来使用实体。因此，您不希望拥有一个允许开发人员执行无意义的操作的API。

- 使用 `Owner`实体时，您可以获得很小的性能提升（因为它不必管理汽车实体数据的采集）。

在这种情况下，您仍将首先创建`Owner`，但这一次没有指定关系：

    jhipster entity Owner
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? No

然后 `Car`实体，与上一个示例一样：

    jhipster entity Car
    ...
    Generating relationships with to entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Owner
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with Angular, which field from 'Owner' do you want to use? id

这将与上一个示例相同，但是您将无法从`Owner`实体中添加或删除汽车。在生成的Angular/React前端UI上，您将在`Car`下拉菜单中选择`Owner`。

这是相应的JDL：

    entity Owner
    entity Car

    relationship ManyToOne {
      Car{owner} to Owner
    }


## <a name="a-unidirectional-one-to-many-relationship"></a> 单向一对多关系

一对多的单向关系意味着`Owner`实例可以获取其汽车集合，但反向不行。与前面的示例相反。

    Owner (1) -----> (*) Car

目前，JHipster中默认不提供这种类型的关系，有关更多信息，请参见[#1569](https://github.com/jhipster/generator-jhipster/issues/1569)。

You have two solutions for this:
您有两种解决方案：

- 进行双向映射，并且无需修改即可使用：这是我们推荐的方法，因为它更简单
- 进行双向映射，然后对其进行修改以将其转换为单向映射：
    - 删除`@OneToMany`注解上的"mappedBy"属性
    - 生成所需的联接表：您可以执行`mvn liquibase:diff`来生成该表，请参阅[有关使用Liquibase diff的文档]({{ site.url }}/development/)

JDL不支持此功能，因为JHipster中不支持。

## <a name="two-one-to-many-relationships-on-the-same-two-entities"></a> 同一对实体上的两个一对多关系

对于此示例，一个`Person`可以是许多汽车的所有者，还可以是许多汽车的驾驶员：

    Person (1) <---owns-----> (*) Car
    Person (1) <---drives---> (*) Car

为此，我们需要使用关系名称，我们在前面的示例中保留了它们的默认值。

生成`Person`实体，该实体与`Car`实体具有两个一对多的关系：

    jhipster entity Person
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? ownedCar
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? owner
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? drivedCar
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? driver

生成`Car`实体，该实体使用与`Person`实体中配置中相同的关系名称：

    jhipster entity Car
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Person
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with Angular, which field from 'Person' do you want to use? id
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Person
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with Angular, which field from 'Person' do you want to use? id

使用下面的JDL也可以实现相同的目的

    entity Person
    entity Car

    relationship OneToMany {
      Person{ownedCar} to Car{owner}
    }

    relationship OneToMany {
      Person{drivedCar} to Car{driver}
    }

现在，`Car`可以具有驾驶员和所有者，这两者都是`Person`实体。在生成的Angular/React前端UI上，您将在`Car`下拉菜单中选择`owner`字段和`driver`字段的`Person`。

## <a name="a-many-to-many-relationship"></a> 多对多关系

`Driver`可以驾驶许多汽车，但是 `Car`也可以具有许多驾驶员。

    Driver (*) <-----> (*) Car

在数据库视角，这意味着我们将在`Driver`表和`Car`表之间有一个联接表。

对于JPA，这两个实体之一需要管理该关系：在我们的示例中，是`Car`实体，它将负责添加或删除驾驶员。

请注意，生成实体后，生成器将通知您在生成文件时发生了一些错误。 这是正常的，因为尚未生成目标实体，因此您可以放心地忽略此警告。

让我们生成具有多对多关系的关系的非所有权方`Driver`：

    jhipster entity Driver
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? many-to-many
    ? Is this entity the owner of the relationship? No
    ? What is the name of this relationship in the other entity? driver

然后生成`Car`，具有多对多关系的所有权：

    jhipster entity Car
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Driver
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? many-to-many
    ? Is this entity the owner of the relationship? Yes
    ? What is the name of this relationship in the other entity? car
    ? When you display this relationship on client-side, This field will be displayed as a String, so it cannot be a Blob id

使用下面的JDL也可以实现相同的目的

    entity Driver
    entity Car

    relationship ManyToMany {
      Car{driver} to Driver{car}
    }

就是这样，您现在在这两个实体之间建立了多对多关系！在生成的Angular/React前端UI上，您将在`Car`中有一个多选下拉菜单，以选择多个`Driver`，因为`Car`是拥有方。

## <a name="a-one-to-one-relationship"></a> 一对一关系

按照我们的示例，一对一关系意味着`Driver`只能驾驶一辆`Car`，而一辆`Car`只能拥有一名`Driver`。

    Driver (1) <-----> (1) Car

让我们创建关系中的非所有权方，在我们的示例中是`Driver`：

    jhipster entity Driver
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? No
    ? What is the name of this relationship in the other entity? driver

然后生成拥有关系的`Car`：

    jhipster entity Car
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Driver
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? Yes
    ? Do you want to use JPA Derived Identifier - @MapsId? No
    ? What is the name of this relationship in the other entity? car
    ? When you display this relationship on client-side, which field from 'Driver' do you want to use? This field will be displayed as a String, so it cannot be a Blob id

使用下面的JDL也可以实现相同的目的

    entity Driver
    entity Car

    relationship OneToOne {
      Car{driver} to Driver{car}
    }

就是这样，您现在在这两个实体之间建立了一对一的关系！在生成的Angular/React前端用户界面上，您会在`Car`下拉菜单中选择一个`Driver`，因`Car`是拥有方。

[有关与JPA派生标识符一对一使用的更多信息](#using-jpa-derived-identifiersmapsid-for-one-to-one-relationship)

## <a name="a-unidirectional-one-to-one-relationship"></a> 单向一对一关系

单向一对一关系意味着`citizen`实例可以获取其护照，但`passport`实例无法获取其所有者。

    Citizen (1) -----> (1) Passport

首先生成`Passport`实体，与其所有者没有任何关系：

    jhipster entity Passport
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? No

然后, 生成`Citizen`实体:

    jhipster entity Citizen
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Passport
    ? What is the name of the relationship? passport
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? Yes
    ? Do you want to use JPA Derived Identifier - @MapsId? No
    ? What is the name of this relationship in the other entity? citizen
    ? When you display this relationship with Angular, which field from 'Passport' do you want to use? id

完成此操作后，`Citizen`拥有护照，但是在`Passport`中未定义任何`Citizen`实例。在生成的Angular/React前端UI上，由于`Citizen`是拥有者，因此`Citizen`中将出现一个下拉列表以选择`Passport`。
这是相应的JDL：

    entity Citizen
    entity Passport

    relationship OneToOne {
      Citizen{passport} to Passport
    }

### <a name="using-jpa-derived-identifiersmapsid-for-one-to-one-relationship"></a>  使用JPA派生标识符（@MapsId）进行一对一关系
  
  
[JPA派生标识符](https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapsId.html)可提供[最高效的映射](https://vladmihalcea.com/the-best-way-to-map-a-onetoone-relationship-with-jpa-and-hibernate/)。

这是前面的单向一对一示例的相应JDL：

    entity Citizen
    entity Passport

    relationship OneToOne {
      Citizen{passport} to Passport with jpaDerivedIdentifier 
    }

这是前面的双向一对一示例的相应JDL：

    entity Driver
    entity Car

    relationship OneToOne {
      Car{driver} to Driver{car} with jpaDerivedIdentifier 
    }

但是，根据业务需求，在某些情况下可能应避免这种情况，因为它具有以下约束：
**一旦在拥有方设置了id（主键），就无法使用JPA/Hibernate对其关联值进行修改。无论如何，您都不应对其进行变更。**
-
**以下是有关用法的一些建议：**

在以下情况下使用`@MapsId`：

* 从属-拥有方（子实体）紧密依赖于非拥有方（父实体）。

* 关联值永远都不会改变-如果您一旦设置了子实体的ID（主键）就永远不会改变。

    例如,

    ```
    class User{}
    class Profile{ @OneToOne @MapsId private User user; } // 个人资料仅适用于该用户
    class Preferences{ @OneToOne @MapsId private User user; } // 首选项仅适用于该用户
    ```

    为用户创建个人资料或首选项后，它将永远不会更改为其他用户。

在以下情况下，请勿使用 `@MapsId`：
* 不依赖-如果拥有方（子实体）似乎不依赖于非拥有方（父实体）
* 关联值是可以更改的-如果您认为子实体将来会引用另一个父实体。

    例如,

    ```
    class Car{ @OneToOne @JoinColumn(name="id") Driver currentDriver} // 将来可以由其他驾驶员驾驶汽车
    class Driver{@OneToOne @JoinColumn(name="id") Car drivingCar} // 驾驶员将驾驶其他汽车
    ```
    汽车和驾驶员的关联值都可能在将来发生变化。

**注意：[已知存在一个关于一起使用`@OneToOne`与`@MapsId`的问题，以及如何避免使用它们](https://www.jhipster.tech/tips/026_tip_issue_of_onetoone_with_mapsid_how_to_avoid_it.html)。**

### 将获取数据策略设置为全部抓取（FetchType.EAGER）

所有关系都使用默认的JPA抓取策略：
- 一对多：LAZY
- 多对一：EAGER
- 多对多：LAZY
- 一对一：EAGER

由于FetchType.EAGER，存在一个[JSON反序列化期间存在NPE的已知问题](https://github.com/jhipster/generator-jhipster/issues/10981) 。 如果要将`OneToMany`或`ManyToMany`关系设置为`FetchType.EAGER`，则可以使用以下解决方案之一： 

- 使用 ```@JsonInclude(JsonInclude.Include.NON_EMPTY)``` 在关系上

  如：

    ```
    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Child> child = new HashSet<>();
    ```
- 如果在后端获取资源时集合为空，则返回null
- 使用DTO处理空集合的边缘情况

### Couchbase和MongoDB的嵌入式实体

Couchbase和MongoDB通过嵌入式文档支持关系。 有关MongoDB中嵌入式文档的更多信息，请参考[https://docs.mongodb.com/manual/applications/data-models-relationships/](https://docs.mongodb.com/manual/applications/data-models-relationships/) 和有关Couchbase的信息，请参考[https://docs.couchbase.com/server/5.1/data-modeling/modeling-relationships.html](https://docs.couchbase.com/server/5.1/data-modeling/modeling-relationships.html) 。

您可以简单地通过使用@embedded来定义嵌入式文档。 例如定义一对一的关系；

```
entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship OneToOne {
  Country to Region
}
```

同样，对于一对多关系，

```
entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship OneToMany {
  Country to Region
}
```

对于多对多关系，您可以简单地双向使用`@ embedded`关键字。

```
@embedded
  entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship ManyToMany {
  Country to Region
}
```