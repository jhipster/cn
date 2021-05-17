---
layout: default
title: 部署到微软Azure
permalink: /azure/
sitemap:
priority: 0.7
lastmod: 2018-08-24T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 部署到微软Azure

[Microsoft Azure](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-judubois)是在云中运行JHipster应用程序的绝佳解决方案。

- 最简单的方法是使用 [Azure App Service](https://azure.microsoft.com/services/app-service/?WT.mc_id=online-jhipster-judubois): 是一个JHipster子生成器可以自动将单体应用程序部署到该服务。
- 如果您使用的是Spring Boot微服务，则可以使用JHipster子生成器将应用程序部署到
  [Azure Spring Cloud](https://azure.microsoft.com/services/spring-cloud/?WT.mc_id=online-jhipster-judubois).
- 与任何Docker和Kubernetes云提供商一样，您可以使用JHipster Docker和Kubernetes支持将Docker映像部署到Microsoft Azure. 参考我们的 [Docker Compose documentation]({{ site.url }}/docker-compose/) 和我们的 [Kubernetes documentation]({{ site.url }}/kubernetes/) 了解有关这些选项的更多信息。

[![Microsoft Azure]({{ site.url }}/images/logo/logo-azure.png)](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-judubois)

1. [安装"az CLI"](#1)
2. [目前的局限性](#2)
3. [支持的数据库](#3)
4. [储存密钥](#4)
5. [将Spring Boot可执行Jar文件部署到Azure App Service](#5)
6. [将Spring Boot微服务部署到Azure Spring Cloud](#6)

## <a name="1"></a> 安装 "az CLI"

您可以使用 [Web-based Azure portal](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 或使用 [the Azure
command-line interface](https://docs.microsoft.com/cli/azure/get-started-with-azure-cli/?WT.mc_id=online-jhipster-judubois) ，也称为"az CLI"。

与JHipster一样，我们总是自动进行所有操作，必须安装此"az CLI"才能与以下任何选项一起使用。

要在您的计算机上安装az CLI， [遵循“安装Azure CLI”官方文档](https://docs.microsoft.com/cli/azure/install-azure-cli/?WT.mc_id=online-jhipster-judubois).

## <a name="2"></a>目前的局限性

这些限制可以在将来解决，如果您有兴趣提供帮助，请毫不犹豫地为该项目做出贡献：

- 子生成器不会自动配置外部服务，例如数据库（有关支持的数据库，请参阅下一节），Elasticsearch，Kafka或Redis。 因此，您将需要手动创建和配置它们。
- Azure仅提供Maven插件，因此JHipster子生成器只能与Maven一起使用。

## <a name="3"></a> 支持的数据库

### SQL数据库

Azure提供了所有类型的数据库，例如MySQL / PostgreSQL / Oracle / MS SQL Server。 在Azure中，默认情况下将保护它们的安全，因此，如果要从JHipster应用程序访问它们，则需要打开其防火墙。

例如，在MySQL上，您将需要转到“连接安全性（Connection security）”，然后选择“允许访问Azure服务（Allow access to Azure services）”。 您还应该单击“添加客户端IP（Add client IP）”按钮，以将当前IP自动添加到防火墙规则中：

![MySQL firewall]({{ site.url }}/images/azure_mysql_firewall.png)

__对MySQL用户的警告：__
默认情况下，JHipster生成的MySQL连接字符串在`spring.datasource.url`属性（通常在您的`src/main/resources/config/application-prod.yml`文件中）中使用`useSSL=false`标志。 这是因为，默认情况下，JHipster使用本地数据库。 在Azure上，默认情况下，使用SSL证书保护数据库的安全，因此您需要将此标志置于`true`。

例如：

```yml
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    url: jdbc:mysql://jhipster-database.mysql.database.azure.com:3306/test?useUnicode=true&characterEncoding=utf8&useSSL=true&useLegacyDatetimeCode=false&serverTimezone=UTC
    username: jhipster@jhipster-database
    password: XXXXXX
```

### NoSQL数据库

您可以安装NoSQL数据库，例如使用[the Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/?WT.mc_id=online-jhipster-judubois) 安装Cassandra或使用[CosmosDB](https://azure.microsoft.com/services/cosmos-db/?WT.mc_id=online-jhipster-judubois) MongoDB。

CosmosDB是Microsoft的全球分布式托管数据库。 它在API级别上与Cassandra和MongoDB兼容，因此可以与使用这些技术生成的JHipster应用程序一起使用。

## <a name="4"></a> 储存密钥

您应该将几个“密钥”安全地存储在JHipster中，至少要存储数据库密码（请参见上一节）和安全令牌（请参阅我们的[安全文档]({{site.url}}/security/) 了解更多的信息）。

Azure中有许多选项，可用于将这些数据存储在比`application-prod.yml`文件更好的位置。 这是最常见的：

- Spring Cloud 配置服务器, 如[JHipster Registry]({{ site.url }}/jhipster-registry/) 或由管理的配置服务器 [Azure Spring Cloud](https://azure.microsoft.com/services/spring-cloud/?WT.mc_id=online-jhipster-judubois) 。这是最好的选择，因为您可以标记和回滚配置，但是它需要专用的服务器。
- 环境变量。 这是最简单的选项，但设置起来有点烦人，而且安全性较差。
- [Azure Key Vault](https://azure.microsoft.com/services/key-vault/?WT.mc_id=online-jhipster-judubois): 这是最安全的选项，但是它特定于Azure。有一个专用的 [Azure Spring Boot Starter for Key Vault](https://docs.microsoft.com/en-us/azure/java/spring-framework/spring-boot-starters-for-azure/?WT.mc_id=online-jhipster-judubois) ，这是我们建议使用Azure Key Vault配置JHipster的方法。

## <a name="5"></a> 将Spring Boot可执行Jar文件部署到Azure App Service

[![Deploying to Azure App Service](https://img.youtube.com/vi/kciGvVrfwpw/0.jpg)](https://www.youtube.com/watch?v=kciGvVrfwpw)

_有关将JHipster应用程序部署到Azure App Service的5分钟视频_

### 生成Azure App Service的配置

[Azure App Service](https://azure.microsoft.com/fr-fr/services/app-service/?WT.mc_id=online-jhipster-judubois) 是一种托管的PaaS：在Azure上，如果要部署单体应用，这是我们推荐的选项。

有两种方法可以将Spring Boot应用程序部署到Azure App Service：

- 将其部署为Docker映像：这使您可以在Docker映像中交付任何内容，这对于某些特定的用例可能是好的，但是在大多数情况下，这是最复杂且安全性较低的选项。
- 将其部署为可执行的Jar文件：这是最简单，更安全的选择，因为Microsoft将支持并自动更新OS和JVM。

我们建议使用可执行的Jar文件，但是如果您想使用Docker映像，请遵循本页的最后一节“部署到Docker和Kubernetes”。

要将JHipster应用程序作为可执行Jar文件部署到Azure App Service，有一个特定的`azure-app-service`子生成器：

```sh
jhipster azure-app-service
```

该子生成器可以与以下标识一起使用：

- `--skip-build` 跳过构建应用程序
- `--skip-deploy` 跳过部署到Azure App Service
- `--skip-insights` 跳过Azure Application Insights的配置

然后将需要回答以下问题。 您可能需要访问 [Azure Portal](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 回答他们并检查配置的资源。

- __Azure resource group name（Azure资源组名称）:__ 这是将在其中部署应用程序的Azure资源组的名称。 我们建议使用命令 `az configure --defaults group=<resource group name>`设置默认的Azure资源组。
- __Azure App Service plan name（Azure应用服务计划名称）:__ 您的Azure应用服务将在[Azure服务计划](https://docs.microsoft.com/azure/app-service/overview-hosting-plans/?WT.mc_id=online-jhipster-judubois) 中运行。如果服务计划已经存在，则JHipster将使用它，否则它将创建一个新的服务计划。 默认情况下，JHipster在“ B1”层中创建一个基于Linux的服务计划（“基本”计划，免费使用30天）。 如果您需要有关服务计划层的更多信息，请查看[相关文档](https://azure.microsoft.com/pricing/details/app-service/linux/?WT.mc_id=online-jhipster-judubois) 。
- __Azure Application Insights instance name（Azure Application Insights实例名称）:__ JHipster可以自动配置一个 [Azure Application Insights 实例](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview/?WT.mc_id=online-jhipster-judubois) ，因此将监视部署的应用程序。 这使用 [Azure Spring Boot Starter for Application Insights](https://docs.microsoft.com/en-us/azure/java/spring-framework/spring-boot-starters-for-azure/?WT.mc_id=online-jhipster-judubois) 并在`application-azure.yml` 配置文件中配置。
- __Azure App Service application name（Azure App Service应用程序名称）:__ 您的Azure App Service实例的名称。
- __Which type of deployment do you want（您想要哪种类型的部署） ?__ 您可以使用Maven在本地构建和部署应用程序，也可以使用GitHub Actions为您自动构建和部署应用程序。

### “azure” Spring Boot配置文件

该子生成器创建一个`azure` Spring Boot配置文件并对其进行配置。

- 在您的Azure App Service实例中，使用环境变量`SPRING_PROFILES_ACTIVE`会自动启用`prod`和`azure`Spring配置文件。
- 为此配置文件创建了一个新的Spring Boot配置，`src/main/resources/config/application-azure.yml`。或者在JHipster配置文件的详细信息，查阅[相关文档]({{ site.url }}/profiles/)。

### 使用GitHub Actions进行部署

建议使用GitHub Actions进行部署，因为它比在本地计算机上更容易并且可能更快。

- 配置存储在 `.github/workflows/azure-app-service.yml`.
- 默认情况下，每次在`main`分支上有新的`push`事件时，都会部署该应用程序。
- 为了与本地部署保持一致，此部署机制使用了`azure-webapp`Maven插件。有另一种部署到Azure App Service的方法，该方法不需要Maven。如果您对此感兴趣，请查找`azure/webapps-deploy` GitHub Action, 并按照相应示例 [this blog post](https://dev.to/azure/the-easy-way-to-deploy-a-spring-boot-application-to-production-on-azure-2joi) 进行操作。

为了被授权将应用程序部署到您的Azure App Service实例，GitHub需要有权访问名为`AZURE_CREDENTIALS`的安全令牌。
在子生成器执行结束时，它以以下形式显示了命令行：

```sh
az ad sp create-for-rbac --name http://<your-security-role> --role contributor --scopes /subscriptions/<your-subscription-id>/resourceGroups/<your-resource-group-name> --sdk-auth
```

- `<your-security-role>` 是您要创建的安全角色的名称（默认情况下，我们使用应用程序名称）。
- `<your-subscription-id>` 是您使用的Azure订阅的ID。可以在订阅屏幕顶部的 [Azure Portal](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 找到。
- `<your-resource-group-name>` 是您的资源组的名称。

执行该命令以获取安全令牌。 然后，在应用程序所在的GitHub项目中，转到`Settings > Secrets`，然后创建一个名为`AZURE_CREDENTIALS`的新密钥，您需要在其中粘贴安全令牌。

## <a name="6"></a> 将Spring Boot微服务部署到Azure Spring Cloud

[Azure Spring Cloud](https://azure.microsoft.com/services/spring-cloud/?WT.mc_id=online-jhipster-judubois) 是Spring Boot应用程序的托管服务. 它可以承载任何类型的JHipster应用程序，包括单体，但是它特别适合于承载遵循标准JHipster[微服务架构]({{site.url}}/microservices-architecture/) 的JHipster微服务和JHipster网关。

### Azure Spring Cloud子生成器的局限性

Azure Spring Cloud提供基于Netflix Eureka的托管发现服务器，因此该服务器只能与服务发现设置为`no`或`JHipster Registry`的JHipster应用程序一起使用：

- 如果应用程序中未配置任何服务发现，则下面描述的子生成器将自动添加Netflix Eureka。 这是使微服务在Azure Spring Cloud上运行的最简单方法。
- JHipster Registry实际上是Netflix Eureka服务器，因此它与Azure Spring Cloud完全兼容。 JHipster为Eureka提供了许多自定义配置：由于您应由Azure Spring Cloud管理，因此需要在`application.yml`文件中删除Spring Boot属性`eureka.instance.instanceId`。 其他`eureka`属性可与Azure Spring Cloud配合使用，但是可以将其删除以使用Azure的默认值。 使用此配置时，您将受益于JHipster的某些高级功能，例如分布式缓存配置，这些功能通常依赖于JHipster Registry。

因此，使用Hashicorp Consul作为服务发现机制的应用程序无法正常运行，因为Azure Spring Cloud不支持此功能。

### 生成Azure Spring Cloud的配置

必须将特定的Azure Spring Cloud扩展添加到"az CLI"：

```sh
az extension add --name spring-cloud
```

安装此扩展程序后，您将能够运行`az spring-cloud`命令，并使用JHipster自动执行Azure Spring Cloud配置。

要在Azure Spring Cloud上部署JHipster应用程序，有一个特定的`azure-spring-cloud`子生成器：

```sh
jhipster azure-spring-cloud
```

该子生成器可以与以下标识一起使用：

- `--skip-build` 跳过构建应用程序
- `--skip-deploy` 跳过部署到Azure Spring Cloud

然后将需要回答以下问题。 您可能需要访问 [Azure Portal](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 回答他们并检查配置的资源。

- __Azure resource group name（Azure资源组名称）:__ 这是将在其中部署应用程序的Azure资源组的名称。 我们建议使用命令 `az configure --defaults group=<resource group name>`设置默认的Azure资源组。
- __Azure Spring Cloud service name (the name of your cluster):__ 这是您的Azure Spring Cloud群集实例的名称。 我们建议使用命令 `az configure --defaults spring-cloud=<resource group name>`设置默认的Azure Spring Cloud服务名称。
- __Azure Spring Cloud application name（Azure Spring Cloud应用程序名称）:__ 您要在Azure Spring Cloud上部署的Spring Boot应用程序的名称。
- __Which type of deployment do you want（您想要哪种类型的部署） ?__ 您可以使用Maven在本地构建和部署应用程序，也可以使用GitHub Actions为您自动构建和部署应用程序。

### “azure” Maven和Spring Boot配置文件

如果您已了解上面有关`azure-app-service`子生成器的文档，则`azure-spring-cloud`子生成器的工作方式会有所不同，因为它配置了：

- 一个名为`azure`Spring Boot的新配置文件，配置在`src/main/resources/config/application-azure.yml`。
- 一个新的Maven配置文件，也称为`azure`。 该Maven配置文件将在运行时自动强制使用`prod`和`azure` Spring Boot配置文件，因此无需在Azure Spring Cloud级别进行配置（这是Azure App Service的主要区别， 被配置为环境变量）。

有关在JHipster配置文件的详细信息， 查阅[配置文件]({{ site.url }}/profiles/).

### Azure Spring Cloud特定功能

如以上部分所述，`azure-spring-cloud`子生成器添加了特定的`azure` Maven配置文件。 此配置文件在构建时添加了一些库，以便正在运行的应用程序可以从Azure Spring Cloud的特定功能中受益：

- 它将应用程序连接到托管的Spring Cloud Service Discovery服务器（如上节`Azure Spring Cloud`子生成器的限制中所述）。
- 它使用托管的Spring Cloud Config Server配置应用程序。
- 它将分布式跟踪数据发送到Azure Monitor。

### 使用GitHub Actions进行部署

建议使用GitHub Actions进行部署，因为它比在本地计算机上更容易并且可能更快。

- 配置存储在 `.github/workflows/azure-spring-cloud.yml` 。
- 默认情况下，每次在`main`分支上有新的`push`事件时，都会部署该应用程序。
- 此部署机制直接使用“az CLI”部署到Azure Spring Cloud群集。

为了获得授权将应用程序部署到您的Azure Spring Cloud群集中，GitHub需要有权访问名为`AZURE_CREDENTIALS`的安全令牌。
可以使用以下命令行生成此令牌：

```sh
az ad sp create-for-rbac --name http://<your-security-role> --role contributor --scopes /subscriptions/<your-subscription-id>/resourceGroups/<your-resource-group-name> --sdk-auth
```

- `<your-security-role>` 是您要创建的安全角色的名称（默认情况下，我们使用应用程序名称）。
- `<your-subscription-id>` 是您正在使用的Azure订阅的ID。 可以在[Azure门户](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 的订阅屏幕顶部找到它。
- `<your-resource-group-name>` 是您的资源组的名称。

执行该命令以获取安全令牌。 然后，在应用程序所在的GitHub项目中，转到`Settings > Secrets`，然后创建一个名为`AZURE_CREDENTIALS`的新密钥，您需要在其中粘贴安全令牌。
