---
layout: default
title: Release 0.9.3
---

JHipster release 0.9.3
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------


修复了两个JavaScript库的问题:

* Angular-Translate 2.0.0, 在今天正式发行, 兼容Bower但是有一个API变更, 详情[#125](https://github.com/jhipster/generator-jhipster/issues/125)
* JQuery 2.1.0在前几天更新了, 他们更改了目录路径. 看起来还不稳定, 我们将JQuery降级到2.0.3. 详情[#124](https://github.com/jhipster/generator-jhipster/issues/124)

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
