---
layout: default
title: 发布 v4.5.0
---

JHipster release 4.5.0
==================

Introducing the JHipster CLI
----------

This new release has a very important update, that will affect everyone: the JHipster CLI!

This means that instead of typing `yo jhipster`, you will just type `jhipster` on the command line.

- Everybody will gain 3 keystrokes, an important productivity enhancement :-)
- Most importantly, this allows us to provide autocompletion (only on Mac and Linux), which means you can use the tab key after entering `jhipster`. As this is the first release, we only provide basic autocompletion for the moment, but you can expect more in the future.

OpenShift support by Red Hat
----------

Please note that this is an **official contribution from Red Hat** to the project!

Thanks to the incredible work of [Srinivasa Vasu](https://twitter.com/srinivasavasu), we now have support for deploying JHipster applications to OpenShift. Find more information on [our OpenShift documentation page]({{ site.url }}/openshift/).

Bug fixes and improvements
----------

This release contains 63 closed tickets and Pull Requests:

- Several annoying bugs have been fixed, like [#5786](https://github.com/jhipster/generator-jhipster/issues/5786), which makes this a recommended update
- Lots of unit tests and polishing, giving us an incredible score of 96.2% code coverage on our sample project! Many thanks to [Christophe Bornet](https://twitter.com/cbornet_) on this part.
- Many library upgrades, as usual

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.0+is%3Aclosed)__.

更新指引
------------

**自动升级**

在已存在的项目上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动升级:

```
yo jhipster:upgrade
```

Please note that with our new JHipster CLI release, the new command will be:

```
jhipster upgrade
```

**手动升级**

选择手动升级, 需要先升级你的Jhipster版本:

```
yarn global upgrade generator-jhipster
```

如果你已经有了一个项目, 将会继续使用当时项目生成的Jhipster版本.
如果需要升级你的项目, 你需要先删除`node_modules`文件夹再运行:

```
jhipster
```

更新你的项目和所有的实体类

```
jhipster --with-entities
```

你也可以使用实体类子生成器挨个更新你的实体类, 例如你的实体类名字是_Foo_

```
jhipster entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们:

- 在我们的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)添加一个缺陷报告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)提交问题

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
