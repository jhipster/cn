---
layout: default
title: Release 2.27.0
---

JHipster release 2.27.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

This new version comes with 116 bug fixes and PRs!

- We have a brand new [hook]({{ site.url }}/modules/creating-a-module/#hooks) mechanism from the entity sub generator. This will be triggered post creation of an entity and it will invoke modules registered for this event. This enables use of modules to add additional features to generated entity, like [enable audit]({{ site.url }}/modules/marketplace/#/details/generator-jhipster-entity-audit), add prefix etc.
- We have completely refactored our code base, in order to follow the new Yeoman best practices and structure. This means our code is cleaner, and in the long run everybody should benefit from it. This was a huge work!
- We now have a `--skip-client` flag option in our main generator. This is for power users and modules to use main generator to create a backend only application. When this option is passed, the client side code will not be generated.
- The UI to manage entities has been improved.
- The Docker files have moved under `src/main/docker` - see [#2600](https://github.com/jhipster/generator-jhipster/issues/2600)
- The Openshift sub-generator has been removed, as it has been broken for a long time - see [#1896](https://github.com/jhipster/generator-jhipster/issues/1896).
- And we have merged several small bug fixes, which you can list [using the 2.27.0 milestone with the `bug` label](https://github.com/jhipster/generator-jhipster/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A2.27.0+is%3Aclosed+label%3Abug).

Closed tickets
------------

一如既往, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.27.0+is%3Aclosed)__.

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
