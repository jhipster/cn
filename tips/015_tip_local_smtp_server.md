---
layout: default
title: 本地SMTP服务器
sitemap:
priority: 0.5
lastmod: 2016-05-21T22:22:00-00:00
---

# Local SMTP Server

__提交者 [@pascalgrimaud](https://github.com/pascalgrimaud)__

**警告！** 本技巧取决于JHipster不直接支持的另一个项目。

该项目 [djfarrelly/maildev](https://github.com/djfarrelly/MailDev) 是一种易于使用的Web界面，用于在开发过程中测试项目生成的电子邮件的简单方法。

要使用Docker在本地启动SMTP服务器，请执行以下操作：

```
docker container run -d -p 1080:80 -p 25:25 djfarrelly/maildev
```
