---
layout: default
title: 发布 0.10.0
---

JHipster release 0.10.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

更新日志
----------

* Thymeleaf支持! 为了解决单页Web应用无法适用的场景, 我们在Jhipser中添加了Thymeleaf引擎支持, 这个新文件: src/main/resources/templates/error.html, 正常的接管你的应用中404与500错误!
* 实现Spring Boot Actuator的安全审计. 在管理菜单可以查看到 "安全审计"!
* __警告__ 上面一个特性更新了一些新的数据表和索引! 如果您在一个现有的数据库上重新生成你的应用将会报错! 查看db-changelog.xml这个文件的变更, 我们添加了两个表和两个索引. 如果觉得不可思议, 请在推特[@jhipster](https://twitter.com/jhipster)联系我们: 您是希望为新项目使用干净的db-changelog.xml，还是为新表/索引/FK在db-changelog.xml中使用新的变更集？
* 所有的Bower依赖我们现在写死在生成的bower.json文件. 意味着我们不再相信其他项目提供所谓的"可更新"的依赖, 因为之前导致了各种奇怪的问题. 现在每个使用Jhipster的用户都拥有相同的Bower依赖, 除非你选择自己执行"bower update"!
* 一些次要缺陷修复, 重构和性能提升

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
