---
layout: default
title: 发布 v7.0.0-beta.1
---

JHipster 发布 v7.0.0-beta.1 版本
==================

这是我们的JHipster v7的第二个Beta版本，也是今年的第一个Beta版本。

包括 [227个已关闭的凭单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.1).

_由于这是测试版，因此无法通过常规渠道获得，请阅读以下内容以获取更多信息！_

新特性
------------

- React中测试文件与被测文件同目录 [#13425](https://github.com/jhipster/generator-jhipster/issues/13425)
- 支持 --pk-type [#13296](https://github.com/jhipster/generator-jhipster/issues/13296)
- 支持 @MapstructExpression [#13195](https://github.com/jhipster/generator-jhipster/issues/13296)
- 服务器通用脚本-由Webapp替换的Webpack配置文件 [#13196](https://github.com/jhipster/generator-jhipster/pull/13196)
- 微服务中Swagger异常 [#13446](https://github.com/jhipster/generator-jhipster/pull/13446)
- K8S子生成器支持neo4j [#13548](https://github.com/jhipster/generator-jhipster/pull/13548)
- 其他诸多改进
- 大量依赖库升级
- 一些错误修复

关闭的工单与合并请求
------------
一如既往， __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.1)__.


安装方法
------------

这是一个beta版本，因此在我们通常的“稳定”发布渠道上不可用。

要使用NPM安装JHipster v7.0.0-beta.1，请执行以下操作：

    npm install -g generator-jhipster@beta

它也可以通过JHipster Docker映像使用，因为它是根据我们的源代码自动构建的。

但是，由于这是一个BETA版本，因此无法通过我们的其他常用渠道使用，例如：

- [JHipster Online](https://start.jhipster.tech)
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

您也将无法使用`jhipster upgrade`子生成器，因为它不会“看到” BETA版本，该版本通过NPM上的特定Beta渠道分发。

您可以查看 [v7 upgrade tips]({{ site.url }}/tips/033_tip_v7_upgrade.html) 页面以获取v7升级提示。


帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们：

- 提交Bug请到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 提交问题请到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
