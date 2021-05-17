---
layout: default
title: 发布 v4.13.1
---

JHipster release 4.13.1
==================

更新日志
----------

This is an emergency patch release to fix the [broken 'prod' profile build](https://github.com/jhipster/generator-jhipster/issues/6910) using Angular.

Please note that:

- This bug also affects both Angular ([here is the ticket](https://github.com/angular/angular/issues/21173)) and Angular CLI ([here is the ticket](https://github.com/angular/angular-cli/issues/8997)). So JHipster users are lucky as we solved this quicker than both Angular and Angular CLI, and provide the only working Angular "prod" build at the moment :-)
- This bug comes from uglify-es, which is a transitive dependency pulled by uglifyjs-webpack-plugin. This is why our [Policy 4](https://www.jhipster.tech/policies/) is to fix dependencies, but we can't force our dependencies to do the same. Of course we did a [Pull Request to the uglifyjs-webpack-plugin project](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/pull/199) to solve this on their side, but they haven't merged it yet.

Many thanks to [@pascalgrimaud](https://twitter.com/pascalgrimaud) who found the bug, and corrected it!

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.13.1+is%3Aclosed)__.

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

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
