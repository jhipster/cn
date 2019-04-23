---
layout: default
title: 建立持续集成
permalink: /setting-up-ci/
redirect_from:
  - /setting_up_ci.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-03T14:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 建立持续集成

为JHipster应用程序设置持续集成（CI）比典型的Spring MVC应用程序更困难，因为维护由两个软件栈组成的构建时会比较复杂：

- 使用Maven或Gradle的Java后端代码
- 带有NodeJS、NPM或Yarn的JavaScript前端

每个堆栈都有自己的依赖性管理（Maven工件、NPM包）和要解决的潜在冲突。

JHipster支持以下现成的CI系统：

- Jenkins:
    - [Setting up Jenkins 1]({{ site.url }}/setting-up-ci-jenkins1/)
    - [Setting up Jenkins 2]({{ site.url }}/setting-up-ci-jenkins2/) (recommended)
- Travis: refer to the [Travis Documentation](https://docs.travis-ci.com/user/getting-started/)
- GitLab CI: refer to the [GitLab CI Documentation](https://about.gitlab.com/gitlab-ci/)
- Azure Pipelines: refer to the [Azure Pipelines Documentation](https://docs.microsoft.com/fr-fr/azure/devops/pipelines/?view=vsts)

## 运行sub-generator

要生成这些配置文件，请在项目文件夹中运行此命令：

`jhipster ci-cd`

然后回答所有问题。


### 您希望生成什么CI/CD管道？

要生成的CI/CD管道：

- Jenkins pipeline
- Azure Pipelines
- GitLab CI
- Travis CI

**注意**：当您选择Jenkins管道时，将生成一个新的`src/main/docker/jenkins.yml`文件。
因此，您可以通过运行以下命令在本地测试Jenkins：

```
docker-compose -f src/main/docker/jenkins.yml up -d
```

### 是否要在Docker容器中执行构建？（Jenkins/Gitlab）

如果安装了Docker，则可以在Docker容器内执行构建。

### 在Gitlab CI中，在Docker容器中执行构建（提示：Gitlab.com使用Docker容器）？（GITLAB）

如果您使用的是专用的Gitlab CI，则可以直接使用runner。

如果使用正式的gitlab.com管道，则需要使用docker容器。

### 是否要将生成状态发送到Gitlab？(Jenkins)

如果您的Jenkins依赖于Gitlab存储库，则可以将构建状态发送到Gitlab。您的Jenkins必须正确配置。

### 您希望包括哪些任务/集成？

- Deploy your application to an *Artifactory*
- Analyze your code with *Sonar*
- Build and publish a *Docker* image
- Deploy to *Heroku* (requires HEROKU_API_KEY set on CI service)

### 将应用程序部署到*Artifactory*（Jenkins/Gitlab）

- *Artifactory*: what is the ID of distributionManagement for snapshots ?
- *Artifactory*: what is the URL of distributionManagement for snapshots ?
- *Artifactory*: what is the ID of distributionManagement for releases ?
- *Artifactory*: what is the URL of distributionManagement for releases ?

### 使用*Sonar*分析代码

- *Sonar*: Sonar服务器的名称是什么？

选择在Jenkins配置中定义的Sonar服务器的名称。

- *Sonar*: what is the URL of the Sonar server ?
- *Sonar*: what is the Organization of the Sonar server ?

在这里，您可以选择将您的Sonar分析推到[SonarCloud.io](https://sonarcloud.io).
在这种情况下，您必须添加 `SONAR_TOKEN`环境变量。

### 创建并发布一个 *Docker* 图像

- *Docker*: Docker注册表的URL是什么？

默认情况下，您可以使用Docker Hub:[https://registry.hub.docker.com](https://registry.hub.docker.com)

- *Docker*: Docker注册表的Jenkins凭证ID是什么？

默认情况下，您可以使用：`docker login`

- *Docker*: Docker注册表的组织名称是什么？

### 发布到*Heroku*

- *Heroku: name of your Heroku Application ?

You have to add the `HEROKU_API_KEY` environment variable.

Note: before using the deployment to Heroku, you need to use the [Heroku sub-generator]({{ site.url }}/heroku) locally.
It will create all files needed by your Continuous Integration Tool.


## Documentation about environment variables:

- Jenkins pipeline: you should use the [Credentials plugin](https://wiki.jenkins-ci.org/display/JENKINS/Credentials+Plugin)
- GitLab CI: read the [documentation about secret-variables](https://docs.gitlab.com/ce/ci/variables/#secret-variables)
- Travis CI: read the [environment variables](https://docs.travis-ci.com/user/environment-variables/)
