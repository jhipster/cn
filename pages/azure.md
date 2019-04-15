---
layout: default
title: 发布到Microsoft Azure
permalink: /azure/
sitemap:
    priority: 0.7
    lastmod: 2018-08-24T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 发布到Microsoft Azure

[![Microsoft Azure]({{ site.url }}/images/logo/logo-azure.png)](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-brborges)

将JHipster应用程序部署到Microsoft Azure和部署Docker容器一样简单。Azure支持Uber JAR、war文件和Docker映像的部署，可以是独立的，也可以在kubernetes之上进行协调。下面记录的部署选择不需要子生成器。

开发人员可以获得[Azure试用订阅]（http://azure.microsoft.com/free？）wt.mc_id=online jhipster brborges）并使用提供给试用帐户的免费信用卡执行以下所有部署选项。下面介绍的一些服务还提供基于计算小时数和/或应用程序数的免费配额，这不会导致使用授予的免费信贷。

对于Web应用程序，最好的入门服务是 [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/?WT.mc_id=online-jhipster-brborges), 一般来说，Azure提供了三种部署应用程序的关键方法: (1) 使用 [Azure Dashboard](https://ms.portal.azure.com/); (2) 使用 [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?WT.mc_id=online-jhipster-brborges) or; (3) 使用 [Maven Plugin](https://docs.microsoft.com/java/api/overview/azure/maven/azure-webapp-maven-plugin/readme?WT.mc_id=online-jhipster-brborges).

本文档涵盖了其中的一些方法，但不是所有方法，也不是所有可能的服务。有关详细信息，请查看[Azure文档]（https://docs.microsoft.com/azure?wt.mc_id=online jhipster brborges）网站。

目前，Azure不为Gradle提供插件，因此下面的一些说明将特定于Maven项目，而其他说明可以使用Azure CLI和其他命令行工具完成。

## 支持的数据库

配置到以下数据库的JHipster应用程序将找到提供这些数据存储解决方案的服务：

- MySQL / MariaDB
  - You can create a MySQL (MariaDB compliant) instance with [Azure Database for MySQL](https://docs.microsoft.com/azure/mysql/?WT.mc_id=online-jhipster-brborges)
- PostgreSQL
  - You can create a PostgreSQL instance with [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=online-jhipster-brborges)
- MS SQL Server (MSSQL)
  - You can create an instance with [Azure SQL Database](https://docs.microsoft.com/en-us/azure/sql-database/?WT.mc_id=online-jhipster-brborges)
- Apache Cassandra / MongoDB
  - You can set compatible APIs for Cassandra or MongoDB on [Azure CosmosDB](https://docs.microsoft.com/en-us/azure/cosmos-db/?WT.mc_id=online-jhipster-brborges) instances

## 开始之前

在你的本地环境中使用 Azure CLI 安装和认证。 有关详细信息，请访问以下链接：

- [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?WT.mc_id=online-jhipster-brborges)
- [Authenticate with Azure CLI](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli?WT.mc_id=online-jhipster-brborges)

## 单体JHipster应用

像往常一样，单体应用程序是最容易部署的。在本节中，我们将探讨如何使用用于Web应用程序的Azure应用程序服务的Apache Maven插件从JHipster项目部署war工件：

### WAR (non-executable)

要将Jhipster项目部署为war文件，请确保已启用“spring boot.repackage.skip”选项来构建它。这将跳过构建一个可执行的WAR文件，并简单地将WAR文件打包到“$finalname.war”下。通过这种方式，您可以将应用程序部署到为您自动配置的Azure上的Web运行时。

要继续部署，请执行以下步骤：

1. 添加 Maven Plugin configuration 到你的主 `<build>` 节点，在 `pom.xml`中:
    ```xml
            <plugin>
                <groupId>com.microsoft.azure</groupId>
                <artifactId>azure-webapp-maven-plugin</artifactId>
                <!-- check Maven Central for the latest version -->
                <version>1.3.0</version>
                <configuration>
                    <resourceGroup>your-resource-group</resourceGroup>
                    <appName>your-app-name</appName>
                    <linuxRuntime>tomcat 9.0-jre8</linuxRuntime>-->
                </configuration>
            </plugin>
    ```
1. 使用以下命令构建项目，并相应地调整配置文件：
    ```sh
        ./mvnw clean package -Pdev -Dspring-boot.repackage.skip=true
    ```
1. 部署应用程序：
    ```sh
        ./mvnw azure-webapp:deploy
    ```

有关Azure应用程序服务的Maven插件的最新信息，请检查 [documentation](https://docs.microsoft.com/en-us/java/api/overview/azure/maven/azure-webapp-maven-plugin/readme?WT.mc_id=online-jhipster-brborges).

### 基于Docker的单体应用

要将单片应用程序作为Docker容器部署到Azure，理想和最简单的解决方案是在[Azure容器实例（ACI）]（https://docs.microsoft.com/en-us/azure/container-instances/?wt.mc_id=online jhipster brborges），它几乎瞬间提供码头集装箱。但为此，您必须首先[创建一个Azure容器注册表（ACR）]（https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli?wt.mc_id=online jhipster brborges）。您也可以将您的映像推送到Docker Hub存储库中，并通过从该存储库中提取映像在ACI上创建Docker容器，但此方法不安全，因为您的Docker映像可能对任何人公开以供下载，并且您的应用程序中存在凭据（例如到数据库）的风险。

一旦创建了ACR，您就可以生成Jhipster Docker映像，并将其推送到该映像上，以便稍后在Azure容器实例上使用该映像。让我们看看这是如何工作的：

1. 假设您有一个名为`myjhipsterapp`的JHipster应用.
1. 为您的单体JHipster项目构建Docker图像：
    ```sh
        ./mvnw package -Pprod jib:dockerBuild
    ```
1. 标记并将生成的Docker映像推送到ACR实例中。例如：
    ```sh
        docker tag myjhipsterapp:latest <your-acr-server>/myjhipsterapp:latest
    ```
1. 确保Docker CLI通过ACR认证
    ```sh
        az acr login --name <acrName>
    ```
1. Push your image to your ACR instance:
    ```sh
        docker push <your-acr-server>/myjhipsterapp:latest
    ```

既然您的映像在您的Azure容器注册表上可用，那么您可以基于它在Azure容器实例上创建Docker容器。有关完整的分步说明，请[参考文档]（https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli?wt.mc_id=online jhipster brborges将映像部署到ACI）。以下步骤是为了简单起见，应**不**用于 *production*:

1. Enable admin:
    ```sh
        az acr update --name <acrName> --admin-enabled true
    ```
1. Retrieve password to authenticate ACI against ACR:
    ```sh
        az acr credential show --name <acrName> --query "passwords[0].value"
    ```
1. Deploy a container with 1 CPU core and 1 GB of RAM:
    ```sh
        az container create --resource-group myResourceGroup --name myjhipsterapp --image <acrLoginServer>/myjhipsterapp:latest --cpu 1 --memory 1 --registry-username <acrName> --registry-password <acrPassword> --dns-name-label myjhipsterapp --ports 8080
    ```

## Docker containers在Kubernetes

要将JHipster微服务部署到Azure上的Kubernetes，您只需创建一个Azure Kubernetes服务集群，并将其配置为本地的“kubectl”。之后，您可以在kubernetes文档中遵循通用的jhipster。遵循[这些记录的步骤]（https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough?wt.mc_id=online jhipster brborges）进行完整的演练。
