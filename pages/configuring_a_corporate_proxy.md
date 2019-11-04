---
layout: default
title: 配置公司代理
permalink: /configuring-a-corporate-proxy/
redirect_from:
  - /configuring_a_corporate_proxy.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-18T08:00:00-00:00
---

# <i class="fa fa-exchange"></i> 配置公司代理

在公司中使用JHipster时，您可能需要配置所有工具绕过公司代理。

您可以尝试配置`HTTP_PROXY`和`HTTPS_PROXY`环境变量，或使用类似[Cntlm](http://cntlm.sourceforge.net/)s的工具。

但这可能还不够，因此您还需要分别配置与JHipster一起使用的其他所有工具。

## 介绍

假设您的代理由以下参数定义：

- username
- password
- host
- port

那么结果配置为： `http://username:password@host:port`

如果您使用[Cntlm](http://cntlm.sourceforge.net/)，则您的配置将是：`127.0.0.1:3128`。否则，请按照以下步骤分别配置每个工具。

## NPM配置

使用以下命令：

```
npm config set proxy http://username:password@host:port
npm config set https-proxy http://username:password@host:port
```

或者，您可以直接编辑你的 `~/.npmrc`文件：

```
proxy=http://username:password@host:port
https-proxy=http://username:password@host:port
https_proxy=http://username:password@host:port
```

## Yarn配置

使用以下命令:

```
yarn config set proxy http://username:password@host:port
yarn config set https-proxy http://username:password@host:port
```

## Git配置

使用以下命令:

```
git config --global http.proxy http://username:password@host:port
git config --global https.proxy http://username:password@host:port
```

或者，您可以直接编辑你的`~/.gitconfig`文件：

```
[http]
        proxy = http://username:password@host:port
[https]
        proxy = http://username:password@host:port
```

## Maven配置

在`~/.m2/settings.xml`文件中编辑 `proxies`会话配置：

```
<proxies>
    <proxy>
        <id>id</id>
        <active>true</active>
        <protocol>http</protocol>
        <username>username</username>
        <password>password</password>
        <host>host</host>
        <port>port</port>
        <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
</proxies>
```

### Maven包装器

在项目文件夹中创建一个新文件`.mvn/jvm.config`并设置相应地属性：

```
-Dhttp.proxyHost=host 
-Dhttp.proxyPort=port 
-Dhttps.proxyHost=host 
-Dhttps.proxyPort=port 
-Dhttp.proxyUser=username 
-Dhttp.proxyPassword=password
```

## Gradle配置

如果需要通过代理下载Gradle包装器，则将以下内容添加到`gradle.properties`文件和`gradle/wrapper/gradle-wrapper.properties`文件中

如果要全局设置这些属性，则将其添加到`USER_HOME/.gradle/gradle.properties`文件中

```
## Proxy setup
systemProp.proxySet="true"
systemProp.http.keepAlive="true"
systemProp.http.proxyHost=host
systemProp.http.proxyPort=port
systemProp.http.proxyUser=username
systemProp.http.proxyPassword=password
systemProp.http.nonProxyHosts=local.net|some.host.com

systemProp.https.keepAlive="true"
systemProp.https.proxyHost=host
systemProp.https.proxyPort=port
systemProp.https.proxyUser=username
systemProp.https.proxyPassword=password
systemProp.https.nonProxyHosts=local.net|some.host.com
## end of proxy setup
```

## Docker

### 原生Docker

根据您的操作系统环境，您必须编辑特定文件（`/etc/sysconfig/docker`或`/etc/default/docker`）。

然后，您必须使用以下命令重新启动docker服务：`sudo service docker restart`

它不适用于systemd。请从[docker页面](https://docs.docker.com/engine/admin/systemd/#http-proxy)查看相关的代理配置。

### 带有docker-machine的Docker

您可以使用以下命令创建docker-machine：

```
docker-machine create -d virtualbox \
    --engine-env HTTP_PROXY=http://username:password@host:port \
    --engine-env HTTPS_PROXY=http://username:password@host:port \
    default
```

或者，您可以编辑文件 `~/.docker/machine/machines/default/config.json`.
