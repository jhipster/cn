---
layout: default
title: 发布 0.4.0
---

JHipster release 0.4.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

- [Jerome Mirc](https://twitter.com/JeromeMirc)贡献了HazelCast支持:
	- 分布式hibernate二级缓存
	- HTTP会话集中化
- 全新的GZip filter (也是由[Jerome Mirc](https://twitter.com/JeromeMirc)提供!)
- 更新至Spring 4正式版
- 实体类的子生成器现在处于BETA版本. 如果你想尝试:
```
yo jhipster:entity foo
```
- 修复了一个在"prod"模式构建时会触发的grunt-time缺陷


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
