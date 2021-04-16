---
layout: default
title: Release 4.8.0
---

JHipster release 4.8.0
==================

更新日志
----------

- The exception handling mechanism has been totally refactored to follow [RFC 7807](https://tools.ietf.org/html/rfc7807), using [Zalando's problem-spring-web library](https://github.com/zalando/problem-spring-web). Default error pages are also available on this site, see ["Error - problem with a message"]({{ site.url }}/problem/problem-with-message/), ["Error - parameterized"]({{ site.url }}/problem/parameterized/) and ["Error: constraint violation"]({{ site.url }}/problem/constraint-violation/). Those error pages can be customized in each application's `ErrorConstants` class. See ticket [#6328](https://github.com/jhipster/generator-jhipster/pull/6328) for more detailed information.
- There is now a Spring Cache configuration to store Spring Security users. See ticket [#6105](https://github.com/jhipster/generator-jhipster/issues/6105) for some background information. This will improve the performance of all applications using an Hibernate L2 cache (as the user is loaded by its login, and not its ID, the Hibernate L2 cache doesn't work), but can lead to a few errors if you customized this part of the code. If you encounter a `LazyInitializationException`, this is because you get a `User` instance from  Spring Cache, and not from Hibernate, hence it is not an Hibernate managed object anymore (you can solve this by re-attaching the object, or by disabling the Spring Cache configuration and going back to the older configuration).
- New features and better documentation to separate the front-end and the back-end parts of a JHipster application. See ticket [#5754](https://github.com/jhipster/generator-jhipster/issues/5754) and the ["Separating the front-end and the API server" documentation]({{ site.url }}/separating-front-end-and-api/). And don't forget you can improve the documentation by doing a PR on [jhipster/jhipster.github.io](https://github.com/jhipster/jhipster.github.io)!
- Use the new Spotify `dockerfile-maven-plugin`, see ticket [#6194](https://github.com/jhipster/generator-jhipster/issues/6194). The main issue you will encounter is that the Maven plugin is `dockerfile` and not `docker` anymore - for example, you will now build your Docker image by running `./mvnw package -Pprod dockerfile:build`. The documentation, as well as our [oh-my-zsh plugin](https://github.com/jhipster/jhipster-oh-my-zsh-plugin), have been updated.

In total, 72 tickets and PR have been closed, so there are also many minor issues which have been fixed.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.8.0+is%3Aclosed)__.

更新指引
------------

**自动升级**

WARNING [this has been fixed recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

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

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
