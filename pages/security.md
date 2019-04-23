---
layout: default
title: 安全
permalink: /security/
redirect_from:
  - /security.html
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00
---

# <i class="fa fa-lock"></i> 安全

要将Spring安全性用于单个网页应用程序（如JHipster生成的应用程序），您需要Ajax登录/注销/错误视图。为了正确地使用这些视图，我们已经配置了Spring安全性，当然，我们为您生成了所有的javascript和HTML代码。

默认情况下，JHipster有4个不同的用户：

*  “系统”，主要用于我们的审计日志，当某些事情自动完成时
*  “匿名用户”，当匿名用户执行某项操作时，会向其提供
*  “用户”，是具有“角色用户”授权的普通用户。他的默认密码是“用户”
*  “admin”，是具有“role_user”和“role_admin”权限的管理员用户。他的默认密码是“admin”

“角色用户”和“角色管理员”这两个授权提供了对实体的相同访问，这意味着“用户”被授权执行与“管理员”相同的CRUD操作。当应用程序将投入生产时，这种行为可能是一个问题，因为“用户”可以例如删除任何实体。有关如何改进访问控制的更多详细信息，请参阅此[blog post](https://blog.ippon.tech/improving-the-access-control-of-a-jhipster-application/).

出于安全原因，您应该在生产中更改这些默认密码。

JHipster提供了4种主要的安全机制：

1. [JSON Web Tokens (JWT)](#jwt)
2. [Session-based authentication](#session)
3. [OAuth2 and OpenID Connect](#oauth2)
4. [JHipster User Account and Authentication (UAA)]({{ site.url }}/using-uaa/) (which has a separate documentation page as this is more complex)

## <a name="jwt"></a> JSON Web Tokens (JWT)

[JSON Web Token (JWT)](https://jwt.io/) 身份验证是一种无状态的安全机制，因此，如果您希望在多个不同的服务器上扩展应用程序，那么这是一个很好的选择。

请注意，这是使用 [microservices architecture]({{ site.url }}/microservices-architecture/)时的默认选项。

在Spring Security中，这种身份验证机制不存在， 它是JHipster-specific 特定的项目的集成 [the Java JWT project](https://github.com/jwtk/jjwt).

此解决方案使用一个安全令牌来保存用户的登录名和权限。由于令牌已签名，因此用户不能更改它。

### JWT安全

- JHipster使用一个密钥，可以使用两个Spring引导属性配置该密钥： `jhipster.security.authentication.jwt.secret` and `jhipster.security.authentication.jwt.base64-secret`.
第二个选项使用base64编码字符串，因此它被认为更安全，因此建议使用。如果同时配置了这两个属性，出于遗留原因，将使用`secret`属性（安全性较低）。
如果不使用base64属性，应用程序启动时将显示警告。
- 这些密钥的最小长度应为512位：如果它们不够长，您将无法使用它们登录。如果发生这种情况，控制台上会有一个明确的警告来解释这个问题。
- 密钥在`application-*.yml`文件中配置。因为这些密钥必须保密，所以您 **应该** 为您的生产配置文件以安全的方式存储它们。
它可以使用通常的Spring引导属性配置进行设置：使用像 [JHipster Registry]({{ site.url }}/jhipster-registry/)这样的Spring云配置服务器（我们推荐的选项）,
使用一个环境变量，甚至是一个特定的`application-prod.yml`文件，该文件由系统管理员将其scp'd保存到与应用程序的可执行war文件相同的目录中。
- 您 **应该** 更改默认的“用户”和“管理员”密码。最简单的方法是部署应用程序，以“用户/用户”的身份登录，然后以“管理员/管理员”的身份登录，对于每个用户，使用“帐户>密码”菜单更改密码。

## <a name="session"></a> 基于会话的身份认证

这是“经典”的Spring安全认证机制，但我们已经对其进行了相当大的改进。它使用HTTP会话，因此这是一种有状态的机制：如果计划在多个服务器上扩展应用程序，则需要一个带有粘性会话的负载平衡器，以便每个用户都保持在同一个服务器上。

### 保护基于会话的身份认证

- 对于remember-me身份验证，remember me密钥在 `application-dev.yml` 和 `application-prod.yml` 文件中, 属性 `jhipster.security.remember-me.key`. 因为这个密钥必须保密，所以您 **应该** 为您的生产配置文件以安全的方式存储它。它可以使用通常的Spring引导属性配置进行设置：使用像[JHipster Registry]({{ site.url }}/jhipster-registry/) (推荐), 使用环境变量，甚至使用特定的 `application-prod.yml` 文件，该文件由系统管理员将 SCP保存到与应用程序可执行WAR文件中.
- 您 **应该** 更改默认的“用户”和“管理员”密码。最简单的方法是部署应用程序，以“用户/用户”的身份登录，然后以“管理员/管理员”的身份登录，对于每个用户，使用“帐户>密码”菜单更改密码。

### 改进的“记住我”机制

我们已经修改了Spring安全记住我机制，这样您就有了一个惟一的令牌，它存储在您的数据库中（SQL或NoSQL数据库，这取决于您在生成过程中的选择！）我们还存储了比标准实现更多的信息，因此您可以更好地了解这些令牌的来源：IP地址、浏览器、日期…我们会生成一个完整的管理屏幕，这样您就可以使会话无效，例如，如果您忘记在另一台计算机上注销。

### cookie盗窃保护

我们添加了一个非常完整的cookie盗窃保护机制：我们将您的安全信息存储在cookie和数据库中，每次用户登录时，我们都会修改这些值并检查它们是否被更改。这样，如果用户偷了你的cookie，他最多只能使用一次。

### CSRF保护

Spring Security和Angular都有现成的CSRF保护，但不幸的是它们不使用相同的cookie或HTTP头！实际上，对于CSRF攻击，您根本没有任何保护措施。当然，我们重新配置这两个工具，以便它们正确地协同工作。

## <a name="oauth2"></a> OAuth2和OpenID连接

OAuth是一种状态安全机制，如HTTP会话。SpringSecurity提供了OAuth2.0支持，Jhipster通过其`@enableOAuth2sso`注释来利用它。如果您不确定OAuth和OpenID Connect（OIDC）是什么，请参阅[What the Heck is OAuth?](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)

### Keycloak

[Keycloak](https://keycloak.org) 是用JHipster配置的默认OpenID连接服务器。

要登录到您的应用程序，您需要启动并运行[Keycloak](https://keycloak.org)。JHipster团队已经为您创建了一个具有默认用户和角色的Docker容器。使用以下命令启动keyclaft。

```
docker-compose -f src/main/docker/keycloak.yml up
```

如果您想将keyclaft与docker compose结合使用，请务必阅读我们的[docker compose documentation](site.url/docker compose/)，并正确配置您的`/etc/hosts`作为keyclaft。

The security settings in `src/main/resources/application.yml` are configured for this image.

```yaml
security:
    basic:
        enabled: false
    oauth2:
        client:
            access-token-uri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/token
            user-authorization-uri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/auth
            client-id: web_app
            client-secret: web_app
            scope: openid profile email
        resource:
            user-info-uri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/userinfo
```

默认情况下，keyclaft使用嵌入的H2数据库，如果重新启动Docker容器，将丢失创建的用户。要保留您的数据，请阅读 [Keycloak Docker documentation](https://hub.docker.com/r/jboss/keycloak/)。保留h2数据库的一个解决方案是执行以下操作：

- 添加将被持久化的卷：`./keycloak-db:/opt/jboss/keycloak/standalone/data`
- 将迁移策略从 `OVERWRITE_EXISTING`, to `IGNORE_EXISTING` (在命令部分)

在生产中，keyscoat要求您使用https。实现这一点有几种方法，包括使用反向代理或负载均衡器来管理HTTPS。我们建议您阅读[keyclaft https文档](https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl)以了解有关此主题的更多信息。

### Okta

如果你想用Okta替代Keycloak，你需要改变一些东西。 首先，您需要在 <https://developer.okta.com/signup/>上创建一个免费的开发人员帐户。这样做之后，您将得到自己的okta域，其名称类似于`https://dev-123456.okta.com`.

修改 `src/main/resources/application.yml` 以使用OKTA设置。提示：用您组织的名称 (例如, `dev-123456.okta.com`) 替换`{yourOktaDomain}` .

```yaml
security:
    basic:
        enabled: false
    oauth2:
        client:
            access-token-uri: https://{yourOktaDomain}/oauth2/default/v1/token
            user-authorization-uri: https://{yourOktaDomain}/oauth2/default/v1/authorize
            client-id: {client-id}
            client-secret: {client-secret}
            scope: openid profile email
        resource:
            user-info-uri: https://{yourOktaDomain}/oauth2/default/v1/userinfo
```

在Okta中创建一个OIDC应用程序，以获取 `{client-id}` 和 `{client-secret}`.为此，请登录您的OKTA开发人员帐户并导航到 **Applications** > **Add Application**. 单击 **Web** 然后单击 **Next** 按钮为应用程序指定一个您能记住的名称，并将`http://localhost:8080` 指定为base URI `http://localhost:8080/login`指定为登录重定向URI。单击**完成**，然后将客户机ID和机密复制到`application.yml`文件中。如果您希望注销工作，则需要编辑应用程序并添加 `http://localhost:8080`作为注销重定向URI。

创建一个 `ROLE_ADMIN` and `ROLE_USER` group (**Users** > **Groups** > **Add Group**)并向其中添加用户。您可以使用您注册的帐户，或者创建一个新用户 (**Users** > **Add Person**)。导航到 **API** > **Authorization Servers**, 单击 **Authorization Servers** 选项卡并编辑默认服务器。单击 **Claims** tab and **Add Claim**。将其命名为 "groups", 并将其包含在ID令牌中。 将值类型设置为"Groups"，并将筛选器设置为`.*`的Regex.

**注意:** 如果您想一直使用OKTA（而不是keycloft），请修改jhipster的量角器测试，以便在运行时使用此帐户。通过更改`src/test/javascript/e2e/account/account.spec.ts` 和 `src/test/javascript/e2e/admin/administration.spec.ts`.

在做了这些改变之后，你应该可以走了！如果您有任何问题，请将其发布到[Stack Overflow](https://stackoverflow.com/questions/tagged/jhipster)。一定要用“jhipster”和“okta”标记你的问题。

您还可以使用环境变量来覆盖默认值。例如：

```bash
export SECURITY_OAUTH2_CLIENT_ACCESS_TOKEN_URI="https://{yourOktaDomain}/oauth2/default/v1/token"
export SECURITY_OAUTH2_CLIENT_USER_AUTHORIZATION_URI="https://{yourOktaDomain}/oauth2/default/v1/authorize"
export SECURITY_OAUTH2_RESOURCE_USER_INFO_URI="https://{yourOktaDomain}/oauth2/default/v1/userinfo"
export SECURITY_OAUTH2_CLIENT_CLIENT_ID="{client-id}"
export SECURITY_OAUTH2_CLIENT_CLIENT_SECRET="{client-secret}"
```

You can put this in an `~/.okta.env` file and run `source ~/.okta.env` to override Keycloak with Okta.

You can use then set these properties when you deploy to Heroku:

```bash
heroku config:set \
  SECURITY_OAUTH2_CLIENT_ACCESS_TOKEN_URI="$SECURITY_OAUTH2_CLIENT_ACCESS_TOKEN_URI" \
  SECURITY_OAUTH2_CLIENT_USER_AUTHORIZATION_URI="$SECURITY_OAUTH2_CLIENT_USER_AUTHORIZATION_URI" \
  SECURITY_OAUTH2_RESOURCE_USER_INFO_URI="$SECURITY_OAUTH2_RESOURCE_USER_INFO_URI" \
  SECURITY_OAUTH2_CLIENT_CLIENT_ID="$SECURITY_OAUTH2_CLIENT_CLIENT_ID" \
  SECURITY_OAUTH2_CLIENT_CLIENT_SECRET="$SECURITY_OAUTH2_CLIENT_CLIENT_SECRET"
```

For Cloud Foundry, you can use something like the following, where `$appName` is the name of your app.

```bash
cf set-env $appName SECURITY_OAUTH2_CLIENT_ACCESS_TOKEN_URI "$SECURITY_OAUTH2_CLIENT_ACCESS_TOKEN_URI"
cf set-env $appName SECURITY_OAUTH2_CLIENT_USER_AUTHORIZATION_URI "$SECURITY_OAUTH2_CLIENT_USER_AUTHORIZATION_URI"
cf set-env $appName SECURITY_OAUTH2_RESOURCE_USER_INFO_URI "$SECURITY_OAUTH2_RESOURCE_USER_INFO_URI"
cf set-env $appName SECURITY_OAUTH2_CLIENT_CLIENT_ID "$SECURITY_OAUTH2_CLIENT_CLIENT_ID"
cf set-env $appName SECURITY_OAUTH2_CLIENT_CLIENT_SECRET "$SECURITY_OAUTH2_CLIENT_CLIENT_SECRET"
```

See [Use OpenID Connect Support with JHipster](https://developer.okta.com/blog/2017/10/20/oidc-with-jhipster) to learn more about JHipster and OIDC with Okta.

## <a name="https"></a> HTTPS

You can enforce the use of HTTPS when your app is running on Heroku by adding the following configuration to your `SecurityConfiguration.java`.

```java
@Configuration
public class WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.requiresChannel()
      .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
      .requiresSecure();
  }
}
```

This will work on both Heroku and Cloud Foundry. For more production tips on Heroku, see [Preparing a Spring Boot App for Production on Heroku](https://devcenter.heroku.com/articles/preparing-a-spring-boot-app-for-production-on-heroku).
