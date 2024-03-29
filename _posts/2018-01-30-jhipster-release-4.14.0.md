---
layout: default
title: 发布 v4.14.0
---

JHipster release 4.14.0
==================

更新日志
----------

The big news is that this is the last 4.x release from the master branch. Starting now, our focus will be JHipster 5, and JHipster 4 will be in maintenance mode: we will do patches if necessary, but the main development work will be on JHipster 5.

For the record, JHipster 5 will focus on Spring Boot 2 and on React. Angular will still be a first-class citizen, but AngularJS will be excluded from the main project (you will still be able to use AngularJS as an external "blueprint", which is a new system that will be published with JHipster 5).

Here are the highlights of this release:

- Upgrade to Spring Security 4.2.4 to fix [CVE-2017-8030](http://spring.io/blog/2018/01/30/cve-2017-8030-spring-security-5-0-1-4-2-4-4-1-5-released) - see [#7059](https://github.com/jhipster/generator-jhipster/issues/7059)
- Migrate to the new HttpClientModule from Angular 4.3 - see [#6281](https://github.com/jhipster/generator-jhipster/issues/6281)
- Upgrade to Angular 5.2 and Bootstrap 4.0.0 - see [#7005](https://github.com/jhipster/generator-jhipster/pull/7005)
- Upgrade to Angular CLI to 1.6.6 - see [#7052](https://github.com/jhipster/generator-jhipster/pull/7052)
- Heroku deployments can now be made directly through Git - see [#7045](https://github.com/jhipster/generator-jhipster/pull/7045)
- React support is still "experimental", so you need to run `jhipster --experimental` to enable React support. This is not complete yet, but we are quickly moving forward, so you can already have a good taste of JHipster 5 here. And if you're a React expert, don't hesitate to contribute!
- Generate i18n mouseover/tooltip help from JDL comments - see [#6797](https://github.com/jhipster/generator-jhipster/issues/6797)

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.14.0+is%3Aclosed)__.

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
