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

启动[Docker镜像](https://hub.docker.com/r/jenkinsci/jenkins/)（默认端口已更改为18080）：

`docker container run -d --name jenkins2 -p 18080:8080 -p 50000:50000 jenkinsci/jenkins`

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
