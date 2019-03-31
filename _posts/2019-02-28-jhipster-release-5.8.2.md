---
layout: default
title: 版本 5.8.2
---

JHipster 发布版本 5.8.2
==================

我们正在准备 JHipster 6，JHipster 5 目前处于维护模式，这个版本是 JHipster 5 的一个补丁。

此版本解决了[这些问题](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.8.2+is%3Aclosed), 其中最主要的是一个会使JHipster模块崩溃的错误.

此外还有一些库升级，比如 [React 中用到的 Jest](https://github.com/jhipster/generator-jhipster/commit/5f1ae61a8a52fdcc5bba8307ff3fd057fc9d2037) 和 [Angular](https://github.com/jhipster/generator-jhipster/commit/154326fc2c72358163fed917a762e30b70c3412e).

已完成的工单 （closed tickets） 和 已合并的拉回请求 pull requests
------------
像往常一样, __[您可以在这里查看所有已完成的工单和已合并的拉回请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.8.2+is%3Aclosed)__。

如何升级
------------

**自动升级**

自动升级是指在已有的应用程序上使用 [JHipster 升级（upgrade）子生成器（sub-generator）]({{ site.url }}/upgrading-an-application/)：

首先，升级您的 JHipster 版本：

```
npm update -g generator-jhipster
```

再运行升级子生成器：

```
jhipster upgrade
```

**手动升级**

手动升级首先需要您升级您的 JHipster 版本：

```
npm update -g generator-jhipster
```

已有的项目使用它当时生成时的版本。如果您希望它升级，您需要先删除它的 `node_modules` 文件夹然后运行以下命令：

```
jhipster
```

您也可以用这个命令更新您的应用程序和它的所有实体：

```
jhipster --with-entities
```

当然您也可以通过再次运行实体子生成器逐个更新您的实体，比如，如果您有个叫做 _Foo_ 的实体

```
jhipster entity Foo
```

帮助和错误
--------------

如果您发现此版本有任何问题，请不要犹豫：

- 添加错误到我们的 [错误跟踪器](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 在 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info) 上发布问题

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系 [@java_hipster](https://twitter.com/java_hipster)
