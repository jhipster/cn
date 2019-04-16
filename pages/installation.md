---
layout: default
title: 安装 JHipster
permalink: /installation/
redirect_from:
  - /installation.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-30T08:20:00-00:00
---

# <i class="fa fa-cloud-download"></i> 安装 JHipster

## 安装类型

我们提供6种与JHipster合作的方式。如果有疑问，请选择我们的第二个选项，"Local installation with NPM":

*   [JHipster Online](https://start.jhipster.tech/) 是一种生成应用程序的简单方法，而不首先安装JHipster。
*   "Local installation with NPM"是与JHipster合作的经典方式。所有的东西都安装在你的机器上，设置起来可能有点复杂，但这是大多数人通常的工作方式。如有疑问，请选择此安装。
*   "Local installation with Yarn" 与经典的 "Local installation with NPM"相同, 但需要使用 [Yarn](https://yarnpkg.com/) 来替代 NPM
*   "Installation with a package manager"仅适用于Mac OS X和Windows。如果您使用包管理器，这是一种非常简单的安装方法，但它仍然处于测试阶段。
*   The Vagrant-based "[development box](https://github.com/jhipster/jhipster-devbox)",所有工具都已在基于Ubuntu的虚拟机中设置。
*   The "[Docker](https://www.docker.io/)" container,它为您提供了一个安装了JHipster的轻型容器。

## JHipster Online (对于希望使用简化方式运行JHipster的用户)

[JHipster Online](https://start.jhipster.tech/) 允许您轻松生成JHipster应用程序，而无需安装JHipster.

这是针对第一次尝试JHipster的人，或者只是想看看JHipster提供了什么。

虽然它更容易使用，但它不是“完整的JHipster经验”，一旦生成应用程序，您仍然需要遵循下一部分（“本地安装NPM”）的大部分步骤，因为您仍然需要Java（运行应用程序）和NPM（管理前端代码）。

当然，将来我们希望JHipster在线提供更多的功能。

## 带NPM的本地安装（推荐给普通用户）

### 快速设置

1.  安装 Java 8  [the Oracle website](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
2.  安装 Node.js [the Node.js website](http://nodejs.org/) (please use an LTS 64-bit version, non-LTS versions are not supported)
3.  NPM与node.js一起安装，但需要升级：`npm install -g npm`
4.  如果要使用JHipster Marketplace，请安装Yeoman： `npm install -g yo`
5.  安装 JHipster: `npm install -g generator-jhipster`

JHipster安装完成, 下一步 [创建应用程序]({{ site.url }}/creating-an-app/)

### 可选安装

1. 安装Java构建工具。
    *   无论您选择使用 [Maven](http://maven.apache.org/) 或 [Gradle](http://www.gradle.org/), 通常都不需要安装任何东西, JHipster会自动为您安装 [Maven Wrapper](https://github.com/takari/maven-wrapper) 或 [Gradle Wrapper](http://gradle.org/docs/current/userguide/gradle_wrapper.html)。
    *   如果您不想使用这些包装，请访问官方的 [Maven website](http://maven.apache.org/) 或 [Gradle website](http://www.gradle.org/) 自行安装。
2.  安装 Git [git-scm.com](http://git-scm.com/). 如果您从git开始，如果您从git开始，我们建议您也使用类似 [SourceTree](http://www.sourcetreeapp.com/)。
    * 如果安装了Git，JHipster将尝试将您的项目提交给Git。
    * [JHipster升级子程序]({{ site.url }}/upgrading-an-application/) 需要安装Git。

### 附加信息

JHipster使用 [Yeoman](http://yeoman.io/)生成代码.
要了解更多信息、提示和帮助，请查看[the Yeoman "getting starting" guide](http://yeoman.io/learning/index.html) 在 [提交bug](https://github.com/jhipster/generator-jhipster/issues?state=open)前.

配置将存储在生成的`.yo-rc.json` 文件中，因此 **强烈** 建议不要在主目录中生成Jhipster项目。如果这样做了，就无法在子目录中生成另一个项目。要解决这个问题，只需删除`.yo-rc.json` 文件即可。

## 使用Yarn本地安装 (可选NPM)

### 快速设置

这与使用NPM的过程相同，有两个不同之处：

1. 不要在步骤3中升级NPM，而是从 [the Yarn website](https://yarnpkg.com/en/docs/install)
2. 使用 `yarn global add` 代替`npm install -g`, 比如:
    * 要安装Yeoman，请键入: `yarn global add yo`
    * 要安装JHipster，请键入: `yarn global add generator-jhipster`

### 故障排除

如果在全局范围内使用纱线有问题，请确保 `$HOME/.config/yarn/global/node_modules/.bin`在您的path中.

On Mac or Linux: ```export PATH="$PATH:`yarn global bin`:$HOME/.config/yarn/global/node_modules/.bin"```

## 使用包管理器安装

__请注意这是一个测试版功能!__ 如果您选择了此安装，请立即向我们发送[bug report](https://github.com/jhipster/generator-jhipster/issues)或反馈在 [@java_hipster](https://twitter.com/java_hipster).

### 在 Mac OS X使用Homebrew再装在 Mac OS X

JHipster提供[Homebrew](https://brew.sh/) 包, 在 [http://formulae.brew.sh/formula/jhipster](http://formulae.brew.sh/formula/jhipster).

要安装JHipster（以及node和npm），只需键入：

    brew install jhipster

每次创建新的JHipster版本时都会发布此软件包的新版本，但可能需要一些时间让自制团队验证此软件包-因此，如果您有旧的Jhipster版本，请耐心等待或使用上面的NPM安装。

### 在Windows上使用Chocolatey安装

JHipster 提供 [Chocolatey](https://chocolatey.org/) 包, 在 [https://chocolatey.org/packages/jhipster](https://chocolatey.org/packages/jhipster).

要安装JHipster（以及节点、NPM、约曼、Java和Git），只需键入：

    choco install jhipster

每次创建新的JHipster版本时都会发布此软件包的新版本，但Chocolatey团队可能需要一些时间来验证此软件包-因此，如果您有旧的JHipster版本，请耐心等待或使用上面的NPM安装。

## Vagrant box安装

[JHipster development box](https://github.com/jhipster/jhipster-devbox)项目为您提供了一个虚拟机，其中包含开发jhipster项目所需的所有工具。

这是一个很容易的方法，站起来和运行非常迅速与JHipster。

除了JHipster之外，这个虚拟机还包括许多开发工具和Docker，所以您应该准备好所有工作。

有关安装和配置信息，请访问[JHipster development box page](https://github.com/jhipster/jhipster-devbox)。

## Docker 安装 (仅限高级用户)

_请注意：此docker映像用于在容器中运行jhipster生成器。它与jhipster将生成的[Docker and Docker Compose configurations]({{ site.url }}/docker-compose/) 完全不同，其目标是在容器中运行生成的应用程序_

### 资讯

JHipster有一个特定的[Dockerfile](https://github.com/jhipster/generator-jhipster/blob/master/Dockerfile), 它提供了一个[Docker](https://www.docker.io/)镜像.

它使一个docker“自动构建”可以在 [https://hub.docker.com/r/jhipster/jhipster/](https://hub.docker.com/r/jhipster/jhipster/)

这张镜像可以让你在Docker内部运行JHipster。

### 先决条件

这取决于您的操作系统。

1.  **Linux:** Linux支持开箱即用的Docker。您只需按照[Docker](https://docs.docker.com/installation/#installation) 网站上的教程操作即可。
2.  **Mac & Windows:** 安装[Docker Toolbox](https://www.docker.com/docker-toolbox) 以轻松安装docker。

由于生成的文件位于共享文件夹中，因此如果停止Docker容器，它们将不会被删除。但是，如果您不希望Docker在每次启动容器时都继续下载所有Maven和NPM依赖项，那么应该提交它的状态或装载一个卷。

<div class="alert alert-warning"><i>警告: </i>

根据您的操作系统，您的<code>DOCKER_HOST</code>将有所不同。在Linux上，它只是您的本地主机。
对于Mac/Windows，您必须使用以下命令获取IP:<code>docker machine ip default<code>

</div>

<div class="alert alert-info"><i>提示: </i>

Kitematic是一个随Docker工具箱一起提供的易于使用的图形界面，这将使安装更加容易。

</div>

在Linux上，如果您的用户不是docker组的一部分，那么您可能需要以根用户的身份运行`docker`命令。最好将用户添加到Docker组，这样您就可以作为非根用户运行Docker命令。按照[http://askubuntu.com/a/477554](http://askubuntu.com/a/477554)上的步骤进行操作。

### Usage on Linux/Mac Windows (使用Docker工具箱)

#### 拉镜像

拉最新的Jhipster Docker镜像：

`docker image pull jhipster/jhipster`

拉开发JHipster Docker镜像：

`docker image pull jhipster/jhipster:master`

你可以看到所有的标签[here](https://hub.docker.com/r/jhipster/jhipster/tags/)

#### 运行镜像

<div class="alert alert-warning"><i>警告: </i>

如果您在Mac或Windows上使用Docker机器，则Docker守护进程对OS X或Windows文件系统的访问权限有限。docker machine尝试自动共享/users（OS X）或c:\users\&amp;lt；username&amp;gt；（Windows）目录。因此，您必须在这些目录下创建项目文件夹，以避免任何卷装入问题。

</div>


在主目录中创建“jhipster”文件夹：

`mkdir ~/jhipster`

使用以下选项运行Docker镜像：

*   The Docker "/home/jhipster/app" folder is shared to the local "~/jhipster" folder
*   Forward all ports exposed by Docker (8080 for the Java application, 9000 for BrowserSync, 3001 for the BrowserSync UI)

`docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

<div class="alert alert-info"><i>提示: </i>

如果您以前已经启动过容器一次，则不需要运行上述命令，只需启动/停止现有容器即可。

</div>

#### 检查容器是否正在运行

要检查容器是否正在运行，请使用命令`docker container ps`:

    CONTAINER ID    IMAGE               COMMAND                 CREATED         STATUS          PORTS                                                       NAMES
    4ae16c0539a3    jhipster/jhipster   "tail -f /home/jhipst"  4 seconds ago   Up 3 seconds    0.0.0.0:9000-3001->9000-3001/tcp, 0.0.0.0:8080->8080/tcp    jhipster

#### 一般操作

*   To stop the container execute: `docker container stop jhipster`
*   And to start again, execute: `docker container start jhipster`

如果更新docker映像（从docker hub重新构建或拉入），最好移除现有容器，然后再次运行容器。为此，请首先停止容器，将其移除，然后再次运行：

1.  `docker container stop jhipster`
2.  `docker container rm jhipster`
3.  `docker image pull jhipster/jhipster`
4.  `docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

### 访问容器

<div class="alert alert-warning"><i>警告: </i>

在Windows上，您需要以管理员身份执行Docker快速终端，以便在`npm安装`步骤中创建符号链接。

</div>

登录正在运行的容器的最简单方法是执行以下命令：

`docker container exec -it <container_name> bash`

如果复制粘贴上述命令以运行容器，请注意必须将`jhipster`指定为容器名称：

`docker container exec -it jhipster bash`

您将以“jhipster”用户身份登录。

如果要以“root”身份登录，因为`sudo`命令在Ubuntu Xenial中不可用，则需要运行：

`docker container exec -it --user root jhipster bash`

### Your first project

然后，您可以转到容器中的/home/jhipster/app目录，并开始在docker中构建应用程序：

`cd /home/jhipster/app`

`jhipster`

<div class="alert alert-info"><i>提示: </i>

如果您喜欢使用yarn，可以使用<code>jhipster--yarn<code>，以使用纱线而不是NPM。

</div>

创建应用程序后，可以运行所有正常的gulp/bower/maven命令，例如：

`./mvnw`

**祝贺你！你已经在Docker内部启动了你的JHipster应用程序！**

On your host machine, you should be able to :

*   Access the running application at `http://DOCKER_HOST:8080`
*   Get all the generated files inside your shared folder

<div class="alert alert-warning"><i>Warning: </i>
  默认情况下，Docker不安装在<code>jhipster/jhipster<code>image中。
    <br/>
    所以你不能：
    <ul>
        <li>使用docker-compose文件</li>
        <li>用docker守护进程构建docker映像 (Maven goal: <code>jib:dockerBuild</code> or Gradle task: <code>jibDockerBuild</code>)</li>
    </ul>
    但是，您可以使用 [jib](https://github.com/GoogleContainerTools/jib)的无守护模式，它可以构建Docker映像并将其推送到注册表，而无需访问Docker守护进程（maven目标：<code>jib:build<code>or gradle task:<code>jib build<code>）。但是，您需要将凭证设置到Docker注册表，作为构建应用程序的先决条件。有关详细信息，请参阅[Jib plugin configuration documentations](https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration)。
</div>
