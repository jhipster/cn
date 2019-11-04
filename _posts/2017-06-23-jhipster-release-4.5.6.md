---
layout: default
title: Release 4.5.6
---

JHipster release 4.5.6
==================

更新日志
----------

This is the sixth patch release for JHipster v4.5.0.

This patch release that was triggered by [this comment](https://github.com/jhipster/generator-jhipster/commit/bdc77898d184c2ad9a1b1d4acc8acf40aadc0431#commitcomment-22724306), as the previous release had an issue for all MongoDB and Cassandra entities, which made the Angular 4 code fail to compile (if you are on 4.5.5, don't worry and look at the comment, this is really a trivial fix).

This release also comes with some really awesome new features:

- After months of being stuck, our [Upgrade sub-generator is fixed!](https://github.com/jhipster/generator-jhipster/pull/5966). Many thanks to [Tien Tran](https://github.com/tientq) who fixed this! Of course there are many use cases when upgrading, and this is still very new, so feedback is **highly welcome**.
- Infinispan support for both Hibernate 2nd-level cache and Spring Cache abstraction - see [#5874](https://github.com/jhipster/generator-jhipster/issues/5874) - many thanks to [@srinivasavasu](https://twitter.com/srinivasavasu) from Red Hat! This is still in **BETA** and should be more tested, but you can already try it and send us your feedback.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.6+is%3Aclosed)__.

更新指引
------------

**自动升级**

WARNING [this has been fixed very recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

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
