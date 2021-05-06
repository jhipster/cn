---
layout: default
title: 在Mac/Windows上将Docker容器用作localhost
sitemap:
priority: 0.5
lastmod: 2016-11-15T16:00:00-00:00
---

# 在Mac/Windows上将Docker容器用作localhost

__提交者 [@Akuka](https://github.com/Akuka)__

## Linux上的Docker和Mac/Windows环境上的Docker之间的区别

根据您的操作系统，您的<code>DOCKER_HOST</code>是不同的。
在Linux上，它将只是您的本地主机。
对于Mac/Windows，应使用以下命令获取适当的IP：

```
docker-machine ip default
```

## 动机

生成新的JHipster应用程序时，所有连接配置的主机地址（例如：数据库连接字符串）默认情况下为localhost。
这意味着，如果您使用Docker运行服务（例如数据库/搜索/SMTP服务器等），则需要编辑应用程序配置文件，并将数据库IP地址从localhost替换为<code>DOCKER_HOST</code>。

## 转发端口

Docker Machine是在您主机中VirtualBox下运行的虚拟机。
我们可以使用VirtualBox的端口转发功能来以本地主机的身份访问Docker VM。

为此，请执行以下操作：


首先，通过执行以下命令确保您的Docker Machine已停止：

```
docker-machine stop default     # Your Docker machine name may not be default, in this case change the name accordingly
```

然后：

* 打开VirtualBox Manager
* 选择您的Docker Machine VirtualBox映像（例如：default）
* 打开设置->网络->高级->端口转发
* 添加您的应用名称，所需的主机端口和您的访客端口

以下是带有MySQL端口转发示例的屏幕截图：

![MySQL Port Forwarding Example](../images/020_tip_using_docker_containers_as_localhost_on_mac_and_windows_01.png)


现在您可以通过执行以下操作来启动Docker Machine：

```
docker-machine start default
eval $(docker-machine env default)
```

然后只需启动您的Docker容器，您就可以通过localhost访问它。