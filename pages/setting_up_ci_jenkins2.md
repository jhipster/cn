---
layout: default
title: 在Jenkins上设置持续集成 2
permalink: /setting-up-ci-jenkins2/
redirect_from:
  - /setting_up_ci_jenkins2.html
sitemap:
    priority: 0.7
    lastmod: 2017-01-19T14:15:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在Jenkins上设置持续集成 2

## 安装Jenkins 2

### 标准步骤

在计算机上安装JDK 8。

转到官方网站[https://jenkins.io/2.0/](https://jenkins.io/2.0/)

下载`jenkins.war`

### 使用Docker

启动[Docker镜像](https://hub.docker.com/r/jenkins/jenkins)
(_由于JHipster应用程序配置为在8080_上运行，因此默认端口已更改为18080_)

`docker container run -d --name jenkins2 -p 18080:8080 -p 50000:50000 jenkins/jenkins`

然后，您可以在以下位置访问Jenkins仪表盘
- http://localhost:18080 (on MacOS & Linux)
- http://192.168.99.100:18080 (on Windows)
    - 如果这样不起作用，请更换 `192.168.99.100` 使用docker的默认IP地址: `docker-machine ip default`

注意：在容器启动过程中，系统会要求您提供`initialAdminPassword`，您可以在日志中找到它。
您也可以通过`docker logs jenkins2`访问它

```
*************************************************************
*************************************************************
*************************************************************

Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

6707db8735be4ee29xy056f65af6ea13

This may also be found at: /var/jenkins_home/secrets/initialAdminPassword

*************************************************************
*************************************************************
*************************************************************
```

## 建立新Job

- 新增条目
    - 输入条目名称
    - 选择pipeline
    - 点击OK

![Jenkins2 item]({{ site.url }}/images/jenkins2_add_item.png)

- Definition: Pipeline script from SCM
- SCM: Git
- Repositories
    - Repository URL: 选择仓库

![Jenkins2 pipeline]({{ site.url }}/images/jenkins2_pipeline.png)

## Jenkinsfile

![Jenkins2 result]({{ site.url }}/images/jenkins2_result.png)
