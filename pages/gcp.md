---
layout: default
title: 部署到Google Cloud Platform
permalink: /gcp/
sitemap:
    priority: 0.5
    lastmod: 2018-10-02T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 部署到Google Cloud Platform

[![Google Cloud Platform]({{ site.url }}/images/logo/logo-gcp.png)](https://cloud.google.com)

您可以将JHipster应用程序部署到Google Cloud Platform并在以下平台上运行：
- [Google Compute Engine](https://cloud.google.com/compute/)的虚拟机
- [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)的Kubernetes中的容器
- [Google App Engine](https://cloud.google.com/appengine/)的平台即服务

您可以[免费试用Google Cloud Platform](https://cloud.google.com/free)来部署您的应用程序。在免费试用之后，请检查[Always Free](https://cloud.google.com/free/)级别的免费使用情况是否以达到指定的使用限制。

## 开始之前

在本地环境中安装gcloud SDK并通过其进行身份验证，以访问`gcloud` CLI。有关更多信息，请访问此链接：

- [安装gcloud SDK](https://cloud.google.com/sdk/install)

## 部署到Google App Engine

Google App Engine是一个完全托管的平台即服务，可以在负载下自动扩展应用程序实例，不使用时可以缩减为零。

您可以使用Google App Engine生成器来生成和部署JHipster应用程序。Google App Engine生成器通过Cloud SQL MySQL/PostgreSQL数据库支持单体和微服务应用程序。
#### 将单体应用部署到Google App Engine
1. 生成一个新的monolith应用程序：`jhipster`
1. 运行Google App Engine生成器：`jhipster gae`
1. 如果创建全新的应用程序，则可以选择创建一个新的Cloud SQL实例

该生成器将：
1. 添加描述App Engine实例和扩展配置的`src/main/appengine/app.yaml`。
1. 将App Engine插件添加到Maven/Gradle。

To deploy:
请注意，当前Google App Engine生成器仅支持部署到[App Engine标准（Java 11）](https://cloud.google.com/appengine/docs/standard/java11/)环境。

- 使用App Engine插件来部署：`./mvnw package appengine:deploy -DskipTests -Pgae,prod-gae`或者使用Gradle `./gradlew appengineDeploy -Pgae -Pprod-gae`

#### Deploying Microservices to Google App Engine
[Google Cloud在GAE上支持微服务架构]（https://cloud.google.com/appengine/docs/standard/java/microservices-on-app-engine）
通过将每个微服务隔离为一个单独的服务。 我们使用[`dispatch.yaml`文件]（https://cloud.google.com/appengine/docs/standard/java11/reference/dispatch-yaml）
将请求从网关路由到每个微服务。 因此，为了将微服务部署到GAE，您将需要将网关和每个微服务部署为单独的服务。

以下是需要执行的步骤。
1.在每个微服务上运行GAE子生成器。 将其作为第一步运行是很重要的，因为网关应用程序的安装将取决于此。

2.在网关应用程序上运行GAE子生成器。 这将提示您一些其他问题，以创建`dispatch.yaml`文件。

3.Maven使用`./mvnw package appengine:deploy -DskipTests -Pgae,prod,prod-gae` 或gradle使用`./gradlew appengineDeploy -Pgae -Pprod-gae`来部署每个微服务和网关应用程序。

**注1**如果您使用的是Windows，我们建议您使用[Windows Subsystem for Linux]（https://docs.microsoft.com/zh-cn/windows/wsl/install-win10）
或[jhipster-devbox]（https://github.com/jhipster/jhipster-devbox）以避免Windows重大问题，例如[https://github.com/jhipster/generator-jhipster/issues/11249
]（https://github.com/jhipster/generator-jhipster/issues/11249）
**注2**如果您使用的是Cloud SQL，则需要将Cloud SQL客户端角色添加到App Engine服务帐户。 请参阅[https://cloud.google.com/sql/docs/mysql/connect-app-engine#setting_up](https://cloud.google.com/sql/docs/mysql/connect-app-engine#setting_up）

此外，Google App Engine还提供了全套功能来管理你的系统：
- 流量拆分-部署应用程序的多个版本，并将流量拆分为不同的版本。这对于canary的新变化也很棒。
- Stackdriver Logging-自动将应用程序日志捕获和存储在集中式日志记录中，可以对其进行搜索，监视和导出。
- 错误报告-自动提取日志的错误和异常，并在发现新的错误通知您。
- 云调试器-允许您调试生产应用程序而无需停止工作。如果您需要更多日志消息来诊断问题，可以添加新的日志消息，而无需重新部署/重新启动应用程序。

您可以通过[Ray Tsang](https://twitter.com/saturnism)和[Ludovic Champenois](https://twitter.com/ludoch)在 [2018 JHipster Conf video on the Google App Engine generator](https://www.youtube.com/watch?v=J9_MW3HOj5w)的功能。

## 部署到Google Kubernetes Engine

Google Kubernetes Engine是完全托管的Kubernetes集群即服务。设置后，您可以使用标准Kubernetes命令部署容器和JHipster应用程序。

1. 启用API：`gcloud services enable container.googleapis.com containerregistry.googleapis.com`
1. 如果尚未安装，请安装`kubectl` CLI：`gcloud components install kubectl`
1. 创建一个新的Google Kubernetes Engine集群：`gcloud container clusters create mycluster --zone us-central1-a --machine-type n1-standard-4`

_其他选择，可查看 GCP's [区域](https://cloud.google.com/compute/docs/regions-zones/) 和 [机器类型](https://cloud.google.com/compute/docs/machine-types/) 。_

创建集群后，可以使用JHipster Kubernetes生成器生成部署描述符。

1. 生成Kubernetes部署文件：`jhipster kubernetes`
1. 如果您想使用Google Container Registry在私有仓库中发布容器镜像：
  1. **What should we use for the base Docker repository name（我们应该使用什么作为基础Docker仓库名称）**设置到`gcr.io/YOUR_PROJECT_ID`

构建容器镜像。

1. 如果使用Google Container Registry，则无需本地Docker守护程序即可直接构建到仓库：`./mvnw package -Pprod jib:build`
1. 否则，构建到Docker守护程序：`./mvnw package -Pprod jib:dockerBuild`

部署到Kubernetes集群：

1. 应用Kubernetes配置：`./kubectl-apply.sh`

有关Kubernetes生成器的全部功能，请参阅[部署到Kubernetes](/kubernetes)。

## 启用HTTPS

要为您的集群启用HTTPS，请参阅[外部负载均衡文档](https://spring-gcp.saturnism.me/deployment/kubernetes/load-balancing/external-load-balancing) 。

您可以通过在SecurityConfiguration.java中添加以下配置来强制使用HTTPS。

```java
// Spring MVC
http.requiresChannel(channel -> channel
    .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null).requiresSecure());

// WebFlux
http.redirectToHttps(redirect -> redirect
    .httpsRedirectWhen(e -> e.getRequest().getHeaders().containsKey("X-Forwarded-Proto")));
```

参见Spring Security的 [Servlet](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#servlet-http-redirect) 和 [WebFlux](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#webflux-http-redirect) 文档了解更多信息。