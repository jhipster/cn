---
layout: default
title: Release 4.12.0
---

JHipster release 4.12.0
==================

更新日志
----------

This is a huge release, with 105 closed tickets and bug requests (yes, the last 2 weeks have been pretty busy for the team!).

Here are the most important ones:

- Angular 5 support [#6789](https://github.com/jhipster/generator-jhipster/pull/6789)
- MongoDB users can now use the Elasticsearch option, like JPA users [#6595](https://github.com/jhipster/generator-jhipster/pull/6595)
- Gateways secured with OpenID Connect can now be generated without any database [#6763](https://github.com/jhipster/generator-jhipster/issues/6763)
- Several server-side libraries upgrades, including Spring Boot 1.5.9 [#6782](https://github.com/jhipster/generator-jhipster/pull/6782)

As announced in the previous release, React support is still under development: use the `--experimental` flag when running JHipster to enable the React option. Warning, this is not finished yet! Your contributions are of course welcome.

OpenCollective
----------

We have opened an [OpenCollective account](https://opencollective.com/generator-jhipster). If you find the project helpful, or if your company benefits from it, please consider becoming a backer or a sponsor.

This is very important to keep the project growing.

JHipster Online
----------

[JHipster Online](https://start.jhipster.tech) has a new release, which supports Continuous Deployment. You can now generate your application, design your entities, and test everything, all from a nice Web user interface.

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.12.0+is%3Aclosed)__.

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

If the issue you have is an urgent bug or security issue, please:

- 在推特上联系[@java_hipster](https://twitter.com/java_hipster)
