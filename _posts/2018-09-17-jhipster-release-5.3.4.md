---
layout: default
title: 发布 v5.3.4
---

JHipster release v5.3.4
==================

This patch release follows v5.3.2 and v5.3.3 which were released today. We found issue [#8351](https://github.com/jhipster/generator-jhipster/issues/8351) which causes a compilation error for projects using criteria filtering on DTOs. As this is critical for people using this feature, we have released this patch as an emergency release.

For the record, here are the most important bug fixes and enhancements from release 5.3.2:

- Full microservice stack generation using import-jdl [#8335](https://github.com/jhipster/generator-jhipster/pull/8335/)
- Add a TLS profile (back and front) to run the development server in HTTPS [#8138](https://github.com/jhipster/generator-jhipster/pull/8138)
- Angular: Use Mocha+Chai for end to end tests [#8197](https://github.com/jhipster/generator-jhipster/pull/8197)
- Remove non-free and unused dependency to org.json:json [#8206](https://github.com/jhipster/generator-jhipster/issues/8206)
- Heroku: move Liquibase migrations to release phase [#8229](https://github.com/jhipster/generator-jhipster/pull/8229)
- New languages: Bengali [#8255](https://github.com/jhipster/generator-jhipster/pull/8255) and Myanmar [#8317](https://github.com/jhipster/generator-jhipster/pull/8317)
- Update spring-boot to 2.0.5 and dependencies [#8273](https://github.com/jhipster/generator-jhipster/pull/8273)

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
