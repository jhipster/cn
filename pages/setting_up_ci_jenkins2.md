---
layout: default
title: 在Jenkins 2上建立持续集成
permalink: /setting-up-ci-jenkins2/
redirect_from:
  - /setting_up_ci_jenkins2.html
sitemap:
    priority: 0.7
    lastmod: 2017-01-19T14:15:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在Jenkins 2上建立持续集成

## 安装Jenkins 2

### 标准

在您的机器上安装JDK 8。

官方网站[https://jenkins.io/2.0/](https://jenkins.io/2.0/)

下载 `jenkins.war`

### 使用Docker

启动 [Docker image](https://hub.docker.com/r/jenkinsci/jenkins/) (默认端口已更改为18080):

`docker container run -d --name jenkins2 -p 18080:8080 -p 50000:50000 jenkinsci/jenkins`

## 创建新作业

- Add New Item
    - Enter an item name
    - Select pipeline
    - Click OK

![Jenkins2 item]({{ site.url }}/images/jenkins2_add_item.png)

- Definition: Pipeline script from SCM
- SCM: Git
- Repositories
    - Repository URL: select your repository here

![Jenkins2 pipeline]({{ site.url }}/images/jenkins2_pipeline.png)

## Jenkinsfile

![Jenkins2 result]({{ site.url }}/images/jenkins2_result.png)
