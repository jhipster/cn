---
layout: default
title: 发布 0.2.0
---

JHipster release 0.2.0
==================

*JHipster为您提供集Yeoman + Maven + Spring + AngularJS于一体的应用生成器.*

在发布v0.1.0不久之后, 我们又发布了JHipster v0.2.0!

这个版本修复了一些缺陷和些许性能提升, 但是为生成器更新了一个令人兴奋的特性-在AngularJS支持了完整的本地化支持.

- 本地化所有的Angularjs视图!
- 使用了优秀的["Angular Translate"](https://github.com/PascalPrecht/angular-translate)库
- i18n的使用文档-["development" section](/development/)

我们还没发现其他的Yeoman生成器具有这个功能, 所以Jhipster再次实现了一个企业特性!

*还需完善部分*: 在"production"模式下我们还没找到最小化与缓存本地化Json文件的最佳解决方案. 当前唯一的解决方法是使用ETags (使用Spring的ShallowEtagHeaderFilter), 但是这并不是一个完美的解决方案. 如果你有任何想法, 欢迎和我们交流!

十分感谢[Jerome Mirc](https://twitter.com/JeromeMirc)提出这个想法以及辛勤的代码贡献.
