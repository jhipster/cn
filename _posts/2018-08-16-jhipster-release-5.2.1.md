---
layout: default
title: Release 5.2.1
---

JHipster release v5.2.1
==================

JHipster v5.2.1 has the following 2 important changes:

- Fix OAuth2 authentication for microservices, which was broken in 5.2.0 [#8092](https://github.com/jhipster/generator-jhipster/issues/8092).
- Upgrade to NG Bootstrap 3.0 [#8094](https://github.com/jhipster/generator-jhipster/pull/8094).

It also comes with our new "statistics" code: when asked if you want to send us anonymous statistics, please answer "Yes" so you can help us improve the generator.

We will then deploy our new "statistics" endpoint on [https://start.jhipster.tech/](https://start.jhipster.tech/), and we will publicly provide usage reports. We hope this will help everyone (and not just us) in their technology choices, as we should have usage data from thousands of real-world applications.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.2.1+is%3Aclosed)__.

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
