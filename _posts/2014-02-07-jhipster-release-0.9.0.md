---
layout: default
title: Release 0.9.0
---

JHipster release 0.9.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

- 完全的Java类"热重载"较以前有了很大提升, 感谢[@andy_clement](https://twitter.com/andy_clement)解决了我们的问题. 但是, 我们还有一个恼人的[缺陷](https://github.com/spring-projects/spring-loaded/issues/39)
- [@JeromeMirc](https://twitter.com/JeromeMirc)添加了第二个默认用户, 而且极大的提升了用户授权管理逻辑
- 改进了生成的WAR文件, 尤其是在生产环境使用
- 更新Spring至4.0.1, 这个版本修复了许多问题. 如果你使用*org.springframework.scheduling.annotation.SchedulingConfiguration.setBeanFactory*遇到了问题, 现在应该可以解决了.
- 以上更新已全同步至文档

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

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题
