---
layout: default
title: 发布 v4.5.3
---

JHipster release 4.5.3
==================

更新日志
----------

This is the third patch release for JHipster v4.5.0.

Here are the highlights of this release:

- Upgrade to Spring Boot 1.5.4, released yesterday, which corrects a security vulnerability - see ticket [#5893](https://github.com/jhipster/generator-jhipster/issues/5893)
- Use of Jackson's Afterburner module, which includes some excellent performance enhancements for everyone! Some basic tests show a 5% gain in all applications, and [here is a more complete report](http://technicalrex.com/2015/02/27/performance-playground-jackson-vs-protocol-buffers-part-2) - see commit [01cc743af3f30939d1e9ee13012c865dffd6c46e](https://github.com/jhipster/generator-jhipster/commit/01cc743af3f30939d1e9ee13012c865dffd6c46e)
- Many Angular 4 updates, including Progressive Web App support! - see PR [#5880](https://github.com/jhipster/generator-jhipster/pull/5880) and PR [#5878](https://github.com/jhipster/generator-jhipster/pull/5878)
- Missed update in Elasticsearch after update user via service/UserService.updateUser - see ticket [#5867](https://github.com/jhipster/generator-jhipster/issues/5867)

关闭的工单与合并请求
------------
一如既往, __[你可以在此处查看所有已关闭的工单与已接受合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.3+is%3Aclosed)__.

更新指引
------------

**自动升级**

WARNING we have many reports that automatic upgrade do not work well, see [#5883](https://github.com/jhipster/generator-jhipster/issues/5883). This depends on your specific configuration, so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

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
