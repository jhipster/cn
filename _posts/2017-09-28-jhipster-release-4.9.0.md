---
layout: default
title: 发布 v4.9.0
---

JHipster release 4.9.0
==================

更新日志
----------

This new release has [66 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.9.0+is%3Aclosed), here are the most important news:

- Traefik support was added last week, see [#6397](https://github.com/jhipster/generator-jhipster/issues/6397). It is still in BETA, but adds an interesting alternative in our microservice architecture. [Full documentation on using Traefik with JHipster is available here]({{ site.url }}/traefik/).
- Major improvement on JHipster UAA: [Access/Refresh Token Handling for UAA Authentication #5752](https://github.com/jhipster/generator-jhipster/issues/5752)
- Front-end tests will now use Chromium headless, which is a huge change: [Replace PhantomJS by chromiumHeadless and puppeteer #6377](https://github.com/jhipster/generator-jhipster/pull/6377)
- The Gradle Wrapper is now using the latest Gradle 4.2 release: see [#6392](https://github.com/jhipster/generator-jhipster/pull/6392)
- Karma tests now have source maps: this will make them a bit slower, but a lot easier to debug - see [#6400](https://github.com/jhipster/generator-jhipster/pull/6400)
- Issues with our AWS sub-generator should at least be fixed thanks to [#6408](https://github.com/jhipster/generator-jhipster/pull/6408)
- A new polyfill has been added to add IE 11 support, see [#6337](https://github.com/jhipster/generator-jhipster/issues/6337)
- Upgrades to Yarn, NodeJS, NPM have been made in [#6424](https://github.com/jhipster/generator-jhipster/pull/6424)

As a result of those latest changes and bug fixes, we have removed the BETA tag on JHipster UAA and on our Kafka support option.

**Warning** Big changes in the OAuth2 support will happen in the next release, see [#6361](https://github.com/jhipster/generator-jhipster/pull/6361):

- We will migrate from our current home-made OAuth2 support (based on Spring Security OAuth2) to use OpenID Connect
- As a result, JHipster will work with OpenID Connect providers like [Keycloak](http://www.keycloak.org/) or [Okta](https://www.okta.com)
- This will remove a lot of code, and provide better quality and features
- As the current OAuth2 code is used by less than 1% of projects, we feel that this change will not affect many people

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.9.0+is%3Aclosed)__.

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
