---
layout: default
title: 发布 0.6.0
---

JHipster release 0.6.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

- 更新到Spring Security 3.2, 并使用Java Config类替换了之前的XML配置文件, 感谢[Jerome Mirc](https://twitter.com/JeromeMirc)巨大的贡献.
- 现在所有的Spring配置文件都不依赖XML. 最后一个依赖XML的配置文件是web.xml (Java EE太爱XML了!!).
- 我们更新了一个"services"子生成器, 用于业务服务类生成. 你可以在[此处]({{ site.url }}/creating-a-service/)找到最新的文档.

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
