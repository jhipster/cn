---
layout: default
title: 在 Windows上设置Jenkins 1
permalink: /setting-up-ci-windows/
redirect_from:
  - /setting_up_ci_windows.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在 Windows上设置Jenkins 1

## 安装Jenkins

从[https://jenkins.io/](https://jenkins.io/)下载Jenkins Windows安装程序

安装程序将Jenkins配置为使用系统用户作为服务运行，这可能很危险，将用户的服务更改为非特权服务更安全：

[http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html](http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html)

##配置Jenkins

### 安装JDK 8

通过Jenkins管理，添加一个JDK8自动安装程序。

### 安装Maven

通过Jenkins管理，从Apache的站点添加一个Maven自动安装程序。

### 安装PhantomJS

下载可执行程序[http://phantomjs.org/download.html](http://phantomjs.org/download.html)

检查可执行文件是否包含在路径中：

~~~
phantomjs --version
2.1.1
~~~

## 安装NodeJS

Jenkins Nodejs插件在Windows上不起作用，所以我们将进行手动安装。

下载最新的LTS (Long Term Support) 64-bit 版本[http://nodejs.org/](http://nodejs.org/)

不要将NodeJS安装到默认目录 `C:\Program Files\nodejs` 因为它需要管理权限，所以最好使用类似 `c:\nodejs`的简单路径。

编辑 `C:\nodejs\node_modules\npm\npmrc` 替换

~~~
prefix=${APPDATA}\npm
~~~

by

~~~
prefix=C:\nodejs\node_modules\npm
~~~

将'C:\nodejs\node_modules\npm'文件夹添加到path环境变量，删除安装程序添加的文件夹： 'C:\Users\<user>\AppData\Roaming\npm'

NPM可能需要Git，从 [https://git-for-windows.github.io/](https://git-for-windows.github.io/)安装

Add Bower and Gulp:

~~~
npm install -g bower gulp
bower --version
gulp --version
~~~

在同一台机器上有多个版本的NodeJS可能很有用，但是在windows上的`nvm`等价物更多地关注开发环境，而不是持续集成。因此，如果一个作业需要另一个版本的nodejs，请更改它的路径变量。
