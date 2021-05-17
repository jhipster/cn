---
layout: default
title: 发布 v4.11.0
---

JHipster release 4.11.0
==================

更新日志
----------

This release features [115 closed tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.11.0+is%3Aclosed), here are the more important ones:

- [Use jhipster-dependencies BOM](https://github.com/jhipster/generator-jhipster/pull/6509), that should greatly simplifies future application upgrades.
- [Couchbase support](https://github.com/jhipster/generator-jhipster/issues/6086), in addition to our current MongoDB and Cassandra support (and of course MySQL, PostgreSQL, MariaDB, Oracle, SQL Server!).
- [Switch back from Chromium to PhantomJS](https://github.com/jhipster/generator-jhipster/issues/6567) - this is going to impact everyone: if you ever had any issue downloading or running Puppeteer, we've switched back to our old system, which was running faster and smoother. Of course, in the long term, the plan is still to move to Puppeteer.

We also added React support as an "experimental" feature, as we know a lot of people are waiting for it:

- Please note this is **experimental**. Don't expect it to work if you use non-default options, for example.
- To enable experimental features, we have a specific `--experimental` flag: if you run `jhipster --experimental` you will have the new React option when selecting your front-end framework.
- We need help to test and finish this implementation, so don't hesitate to participate!

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.11.0+is%3Aclosed)__.

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
