---
layout: default
title: 在Windows上设置Jenkins 1
permalink: /setting-up-ci-windows/
redirect_from:
  - /setting_up_ci_windows.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在Windows上设置Jenkins 1

## 安装Jenkins

从[https://jenkins.io/](https://jenkins.io/)下载Jenkins Windows Installer

安装程序会将Jenkins配置为使用SYSTEM用户作为服务运行，这可能很危险，将用户的服务更改为非特权用户服务会更安全：

[http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html](http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html)

## 配置Jenkins

### 安装JDK 8

通过Jenkins管理，添加JDK 8自动安装程序。

### 安装Maven

通过Jenkins管理，从Apache站点添加Maven自动安装程序。

### 安装PhantomJS

从[http://phantomjs.org/download.html](http://phantomjs.org/download.html)安装二进制文件

检查可执行文件是否包含在PATH中：

~~~
phantomjs --version
2.1.1
~~~

## 安装NodeJS

Jenkins NodeJS插件在Windows上不起作用，因此我们将进行手动安装。

从 [http://nodejs.org/](http://nodejs.org/)下载最新的LTS（长期支持）64位版本。

不要将NodeJS安装到默认目录`C:\Program Files\nodejs`，因为它需要管理权限，请使用更简单的路径，例如`c:\nodejs`。

编辑`C:\nodejs\node_modules\npm\npmrc`替换

~~~
prefix=${APPDATA}\npm
~~~

为

~~~
prefix=C:\nodejs\node_modules\npm
~~~

将'C:\nodejs\node_modules\npm'文件夹添加到PATH环境变量中，删除安装程序添加的文件夹：'C:\Users\<user>\AppData\Roaming\npm'

npm可能需要Git，可从 [https://git-for-windows.github.io/](https://git-for-windows.github.io/)安装

添加Bower和Gulp：

~~~
npm install -g bower gulp
bower --version
gulp --version
~~~

在同一台计算机上安装多个版本的NodeJS可能会很有用，但是Windows上的`nvm`等效项更多地关注开发环境，而不是持续集成。因此，如果作业需要其他版本的NodeJS，请更改其PATH变量。