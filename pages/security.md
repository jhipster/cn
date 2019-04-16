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

### Securing JWT

- JHipster uses a secret key, which can be configured using two Spring Boot properties: `jhipster.security.authentication.jwt.secret` and `jhipster.security.authentication.jwt.base64-secret`.
The second option uses a Base64-encoded string, so it is considered more secured and thus it is recommended. If both properties are configured, the `secret` property (less secured) will be used, for legacy reasons.
A warning will be shown at application startup if you don't use the Base64 property.
- Those keys should have a minimum length of 512 bits: if they are not long enough, you will not be able to use them to login. If that happens, there will be a clear warning at the console to explain that issue.
- The secret keys are configured in the `application-*.yml` files. As those keys must be kept secret, you **should** store them in a secure way for your production profile.
It can be set up using the usual Spring Boot property configuration: using a Spring Cloud Config server like the [JHipster Registry]({{ site.url }}/jhipster-registry/) (our recommended option),
using an environment variable, or even a specific `application-prod.yml` file which is SCP'd by a sysadmin into the same directory as your application's executable WAR file.
- You **should** change the default "user" and "admin" passwords. The easiest way to do this is to deploy your application, login as "user/user" and then "admin/admin", and for each of them use the "Account > Password" menu to change the password.

## <a name="session"></a> Session-based authentication

This is the "classical" Spring Security authentication mechanism, but we have improved it quite significantly. It uses the HTTP Session, so it is a stateful mechanism: if you plan to scale your application on multiple servers, you need to have a load balancer with sticky sessions so that each user stays on the same server.

### Securing Session-based authentication

- For remember-me authentication, the remember-me key is configured in the `application-dev.yml` and `application-prod.yml` files, as the `jhipster.security.remember-me.key` property. As this key must be kept secret, you **should** store it in a secure way for your production profile. It can be set up using the usual Spring Boot property configuration: using a Spring Cloud Config server like the [JHipster Registry]({{ site.url }}/jhipster-registry/) (our recommended option), using an environment variable, or even a specific `application-prod.yml` file which is SCP'd by a sysadmin into the same directory as your application's executable WAR file.
- You **should** change the default "user" and "admin" passwords. The easiest way to do this is to deploy your application, login as "user/user" and then "admin/admin", and for each of them use the "Account > Password" menu to change the password.

### Improved remember-me mechanism

We have modified the Spring Security remember-me mechanism so that you have a unique token, that is stored in your database (SQL or NoSQL database, depending on your choice during generation!). We also store more information than the standard implementation, so you have a better understanding of where those tokens come from: IP address, browser, date... And we generate a complete administration screen, so that you can invalidate sessions, for example if you forgot to log out on another computer.

### Cookie theft protection

We have added a very complete cookie theft protection mechanism: we store your security information in a cookie, as well as in the database, and each time a user logs in we modify those values and check if they have been altered. That way, if a user ever steals your cookie, he will be able to use only once, at most.

### CSRF protection

Spring Security and Angular both have CSRF protection out-of-the-box, but unfortunately they don't use the same cookies or HTTP headers! In practice, you have in fact no protection at all for CSRF attacks. Of course, we re-configure both tools so that they correctly work together.

## <a name="oauth2"></a> OAuth2 and OpenID Connect

OAuth is a stateful security mechanism, like HTTP Session. Spring Security provides OAuth 2.0 support, and this is leveraged by JHipster with its `@EnableOAuth2Sso` annotation.  If you're not sure what OAuth and OpenID Connect (OIDC) are, please see [What the Heck is OAuth?](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)

### Keycloak

[Keycloak](https://keycloak.org) is the default OpenID Connect server configured with JHipster.

To log into your application, you'll need to have [Keycloak](https://keycloak.org) up and running. The JHipster Team has created a Docker container for you that has the default users and roles. Start Keycloak using the following command.

```
docker-compose -f src/main/docker/keycloak.yml up
```

If you want to use Keycloak with Docker Compose, be sure to read our [Docker Compose documentation]({{ site.url }}/docker-compose/), and configure correctly your `/etc/hosts` for Keycloak.

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

As by default Keycloak uses an embedded H2 database, you will lose the created users if you restart your Docker container. To keep your data, please read the [Keycloak Docker documentation](https://hub.docker.com/r/jboss/keycloak/). One solution, with keeping the H2 database, is to do the following:

- Add a volume that will be persisted: `./keycloak-db:/opt/jboss/keycloak/standalone/data`
- Change the migration strategy from `OVERWRITE_EXISTING`, to `IGNORE_EXISTING` (in the command section)

In production, it is required by Keycloak that you use HTTPS. There are several ways to achieve this, including using a reverse proxy or load balancer that will manage HTTPS. We recommend that you read the [Keycloak HTTPS documentation](https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl) to learn more about this topic.

### Okta

If you'd like to use Okta instead of Keycloak, you'll need to change a few things. First, you'll need to create a free developer account at <https://developer.okta.com/signup/>. After doing so, you'll get your own Okta domain, that has a name like `https://dev-123456.okta.com`.

Modify `src/main/resources/application.yml` to use your Okta settings. Hint: replace `{yourOktaDomain}` with your org's name (e.g., `dev-123456.okta.com`).

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

Create an OIDC App in Okta to get a `{client-id}` and `{client-secret}`. To do this, log in to your Okta Developer account and navigate to **Applications** > **Add Application**. Click **Web** and click the **Next** button. Give the app a name you’ll remember, and specify `http://localhost:8080` as a Base URI and `http://localhost:8080/login` as a Login Redirect URI. Click **Done** and copy the client ID and secret into your `application.yml` file. You'll need to edit your app and add `http://localhost:8080` as a Logout Redirect URI if you want logout to work.

Create a `ROLE_ADMIN` and `ROLE_USER` group (**Users** > **Groups** > **Add Group**) and add users to them. You can use the account you signed up with, or create a new user (**Users** > **Add Person**). Navigate to **API** > **Authorization Servers**, click the **Authorization Servers** tab and edit the default one. Click the **Claims** tab and **Add Claim**. Name it "groups", and include it in the ID Token. Set the value type to "Groups" and set the filter to be a Regex of `.*`.

**NOTE:** If you want to use Okta all the time (instead of Keycloak), modify JHipster’s Protractor tests to use this account when running. Do this by changing the credentials in `src/test/javascript/e2e/account/account.spec.ts` and `src/test/javascript/e2e/admin/administration.spec.ts`.

After making these changes, you should be good to go! If you have any issues, please post them to [Stack Overflow](https://stackoverflow.com/questions/tagged/jhipster). Make sure to tag your question with "jhipster" and "okta".

You can also use environment variables to override the defaults. For example:

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
