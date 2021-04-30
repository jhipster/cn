---
layout: default
title: 安装JHipster
permalink: /installation/
redirect_from:
  - /installation.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-30T08:20:00-00:00
---

# <i class="fa fa-cloud-download"></i> 安装JHipster

## 安装方法

我们提供4种使用JHipster的方法。如有疑问，请选择我们的第二个方法: 使用NPM进行本地安装:

*   [JHipster Online](https://start.jhipster.tech/)是一种无需安装JHipster即可生成应用程序的简单方法.
*   "使用NPM进行本地安装"是使用JHipster的经典方法. 所有的一切都安装在您的计算机上，安装起来可能有些复杂，但这是大多数人通常的使用方式。如有疑问，请选择此安装方式。
*   "使用Yarn进行本地安装"与经典的"使用NPM进行本地安装"相同，但是使用了[Yarn](https://yarnpkg.com/)代替NPM。但请注意，在我们的社区中，Yarn不如NPM受欢迎，因此不建议新手使用。
*   "[Docker](https://www.docker.io/)"容器，为您提供已安装了JHipster的轻量级容器.

## JHipster Online (适用于希望以简单方式使用JHipster的用户)

[JHipster Online](https://start.jhipster.tech/), 无需安装JHipster即生成JHipster应用程序.

适用第一次尝试JHipster的用户，或者想浏览JHipster提供的功能的用户.

尽管它更易于使用，但这并不是“完整的JHipster体验”，并且在生成应用程序后，您仍需要操作后续很多步骤（“使用NPM进行本地安装”），而且您仍然需要提供Java（运行应用程序）和NPM（管理前端代码）环境.

我们希望将来JHipster Online能提供更多功能.

## 使用NPM进行本地安装 (推荐给普通用户)

### 快速设置

1.  安装Java 11. 推荐使用[AdoptOpenJDK builds](https://adoptopenjdk.net/), 开源免费.
2.  从[Node.js官网](http://nodejs.org/)获取Node.js安装(请使用LTS 64位版本, 非LTS版本不再支持)
3.  安装JHipster: `npm install -g generator-jhipster`
4.  (可选) 如果你需要使用模块和蓝图(例如从[JHipster Marketplace]({{ site.url }}/modules/marketplace/#/list)获取), 安装[Yeoman](https://yeoman.io/): `npm install -g yo`

现在已经安装了JHipster，下一步是[创建一个应用程序]({{ site.url }}/creating-an-app/)

### 可选安装

1. 安装Java构建工具.
    *   无论你选择[Maven](http://maven.apache.org/)还是[Gradle](http://www.gradle.org/), 通常都不需要额外安装任何东西, 因为JHipster会自动为您安装[Maven Wrapper](https://github.com/takari/maven-wrapper)或[Gradle Wrapper](http://gradle.org/docs/current/userguide/gradle_wrapper.html).
    *   如果您不想使用这些包装器, 请访问[Maven官方网站](http://maven.apache.org/)官方网站或[Gradle官方网站](http://www.gradle.org/)自行安装.
2.  从[git-scm.com](http://git-scm.com/)安装Git. 如果您刚接触Git，我们建议您也可以使用[SourceTree](http://www.sourcetreeapp.com/)之类的工具.
    * JHipster将尝试将您的项目提交到Git（如果已安装).
    * [升级JHipster子生成器]({{ site.url }}/upgrading-an-application/)需要Git已安装。

### 补充信息

JHipster使用[Yeoman](http://yeoman.io/)实现代码自动生成。要查找更多信息，技巧和帮助，或在[提交错误](https://github.com/jhipster/generator-jhipster/issues?state=open)之前, 请查看[Yeoman入门指南](http://yeoman.io/learning/index.html)。
项目的生成配置将存储在自动生成的`.yo-rc.json`文件中，因此强烈建议不要在HOME目录中生成JHipster项目。如果这样做，您将无法在其子目录中生成另一个项目。要解决此问题，删除`.yo-rc.json`文件即可解决。

## 使用Yarn本地安装（替代NPM）

### 快速设置

与使用NPM的过程类似，但有两个区别：

1. 是从[Yarn官网](https://yarnpkg.com/en/docs/install)安装Yarn 
2. 安装JHipster: `yarn global add generator-jhipster`

### 故障排除

如果在全局使用Yarn时遇到问题，请确保PATH中包括了`$HOME/.config/yarn/global/node_modules/.bin`路径.

在Mac或Linux: ```export PATH="$PATH:`yarn global bin`:$HOME/.config/yarn/global/node_modules/.bin"```

## Docker安装（仅适用于高级用户）

请注意：此Docker镜像用于在容器内运行JHipster生成器。它和由JHipster将生成的[Docker和Docker Compose配置]({{ site.url }}/docker-compose/)完全不同，其目的主要是在容器中运行生成的应用。

### 描述

JHipster具有一个定制的[Dockerfile](https://github.com/jhipster/generator-jhipster/blob/main/Dockerfile)，该文件提供了[Docker](https://www.docker.io/)镜像。

自动构建的Docker镜像可以在这里找到：[https://hub.docker.com/r/jhipster/jhipster/](https://hub.docker.com/r/jhipster/jhipster/)

该镜像将允许您在Docker中运行JHipster。

### 环境准备

这取决于您的操作系统。

1.  **Linux:** Linux支持开箱即用的Docker。您遵循[Docker](https://docs.docker.com/installation/#installation)网站上的教程即可。
2.  **Mac & Windows:** 安装[Docker Toolbox](https://www.docker.com/docker-toolbox)即可安装Docker。

由于生成的应用文件位于共享文件夹中，因此如果您停止Docker容器，它们将不会被删除。但是，如果您不希望Docker在每次启动容器时都重新下载所有Maven和NPM依赖项，您应该保存容器状态或者将宿主机的外部路径挂载进容器。

<div class="alert alert-warning"><i>注意: </i>

根据您的操作系统，您的<code>DOCKER_HOST</code>将有所不同。在Linux上，它将是您的本地主机地址。对于Mac / Windows，必须使用以下命令获取IP：<code>docker-machine ip default</code>

</div>

<div class="alert alert-info"><i>提示: </i>
<a href="https://docs.docker.com/docker-for-windows/">Docker Desktop for Windows</a>/<a href="https://docs.docker.com/docker-for-mac/">Docker Desktop for Mac</a> 是Docker Toolbox提供简化使用的图形界面，这将使安装过程更加容易。
</div>

在Linux上，如果您的用户不属于docker组，则可能需要以root用户身份运行docker命令。最好将您的用户添加到docker组，以便您可以以非root用户身份运行docker命令。请按照[http://askubuntu.com/a/477554](http://askubuntu.com/a/477554)上的步骤进行操作。

### 在Linux/Mac Windows上的使用方法（使用Docker Toolbox）

#### 拉取镜像

拉取最新的Jhipster Docker镜像：

`docker image pull jhipster/jhipster`

拉取开发版本的JHipster Docker镜像：

`docker image pull jhipster/jhipster:master`

您可以在[这里](https://hub.docker.com/r/jhipster/jhipster/tags/)看到所有的容器标签

#### 运行镜像

<div class="alert alert-warning"><i>提醒: </i>

如果在Mac或Windows上使用Docker Machine，则Docker守护程序对OS X或Windows文件系统仅具有有限的访问权限。Docker Machine尝试自动共享您的"/Users"（OS X）或"C\Users\[用户名]"（Windows）目录。因此，您必须在这些目录下创建项目文件夹，避免因为卷挂载导致的任何问题。

</div>

在您的主目录中创建一个“ jhipster”文件夹：

`mkdir ~/jhipster`

使用以下选项运行这个Docker镜像:

*   将容器中的"/home/jhipster/app"文件夹路径共享到宿主机本地的"〜/jhipster"路径
*   转发Docker公开的所有端口（Java应用程序为8080，BrowserSync为9000，BrowserSync UI为3001）

`docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

<div class="alert alert-info"><i>提醒: </i>

提示：如果您以前已经启动过容器，则无需运行上述命令，只需启动/停止现有容器即可。

</div>

#### 检查容器是否正在运行

要检查您的容器是否正在运行，请使用命令： `docker container ps`:

    CONTAINER ID    IMAGE               COMMAND                 CREATED         STATUS          PORTS                                                       NAMES
    4ae16c0539a3    jhipster/jhipster   "tail -f /home/jhipst"  4 seconds ago   Up 3 seconds    0.0.0.0:9000-3001->9000-3001/tcp, 0.0.0.0:8080->8080/tcp    jhipster

#### 常用操作

*  停止容器，运行: `docker container stop jhipster`
*  并再次启动，运行: `docker container start jhipster`

如果您需要更新Docker镜像（重建或从Docker Hub拉取），最好删除现有容器，然后重新运行该容器。为此，需要首先停止容器，将其删除，然后再次运行：

1.  `docker container stop jhipster`
2.  `docker container rm jhipster`
3.  `docker image pull jhipster/jhipster`
4.  `docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

### 进入容器

<div class="alert alert-warning"><i>提醒: </i>

在Windows上，您需要以管理员身份运行Docker Quick Terminal，以便能够在`npm install`步骤中创建符号链接。
</div>

最简单方法是登录正在运行的容器执行以下命令：

`docker container exec -it <container_name> bash`

请注意：如果在容器中复制粘贴了以上命令运行，必须将容器名称指定为`jhipster`：

`docker container exec -it jhipster bash`

您将以“ jhipster”用户身份登录。

如果您想以"root"身份登录，但因为`sudo`命令在Ubuntu Xenial中是不可用，则需要运行：

`docker container exec -it --user root jhipster bash`

### 您的第一个项目

然后，您可以转到容器中的/home/jhipster/app目录，并开始在Docker内部构建应用程序：

`cd /home/jhipster/app`

`jhipster`

<div class="alert alert-info"><i>提醒: </i>

提示：如果您更喜欢使用Yarn，则可以使用<code>jhipster --yarn</code>来使用Yarn来代替NPM。

</div>

创建应用程序后，您可以运行gulp/bower/maven所有常规命令，例如：

`./mvnw`

**恭喜！您已经在Docker中启动了JHipster应用！**

在您的机器上，您应该可以：

*   通过`http://DOCKER_HOST:8080`访问正在运行的应用程序

*   在共享文件夹中获取所有生成的文件

<div class="alert alert-warning"><i>注意: </i>
    默认情况下，<code>jhipster/jhipster</code>镜像中未安装Docker。
    <br/>
    因此，您将无法：:
    <ul>
        <li>使用docker-compose文件</li>
        <li>使用Docker构建Docker镜像（Maven任务：<code>jib:dockerBuild</code>或Gradle任务：<code>jibDockerBuild</code>）</li>
    </ul>
    但是，您能够使用<a href="https://github.com/GoogleContainerTools/jib">jib</a>的无守护程序模式，该模式可以构建docker镜像并将其推送到仓库，而无需访问docker守护程序（Maven任务：<code>jib:build</code>或Gradle任务：<code>jibBuild</code>）。但是作为构建应用程序的先决条件，您将需要先设置Docker仓库凭证信息。
    有关更多详细信息，请参见<a href="https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration">Jib插件配置文档</a>。
</div>
