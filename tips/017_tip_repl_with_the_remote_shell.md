---
layout: default
title: 远程REPL
sitemap:
priority: 0.5
lastmod: 2016-09-22T22:22:00-00:00
---

# 远程 REPL

__提交者 [@cbornet](https://github.com/cbornet)__

**由于在Spring Boot 2.0中将删除Spring Boot远程Shell，因此不建议使用此技巧**

从v3.8开始，JHipster拥有一个`shell` Maven/Gradle配置文件，其中将包含[Spring Boot远程shell](http://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-remote-shell.html) 。
如果您的项目是使用JHipster <3.8生成的，则需要手动添加`spring-boot-starter-remote-shell`依赖项。

这带来了一些有用的命令，这些命令可以帮助调试实时应用程序，您也可以编写自己的命令。

Spring Boot文档中未记录的另一个不错的功能是，您可以以[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2％80％93print_loop)的方式实时在应用程序上执行Groovy脚本代码。
为此：

  * 启动你的应用

  * 在终端中打开ssh会话（此处用于用户admin，密码：admin）：

```
ssh -p2000 admin@localhost
```

  * 连接后，切换到Groovy REPL模式：

```
> repl groovy
```

  * 获取BeanFactory：

```
> bf = context.attributes['spring.beanfactory']
```

  * 现在，您可以使用BeanFactory来获取Spring bean并调用其方法：

```
> bf.getBean('userRepository').findAll().login
[system, anonymoususer, admin, user]
> bf.getBean('userService').getUserWithAuthoritiesByLogin('user').get().authorities.name
[ROLE_USER]
```
