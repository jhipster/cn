---
layout: default
title: Openshift
permalink: /openshift/
redirect_from:
  - /openshift.html
sitemap:
    priority: 0.7
    lastmod: 2017-04-30T00:00:00-00:00
---

# [BETA]部署到OpenShift

**警告！** 这是**BETA**WIP版本的新子生成器！非常欢迎大家反馈！！享受OpenShifting！

该子生成器允许将JHipster应用程序部署到[Openshift容器平台](https://www.openshift.com/)/[OpenShift Origin](https://www.openshift.org/)。

[![]({{ site.url }}/images/logo/logo-openshift.png)](https://www.openshift.com/)

## 进行中的工作

- Mongo和Cassandra复制模式尚未测试

## 安装选项

OpenShift提供两个选项，

- OpenShift Origin-是为增强OpenShift的开源上游项目
- OpenShift容器平台-是Red Hat支持的企业容器应用程序平台

## Minishift

[Minishift](https://github.com/minishift/minishift)是一个工具包，可以在一个OpenShift VM中本地运行所有功能。Minishift在笔记本电脑上的VM内运行一个单节点OpenShift群集，供用户在本地试用。

Minishift需要虚拟机监控程序才能启动配置了OpenShift群集的虚拟机。在启动Minishift之前，请确保已在系统上安装并启用了所选的虚拟机管理程序。

## 先决条件

您必须安装：

- [Docker](https://docs.docker.com/installation/#installation)
- Hypervisor - 根据您的操作系统，您可以选择不同的选项

您必须具有Docker仓库。如果您没有，可以使用官方的[Docker Hub](https://hub.docker.com/)

Minishift可让您在本地试用Origin和Container Platform，

- [OpenShift Origin](https://github.com/minishift/minishift)
- [OpenShift容器平台](https://developers.redhat.com/products/cdk/overview/)-Red Hat Container Development Kit提供了一个基于Red Hat Enterprise Linux的Minishift打包的预构建容器开发环境。现在，开发人员可以通过[redhat.com](https://developers.redhat.com)进行注册和下载，通过免费的Red Hat EnterpriseLinux®Developer Suite订阅获得Red Hat容器开发套件，用于开发目的。

子生成器可与Origin和Container Platform一起正常工作，并使用与Docker相同的镜像版本。

## 运行子生成器

要为OpenShift生成配置文件，请在project/root文件夹中运行以下命令：

`jhipster openshift`

然后回答所有问题以部署您的应用程序。

### Which *type* of application would you like to deploy? (您要部署哪种*类型*的应用程序？)

应用程序的类型取决于您是否希望部署微服务或monoliths。

### Enter the root directory where your applications are located (输入应用程序所在的根目录)

输入路径。所有OpenShift生成器文件都将保留在此路径中

### Which applications do you want to include in your OpenShift configuration? (您要在OpenShift配置中包括哪些应用程序？)

选择您的应用程序。


### Enter the admin password used to secure the JHipster Registry admin (输入用于保护JHipster Registry admin的管理员密码)

仅当您选择微服务架构时，才会显示此问题。

### What should we use for the OpenShift namespace? (我们应该使用什么OpenShift命名空间？)

这是OpenShift项目空间，其中部署了所有服务，并将生成的文件标记到此模板

### Which *type* of database storage would you like to use? （您想使用哪种*类型*的数据库存储？）

仅当任何选定的应用程序选择了数据库类型时，才会显示此问题。这会提示您提供临时存储或持久存储选项。本质上，容器是短暂的（在重新启动/崩溃之间不会保留数据）。永久存储选项允许安装外部存储，例如NFS，EBS等。这样数据就可以在重启和故障之间保留下来。

### What should we use for the base Docker repository name? （Docker仓库基本名称应该使用什么？）

如果您选择[Docker Hub](https://hub.docker.com/)作为主仓库，则将是您的Docker Hub登录名。

### What command should we use for push Docker image to repository? (我们应该使用什么命令将Docker镜像推送到仓库？)

推送到Docker Hub的默认命令是`docker image push`

例如，如果您使用Google Cloud托管Docker镜像，则将是：`gcloud docker push`

## 更新已部署的应用程序

### 准备新的部署

在已经部署了应用程序之后，可以通过发布新的Docker镜像来重新部署它：

`./mvnw package -Pprod -DskipTests jib:dockerBuild`

使用gradle:

`./gradlew -Pprod bootJar jibDockerBuild -x test`

如果您在运行由jib插件生成的镜像时遇到任何问题（例如`chmod +x entrypoint.sh not permitted`），那么您可能必须更新scc。进行以下更改，`oc edit scc restricted`并将`runAsUser.Type`策略更新为`RunAsAny`

### 推送到Docker Hub

在本地标记您的镜像：

`docker image tag application username/application`

将镜像推送到Docker Hub：

`docker image push username/application`

## 部署应用程序

部署应用程序：

您可以通过以下任一方式部署所有应用程序：
  `<directoryPath>/ocp/ocp-apply.sh`

或者

  `oc apply -f <directoryPath>/ocp/registry`
  `oc apply -f <directoryPath>/ocp/app1gw`
然后通过选择在所选命名空间中创建的模板从OpenShift控制台安装应用程序

它将为您的应用程序及其相关的依赖服务（数据库，elasticsearch…）以及用于Pod到Pod通信（内部服务）的OpenShift服务以及从外部访问应用程序的路由创建OpenShift部署。

## 有关微服务应用程序的信息

### 部署服务Registry

虽然，OpenShift确实具有通过**Kube-DNS**进行内部服务发现，通过ConfigMaps进行集中配置管理以及通过EFK Stack进行集中日志记录的功能，因为JHipster依靠Spring Cloud进行配置管理，依靠Eureka/Consul进行服务发现和jhipster-console（ELK）对于日志管理，OpenShift部署也支持相同功能。

因此，对于微服务应用程序，JHipster OpenShift子生成器将生成清单文件，以部署**JHipster-Registry**（基于Eureka）或**Consul**。此外，生成的微服务和网关清单将包含适当的配置，以将其自身注册到其中央registry服务。

### 管理JHipster Registry或Consul

对于JHipster Registry和Consul，提供了[StatefulSets](https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/)配置。这些是一种特殊的部署artifact，可以处理有状态的应用程序，并使您可以扩展服务registry以实现高可用性。请注意，**StatefulSets**尚未在OpenShift中投入生产。它处于技术预览（BETA）中，您需要OpenShift版本> = 3.5才能使用此功能。

### 集中配置

还可以使用**Spring Cloud Config Server**（使用JHipster-Registry时）或Consul密钥/值存储（使用Consul时）来设置集中式配置。默认情况下，两个配置服务器都从OpenShift [ConfigMap](https://docs.openshift.org/latest/dev_guide/configmaps.html)加载其配置，该映射包含以下格式的属性文件：

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: application-config
  namespace: default
data:
  application.yml: |- # global properties shared by all applications
    jhipster:
      security:
        authentication:
          jwt:
            secret: secret
  gateway-prod.yml: |- # gateway application properties for the "prod" profile
    foo:
      bar: foobar
```

## 故障排除技巧

- 如果您正在运行多合一VM，请确保在推送Docker镜像之前运行以下命令，`eval $(docker-machine env <machine_name>)`
- 如果您在使用永久存储运行StatefulSets或Services时遇到问题，请确保正确初始化了永久卷。
- 如果您在运行StatefulSets时遇到问题，请检查持久卷声明。如果PVC在初始化时比平时花费更长的时间，请尝试手动创建。
- 运行生成器后，在应用oc命令之前，请确保您位于选定的名称空间**oc项目<namespace>**中。
- 用于elasticsearch，registry，console等服务的镜像拉取。第一次需要一些时间，因为它需要从公共仓库中拉到容器仓库中。如果任何从属服务因此而失败，请在其所依赖的服务启动并运行后，尝试对其进行部署。
- 请确保您具有运行某些Pod所需的scc服务所需的特权（可能需要管理员）。

## 更多信息

*   [OpenShift Origin文档](https://docs.openshift.org/latest/welcome/index.html)
*   [OpenShift容器平台](https://access.redhat.com/documentation/en/openshift-container-platform/)
*   [Minishift](https://github.com/minishift/minishift#documentation)
*   [OpenShift CLI](https://docs.openshift.org/latest/cli_reference/get_started_cli.html)
