---
layout: default
title: 发布 v0.12.0
---

JHipster release 0.12.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

JHipster 0.12 comes with a lot of bug fixes and new features, which we have listed [here](https://github.com/jhipster/generator-jhipster/issues?milestone=1&page=1&state=closed).

Most importantly, we have now moved "JHipster-Loaded", which allows us to have hot reload of Java code, to a specific project: [https://github.com/jhipster/jhipster-loaded](https://github.com/jhipster/jhipster-loaded).

This means 3 things:

- your JHipster project has now fewer classes, 
- our Java Agent has changed, you now need to use "-javaagent:spring_loaded/springloaded-jhipster.jar -noverify -Dspringloaded=plugins=io.github.jhipster.loaded.instrument.JHipsterLoadtimeInstrumentationPlugin"
- and that you can use JHipster-Loaded in other, non-jhipster projects

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
