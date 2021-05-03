---
layout: default
title: 创建实体
sitemap:
priority: 0.5
lastmod: 2021-01-07T08:40:00-00:00
---

# 创建实体

## 介绍

JHipster Quarkus实体创建允许生成

* 数据库表
* Liquibase变更集
* JPA实体
* Quarkus Panache活动记录或存储库
* Resteasy控制器，具有基本的CRUD操作
* 数据传输对象（DTO）
* 分页
* 测试

并将客户端组件生成委托给JHipster

### 例子

```
$ jhipster-quarkus entity Book
INFO! Using JHipster version installed locally in current project's node_modules
INFO! No custom sharedOptions found within blueprint: generator-jhipster-quarkus at /Users/daniel/workspace/jhipster/jhipster-eleven/node_modules/generator-jhipster-quarkus
INFO! No custom commands found within blueprint: generator-jhipster-quarkus at /Users/daniel/workspace/jhipster/jhipster-eleven/node_modules/generator-jhipster-quarkus
INFO! Executing jhipster:entity Book
     info Using blueprint generator-jhipster-quarkus for entity subgenerator

The entity Book is being created.


Generating field #1

? Do you want to add a field to your entity? Yes
? What is the name of your field? isbn
? What is the type of your field? String
? Do you want to add validation rules to your field? Yes
? Which validation rules do you want to add? Required

================= Book =================
Fields
isbn (String) required


Generating field #2

? Do you want to add a field to your entity? No

================= Book =================
Fields
isbn (String) required


Generating relationships to other entities

? Do you want to add a relationship to another entity? No

================= Book =================
Fields
isbn (String) required



? Do you want to use separate repository class for your data access? No, the Entity will be used as an Active Record
? Do you want to use separate service class for your business logic? No, the REST controller should use the active record/repository directly
? Do you want pagination on your entity? Yes, with pagination links

Everything is configured, generating the entity...
```

## JHipster UML 和 JDL Studio

JHipster Quarkus支持JDL导入。
请参考以下内容中相应的JHipster UML和JDL Studio部分： *[创建实体](http://localhost:4000/creating-an-entity/)* 。