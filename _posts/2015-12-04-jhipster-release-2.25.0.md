---
layout: default
title: 发布 v2.25.0
---

JHipster release 2.25.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

### JHipster "needles"

People following our development efforts know that we are preparing a "module" system. Modules will be external Yeoman generators, that anybody can create, and that will have access to the JHipster variables and functions.

This will allow anyone to create his own "sub-generator", like those provided by the JHipster team.

This forces us to update and clarify our API, and for this we needed to update our "needles": there are currently only 6 needles in JHipster (but more will come), and they allow the generator to add lines of code in certain parts of a generated project.

We have updated those needles, so they are now called something like "jhipster-needle-001" with some comment next to it. To update you current project, you will need to run your updated generator and replace your old needles by the new ones, as prompted by the generator.

### User creation and deletion in the user management view

Pull Request [#2385](https://github.com/jhipster/generator-jhipster/pull/2385) improves the user management screen, so you can now create and delete users directly from this screen.

### Protractor tests

Initial support for [Protractor](https://github.com/angular/protractor) has been added as a non-default option in the main generator.

### Entities sorting

Pull Request [#2314](https://github.com/jhipster/generator-jhipster/pull/2314) adds the possibility to sort each paginated entity tables, on each of its attributes. Pagination and sorting are done on the server-side, so they work correctly when you have a lot of data.

### UI Bootstrap pagination

Thanks to Pull Request [#2402](https://github.com/jhipster/generator-jhipster/pull/2402) entity pagination is now done with UI Bootstrap, and not with a custom generated code.

### Optional service layer for entities

When generating an entity, a new question is now available, which will ask you if you want to generate a specific service layer between your repository and Web layers. This is for advanced usage, when your controller will do more than just querying one entity.

### Improved logging

Logging now inherits the Spring Boot default logging configuration, so it looks much better.

Closed tickets
------------

一如既往, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.25.0+is%3Aclosed)__.

更新指引
------------

使用以下命令更新Jhipster:

```
npm update -g generator-jhipster
```

使用以下命令更新你的项目

```
yo jhipster
```

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题
