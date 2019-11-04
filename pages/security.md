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

# <i class="fa fa-lock"></i> 保护您的应用程序

要将Spring Security与单个Web页面应用程序一起使用（如JHipster生成的应用程序），您需要Ajax登录/注销/错误视图。我们已经配置了Spring Security以便正确使用这些视图，当然我们会为您生成所有JavaScript和HTML代码。

默认情况下，JHipster带有4个不同的用户：

*   "system", 当自动完成某项操作时，主要由审计日志使用
*   "anonymousUser", 匿名用户在执行操作时分配
*   "user", 具有"ROLE_USER"授权的普通用户。它的默认密码是"user"
*   "admin", 具有"ROLE_USER"和"ROLE_ADMIN"授权的管理员用户。它的默认密码是"admin"

两个授权"ROLE_USER"和"ROLE_ADMIN"提供对实体的相同访问权限，这意味着"user"被授权执行与"admin"相同的CRUD操作。当应用程序投入生产时，此行为可能会成为问题，因为"user"可以例如删除任何实体。有关如何改善访问控制的更多详细信息，请参见此[博客文章](https://blog.ippon.tech/improving-the-access-control-of-a-jhipster-application/)。

出于安全原因，您应该在生产中更改这些默认密码。

JHipster提供了4种主要的安全机制：

1. [JSON Web令牌（JWT）](#jwt)
2. [基于会话的身份验证](#session)
3. [OAuth2和OpenID Connect](#oauth2)
4. [JHipster用户帐户和身份验证（UAA）]({{ site.url }}/using-uaa/)（由于更为复杂，因此具有单独的文档页面）

## <a name="jwt"></a> JSON Web令牌（JWT）

[JSON Web令牌（JWT）](https://jwt.io/)身份验证是一种无状态的安全机制，因此，如果要在多台不同的服务器上扩展应用程序，它是一个不错的选择。

请注意，这是使用[微服务架构]({{ site.url }}/microservices-architecture/)时的默认选项。

默认情况下，Spring Security不存在这种身份验证机制，它是[Java JWT项目](https://github.com/jwtk/jjwt)的特定于JHipster的集成。

该解决方案使用一个安全的令牌，其中包含用户的登录名和权限。由于令牌已签名，因此用户无法更改。

### 保护JWT

- JHipster使用secret密钥，可以使用两个Spring Boot属性对其进行配置：`jhipster.security.authentication.jwt.secret`和`jhipster.security.authentication.jwt.base64-secret`。第二个选项使用Base64编码的字符串，因此它被认为更安全，因此建议使用。如果同时配置了两个属性，则出于传统原因，将使用secret属性（安全性较低）。如果您不使用Base64属性，则会在应用程序启动时显示警告。
- 这些密钥的最小长度应为512位：如果它们不够长，则将无法使用它们进行登录。如果发生这种情况，控制台上将发出明确的警告，以解释该问题。
- secret密钥在`application-*.yml`文件中配置。由于这些密钥必须保密，因此您**应该**以安全的方式将它们存储在生产配置文件中。可以使用常规的Spring Boot属性配置来设置它：使用Spring Cloud Config服务器，如[JHipster Registry]({{ site.url }}/jhipster-registry/)（我们建议使用该选项），使用环境变量，甚至是由SCP制作的特定`application-prod.yml`文件，由系统管理员放入与应用程序的可执行WAR文件相同的目录。
- 您**应该**更改默认的"user"和"admin"密码。最简单的方法是部署应用程序，先以"user/user"身份登录，然后以"admin/admin"身份登录，然后针对每个用户使用 "Account > Password"菜单更改密码。

## <a name="session"></a> 基于会话的身份验证

这是经典的Spring Security认证机制，但是我们已经对其进行了相当大的改进。它使用HTTP会话，因此它是一种有状态的机制：如果您打算在多个服务器上扩展应用程序，则需要具有带有粘性会话的负载均衡器，以便每个用户的所有访问都位于同一台服务器上。

### 保护基于会话的身份验证

- 对于"记住我"身份验证，"记住我"密钥在`application-dev.yml`和`application-prod.yml`文件中配置为`jhipster.security.remember-me.key`属性。由于此密钥必须保密，因此您应该以安全的方式将其存储在生产配置文件中。可以使用常规的Spring Boot属性配置来设置它：使用Spring Cloud Config服务器，如JHipster Registry（我们建议使用的选项），使用环境变量，甚至是由SCP制作的特定`application-prod.yml`文件，由系统管理员放入与应用程序的可执行WAR文件相同的目录。
- 您**应该**更改默认的"user"和"admin"密码。最简单的方法是部署应用程序，先以"user/user"身份登录，然后以"admin/admin"身份登录，然后针对每个用户使用 "Account > Password"菜单更改密码。

###改进的"记住我"机制

我们已经修改了Spring Security记住我机制，以便您拥有一个唯一的令牌，该令牌存储在数据库中（SQL或NoSQL数据库，具体取决于生成期间的选择！）。我们还存储了比标准实现更多的信息，因此您可以更好地了解这些令牌的来源：IP地址，浏览器，日期……并且我们会生成一个完整的管理屏幕，以便您可以使会话无效，例如，如果您忘记了在另一台计算机上注销。

### Cookie盗窃保护

我们添加了非常完整的cookie盗窃保护机制：我们将您的安全性信息存储在cookie中以及数据库中，并且每次用户登录时，我们都会修改这些值并检查它们是否被更改。这样，如果用户窃取了您的Cookie，则最多只能使用一次。

### CSRF保护

Spring Security和Angular都具有现成的CSRF保护功能，但不幸的是，它们没有使用相同的Cookie或HTTP头部！实际上，实际上您根本没有针对CSRF攻击的保护。当然，我们将重新配置这两个工具，以便它们可以正确地协同工作。

## <a name="oauth2"></a> OAuth2和OpenID Connect

OAuth是一种有状态的安全性机制，类似HTTP会话。Spring Security提供了出色的OAuth 2.0和OIDC支持，JHipster利用了这一点。如果您不确定什么是OAuth和OpenID Connect（OIDC），请参阅[OAuth到底是什么](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)

### Keycloak

[Keycloak](https://keycloak.org)是JHipster配置的默认OpenID Connect服务器。

要登录您的应用程序，您需要启动并运行[Keycloak](https://keycloak.org)。JHipster团队为您创建了一个具有默认用户和角色的Docker容器。使用以下命令启动Keycloak。

```
docker-compose -f src/main/docker/keycloak.yml up
```

如果要将Keycloak与Docker Compose一起使用，请确保阅读我们的[Docker Compose文档]({{ site.url }}/docker-compose/)，并为Keycloak正确配置`/etc/hosts`。

此镜像已在`src/main/resources/application.yml`配置了安全设置。


```yaml
spring:
  ...
  security:
    oauth2:
      client:
        provider:
          oidc:
            issuer-uri: http://localhost:9080/auth/realms/jhipster
        registration:
          oidc:
            client-id: web_app
            client-secret: web_app
```

Keycloak默认情况下使用嵌入式H2数据库，因此，如果重新启动Docker容器，您将失去创建的用户。为了保留您的数据，请阅读[Keycloak Docker文档](https://hub.docker.com/r/jboss/keycloak/)。保留H2数据库的一种解决方案是执行以下操作：

- 添加持久化卷: `./keycloak-db:/opt/jboss/keycloak/standalone/data`
- 更改迁移策略`OVERWRITE_EXISTING`为`IGNORE_EXISTING` (在命令部分)

在生产中，Keycloak要求您使用HTTPS。有几种方法可以实现此目的，包括使用将管理HTTPS的反向代理或负载均衡器。我们建议您阅读[Keycloak HTTPS文档](https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl)以了解有关此主题的更多信息。

### Okta

如果您想使用Okta代替Keycloak，则需要进行一些改变。首先，您需要通过<https://developer.okta.com/signup/>创建一个免费的开发者帐户。这样操作之后，您将获得自己的Okta域，其名称类似于`https://dev-123456.okta.com`。

修改`src/main/resources/application.yml`以使用Okta设置。提示：将`{yourOktaDomain}`替换为您组织名称（例如：`dev-123456.okta.com`）。

```yaml
security:
  oauth2:
    client:
      provider:
        oidc:
          issuer-uri: https://{yourOktaDomain}/oauth2/default
      registration:
        oidc:
          client-id: {client-id}
          client-secret: {client-secret}
```

在Okta中创建OIDC应用，以获取`{client-id}`和`{client-secret}`。为此，请登录您的Okta Developer帐户，然后导航至**Applications** > **Add Application**。单击**Web**，然后单击**Next**按钮。为应用命名一个需要记住的名称，，并指定`http://localhost:8080/login/oauth2/code/oidc`作为登录重定向URI。单击完成，然后编辑您的应用程序以将`http://localhost:8080`添加为注销重定向URI。将客户端ID和密码复制到`application.yml`文件中。

创建一个`ROLE_ADMIN`和`ROLE_USER`组（**Users** > **Groups** > **Add Group**）并将用户添加到其中。您可以使用注册时使用的帐户，也可以创建一个新用户（**Users** > **Add Person**）。导航到 **API** > **Authorization Servers**，然后单击`default`服务器。单击**Claims**标签，然后**Add Claim**。将其命名为`groups`，并将其包括在ID令牌中。将值类型设置为`Groups`，并将过滤器设置为`.*`正则表达式。单击**Create**。

<img src="{{ site.url }}/images/security-add-claim.png" alt="Add Claim" width="600" style="margin: 10px">

**注意:** 如果您想一直使用Okta（而不是Keycloak），请修改JHipster的Protractor测试以在运行时使用该帐户。为此，请更改`src/test/javascript/e2e/account/account.spec.ts`和`src/test/javascript/e2e/admin/administration.spec.ts`中的凭据。

进行这些更改后，您应该一切顺利！如果您有任何问题，请将其发布到[Stack Overflow](https://stackoverflow.com/questions/tagged/jhipster)。确保用"jhipster"和"okta"标记您的问题。

您还可以使用环境变量来覆盖默认值。例如：

```bash
export SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI="https://{yourOktaDomain}/oauth2/default"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID="{client-id}"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET="{client-secret}"
```

您可以将其放在`~/.okta.env`文件中，然后运行`source ~/.okta.env`以用Okta覆盖Keycloak。

然后，当您部署到Heroku时，可以设置以下属性：

```bash
heroku config:set \
  SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI="$SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI" \
  SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID="$SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID" \
  SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET="$SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET"
```

对于Cloud Foundry，您可以使用类似以下的内容，其中`$appName`是您的应用程序的名称。

```bash
export appName={your-app}
cf set-env $appName SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI "$SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI"
cf set-env $appName SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID "$SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID"
cf set-env $appName SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET "$SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET"
```

请参阅[将OpenID Connect支持与JHipster一起使用](https://developer.okta.com/blog/2017/10/20/oidc-with-jhipster)以了解有关JHipster 5和带有Okta的OIDC的更多信息。

如果您使用的是JHipster 6，请参阅[Better, Faster, Lighter Java with Java 12 and JHipster 6](https://developer.okta.com/blog/2019/04/04/java-11-java-12-jhipster-oidc)。如果您的微服务使用JHipster 6，请参阅带[有Spring Cloud Config和JHipster的Java微服务](https://developer.okta.com/blog/2019/05/23/java-microservices-spring-cloud-config)。

## <a name="https"></a> HTTPS

当您的应用程序在Heroku上运行时，可以通过将以下配置添加到`SecurityConfiguration.java`中来强制使用HTTPS。

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

这将适用于Heroku和Cloud Foundry。有关Heroku的更多生产环境提示，请参阅[为在Heroku上准备生产环境的Spring Boot应用程序](https://devcenter.heroku.com/articles/preparing-a-spring-boot-app-for-production-on-heroku)。