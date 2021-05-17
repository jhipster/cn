---
layout: default
title: 如何将PGAdmin（PostgreSQL）连接到Heroku
sitemap:
priority: 0.1
lastmod: 2018-10-15T18:20:00-00:00
---
# 如何将PGAdmin（PostgreSQL）连接到Heroku

__提交者 [@Tonterias](https://github.com/Tonterias)__

可能您需要使用PGAdmin将测试数据加载到Heroku数据库中。

请按照下列步骤操作：

首先，使用Heroku帐户中的数据库凭据中的数据填写创建新服务器PGAdmin表单：
First, use the data from your Database Credentials at your Heroku Account to fill the Create a New Server PGAdmin's form:

![Example documentation](../images/028_tip_pgadmin_heroku_01.png)

![Example documentation](../images/028_tip_pgadmin_heroku_02.png)

然后，您必须在application-prod.yml中配置该信息：

/src/main/resources/config/application-prod.yml

    spring:
        devtools:
            restart:
                enabled: false
            livereload:
                enabled: false
        datasource:
            type: com.zaxxer.hikari.HikariDataSource
            url: jdbc:postgresql://@ec2-50-17-250-38.compute-1.amazonaws.com:5432/d5u8osf3cgtlg
            username: seejtnnivrl???
            password: e9ed17c73da7ec36bf6eead010968106439debe16ed3df9039be0a9aef??????
            hikari:
                auto-commit: false

您将从Heroku帐户的数据库凭据中获取数据（如另一个示例所示）：

    Host : ec2-50-17-250-38.compute-1.amazonaws.com
    Database : d5u8osf3cgtlg
    User : seejtnnivrlcdw
    Port : 5432
    Password : e9ed17c73da7ec36bf6eead010968106439debe16ed3df9039be?????
    URI : postgres://seejtnnivrlcdw:e9ed17c73da7ec36bf6eead010968106439debe16ed3df9039b???????
    @ec2-50-17-250-38.compute-1.amazonaws.com:5432/d5u8osf3cgtlg
    Heroku CLI : heroku pg:psql postgresql-trapezoidal-20780 --app jhipster-press-08

您只需要连接到数据库并在PGAdmin查询窗口中使用sql命令对其进行测试。

注意：以下视频显示了此过程: https://www.youtube.com/watch?v=GAHsl0AfK-0