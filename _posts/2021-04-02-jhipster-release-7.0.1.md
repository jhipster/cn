---
layout: default
title: Release 7.0.1
---

JHipster 发布 v7.0.1 版本
==================

这是JHipster v7的第一个修补程序版本：
- Vue: npm start 启动后无法刷新问题 - [#14474](https://github.com/jhipster/generator-jhipster/issues/14474)
- Reactive: 用户和权限 - [#14475](https://github.com/jhipster/generator-jhipster/issues/14475) [14482](https://github.com/jhipster/generator-jhipster/issues/14482)
- Swagger 授权异常 - [#14488](https://github.com/jhipster/generator-jhipster/issues/14488)
- 默认情况下在Angular中使用HMR - [#14555](https://github.com/jhipster/generator-jhipster/pull/14555)
- 大量的依赖库更新

关闭的工单与合并的请求
------------
一如既往, __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.0.1+is%3Aclosed)__.

更新方法
------------

**自动升级**

在原有的项目上使用 [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动更新：

首先，升级JHipster版本：

```
npm update -g generator-jhipster
```

然后运行子生成器：

```
jhipster upgrade
```

**手动升级**

同样，需要先升级您的JHipster到最新版：

```
npm update -g generator-jhipster
```

对于已经存在的项目，它仍使用原来生成该项目时的JHipster版本。
要升级项目，必须首先删除其`node_modules`文件夹，然后运行：

```
jhipster
```

您还可以通过运行以下命令来更新项目及其所有实体：

```
jhipster --with-entities
```

您还可以通过再次运行entity子生成器（jhipster entity）来逐一更新实体，例如，如果您的实体名为_Foo_，则运行：

```
jhipster entity Foo
```

**小提示**

可以使用 [prettier-java](https://github.com/jhipster/prettier-java)来格式化你的源代码，方法如下：

```
jhipster --prettier-java
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们：

- 提交Bug请到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 提交问题请到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
