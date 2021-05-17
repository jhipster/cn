---
layout: default
title: 使用Apache保护Kibana（基本身份验证）
sitemap:
priority: 0.5
lastmod: 2018-01-31T14:10:00-00:00
---

# 使用Apache保护Kibana（基本身份验证）

提交者 [@raiden0610](https://github.com/raiden0610)

## mod_proxy激活

    a2enmod proxy
    a2enmod proxy_http
    a2enmod headers

    service apache2 restart

## 虚拟主机配置
根据您的发行版，找到您的virtualhost 443或80配置所在的位置。

例如在Ubuntu 16.04中：配置位于 **/etc/apache2/sites-availables** 目录的 **000-default-le-ssl.conf** 文件中。

如果您不想要SSL，请使用以下文件 **000-default.conf**

编辑文件，然后在virtualhost 443或80部分中将其粘贴：

    # Proxying kibana listenning on the port 5601 
    ProxyPreserveHost On
    ProxyRequests On
    ProxyPass / http://localhost:5601/
    ProxyPassReverse / http://localhost:5601/
    
    # Protecting with basic authentication
    <Location />
            AuthType Basic
            AuthName "Restricted Content"
            AuthUserFile /etc/apache2/.htpasswd
            Require valid-user
       </Location>

重新加载apache config：

    service apache2 reload
    
## 生成用户名/密码

    htpasswd /etc/apache2/.htpasswd your_user
    
## 激活SSL
按照教程操作（您可以选择ditros）：[让我们加密-Certbot]（https://certbot.eff.org/）

Certbot会自动为您处理Apache中的SSL配置

<div class="alert alert-warning"><i> 警告：</i>
<b>不要忘记关闭防火墙中的5601端口！</b> 因为如果您不这样做，即使没有端口5601上的基本身份验证，kibana仍然可以访问
</div>

瞧，您现在可以在https://mydomain.com或http://mydomain.com上以安全的方式访问kibana。