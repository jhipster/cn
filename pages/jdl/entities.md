---
layout: default
title: JHipster领域语言 (JDL) - 实体和属性
permalink: /jdl/entities-fields
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster领域语言 (JDL) - 实体和属性

## 概要

1. [语法](#语法)
1. [示例](#示例)
   1. [简单例子](#简单例子)
   1. [自定义表名](#自定义表名)
   1. [属性](#属性)
   1. [属性校验](#属性校验)
   1. [声明二进制](#声明二进制)
   1. [正则表达式](#正则表达式)
   1. [注释](#注释)
1. [字段类型和校验](#字段类型和校验)

---

### 语法

实体声明如下：
```
[<entity javadoc>]
[<entity annotation>*]
entity <entity name> [(<table name>)] {
  [<field javadoc>]
  [<field annotation>*]
  <field name> <field type> [<validation>*]
}
```

  - `<entity name>` 实体名称，
  - `<field name>` 实体属性名称，
  - `<field type>` JHipster支持的属性类型，
  - 以下为可选项：
    - `<entity javadoc>` 实体描述，
    - `<entity annotation>`  实体的选项（有关可用选项的完整列表，请参见[选项][]），
    - `<table name>` 数据库表名称（如果要指定与实体名称自动转换不同的名称），
    - `<field javadoc>` 属性描述，
    - `<field annotation>` 属性的选项，
    - `<validation>` 属性的校验规则。

---

### 示例

### 简单例子

```jdl
entity A
```

这等效于：

```jdl
entity A(a) {}
```

前者是一种较简单的形式，没有指定"主体"（字段的大括号）和表名。

---

#### 自定义表名

也可以指定自定义表名称：

```jdl
 entity A(my_super_entity)
```

---

#### 属性

```jdl
entity A {
  name String required
  age Integer
}
```

---

#### 属性校验

```jdl
entity A {
  name String required
  age Integer min(42) max(42)
}
```

---

#### 声明二进制

JHipster提供了一个不错的选择，因为可以在图像类型或任何二进制类型之间进行选择。 JDL允许您执行相同的操作。
使用编辑器创建一个自定义类型（请参阅DataType），并根据以下约定为其命名：
  - `AnyBlob` 或 `Blob` 创建一个"任意"的二进制类型的字段；
  - `ImageBlob` 创建一个图像的字段。
  - `TextBlob` 为CLOB（长文本）创建一个字段。

而且，您可以根据需要创建任意数量的数据类型。

---

#### 正则表达式

这是一个确定的验证（仅适用于String类型），其语法为：

```jdl
entity A {
  name String pattern(/^[A-Z][a-z]+\d$/)
}
```

让我们分解一下：
  - `pattern` 是用于声明正则表达式验证的关键字（使用常规括号）
  - `/.../` 该模式在两个斜杠内声明
  - `\` 反斜杆不需要进行转义

---

#### 注释

可以在JDL中对实体和字段进行注释，并且注释会生成文档（Javadoc或JSDoc，取决于后端）。

```jdl
/**
 * This is a comment
 * about a class
 * @author Someone
 */
entity A {
  /**
   * This comment will also be used!
   * @type...
   */
   name String
   age Integer // this is yet another comment
}
```

这些注释稍后将由JHipster添加为Javadoc注释。 JDL拥有自己的注释类型：
  - // an ignored comment
  - /** not an ignored comment */

因此，以`//`开头的任何内容都被视为JDL的内部注释，因此不会被视为Javadoc。
请注意，在解析期间，以`＃`开头的JDL Studio指令将被忽略。

注释的另一种形式是以下注释：
```
entity A {
  name String /** My super field */
  count Integer /** My other super field */
}
```

在这里，A的名称将用 `My super field`注释，B则用 `My other super field`注释。

是的，逗号不是强制性的，但最好不要使用逗号，以免在代码中出错。
**如果您想混合使用逗号和以下注释，请当心！**
```
entity A {
  name String, /** My comment */
  count Integer
}
```
A的名字将没有注释（because the count will）。

---

### 字段类型和校验

每个字段类型都有其自己的校验列表。 以下是JDL支持的类型：

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL类型</th>
    <th>校验规则</th>
  </tr>
  <tr>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern, unique</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>required, unique</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Instant</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Duration</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>UUID</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
</table>

[选项]: 选项#可用选项 "选项"
