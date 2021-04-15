---
layout: default
title: Release 3.10.0
---

JHipster release 3.10.0
==================

更新日志
----------

Lots of new features and bug fixes in this new release, here are the most important ones:

- Use the new Spring 4.3 composed annotations for cleaner and shorter Spring MVC configuration. This is a great improvement for everyone!  [#4291](https://github.com/jhipster/generator-jhipster/pull/4291)
- Update the CSRF protection mechanism [#4272](https://github.com/jhipster/generator-jhipster/issues/4272)
- Pagination is causing issues when changing the number of items per page [#4347](https://github.com/jhipster/generator-jhipster/issues/4347)
- Add springfox-bean-validators dependency for better Swagger documentation [#4388](https://github.com/jhipster/generator-jhipster/pull/4388)
- Gitignore should have folders and not files [#4387](https://github.com/jhipster/generator-jhipster/issues/4387)
- Add listener to re-add logstash appender when config is reset [#4334](https://github.com/jhipster/generator-jhipster/pull/4334)
- Several improvements in the upgrade sub-generator [#4306](https://github.com/jhipster/generator-jhipster/pull/4306)
- Fix MongoDB running with Cloud Foundry [#4363](https://github.com/jhipster/generator-jhipster/issues/4363)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.10.0+is%3Aclosed)__.

更新指引
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

选择手动升级, 需要先升级你的Jhipster版本:

```
npm update -g generator-jhipster
```

如果你已经有了一个项目, 将会继续使用当时项目生成的Jhipster版本.
如果需要升级你的项目, 你需要先删除`node_modules`文件夹再运行:

```
yo jhipster
```

更新你的项目和所有的实体类

```
yo jhipster --with-entities
```

你也可以使用实体类子生成器挨个更新你的实体类, 例如你的实体类名字是_Foo_

```
yo jhipster:entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

If the issue you have is an urgent bug or security issue, please:

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
