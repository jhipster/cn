---
layout: default
title: Release 3.7.1
---

JHipster release 3.7.1
==================

更新日志
----------

This is a bug-fixing release, with a few new features.

- Questions in the main generator have been refactored - see [#4134](https://github.com/jhipster/generator-jhipster/pull/4134)
- Downgrade the MySQL Docker image to 5.7.13 - see [#4144](https://github.com/jhipster/generator-jhipster/pull/4144)
- Add Swagger back in the default `dev` profile - see [#4146](https://github.com/jhipster/generator-jhipster/pull/4146)
- Ehcache configuration is now generated for entities and their relationships - see [this commit](https://github.com/jhipster/generator-jhipster/commit/d8477598334c133ff86b7a2b6999803f8fdd5a8d)
- The Maven Spring Boot plugin now runs in fork mode, which allows hot-reload using the Spring Boot devtools.
- We now support officially Visual Studio Code, [here is our new specific documentation]({{ site.url }}/configuring-ide-visual-studio-code/)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.7.1+is%3Aclosed)__.

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

- 在推特上联系[@java_hipster](https://twitter.com/java_hipster)
