---
layout: default
title: Release 3.4.0
---

JHipster release 3.4.0
==================

更新日志
----------

Great new features:

- A new sub-generator to handle JHipster upgrades! See the issue at [#3594](https://github.com/jhipster/generator-jhipster/issues/3594). It is already documented
[here]({{ site.url }}/upgrading-an-application/), and you can start using it with this release. Of course, it won't be fully usable until the next release, as if you are upgrading from v3.3.0 it's not installed yet! Many thanks to [François Lecomte](https://github.com/lordlothar99) who had the original idea and coded the implementation!
- Spring profiles used to generate an application are now the default profile used when an application is run, see [#3587](https://github.com/jhipster/generator-jhipster/issues/3587). The most important change is that you don't need to run your "prod" app with `--spring.profiles.active=prod` anymore.
- [SonarSource](http://www.sonarsource.com/) is now providing us with a free Sonar instance to have automatic code quality analysis on generated projects. More information is available on our new [code quality documentation page]({{ site.url }}/code-quality/)
- A great new Cassandra migration tool, that acts like Liquibase (for JPA) or Mongobee (for MongoDB). This is a huge step forward in our Cassandra implementation. See the issue at [#3593](https://github.com/jhipster/generator-jhipster/issues/3593). Many thanks to [Raphaël Brugier](https://twitter.com/rbrugier) from [Ippon USA](http://www.ipponusa.com/) who coded this!!
- MariaDB support [#3600](https://github.com/jhipster/generator-jhipster/issues/3600)

Important bug fixes:

- Compilation failure with social sign-in and MongoDB [#3633](https://github.com/jhipster/generator-jhipster/issues/3633)
- robots.txt secured in gateway applications [#3626](https://github.com/jhipster/generator-jhipster/issues/3626)
- Error when starting a microservice app, using app.yml, with Docker Compose [#3607](https://github.com/jhipster/generator-jhipster/issues/3607)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.4.0+is%3Aclosed)__.

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
