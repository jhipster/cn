---
layout: default
title: Release 4.5.2
---

JHipster release 4.5.2
==================

更新日志
----------

This is the second patch release for JHipster v4.5.0. It corrects a few annoying issues, and prepares for our next minor release (with a focus on getting Angular 4 support out of beta).

In total, 50 bugs and PRs have been fixed, here are the most important changes:

- Upgrade to the latest Angular 4.1.3 release [#5838](https://github.com/jhipster/generator-jhipster/pull/5838)
- Hand-code the UserMapper as we don't want to force people to use MapStruct by default [#5808](https://github.com/jhipster/generator-jhipster/issues/5808)
- Fix the LoggingAspect which wasn't working anymore [#5823](https://github.com/jhipster/generator-jhipster/issues/5823)

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.2+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

```
yo jhipster:upgrade
```

Please note that with our new JHipster CLI release, the new command will be:

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
