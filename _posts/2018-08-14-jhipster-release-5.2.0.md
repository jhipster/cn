---
layout: default
title: Release 5.2.0
---

JHipster release v5.2.0
==================

JHipster v5.2.0 comes with 120 closed tickets and pull requests.

Please note that we have launched a [bug bounties program]({{ site.url }}/bug-bounties/) and that several important tickets have been closed thanks to this. At the moment, we have $2,000 on this program thanks to our awesome sponsors, through our [OpenCollective initiative](https://opencollective.com/generator-jhipster).

Here are the most important tickets closed in this release:

- Lots of CI/CD improvements by [@pascalgrimaud](https://twitter.com/pascalgrimaud) - see  [#7904](https://github.com/jhipster/generator-jhipster/issues/7904).
- Upgrade to Yeoman 3 [#7909](https://github.com/jhipster/generator-jhipster/issues/7909).
- Production build fix for React [#8023](https://github.com/jhipster/generator-jhipster/pull/8023).
- Make Angular e2e tests use async/await [#8026](https://github.com/jhipster/generator-jhipster/pull/8026).
- Update spring-boot to 2.0.4, spring-cloud to Finchley.SR1  [#8046](https://github.com/jhipster/generator-jhipster/pull/8046).
- Add admin module tests for Angular [#8048](https://github.com/jhipster/generator-jhipster/pull/8048).
- Update Angular to 6.1 [#8066](https://github.com/jhipster/generator-jhipster/pull/8066).
- Move to Terser plugin instead of UglifyJS [#8069](https://github.com/jhipster/generator-jhipster/pull/8069).

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.2.0+is%3Aclosed)__.

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
