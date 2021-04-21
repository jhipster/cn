---
layout: default
title: Release 6.7.0
---

JHipster release v6.7.0
==================

This is the 1st release in 2020, with [206 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.7.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Spring Boot 2.2.4.RELEASE - [#11155](https://github.com/jhipster/generator-jhipster/pull/11155) [#10955](https://github.com/jhipster/generator-jhipster/pull/10955) and [jhipster#546](https://github.com/jhipster/jhipster/pull/546)
- JHipster Regisry v6.1.1, using Spring Boot 2.2.4.RELEASE and Spring Cloud Hoxton - [jhipster-registry#408](https://github.com/jhipster/jhipster-registry/pull/408)
- Reactive with OAuth2 - [#11117](https://github.com/jhipster/generator-jhipster/pull/11117)
- Kubernetes Knative - [#10695](https://github.com/jhipster/generator-jhipster/issues/10695)
- UAA without Eureka - [#11033](https://github.com/jhipster/generator-jhipster/pull/11033)
- Many libraries upgrades

关闭的工单与合并请求
------------
一如既往， __[您可以在此处查看所有已关闭的工单和合并请求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.7.0+is%3Aclosed)__.

Backward Compatibility Issues
------------

- **v6.5.x and beyond** 

    - **MongoDB**: PersistentAuditEvent Documents not found after upgrading ([#11290](https://github.com/jhipster/generator-jhipster/issues/11290)). 
    
        - `jhipster upgrade` will remove `@Field("event_id")` annotation on `PersistentAuditEvent#id` domain class.
        
        - The goal is identifying Documents properly by    `_id` field instead, using Spring Data `@Id` annotation. But: when querying pre-upgrade stored documents, the query won't look for `event_id`, thus those won't be found.
        
        - Such specific case should not impact regular applications behaviour.
        
        - Domain backwards compatibility can be restored by adding `@Field(value = "event_id", targetType = FieldType.OBJECT_ID)` annotation to `PersistentAuditEvent#id` in combination with `@Id`.


更新方法
------------

**自动升级**

在原有的项目上使用 [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自动更新：

首先，升级JHipster版本：

```
npm update -g generator-jhipster
```

然后运行upgrade子生成器：

```
jhipster upgrade
```

**手动升级**

同样，需要先升级您的JHipster到最新版：

```
npm update -g generator-jhipster
```

对于已经存在的项目，它仍使用原来生成该项目时的JHipster版本。
要升级项目，必须首先删除其`node_modules`文件夹，然后运行：

```
jhipster
```

您还可以通过运行以下命令来更新项目及其所有实体：

```
jhipster --with-entities
```

您还可以通过再次运行entity子生成器（jhipster entity）来逐一更新实体，例如，如果您的实体名为_Foo_，则运行：

```
jhipster entity Foo
```

帮助和缺陷
--------------

如果您发现这个版本的任何问题, 请随时联系我们：

- 提交Bug请到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 提交问题请到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的问题是紧急错误或安全问题，请：

- 在推特上联系[@jhipster](https://twitter.com/jhipster)
