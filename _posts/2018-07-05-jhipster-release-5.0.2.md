---
layout: default
title: Release 5.0.2
---

JHipster release v5.0.2
==================

This is the second patch release of JHipster 5.

It includes [81 closed tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.2+is%3Aclosed), here are the most important ones:

- Blueprint support has been greatly enhanced, and most importantly documented on the new ["Creating a blueprint" page]({{ site.url }}/modules/creating-a-blueprint/).
- Lazy-loading is now working in React thanks to [#7541](https://github.com/jhipster/generator-jhipster/pull/7541).
- Upgrades to the latest [JHipster dependencies](https://github.com/jhipster/jhipster) (including upgrades to several Java libraries in [jhipster/jhipster#80](https://github.com/jhipster/jhipster/pull/80)), to the latest [ng-jhipster](https://github.com/jhipster/generator-jhipster/pull/7920), and to Node and NPM in [#7922](https://github.com/jhipster/generator-jhipster/pull/7922).

If you are using JHipster in development mode (to [contribute to the project](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md)) please note that `yarn link` is currently [broken](https://github.com/jhipster/generator-jhipster/issues/7919). This is an issue with Yarn 1.6.0 and 17.0 (at least!), and it is currently solved if you use the Yarn nightly builds - we hope the Yarn team will do a release soon!

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.2+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

升级Jhipster版本:

```
yarn global upgrade generator-jhipster
```

然后升级子生成器:

```
jhipster upgrade
```

**手动升级**

选择手动升级, 需要先升级你的Jhipster版本:

```
yarn global upgrade generator-jhipster
```

如果你已经有了一个项目, 将会继续使用当时项目生成的Jhipster版本.
如果需要升级你的项目, 你需要先删除`node_modules`文件夹再运行:

```
jhipster
```

更新你的项目和所有的实体类

```
jhipster --with-entities
```

你也可以使用实体类子生成器挨个更新你的实体类, 例如你的实体类名字是_Foo_

```
jhipster entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

If the issue you have is an urgent bug or security issue, please:

- 在推特上联系[@java_hipster](https://twitter.com/java_hipster)
