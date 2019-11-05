---
layout: default
title: Release 0.17.1
---

JHipster release 0.17.1
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

JHipster 0.17.1 is a bug-fixing release:

- We are having a very annoying, very hard to reproduce bug (at least [@juliendubois](https://twitter.com/juliendubois) can't reproduce it!) when generating a new entity, see [#404](https://github.com/jhipster/generator-jhipster/issues/404) for more information. Thanks for commenting the bug or notifying [@juliendubois](https://twitter.com/juliendubois) if you have the bug, and if you do NOT have the bug -> we are trying to find out which strange combinaison of node/npm/OS/whatever causes this issue. This is, of course, our top priority at the moment.
- We are migrating to Spring Boot 1.1.3 (which corrects some minor Spring Boot issues, see [the Spring blog](http://spring.io/blog/2014/06/27/spring-boot-1-1-3-available-now) for more information).

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

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在推特上联系[@java_hipster](https://twitter.com/java_hipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题
