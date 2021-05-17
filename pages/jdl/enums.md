---
layout: default
title: JHipster 领域语言 (JDL) - 枚举
permalink: /jdl/enums
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 领域语言 (JDL) - 枚举

## 概要

1. [语法](#语法)
1. [示例](#示例)
   1. [简单例子](#简单例子)
   1. [声明值](#声明值)
   1. [注释](#注释)

---

### 语法

枚举声明如下：

```
enum [<enum name>] {
  <ENUM KEY> ([<enum value>])
}
```

  - 枚举项是必须定义的
    - 并且必须使用大写键
  - 枚举项的值是可选的，并且必须用括号括起来

---

### 示例

### 简单例子

```jdl
enum Country {
  BELGIUM,
  FRANCE,
  ITALY
}
```

And its use:

```jdl
enum Country {}

entity A {
  country Country
}
```

---

#### With values

从JHipster Core v6开始，枚举值可以具有显式值：

```jdl
enum Country {
  BELGIUM (Belgium),
  FRANCE (France),
  ITALY (Italy)
}
```

---

#### 注释

就像关系，实体和字段一样，枚举也可以使用相同的规则进行注释。

稍后，JHipster会将注释作为Javadoc注释添加。 JDL拥有自己的注释类型：
  - // an ignored comment
  - /** not an ignored comment */

因此，以`//`开头的任何内容都被视为JDL的内部注释，因此不会被视为Javadoc。
请注意，在解析时，以`＃`开头的JDL Studio指令将被忽略。

```jdl
/** This comment will be taken into account */
enum Country {
  // But not this one!
  FRANCE
}
```
