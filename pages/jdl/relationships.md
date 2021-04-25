---
layout: default
title: JHipster 领域语言 (JDL) - 关联关系
permalink: /jdl/relationships
sitemap:
    priority: 0.5
    lastmod: 2019-11-03T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 领域语言 (JDL) - 关联关系

## 概要

1. [关联类型](#关系类型)
1. [关系方法](#关系方法)
1. [多个关系体](#多个关系体)
1. [语法](#语法)
1. [示例](#示例)
   1. [简单例子](#简单例子)
   1. [关系属性名](#关系属性名)
   1. [与属性（字段）联合](#与属性（字段）联合)
   1. [方法使用](#方法使用)
   1. [非空设置](#非空设置)
   1. [自反关系](#自反关系)
   1. [注释](#注释)

---

### 关系类型

在`relationship`关键字之后是以下内容。

有四种关系类型：
  - `OneToOne`
  - `OneToMany`
  - `ManyToOne`
  - `ManyToMany`

要了解有关关系以及可能实现的更多信息，可以前往[关联关系](/managing_relationships).

关于复数名称的说明：JHipster会处理它们，这样您就不必在关系中处理了。

---

### 关系方法

在源实体和目标实体之后是关系方法，与`with`关键字一起使用。

支持的方法：
  - `jpaDerivedIdentifier`: `@MapsId` 用于关联关系 (**仅适用于OneToOne**)

---

### 多个关系体

如果您厌倦了JDL文件中具有相同类型的关系声明，请不用担心！ 有一个解决方案。

以这个JDL示例为例：
```jdl
relationship OneToOne {
  A to B
}
relationship OneToOne {
  B to C
}
relationship OneToOne {
  C to D
}
relationship OneToOne {
  D to A
}
```

该解决方案由具有每一种关系体内的关系的声明，如下所示：
```jdl
relationship OneToOne {
  A to B,
  B to C,
  C to D,
  D to A
}
```

在以下情况下，此语法非常有用：
  - 你有许多相同类型的关系，
  - 你想知道这些关系是什么，
  - 你不想浪费时间在JDL文件中寻找它们

---

### 语法

关系声明如下：
```
relationship (OneToMany | ManyToOne | OneToOne | ManyToMany) {
  <from entity>[{<relationship name>[(<display field>)]}] to <to entity>[{<relationship name>[(<display field>)]}]+
}
```

  - `(OneToMany | ManyToOne| OneToOne | ManyToMany)` 是你的关系类型
  - `<from entity>` 是关系的实体所有者的名称：源实体，
  - `<to entity>` 是关系要到达的实体的名称：目的实体，
  - `<relationship name>` 是具有另一端类型的属性名称，
  - `<display field>` 是应显示在选择框中的字段名称（默认值：`id`），
  - `required` 引入的关系属性是否不能为空。
  - `with jpaDerivedIdentifier` 或 `@MapsId` 用于关联关系 (仅适用于一对一（one-to-one）
  - 而且您可以拥有多个关系主体
    - 可以查看 [多关系主体](#多关系主体) 部分以获取更多信息！

---

### 示例

### 简单例子

```jdl
relationship OneToOne {
  A to B
}
```

请注意，此示例与以下示例相同：
```jdl
relationship OneToOne {
  A{b} to B
}
```

不指定引入属性名是使用具有单向关系的简短形式。

---

#### 关系属性名

```jdl
relationship ManyToMany {
  A{b} to B{a}
}
```

这是一种双向关系，这意味着两个实体将在另一个实体的"实例"下生成实体。

---

#### 与属性（字段）联合

用于指定实体中的哪一列用于join联接（默认为`id`）。

```jdl
relationship OneToOne {
  A{b(name)} to B{a(name)}
}
```

它大致翻译为SQL： `JOIN B b with a.name = b.name`

---

#### With 方法

```jdl
relationship OneToOne {
  A to B with jpaDerivedIdentifier
}
```

---

#### 非空的设置

用于使至少需要一个关系。

```jdl
relationship ManyToMany {
  A{b required} to B{a}
}

// or

relationship ManyToMany {
  A{b} to B{a required}
}

or

relationship ManyToMany {
  A{b(name) required} to B{a required}
}
```

---

#### 自反关系

自反关系是指源实体和目标实体相同的关系。

```jdl
relationship ManyToMany {
  A{parent} to A{child}
}
```

---

#### 关于自反性关系中非空设置的说明

如前所述 [此外](https://github.com/jhipster/generator-jhipster/issues/11495)，不支持与同一实体的非空设置。 问题是，一个child必须**总是**有一个父母，而parent又必须也有一个child，等等。
一个可能的解决方法是拥有显式的根实体和子实体。

----

#### 注释

可以为关系添加注释：

```jdl
relationship OneToOne {
  /** This comment will be put before b in entity A*/
  A{b}
  to
  /** This comment will be put before a in entity B*/
  B{a}
}
```

此处应用了相同的注释规则。
这些注释稍后将由JHipster添加为Javadoc注释。 JDL拥有自己的注释类型：
  - // an ignored comment
  - /** not an ignored comment */

因此，以`//`开头的任何内容都被视为JDL的内部注释，因此不会被视为Javadoc。
请注意，在解析期间，以`＃`开头的JDL Studio指令将被忽略。
