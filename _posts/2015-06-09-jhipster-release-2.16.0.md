---
layout: default
title: Release 2.16.0
---

JHipster release 2.16.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日志
----------

This new release adds a lot of new features:

- [Support for the Oracle database]({{ site.url }}/using-oracle/) is now available! And this is not part of any "enterprise" offering :-)
- _Warning_ : Oracle support has forced us to modify a little bit our initial schema. The most important change is the `JHI_PERSISTENT_AUDIT_EVENT_DATA` table which has been renamed `JHI_PERSISTENT_AUDIT_EVT_DATA`, as Oracle doesn't allow long table names
- We upgraded to the latest Spring Boot version (1.2.4) and the latest AngularJS version (1.4.0), so your projects are always up-to-date!
- Internationalization is now optional: this is a new generator option, where you can remove all internationalized code
- Grunt should now run faster, as it doesn't use the `concurrent` task anymore. There is a new [tip to turn it back on]({{ site.url }}/tips/005_tip_concurrent_task_grunt.html) if needed
- We have a new Romanian translation, so we now support 18 languages!

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.16.0+is%3Aclosed)__.

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
