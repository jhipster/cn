---
layout: default
title: 在生产中使用JHipster
permalink: /production/
redirect_from:
  - /production.html
sitemap:
    priority: 0.7
    lastmod: 2019-02-04T00:00:00-00:00
---

# <i class="fa fa-play-circle"></i> 在生产中使用JHipster

JHipster生成了完全可用于生产，优化和安全的应用程序。本部分介绍了更重要的选项-如果您急于赶时间，请运行常规的生产版本，但不要忘记阅读安全性部分！

1. [构建生产包](#build)
2. [在生产中运行](#run)
3. [性能优化](#performance)
4. [安全](#security)
5. [监控](#monitoring)

## <a name="build"></a> 构建生产包

### 测试生产版本

这样就可以从Maven测试生产版本，而无需构建真正的程序包。

要在生产模式下使用JHipster，请使用预先配置的`prod`概要文件。使用Maven，请运行：

`./mvnw -Pprod`

使用Gradle时，请运行：

`./gradlew -Pprod`

此配置文件将使用所有生产设置编译，测试和打包您的应用程序。

如果需要有关可用配置文件的更多信息，请转到标题为"[开发和生产配置文件]({{ site.url }}/profiles/)"部分。

### 构建可执行的JAR/WAR文件

要将应用程序打包为生成JAR，请使用Maven输入：

`./mvnw -Pprod clean verify`

或使用Gradle时，请输入：

`./gradlew -Pprod clean bootJar`

这将生成此文件（如果您的应用程序称为“jhipster”）：

使用Maven时：
*   `target/jhipster-0.0.1-SNAPSHOT.jar`

使用Gradle时：
*   `build/libs/jhipster-0.0.1-SNAPSHOT.jar`


要将应用程序打包为生产WAR，请使用Maven输入：

`./mvnw -Pprod,war clean verify`

或使用Gradle时，请输入：

`./gradlew -Pprod -Pwar clean bootWar`

**请注意** 在构建具有上下文路径的JAR或WAR文件时，您将需要使用适当的baseHref更新webpack.prod.js。

这将生成以下文件（如果您的应用程序称为“jhipster”）：

使用Maven时：
*   `target/jhipster-0.0.1-SNAPSHOT.war`

使用Gradle时：
*   `build/libs/jhipster-0.0.1-SNAPSHOT.war`

**请注意** 当使用`prod`配置文件构建JAR或WAR文件时，生成的档案将不包含`dev` 资产。

**请注意** 如果要使用Maven生成WAR原始文件，则需要编辑`pom.xml`文件以使用`war`打包而不是`jar`打包：

```diff
-    <packaging>jar</packaging>
+    <packaging>war</packaging>
```

## <a name="run"></a> 在生产中运行

### 在没有应用程序服务器的情况下执行JAR文件

与部署到应用程序服务器相比，许多人发现仅拥有可执行的JAR文件更加容易。

使用上一步中生成的JAR文件，以生产模式运行它，您可以通过输入（在Mac OS X或Linux上）：

`./jhipster-0.0.1-SNAPSHOT.jar`

如果您使用的是Windows，请使用：

`java -jar jhipster-0.0.1-SNAPSHOT.jar`

**请注意** 该JAR文件使用我们在构建文件时选择的配置文件。由于它是使用上一节中的`prod`文件构建的，因此它将与`prod`配置文件一起运行。

### 在Docker容器中运行应用程序

JHipster对Docker具有一等公民的支持：将可执行JAR文件捆绑在Docker镜像中并在Docker中运行非常容易。

要了解如何使用Docker打包您的应用程序，请阅读我们的[Docker Compose文档]({{ site.url }}/docker-compose/)。

### 作为服务运行

也可以将Jar作为Linux服务运行，并且您可能希望在打包之前强制在`pom.xml`文件指定。为此，请在`spring-boot-maven-plugin`插件的`<configuration>`内添加以下属性。

```
<embeddedLaunchScriptProperties>
    <mode>service</mode>
</embeddedLaunchScriptProperties>
```

接下来，使用以下命令设置您的init.d：

`ln -s jhipster-0.0.1-SNAPSHOT.jar /etc/init.d/jhipster`

使用以下方法保护您的应用程序安全：

`chown jhuser:jhuser jhipster-0.0.1-SNAPSHOT.jar
sudo chattr +i your-app.jar`

考虑到`jhuser`是将运行该应用程序的非root操作系统帐户，则可以通过以下方式运行该应用程序：

`service jhipster start|stop|restart`

您可以在[Spring Boot文档](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment-install.html)中找到许多其他选项，包括更多安全步骤和Windows服务相关。

### 在上下文路径下运行应用程序

将JHipster应用程序部署到应用服务器或自定义上下文路径时，需要将`webpack.common.js`或`webpack.prod.js`中的baseHref值设置为期望的上下文路径。

## <a name="performance"></a> 性能优化

### 缓存调整

如果在生成应用程序时选择了缓存提供程序，则JHipster会自动为您配置它。

但是，默认缓存值非常低，因此应用程序可以在适度的硬件上运行，所以应该根据应用程序的特定业务需求来调整这些值。

请阅读：

- [JHipster“使用缓存”文档]({{ site.url }}/using-cache/)可了解有关所选缓存提供程序的更多信息，以及如何对其进行调整
- 关于[最后一部分的监控](#monitoring)，因此您可以根据应用程序的实际使用情况微调缓存

### HTTP/2支持

JHipster使用`jhipster.http.version`属性（在`application-prod.yml`文件中配置）支持HTTP/2。

要启用HTTP/2，您需要：

- 设置`jhipster.http.version: V_2_0`
- 配置HTTPS（请参阅本文档的[安全性部分](#security)），因为浏览器会强制将HTTPS与HTTP/2结合使用

### GZipping

在使用`prod`配置文件的可执行JAR文件中，JHipster会在您的Web资源上配置GZip压缩。

默认情况下，压缩将对所有静态资源（HTML，CSS，JavaScript）和所有REST请求起作用。通过查看在`application-prod.yml`文件中配置的Spring Boot应用程序属性中的`server.compression.*`键，可以获取有关此配置的更多信息。

**请注意** GZipping由应用程序服务器完成，因此本节仅在您使用上述“可执行的JAR”选项时适用。如果您在外部应用程序服务器上运行应用程序，则需要单独进行配置。

### 缓存头

使用`prod`配置文件，JHipster配置了一个Servlet过滤器，该过滤器将特定的HTTP缓存头放在您的静态资源（JavaScript，CSS，字体等）上，以便浏览器和代理缓存它们。

### 使用Webpack生成优化的JavaScript应用程序

使用`prod`配置文件构建项目时，将自动触发此步骤。如果要运行它而不想启动Maven构建，请运行：

`npm run build`

这将使用[Webpack](https://webpack.github.io/)处理所有静态资源（CSS，TypeScript，HTML，JavaScript，图片等），以生成优化的前端应用程序。

在此过程中，Webpack会将TypeScript代码编译为JavaScript代码，还将生成源映射，因此仍可以调试前端应用程序。

这些优化后的资源，如果使用Maven，将在`target/classes/static`中生成，对于Gradle，将在`build/resources/main/static`中生成，并将包含在最终的生产JAR中。

当您使用`prod`配置文件运行应用程序时，这些代码将被服务托管。

## <a name="security"></a> 安全

### 保护默认用户和管理员帐户

JHipster会为您生成一些默认用户。在生产中，您应该更改这些用户的默认密码！

请遵循我们的[安全文档]({{ site.url }}/security/)，以了解如何更改这些密码并保护您的应用程序安全。

### HTTPS支持

可以直接在JHipster应用程序中配置HTTPS，也可以使用特定的前端代理进行配置。

#### 使用JHipster进行HTTPS配置

HTTPS是使用`application-prod.yml`文件中的Spring Security的标准`server.ssl`配置键配置的。

要启用SSL，请使用以下方法生成证书：

    keytool -genkey -alias <your-application> -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 3650

您也可以通过[本教程](https://maximilian-boehm.com/hp2121/Create-a-Java-Keystore-JKS-from-Let-s-Encrypt-Certificates.htm)使用Let's Encrypt。

然后，修改`server.ssl`属性，以便您的`application-prod.yml`配置如下所示：

    server:
        port: 443
        ssl:
            key-store: keystore.p12
            key-store-password: <your-password>
            keyStoreType: PKCS12
            keyAlias: <your-application>
            ciphers: TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384, TLS_DHE_RSA_WITH_AES_128_GCM_SHA256, TLS_DHE_RSA_WITH_AES_256_GCM_SHA384, TLS_DHE_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_RSA_WITH_AES_256_CBC_SHA, TLS_DHE_RSA_WITH_AES_128_CBC_SHA256, TLS_DHE_RSA_WITH_AES_256_CBC_SHA256
            enabled-protocols: TLSv1.2

ciphers suite通过停用一些旧的和已弃用的SSL密码来增强安全性，此列表已通过[SSL实验室](https://www.ssllabs.com/ssltest/)测试

Once `server.ssl.ciphers` property is enabled JHipster will force the order on Undertow with this property (true by default) : `jhipster.http.useUndertowUserCipherSuitesOrder`
启用`server.ssl.ciphers`属性后，JHipster将使用以下属性（默认为true）在Undertow上强制执行请求：`jhipster.http.useUndertowUserCipherSuitesOrder`

`enabled-protocols`会停用旧的SSL协议。

然后，实现完美的前向保密性的最后一步。在JVM启动时添加以下标志：

    -Djdk.tls.ephemeralDHKeySize=2048

要测试您的配置，可以转到[SSL Labs](https://www.ssllabs.com/ssltest/)。

如果一切正常，您将获得A+

#### 带有前端代理的HTTPS配置

有许多解决方案可在JHipster应用程序的前面设置前端HTTPS代理。我们在这里描述两种最常见的方法。

通过微服务架构，您可以使用JHipster的Traefik支持：

- 请遵循我们的[Traefik文档]({{ site.url }}/traefik/)来配置您的架构
- 请遵循[Traefik官方网站文档](https://docs.traefik.io/user-guide/examples/)来设置HTTPS

如果您想使用Apache HTTP服务器，则可以使用Let's Encrypt来进行设置：

- 安装Apache和Let's Encrypt：`apt-get install -y apache2 python-certbot-apache`
- 配置Let's Encrypt: `certbot --apache -d <your-domain.com> --agree-tos -m <your-email> --redirect`
- 配置SSL证书的自动续订: 想您的crontab添加 `10 3 * * * /usr/bin/certbot renew --quiet` 

## <a name="monitoring"></a> 监控

JHipster带有[Micrometer](https://micrometer.io/)的全面监视支持。

在开发中，可以通过JMX获得Metrics数据：启动JConsole，您将可以访问它

在生产中，您的应用程序将其指标数据公开在[Prometheus服务器](https://prometheus.io/docs/introduction/overview/)定期采集的服务端点上，具体取决于您配置的内容。
