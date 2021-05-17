---
layout: default
title: 发布 v1.1.0
---

JHipster release 1.1.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

This release comes with [several enhancements and bug fixes](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.1+is%3Aclosed).

Most importantly:

- We have early support for deploying a JHipster application to the cloud in one command! We currently support [Heroku]({{ site.url }}/heroku/) and [Openshift]({{ site.url }}/openshift/). Please give them a try, but remember, this is an early release!
- We updated the Liquibase/JPA configuration so that they now match 100%. We even run the Hibernate schema validation tool when running the tests ("mvn test"). However, this will probably break existing Liquibase configuration, or be too strict for most users: please notify us, and we will remove this check in future releases if it is too strict!


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
