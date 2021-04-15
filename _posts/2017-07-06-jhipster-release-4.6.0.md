---
layout: default
title: Release 4.6.0
---

JHipster release 4.6.0
==================

更新日志
----------

**Angular 4 is now out of beta**

Our Angular 4 support is now ready for production:

- Our production build works fine, both on the client-side (AOT, tree shaking, etc.) and on the server-side (caching, gzipping, etc.). Our tests show huge improvements compared to our previous BETA releases (which were not suitable for production, that's why they were marked BETA). As a result, this new version is a recommended upgrade for anyone already using Angular 2 or Angular 4 with JHipster.
- Angular 4 is now our default option for JHipster. AngularJS 1 won't disappear soon, but we are not going to improve it in the future, and it will probably slowly die over the next months.
- Our goal is to support React in the future, and we will focus our development effort on this new option. At some point in the future, this means we should have both Angular and React as stable options. Help is highly welcome on that part, so if you are interested, don't hesitate to join the team on GitHub.

**Other important news**

- Upgrade to Gradle 4 (see [#5949](https://github.com/jhipster/generator-jhipster/pull/5949)), which has some excellent performance improvements according to our initial tests.
- Farsi language support (see [#5961](https://github.com/jhipster/generator-jhipster/pull/5961)), which means we do support right-to-left languages!

**Minor improvements**

In total, this release has 72 closed tickets and pull requests, out of which 11 were marked `invalid`. This is an improvement over the past releases, but please if you have a question or a bug, don't spam the development team and follow [our guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

**Deprecation warning (for module developers)**

The JHipster Module sub generator is deprecated. We now recommend using commonJS or ES6 require/import to get `generator-base` in order to use our Public API. See [creating a module]({{ site.url }}/modules/creating-a-module/) page for more details.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.6.0+is%3Aclosed)__.

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

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
