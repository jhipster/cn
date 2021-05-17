---
layout: default
title: 发布 v1.7.0
---

JHipster release 1.7.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

更新日志
----------

The main new improvement of this release is the [Cloud Foundry sub-generator]({{ site.url }}/cloudfoundry/). It is working so well that we didn't put the BETA tag on it (unlike our Heroku and OpenShift sub-generators). If you [Check the code](https://github.com/jhipster/generator-jhipster/tree/master/cloudfoundry) you can also see how small and clean it is.

You can now easily deploy your application to any Cloud Foundry instance available, with MySQL, Postgresql or MongoDB!

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.7.0+is%3Aclosed)__.

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
