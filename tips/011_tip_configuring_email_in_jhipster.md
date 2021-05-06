---
layout: default
title: 配置电子邮件-使用Gmail等
sitemap:
priority: 0.5
lastmod: 2015-12-23T22:40:00-00:00
---
# 配置电子邮件-使用Gmail等

__提交者 [@RawSanj](https://github.com/RawSanj)__

_目标：_ 通过使用下面的邮件设置，您将配置默认的JHipster应用程序，以从Gmail，Outlook或Yahoo发送电子邮件。

首先运行`jhipster`创建一个新的应用程序，或使用一个现有的JHipster生成的应用程序。

## 为您的应用程序选择以下任何电子邮件服务：

### 1. 邮件配置-Gmail

进入`src\main\resources\config\application-dev.yml`并将您的应用程序更改为使用以下Gmail配置：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.gmail.com
            port: 587
            username: gmailuserid@gmail.com  #Replace this field with your Gmail username.
            password: ************           #Replace this field with your Gmail password/App password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.gmail.com
            [...]

如果您将上述配置与Gmail密码一起使用，则可能需要[允许使用不太安全的应用程序](https://support.google.com/accounts/answer/6010255?hl=zh_CN) 。
配置较为简单，但安全性较低。 同样，通过允许安全性较低的应用程序，您将无法使用双因素使用Gmail进行身份验证。


因此，我们强烈建议您使用应用密码而不是Gmail密码。 请参考以下Gmail配置文档，以获取有关如何进行设置的更多信息。

[https://support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)

这样，您将可以使用两因素身份验证，并且可以关闭“允许不太安全的应用程序”选项。

### 2. 邮件配置-Outlook.com

进入`src\main\resources\config\application-dev.yml`并将您的应用程序更改为使用以下Outlook配置：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp-mail.outlook.com
            port: 587
            username: outlookuserid@outlook.com  #Replace this field with your Outlook username.
            password: ************               #Replace this field with your Outlook password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp-mail.outlook.com
            [...]
__注意__ : 如果您要从Corporate Outlook帐户发送电子邮件，则将`host`设置为公司的Microsoft Exchange Server，例如 `emea.mycompany.com`。 还要将`username`设置为公司提供的系统的标准ID（域/用户名），并将`password`设置为您的系统密码。

___提示___ : 查找`Microsoft Exchange Server`：打开Outlook>单击工具>单击帐户设置...>双击Microsoft Exchange（在“电子邮件”选项卡下），然后复制Microsoft Exchange Server地址。


### 3. 邮件配置-Yahoo

进入`src \ main \ resources \ config \ application-dev.yml`并更改您的应用程序以使用以下Yahoo配置：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.mail.yahoo.com
            port: 587
            username: yahoouserid@yahoo.com  #Replace this field with your Yahoo username.
            password: ************           #Replace this field with your Yahoo password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.mail.yahoo.com
            [...]

    jhipster:       
        mail:
            from: yahoouserid@gmail.com  #Replace this field with your Gmail username.
            [...]
__注意__ : 对于Yahoo Mail，**spring.mail**中的username属性必须与**jhipster.mail**中的from属性匹配。


### 4. 邮件配置-Zoho

进入`src \ main \ resources \ config \ application-dev.yml`并更改您的应用程序以使用以下Zoho配置：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.zoho.com
            port: 587
            username: zohouserid@zoho.com   #Replace this field with your Zoho username.
            password: ************          #Replace this field with your Zoho password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.zoho.com
            [...]


### 4. 邮件配置-AWS SES

进入`src \ main \ resources \ config \ application-dev.yml`并将您的应用程序更改为使用以下AWS SES配置：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: email-smtp.us-east-1.amazonaws.com
            port: 465
            username: ********************
            password: ********************************************
            protocol: smtps
            debug: true
            properties.mail.smtp:
                starttls.enable: true
                starttls.required: true
                ssl.enable: true
            properties.mail.smtps:
                auth: true


*类似地，您可以配置任何其他电子邮件服务。 只需检查您的电子邮件服务的SMTP邮件服务器和服务器端口，并相应地更改以上字段即可*
___现在运行您的应用程序！ 转到注册页面，提交带有有效电子邮件地址的表格，您应该从上面配置的电子邮件地址收到激活电子邮件。___

__注意__ : 您可以尝试使用[这些示例](https://github.com/RawSanj/java-mail-clients)使用凭据发送测试电子邮件。
