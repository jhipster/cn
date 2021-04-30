---
layout: default
title: 部署到Heroku
permalink: /heroku/
redirect_from:
  - /heroku.html
sitemap:
    priority: 0.7
    lastmod: 2014-09-08T00:00:00-00:00
---

# 部署到Heroku

该子生成器允许将您的JHipster应用程序部署到[Heroku云](https://www.heroku.com/){:target="_blank" rel="noopener"}。

[![]({{ site.url }}/images/logo/logo-heroku.png)](https://www.heroku.com/){:target="_blank" rel="noopener"}

Heroku通过两种方式帮助JHipster：

- Heroku的Joe Kutner目前正在维护此子生成器
- Heroku提供了免费的信用额度，使我们能够使用复杂的高端设置来测试生成的应用程序，以确保所有普通用户都能正常使用

## 运行子生成器

在运行子生成器之前，您必须安装[Heroku CLI](https://cli.heroku.com/){:target="_blank" rel="noopener"}，并创建一个Heroku帐户。

您还必须[创建一个Heroku帐户](http://signup.heroku.com/){:target="_blank" rel="noopener"}并通过运行以下命令使用CLI登录：

<pre>**$ heroku login**
Enter your Heroku credentials.
Email: YOUR_EMAIL
Password (typing will be hidden): YOUR_PASSWORD
Authentication successful.
</pre>

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
Heroku子生成器将始终使用免费套餐/选项。
不过，安装插件需要正确的<a href="https://devcenter.heroku.com/articles/account-verification" target="_blank" rel="noopener">已验证的Heroku帐户</a>。
因此，为避免任何意外的构建失败，建议您在启动此子生成器之前验证您的Heroku帐户。
</div>

Heroku子生成器使用[free dynos](https://devcenter.heroku.com/articles/dyno-types){:target="_blank" rel="noopener"} 创建一个应用程序，并与您选择的配置相匹配 。

我们支持以下附加组件：

* [Heroku Postgres](https://www.heroku.com/postgres){:target="_blank" rel="noopener"} 使用PostgreSQL
* [JawsDB](https://elements.heroku.com/addons/jawsdb){:target="_blank" rel="noopener"} 使用MySQL or MariaDB
* [Heroku Redis](https://elements.heroku.com/addons/heroku-redis){:target="_blank" rel="noopener"} [使用Redis](/using-cache/#caching-with-redis)
* [MemCachier](https://elements.heroku.com/addons/memcachier){:target="_blank" rel="noopener"} [使用Memcached](/using-cache/#caching-with-memcached)
* [Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai){:target="_blank" rel="noopener"} [使用 Elasticsearch](/using-elasticsearch/)
* [Okta](https://elements.heroku.com/addons/okta){:target="_blank" rel="noopener"}  [使用 OAuth2/OIDC (可选)](/security/#oauth2)

要将应用程序部署到Heroku，请运行以下命令：

`jhipster heroku`

这应该以"production"模式打包您的应用程序，使用数据库创建一个Heroku应用程序，上传您的代码，然后启动该应用程序。

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
请注意，如果您的应用程序是微服务，系统将提示您提供registryURL。向下滚动以了解如何执行此操作。
</div>

<div class="alert alert-warning"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>
请注意，您的应用程序必须在90秒内启动，否则将被终止。根据平台负载，当然不能保证在60秒以内开始！
</div>


## 更改Java版本

您可以在执行Heroku子生成器时选择Java版本。
默认情况下，它将是Java 11。
您可以在Heroku上找到所有内容[官方文档中支持的Java版本](https://devcenter.heroku.com/articles/java-support#supported-java-versions){:target="_blank" rel="noopener"}。

如果您想更改Java版本，例如 从11到14之后，您需要在项目根文件夹的system.properties中对其进行更改：

```
java.runtime.version = 14
```

重新部署应用程序时，它将使用Java 14。

## 部署您的应用程序

默认情况下，该应用程序将[通过git部署](https://devcenter.heroku.com/articles/git){:target="_blank" rel="noopener"} 。
这意味着您推送代码，Heroku将在其服务器上构建并将其部署。
如果您不能或不想将代码推送到其他人的服务器，则可以使用jar选项并[部署可执行的jar](https://devcenter.heroku.com/articles/deploying-executable-jar-files){:target="_blank" rel="noopener"}。
Heroku还支持[部署docker映像](https://devcenter.heroku.com/articles/container-registry-and-runtime){:target="_blank" rel="noopener"}， 但是子生成器确实支持 目前尚不支持此选项。

### 更新已部署的应用程序

#### 使用git选项

通过git部署时，已创建一个名为heroku的新远程服务器。
要部署新代码，您需要将更改推送到heroku远程服务器：

`git push heroku master`

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
这假定您已在执行此命令的计算机上运行了生成器。
如果还没有，则需要遵循 <a href="https://devcenter.heroku.com/articles/git#for-an-existing-heroku-app" target="_blank" rel="noopener">指示创建一个Heroku远程</a>.
</div>

#### 使用jar选项

选择部署可执行jar时，需要创建更新的jar并将新文件部署到Heroku。

##### 准备一个新的Jar

在部署了应用程序之后，可以通过输入以下方式准备新的部署：

`./mvnw package -Pprod -DskipTests`

使用gradle:

`./gradlew -Pprod bootJar -x test`

##### 推送到生产

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
假定您已在执行此命令的计算机上运行了生成器。如果尚未安装，则需要按照说明安装[Heroku Java CLI](https://devcenter.heroku.com/articles/deploying-executable-jar-files)。
</div>

要推送生产，请输入：

`heroku deploy:jar target/*.jar`

使用gradle:

`heroku deploy:jar build/libs/*jar`

## 将Docker部署到Heroku

您也可以将应用程序作为Docker容器部署到Heroku。 在这种情况下，不会发生任何Heroku设置和配置，因此您必须手动进行。 本文档假定您已经运行`jhipster heroku`来部署您的应用程序，因此可以利用此过程执行的集成和附加配置。

**注意**：如果您使用的是v6.10.2之前的JHipster版本，则需要在`src/main/resources/config/application-heroku.yml`中添加以下内容：

```yaml
server:
  port: ${PORT:8080}
```

构建您的Docker映像：

```
./mvnw package -Pprod verify jib:dockerBuild
```

如果您使用的是Gradle：

```
./gradlew -Pprod bootJar jibDockerBuild
```

您可以使用Docker Compose在本地对其进行测试。

```shell
docker-compose -f src/main/docker/app.yml up
```

确认一切正常后，在Heroku上创建一个新应用，并将其添加为remote。

```shell
heroku apps:create
git remote add docker https://git.heroku.com/<your-new-app>.git
```

然后运行以下命令以将您的JHipster应用程序部署为Docker映像。 
确保使用您的Heroku应用名称替换`<...>`占位符。 如果您不知道自己的应用名称，请运行`heroku apps`。

```shell
heroku container:login
docker tag space registry.heroku.com/<heroku-app>/web
docker push registry.heroku.com/<heroku-app>/web
```

例如：

```shell
heroku container:login
docker tag space registry.heroku.com/fast-peak-70014/web
docker push registry.heroku.com/fast-peak-70014/web
```

此时，您可以使用已经配置的PostgreSQL和Okta插件。 运行以下命令，从首次部署到的`heroku`远程获取附件的标识符。

```shell
heroku addons --remote heroku
```

然后，您可以将这些实例附加到新的应用程序。

```shell
heroku addons:attach <postgresql-addon-name> --remote docker
heroku addons:attach <okta-addon-name> --remote docker
```

当您使用`jhipster heroku`部署应用程序时，它会为您正确配置数据库。 但是，将其部署为Docker容器时，这些都不会发生。 因此，您需要设置一些配置变量，以便您的Docker容器可以与PostgreSQL通讯。 首先，运行以下命令以获取PostgreSQL URL。

```
heroku config:get DATABASE_URL --remote docker
```

此命令将使用以下语法检索值：

```
postgres://username:password@address
```

然后，设置数据库环境变量以匹配`application-heroku.yml`中的键：

```shell
heroku config:set JDBC_DATABASE_URL=jdbc:postgresql://<address> --remote docker
heroku config:set JDBC_DATABASE_USERNAME=<username> --remote docker
heroku config:set JDBC_DATABASE_PASSWORD=<password> --remote docker
```

设置要使用的最大Java内存量，并指定Spring配置文件。

```shell
heroku config:set JAVA_OPTS=-Xmx256m
heroku config:set SPRING_PROFILES_ACTIVE=prod,heroku
```

运行以下命令以打开浏览器并导航至您的应用。

```
heroku open --remote docker
```

复制应用程序的URL，然后登录到Okta开发人员帐户。 转到**Applications** > **Web** > **General**，然后将URL添加到“登录和注销”重定向URI中。 确保登录重定向URI以`/login/oauth2/code/oidc`结尾。

现在，您应该可以发布容器并启动应用程序了。

```
heroku container:release web --remote docker
```

您可以查看日志以查看容器是否成功启动。

```
heroku logs --tail --remote docker
```

现在您应该可以打开您的应用程序，单击**sign in**链接并进行身份验证！

```
heroku open --remote docker
```

**注意**：您**不能**使用Okta附加条款的管理员帐户登录到您的JHipster应用程序。 为了确保您没有使用该帐户登录，我们建议您使用新的私有窗口登录。

如果您在[securityheaders.com](https://securityheaders.com)上测试了Dockerized JHipster应用，您将看到它的得分为 **A** ！

## 部署微服务

JHipster微服务需要[使用JHipster进行微服务](/microservices-architecture/)文档中所述的JHipster Registry。您可以通过单击以下按钮将registry部署到Heroku：

[![部署到Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

部署registry后，您可以对微服务或网关运行`jhipster heroku`命令。Heroku子生成器将提示您输入registry的URL，其格式为`https://[appname].herokuapp.com`。

在Heroku上运行的registry有一些限制，包括：

*   registry仅适用于本机配置（不适用于Git配置）。
*   registry服务不能扩展多个dyno以提供冗余。您必须部署多个应用程序（即多次单击按钮）。这是因为Eureka需要不同的URL才能在实例之间同步内存中状态。

### 在Heroku上使用JHipster Registry的安全性

要在JHipster Registry上获取自动生成的管理员密码，请输入：

`heroku config:get JHIPSTER_PASSWORD`

要使用此密码，请通过运行以下命令来更新所有微服务和网关，以使用registry的凭据：

`heroku config:set JHIPSTER_REGISTRY_URL="https://admin:[password]@[appname].herokuapp.com"`

## 故障排除

如果在应用Liquibase变更日志时您的应用程序被Heroku终止，则Liquibase将数据库标记为"locked"。您将需要手动清理锁定表。在Postgres上，请确保[已安装本地Postgres客户端](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup){:target="_blank" rel="noopener"}，然后运行以下命令：

`heroku pg:psql -c "update databasechangeloglock set locked=false;"`

Heroku的默认启动超时限制为90秒。如果您的应用花费的时间超过此时间，Heroku将终止该进程，这可能会使数据库处于锁定状态。如果问题仍然存在，请尝试与[Heroku支持](http://help.heroku.com){:target="_blank" rel="noopener"}联系，以请求为您的应用设置更长的启动限制。

### 使用 Elasticsearch

带有免费沙盒计划的Bonsai附加组件确实[仅支持最新的Elasticsearch版本](https://docs.bonsai.io/article/139-which-versions-bonsai-supports){:target="_blank" rel="noopener"}。
这可能会导致某些[不兼容](https://github.com/jhipster/generator-jhipster/issues/10003){:target="_blank" rel="noopener"}，具体取决于您使用的Spring Data和JHipster版本使用。

<div class="alert alert-warning"><i class="fa fa-money" aria-hidden="true"></i>
如果您愿意使用<b>付费计划</b>，则当然可以选择使用的Elasticsearch版本。<a href="https://github.com/jhipster/generator-jhipster/issues/10003#issuecomment-587770177" target="_blank" rel="noopener">将其设置为例如<code class="highlighter-rouge">6.5.4</code> 或 <code class="highlighter-rouge">6.6.2</code></a> 适用于所有JHipster 6.x版本。
</div>

### 使用Okta

当您选择[Okta](https://elements.heroku.com/addons/okta){:target="_blank" rel="noopener"}时，子生成器将创建一个bash脚本，该脚本将创建所需的所有组和角色由JHipster。
当您使用创建过程中提供的用户和凭据登录时，您将需要选择一个新密码，因为脚本确保将密码直接过期，因为该密码存储在`.yo-rc.json`中。

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
设置Okta插件所需的脚本
<ul>
  <li><a href="https://curl.haxx.se/" target="_blank" rel="noopener">cURL</a> 用于向<a href="https://developer.okta.com/docs/reference/" target="_blank" rel="noopener">Okta API</a>发送Web请求</li>
  <li><a href="https://stedolan.github.io/jq/" target="_blank" rel="noopener">jq</a>用于解析/处理JSON数据</li>
</ul>
如果找不到这些工具，则子生成器会警告您，您必须手动执行：
<code class="highlighter-rouge">./provision-okta-addon.sh</code>
</div>

### 免费dynos

免费dynos是有限的，不应用于生产部署，因为

* 他们在[30分钟的空闲时间](https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping){:target="_blank" rel="noopener"}之后就休眠了。
* 他们有[每月有限的动态小时数](https://devcenter.heroku.com/articles/free-dyno-hours#usage){:target="_blank" rel="noopener"}。当这些被消耗掉时，您的测功机要等到下个月才能运行！

您可以直接从Heroku管理员界面升级dyno配置。
如果您意识到数据库计划太小了，你可以从管理页面选择一个新的计划。

## 更多信息

*   [应用范例](https://github.com/kissaten/jhipster-example){:target="_blank" rel="noopener"}
*   [Spring Boot Heroku文档](https://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment.html#cloud-deployment-heroku){:target="_blank" rel="noopener"}
*   [Heroku免费dyno文档](https://devcenter.heroku.com/articles/free-dyno-hours){:target="_blank" rel="noopener"}
*   [Heroku Java支持文档](https://devcenter.heroku.com/articles/java-support#supported-java-versions){:target="_blank" rel="noopener"}
