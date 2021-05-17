---
layout: default
title: JHipster 领域语言 (JDL) - 答疑解惑
permalink: /jdl/troubleshooting
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 领域语言 (JDL) - 答疑解惑

## 答疑解惑

我们试图使语法对开发人员尽可能友好。
您可以使用它来执行以下操作：
  - 声明应用程序及其选项和实体，
  - 声明实体及其属性，
  - 声明他们之间的关系，
  - 并声明一些特定于JHipster的选项。

如果您想查看JDL的语法，则可以使用HTML文件
[JDL的语法](https://github.com/jhipster/jhipster-core/blob/master/lib/dsl/gen/grammar.html).

---

### 匹配微服务 baseName时，JDL导入仅找到一个实体

这是有关解析系统的已知问题，解决它很棘手。
解决方法是对微服务和内部实体使用不同的名称。

查看 [JHipster Core 议题 #308](https://github.com/jhipster/jhipster-core/issues/308) 了解详细内容。

---

## <a name="issues"></a>问题与错误

JDL在[GitHub](https://github.com/jhipster/jhipster-core), 并遵循相同的
[JHipster贡献准则]( https://github.com/jhipster/generator-jhipster/blob/main/CONTRIBUTING.md).

请使用我们的项目提交有关库本身的问题和PR。

- [JDL问题](https://github.com/jhipster/jhipster-core/issues)
- [JDL合并请求](https://github.com/jhipster/jhipster-core/pulls)

提交任何内容时，您都必须尽可能精确：
  - **一个已issue只能有一个问题** (or one demand/question);  
  - 受欢迎提交合并请求，但提交必须是“原子的”真正可理解的。 
