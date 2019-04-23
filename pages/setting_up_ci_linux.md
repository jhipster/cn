---
layout: default
title: 在Linux上设置Jenkins 1
permalink: /setting-up-ci-linux/
redirect_from:
  - /setting_up_ci_linux.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在Linux上设置Jenkins 1

下面的说明适用于Red Hat/CentOS服务器，但可以很容易地适用于其他Linux发行版。

## 安装Jenkins

请遵循以下说明：[https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions)

~~~~
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
sudo yum install jenkins

sudo service jenkins start
~~~~

A `jenkins` user has been created, its home directory is `/var/lib/jenkins`

## 配置Jenkins

### 安装JDK 8

通过Jenkins管理，添加一个JDK8自动安装程序。

### 安装Maven

通过Jenkins管理，从Apache的站点添加一个Maven自动安装程序。

### 安装NodeJS

您可以在全球范围内安装nodejs，但很可能您希望为不同的项目使用不同版本的nodejs。

我们建议以下两种选择，选择您喜欢的一种。

#### Jenkins NodeJS plugin

安装Jenkins Nodejs插件。

通过Jenkins管理，添加nodejs安装：

- Automatic installer from nodejs.org, use the latest LTS (Long Term Support) 64-bit version
- Global npm packages to install: bower gulp

#### 本地安装NodeJS

使用下面的脚本在本地安装NodeJS，然后更新Jenkins PATH以使用它。

~~~ bash
# specify which version we want
export NODE_VERSION=4.3.1

# download
cd /tmp
wget http://nodejs.org/dist/v$NODE_VERSION/node-v4.3.1.tar.gz
tar xvfz node-v$NODE_VERSION.tar.gz

# build it and install it only locally
cd node-v$NODE_VERSION
./configure --prefix=/var/lib/jenkins/node-v$NODE_VERSION && make && make install

# Check versions of node and  npm
export PATH=/var/lib/jenkins/node-v$NODE_VERSION/bin:$PATH
node --version
# v4.3.1
npm --version
# 3.7.5

# install tools
npm install -g bower gulp
bower --version
# 1.7.7
gulp --version
# 3.9.1
~~~

Make sure you update the Jenkins PATH.
