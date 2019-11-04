---
layout: default
title: 设置持续集成
permalink: /setting-up-ci/
redirect_from:
  - /setting_up_ci.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-03T14:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 设置持续集成

为JHipster应用程序设置持续集成（CI）的过程比为典型的Spring MVC应用程序设置要困难，因为需要维护由2个软件技术架构关联带来的复杂性：

- Maven或Gradle的Java后端代码
- NodeJS，NPM或Yarn的JavaScript前端

每个技术架构都有其自己的依赖项管理（Maven构件，NPM软件包），并具有潜在的冲突要解决。

JHipster应该开箱即用地支持以下CI系统：

- Jenkins:
    - [设置Jenkins 1]({{ site.url }}/setting-up-ci-jenkins1/)
    - [设置Jenkins 2]({{ site.url }}/setting-up-ci-jenkins2/) (推荐)
- Travis: 请参阅[Travis文档](https://docs.travis-ci.com/user/getting-started/)
- GitLab CI: 请参阅[GitLab CI文档](https://about.gitlab.com/gitlab-ci/)
- Azure Pipelines: 请参阅[Azure Pipelines文档](https://docs.microsoft.com/fr-fr/azure/devops/pipelines/?view=vsts)

## 运行子生成器

要生成这些配置文件，请在您的项目文件夹中运行以下命令：

`jhipster ci-cd`

然后回答所有问题。


### 您要生成什么CI/CD pipeline ？

- Jenkins pipeline
- Azure Pipelines
- GitLab CI
- Travis CI

**注意**: 当您选择Jenkins pipeline时，将生成一个新的`src/main/docker/jenkins.yml`文件。
因此，您可以通过运行以下命令在本地测试Jenkins：

```
docker-compose -f src/main/docker/jenkins.yml up -d
```

### Would you like to perform the build in a Docker container ? (Jenkins / GitLab) (您想在Docker容器中执行构建吗？（Jenkins/ GitLab）)

如果安装了Docker，则可以在Docker容器内执行构建。

### In GitLab CI, perform the build in a docker container (hint: GitLab.com uses Docker container) ? (GitLab) (在GitLab CI中，在Docker容器中执行构建（提示：GitLab.com使用Docker容器）？（GitLab）)

如果您使用私有的GitLab CI，则可以直接使用runners。

如果您使用官方的GitLab.com pipeline，则需要使用Docker容器。

### Would you like to send build status to GitLab ? (Jenkins) (您想将构建状态发送给GitLab吗？（Jenkins）)

如果您的Jenkins依赖于GitLab存储库，则可以将构建状态发送到GitLab。您的Jenkins必须正确配置。

### What tasks/integrations do you want to include ? (您要包括哪些任务/集成？)

- 将您的应用程序部署到*Artifactory*
- 使用*Sonar*分析您的代码
- 构建并发布*Docker*镜像
- 部署到*Heroku*（需要在CI服务上设置HEROKU_API_KEY）

### Deploy your application to an *Artifactory* (Jenkins / GitLab) (将您的应用程序部署到*Artifactory*（Jenkins / GitLab）)

- *Artifactory*: what is the ID of distributionManagement for snapshots ?
- *Artifactory*: what is the URL of distributionManagement for snapshots ?
- *Artifactory*: what is the ID of distributionManagement for releases ?
- *Artifactory*: what is the URL of distributionManagement for releases ?

### Analyze your code with *Sonar* (使用*Sonar*分析您的代码)

- *Sonar*: what is the name of the Sonar server ?

选择在Jenkins配置中定义的Sonar服务器的名称。

- *Sonar*: what is the URL of the Sonar server ?
- *Sonar*: what is the Organization of the Sonar server ? 

在这里，您可以选择将Sonar Analyze推送到[SonarCloud.io](https://sonarcloud.io)。
在这种情况下，您必须添加`SONAR_TOKEN`环境变量。

### Build and publish a *Docker* image (构建并发布*Docker*镜像)

- *Docker*: what is the URL of the Docker registry ?

默认情况下，您可以使用Docker Hub：[https://registry.hub.docker.com](https://registry.hub.docker.com)

- *Docker*: what is the Jenkins Credentials ID for the Docker registry ?

默认情况下，您可以使用：`docker login`

- *Docker*: what is the Organization Name for the Docker registry?

### Deploy to *Heroku* （部署到*Heroku*）

- *Heroku: name of your Heroku Application ?

您必须添加`HEROKU_API_KEY`环境变量。

注意：在将部署到Heroku之前，您需要在本地使用[Heroku子生成器]({{ site.url }}/heroku)。
它将创建持续集成工具所需的所有文件。

## 有关环境变量的文档：

- Jenkins pipeline: 您应该使用[Credentials plugin](https://wiki.jenkins-ci.org/display/JENKINS/Credentials+Plugin)
- GitLab CI: 阅读[documentation about secret-variables](https://docs.gitlab.com/ce/ci/variables/#secret-variables)
- Travis CI: 阅读[environment variables](https://docs.travis-ci.com/user/environment-variables/)
