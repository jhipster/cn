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

当JHipster在公司中使用时，您可能需要配置所有工具来绕过公司代理。

您可以尝试配置 `HTTP_PROXY` and `HTTPS_PROXY` 环境变量，或者使用类似 [Cntlm](http://cntlm.sourceforge.net/).

但这可能还不够，因此您需要分别配置JHipster使用的所有工具。

## 介绍

假设你的代理是用:

- username
- password
- host
- port

结果配置为: `http://username:password@host:port`

如果你使用 [Cntlm](http://cntlm.sourceforge.net/), 那么你的配置是: `127.0.0.1:3128`. 否则, 按照以下步骤分别配置每个工具。

## NPM 配置

使用这些命令:

```
npm config set proxy http://username:password@host:port
npm config set https-proxy http://username:password@host:port
```

或者您可以直接编辑 `~/.npmrc`:

```
proxy=http://username:password@host:port
https-proxy=http://username:password@host:port
https_proxy=http://username:password@host:port
```

## Yarn 配置

Use these commands:

```
yarn config set proxy http://username:password@host:port
yarn config set https-proxy http://username:password@host:port
```

## Git 配置

Use these commands:

```
git config --global http.proxy http://username:password@host:port
git config --global https.proxy http://username:password@host:port
```

或者您可以直接编辑 `~/.gitconfig`:

```
[http]
        proxy = http://username:password@host:port
[https]
        proxy = http://username:password@host:port
```

## Maven 配置

Edit the `proxies` session in your `~/.m2/settings.xml` file

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

### Maven Wrapper

Create a new file `.mvn/jvm.config` inside the project folder and set the properties accordingly:

```
-Dhttp.proxyHost=host
-Dhttp.proxyPort=port
-Dhttps.proxyHost=host
-Dhttps.proxyPort=port
-Dhttp.proxyUser=username
-Dhttp.proxyPassword=password
```

## Gradle 配置

Add the below in your `gradle.properties` file and in your `gradle/wrapper/gradle-wrapper.properties` file if you are downloading the wrapper over a proxy

如果要全局设置这些属性，请将其添加到 `USER_HOME/.gradle/gradle.properties`

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

### Native Docker

根据操作系统的不同，您必须编辑特定的文件 (`/etc/sysconfig/docker` or `/etc/default/docker`).

然后，您必须使用以下命令重新启动Docker服务： `sudo service docker restart`.

它不适用于SystemD。参见 [page from docker](https://docs.docker.com/engine/admin/systemd/#http-proxy)
配置代理。

### Docker with docker-machine

您可以使用以下命令创建Docker机器：

```
docker-machine create -d virtualbox \
    --engine-env HTTP_PROXY=http://username:password@host:port \
    --engine-env HTTPS_PROXY=http://username:password@host:port \
    default
```

或者您可以直接编辑 `~/.docker/machine/machines/default/config.json`.
