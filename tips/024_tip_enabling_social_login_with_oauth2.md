---
layout: default
title: 使用OAuth2启用第三方登录
sitemap:
priority: 0.1
lastmod: 2018-03-18T18:20:00-00:00
---
# 使用OAuth2启用第三方登录

使用OAuth2身份验证类型时，您的应用会连接到OpenID Connect服务器，例如Okta或Keycloak。 通过在管理控制台内添加外部身份提供商，可以启用第三方登录。

## 使用Okta添加身份提供者

Okta支持Facebook，Microsoft，Google，LinkedIn和自定义SAML提供程序。

Log into the Okta console and navigate via the menu to "Users" -> "Social & Identity Providers".  Choose "Add Identity Provider" and add the provider of your choice.  Make sure to completely follow the [Okta Social Login documentation](https://developer.okta.com/authentication-guide/social-login/) which guides you in obtaining the client ID and secret for each provider.

## 使用Keycloak添加身份提供者

Keycloak支持GitHub，Twitter，Facebook，Openshift，Google，Gitlab，LinkedIn，Microsoft，BitBucket，StackOverflow和自定义SAML提供程序。

登录Keycloak管理控制台，然后从左侧菜单中选择"Identity Providers"。 请按照[Keycloak社交登录文档](https://www.keycloak.org/docs/latest/server_admin/index.html#social-identity-providers) 中的说明进行操作，以配置提供程序并获取客户端ID和密码 。