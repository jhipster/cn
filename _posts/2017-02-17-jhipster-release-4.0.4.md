---
layout: default
title: Release 4.0.4
---

JHipster release 4.0.4
==================

更新日志
----------

This is the fourth patch release for JHipster 4.0.0, with 54 bug fixes and tickets closed.

There are 2 important changes to notice:

- We now have HTTP/2 support thanks to top hipster [Matt Raible](https://twitter.com/mraible). Configuration is available in the `application-*.yml` files, with a new JHipsterProperties entry.
- For Angular 2+ users, we used to have a `jhiHasAuthority` and a `jhiHasAnyAuthority` directives, which basically did the same thing, so now only the `jhiHasAnyAuthority` directive is available.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.0.4+is%3Aclosed)__.

更新指引
------------

**手动升级 (works for JHipster 4.x applications)**

选择手动升级, 需要先升级你的Jhipster版本:

```
yarn global upgrade generator-jhipster
```

如果你已经有了一个项目, 将会继续使用当时项目生成的Jhipster版本.
如果需要升级你的项目, 你需要先删除`node_modules`文件夹再运行:

```
yo jhipster
```

更新你的项目和所有的实体类

```
yo jhipster --with-entities
```

你也可以使用实体类子生成器挨个更新你的实体类, 例如你的实体类名字是_Foo_

```
yo jhipster:entity Foo
```

**自动升级 only works for JHipster 3.x applications**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

```
yo jhipster:upgrade
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

If the issue you have is an urgent bug or security issue, please:

- 在推特上联系[@java_hipster](https://twitter.com/java_hipster)
