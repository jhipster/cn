---
layout: default
title: Release 4.2.0
---

JHipster release 4.2.0
==================

更新日志
----------

The biggest news in JHipster 4.2.0 is that we migrated to the freshly-released Angular 4! This includes AOT support inside JHipster, which provides an important performance enhancements - have a look at the [Angular cookbook on AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) if you need more information.

Angular 4 is still in BETA, but the final release is getting closer and closer. We now have quite a lot of people using it, with some very good results. Our biggest remaining work is to provide a "production" build as good as the AngularJS 1 (in fact, thanks to AOT, it should be much, much better!!). So you can start developing Angular 4 applications with confidence, and prepare to upgrade your JHipster version when we have finished the production build.

Other really cool features are:

- [ELK 5](https://www.elastic.co/fr/v5) and [Zipkin](http://zipkin.io/) support in our microservices architecture by [Pierre Besson](https://twitter.com/pibesson) - beware, the new dashboards are gorgeous :-)
- [Rancher](http://rancher.com/rancher/) support by [Steve Houël](https://twitter.com/SteveHouel), documentation should be available in the next few days.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.2.0+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

```
yo jhipster:upgrade
```

**手动升级**

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

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
