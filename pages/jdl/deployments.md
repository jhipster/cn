---
layout: default
title: JHipster领域语言 (JDL) - 部署
permalink: /jdl/deployments
sitemap:
    priority: 0.5
    lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster领域语言 (JDL) - 部署

## 概要

1. [语法](#语法)
1. [示例](#示例)
1. [可用的部署选项](#可用的部署选项)

---

### 语法

部署声明如下：

```
deployment {
  <deployment option name> <deployment option value>
}
```

  - 与应用程序类似，部署声明通过指定选项键和值来工作

---

### 示例

### 简单例子

```jdl
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

---

#### 多个部署

如果您需要多个部署，请按以下步骤进行：

```
// will be created under 'docker-compose' folder
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}

// will be created under 'kubernetes' folder
deployment {
  deploymentType kubernetes
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

每个`deploymentType`您可以有一个部署。 `appsFolders`中定义的应用程序应位于创建部署所在的文件夹中，或`directoryPath`中定义的文件夹中。

例如，在上面，您需要具有以下文件夹结构：

```
.
├── yourJdlFile.jdl
├── foo
├── bar
├── kubernetes // will be created by the JDL
└── docker-compose // will be created by the JDL
```

---

### 可用的部署选项

这是JDL支持的部署选项：

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL选项名称</th>
    <th>默认值</th>
    <th>可选值</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>deploymentType</td>
    <td>docker-compose</td>
    <td>docker-compose, kubernetes, openshift</td>
    <td></td>
  </tr>
  <tr>
    <td>directoryPath</td>
    <td>"../"</td>
    <td></td>
    <td>相对路径。 必须用双引号引起来</td>
  </tr>
  <tr>
    <td>appsFolders</td>
    <td>[]</td>
    <td></td>
    <td>应用程序的目录名称，以逗号分隔。 必须为列表，例如[foo, bar]</td>
  </tr>
  <tr>
    <td>clusteredDbApps</td>
    <td>[]</td>
    <td></td>
    <td>带有群集数据库的应用程序的目录名称，以逗号分隔。 必须为列表，例如[foo, bar]</td>
  </tr>
  <tr>
    <td>gatewayType</td>
    <td>SpringCloudGateway</td>
    <td></td>
    <td>当serviceDiscoveryType为`no`时，将忽略该值</td>
  </tr>
  <tr>
    <td>monitoring</td>
    <td>no</td>
    <td>no, prometheus</td>
    <td></td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>eureka</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>dockerRepositoryName</td>
    <td></td>
    <td></td>
    <td>Docker仓库的名称或URL，必须用双引号引起来</td>
  </tr>
  <tr>
    <td>dockerPushCommand</td>
    <td>"docker push"</td>
    <td></td>
    <td>要使用的docker push命令。 必须用双引号引起来</td>
  </tr>
  <tr>
    <td>kubernetesNamespace</td>
    <td>default</td>
    <td></td>
    <td>仅当DeploymentType为kubernetes时适用</td>
  </tr>
  <tr>
    <td>kubernetesServiceType</td>
    <td>LoadBalancer</td>
    <td>LoadBalancer, NodePort, Ingress</td>
    <td>仅当DeploymentType为kubernetes时适用</td>
  </tr>
  <tr>
    <td>ingressDomain</td>
    <td></td>
    <td></td>
    <td>当kubernetesServiceType为`Ingress`时，Ingress的域。 必须用双引号引起来。 仅当DeploymentType为kubernetes时适用</td>
  </tr>
  <tr>
    <td>istio</td>
    <td>false</td>
    <td>true, false</td>
    <td>仅当DeploymentType为kubernetes时适用</td>
  </tr>
  <tr>
    <td>openshiftNamespace</td>
    <td>default</td>
    <td></td>
    <td>仅当DeploymentType为openshift时适用</td>
  </tr>
  <tr>
    <td>storageType</td>
    <td>ephemeral</td>
    <td>ephemeral, persistent</td>
    <td>仅当DeploymentType为openshift时适用</td>
  </tr>
</table>
