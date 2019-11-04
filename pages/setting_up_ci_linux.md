---
layout: default
title: 在Linux设置Jenkins 1
permalink: /setting-up-ci-linux/
redirect_from:
  - /setting_up_ci_linux.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在Linux设置Jenkins 1

以下说明适用于Red Hat/CentOS服务器，但也可以轻松地适用于其他Linux发行版。

## 安装Jenkins

请遵循[https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions)中的说明

~~~~
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
sudo yum install jenkins

sudo service jenkins start
~~~~

已创建一个`jenkins`用户，其主目录为`/var/lib/jenkins`

## 配置Jenkins

### 安装JDK 8

通过Jenkins管理，添加JDK 8自动安装程序。

### 安装Maven

通过Jenkins管理，从Apache站点添加Maven自动安装程序。

### 安装NodeJS

您可以全局安装NodeJS，但也可能希望为不同的项目安装不同版本的NodeJS。

我们建议以下2种选择，选择您喜欢的一种。

#### Jenkins NodeJS插件

安装Jenkins NodeJS插件。

通过Jenkins管理，添加NodeJS安装：

- 来自nodejs.org的自动安装程序，使用最新的LTS（长期支持）64位版本
- 要安装的全局NPM软件包：bower gulp

#### 本地NodeJS安装

使用以下脚本在本地安装NodeJS，然后更新Jenkins PATH以使用它。

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

确保您更新了Jenkins PATH。