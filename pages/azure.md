---
layout: default
title: 部署到微软Azure
permalink: /azure/
sitemap:
    priority: 0.7
    lastmod: 2018-08-24T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 部署到微软Azure

[![Microsoft Azure]({{ site.url }}/images/logo/logo-azure.png)](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-brborges)

将JHipster应用程序部署到Microsoft Azure就像部署Docker容器一样容易。Azure支持Uber JAR，WAR文件和Docker镜像的部署，既可以独立部署也可以在Kubernetes上进行编排。下文记录的部署选项不需要子生成器。

开发人员可以获取[Azure试用版订阅](http://azure.microsoft.com/free?WT.mc_id=online-jhipster-brborges)，并使用提供给试用帐户的免费信用执行以下所有部署选项。下文涵盖的某些服务还根据计算时间（和/或）应用程序数量提供免费配额，这不会消耗授予的免费积分。

对于Web应用程序，最好的入门服务是[Azure App Service](https://azure.microsoft.com/en-us/services/app-service/?WT.mc_id=online-jhipster-brborges)，通常Azure提供了三种部署应用程序的关键方法：（1）使用[Azure仪表板](https://ms.portal.azure.com/)；（2）使用[Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?WT.mc_id=online-jhipster-brborges)或;（3）使用[Maven插件](https://docs.microsoft.com/java/api/overview/azure/maven/azure-webapp-maven-plugin/readme?WT.mc_id=online-jhipster-brborges)。

本文档介绍了其中一些方法，但不是全部，也不是所有可用的服务。有关更多详细信息，请访问[Azure文档](https://docs.microsoft.com/azure?WT.mc_id=online-jhipster-brborges)网站。

当前，Azure不提供用于Gradle的插件，因此下面的某些指引将特定于Maven项目，而其他指引可以使用Azure CLI和其他命令行工具来完成。

## 支持的数据库

配置为以下数据库的JHipster应用程序，将可以得到提供这些数据存储解决方案的服务：

- MySQL / MariaDB
  - 您可以使用[Azure Database for MySQL](https://docs.microsoft.com/azure/mysql/?WT.mc_id=online-jhipster-brborges)创建一个MySQL（兼容MariaDB）实例
- PostgreSQL
  - 您可以使用[Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=online-jhipster-brborges)创建PostgreSQL实例
- MS SQL Server (MSSQL)
  - 您可以使用[Azure SQL Database](https://docs.microsoft.com/en-us/azure/sql-database/?WT.mc_id=online-jhipster-brborges)创建实例
- Apache Cassandra / MongoDB
  - 您可以在[Azure CosmosDB](https://docs.microsoft.com/en-us/azure/cosmos-db/?WT.mc_id=online-jhipster-brborges)实例上为Cassandra或MongoDB设置兼容的API

## 开始之前

在本地环境上安装并通过Azure CLI进行身份验证。有关更多信息，请访问以下链接：

- [安装Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?WT.mc_id=online-jhipster-brborges)
- [使用Azure CLI进行身份验证](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli?WT.mc_id=online-jhipster-brborges)

## Monolithic JHipster应用

通常，Monolithic应用程序是最容易部署的。在本节中，我们将探索如何使用适用于Web应用程序，适用于Azure应用服务的Apache Maven插件，从JHipster项目部署Jar artifacts：

### 可执行的Jar文件

Azure App Service支持运行由JHipster生成的可执行Jar文件。

要继续进行部署，请按照下列步骤操作：

1. 将以下Maven插件配置添加到`pom.xml`的主`<build>`元素中：

    ```xml
            <plugin>
                <groupId>com.microsoft.azure</groupId>
                <artifactId>azure-webapp-maven-plugin</artifactId>
                <!-- check Maven Central for the latest version -->
                <version>1.6.0</version>
                <configuration>
                    <schemaVersion>v2</schemaVersion>
                    <resourceGroup>your-application-resource-group</resourceGroup>
                    <appName>your-application-name</appName>
                    <runtime>
                        <os>Linux</os>
                        <javaVersion>java11</javaVersion>
                    </runtime>
                    <pricingTier>B1</pricingTier>
                    <region>France Central</region>
                    <deployment>
                        <resources>
                            <resource>
                                <directory>${project.basedir}/target</directory>
                                <includes>
                                    <include>${project.build.finalName}.jar</include>
                                </includes>
                            </resource>
                        </resources>
                    </deployment>
                </configuration>
            </plugin>

    ```
    请注意，必须使用正确的项目值配置属性`resourceGroup`，`appName`，`pricingTier`和`region`。
1. 因为您可能会使用数据库，所以请不要忘记相应地修改`application-prod.yml`文件，例如，使用Azure MySQL数据库：

    ```
    spring:
      datasource:
        url: jdbc:mysql://jhipster.mysql.database.azure.com:3306/sample?useUnicode=true&characterEncoding=utf8&useSSL=true&useLegacyDatetimeCode=false&serverTimezone=UTC
        username: jhipster@jhipster
        password: MyPasswordToChangeInProduction
    ```

1.  与JHipster生产构建一样，使用以下命令构建项目：

    ```sh
        ./mvnw clean package -Pprod
    ```
1. 部署应用程序：
    ```sh
        ./mvnw azure-webapp:deploy
    ```

有关用于Azure App Service的Maven插件的最新信息，请查看[文档](https://docs.microsoft.com/en-us/java/api/overview/azure/maven/azure-webapp-maven-plugin/readme?WT.mc_id=online-jhipster-brborges)。

### 基于Docker的Monolithic应用

要将整体应用程序作为Docker容器部署到Azure，理想且最简单的解决方案是在[Azure容器实例（ACI）](https://docs.microsoft.com/en-us/azure/container-instances/?WT.mc_id=online-jhipster-brborges)上运行它，该容器几乎立即配置Docker容器。但是为此，您首先必须（ACR[创建一个Azure容器仓库(ACR)](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli?WT.mc_id=online-jhipster-brborges)。您也可以将镜像推送到Docker Hub仓库，并通过从那里拉取镜像到ACI上创建Docker容器，但是这种方法是不安全的，因为您的Docker镜像可能是任何人都可以下载的，并且镜像可能会包含凭证（例如，数据库））。

创建ACR之后，可以生成JHipster Docker镜像并将其推送到仓库，将来在Azure容器实例上使用该镜像。让我们看看它是如何工作的：

1. 假设您有一个名为`myjhipsterapp`的JHipster应用程序。
1. 为monolithic JHipster项目构建Docker镜像：
    ```sh
        ./mvnw package -Pprod jib:dockerBuild
    ```
1. 标记生成的Docker镜像并将其推送到ACR实例。例如：
    ```sh
        docker tag myjhipsterapp:latest <your-acr-server>/myjhipsterapp:latest
    ```
1. 确保您的Docker CLI已通过ACR身份验证 
    ```sh
        az acr login --name <acrName>
    ```
1. 将镜像推送到您的ACR实例：
    ```sh
        docker push <your-acr-server>/myjhipsterapp:latest
    ```

现在，您的镜像在Azure容器仓库中可用，您可以在Azure容器实例（ACI）上基于它创建一个Docker容器。有关完整的步骤指南，请 [参阅此文档](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli?WT.mc_id=online-jhipster-brborges#deploy-image-to-aci)。以下步骤是为了简单起见，**不**应在*生产*中使用：

1. 启用管理员：
    ```sh
        az acr update --name <acrName> --admin-enabled true
    ```
1. 从ACR检索密码以验证ACI：
    ```sh
        az acr credential show --name <acrName> --query "passwords[0].value"
    ```
1.  部署具有1个CPU内核和1 GB RAM的容器：
    ```sh
        az container create --resource-group myResourceGroup --name myjhipsterapp --image <acrLoginServer>/myjhipsterapp:latest --cpu 1 --memory 1 --registry-username <acrName> --registry-password <acrPassword> --dns-name-label myjhipsterapp --ports 8080
    ```

## Kubernetes上的Docker容器

要将JHipster微服务部署到Azure上的Kubernetes，只需要做的就是创建一个Azure Kubernetes Service群集，并将其配置为本地`kubectl`。之后，您可以按照Kubernetes文档上的通用JHipster进行操作。请按照[这些文档步骤](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough?WT.mc_id=online-jhipster-brborges)进行一个完整的操作流程。
