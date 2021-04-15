---
layout: default
title: Release 5.4.1
---

JHipster release v5.4.1
==================

This patch release comes with 15 fixed issues and closed pull requests, including [3 bug bounties](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.1+is%3Aclosed+label%3A%24100) that were paid thanks to our [bug bounty program](https://www.jhipster.tech/bug-bounties/). If your company benefits from JHipster, wants great visibility in our community, or wants the ability to choose which tickets deserve bug bounties, please consider [sponsoring the project](https://www.jhipster.tech/sponsors/).

This fixes a few minor issues, including:

- JHipster 5.4.0 doesn't use correct userId type for relationships with OAuth 2.0 ([#8454](https://github.com/jhipster/generator-jhipster/issues/8454))
- One CVE on MySQL connector (and a couple of false positives when testing for CVEs) ([#8452](https://github.com/jhipster/generator-jhipster/pull/8452))

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.1+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

升级Jhipster版本:

```
npm update -g generator-jhipster
```

然后升级子生成器:

```
jhipster upgrade
```

**手动升级**

选择手动升级, 需要先升级你的Jhipster版本:

```
npm update -g generator-jhipster
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

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
