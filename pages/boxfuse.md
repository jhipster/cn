---
layout: default
title: 使用Boxfuse部署到AWS
permalink: /boxfuse/
redirect_from:
  - /boxfuse.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-22T00:00:00-00:00
---

# 使用Boxfuse部署到AWS

本指南展示了如何使用[Boxfuse](https://boxfuse.com/)将JHipster应用程序部署到AWS。

[![]({{ site.url }}/images/logo/logo-boxfuse.png)](https://boxfuse.com/)

Boxfuse**对JHipster具有一等支持**，通过为您的应用程序创建最小的不可变机器镜像来工作，然后可以将其部署在VirtualBox或AWS上。

<div class="alert alert-info"><i>提示: </i>
作为Boxfuse的替代方法，您还可以使用<a href="{{ site.url }}/aws/">Elastic Beanstalk</a>将JHipster应用程序部署到AWS。
</div>

## 先决条件

为了能够进行部署，您必须首先创建一个[Boxfuse帐户](https://console.boxfuse.com)并安装[Boxfuse客户端](https://boxfuse.com/getstarted/download)。

您还需要在[Boxfuse Console](https://console.boxfuse.com)中连接您的AWS账户。

## 准备部署

准备好应用程序后，可以通过输入以下内容来准备进行部署：

`./mvnw package -Pprod -DskipTests`

或使用gradle时：

`./gradlew -Pprod bootJar -x test`

## 部署到AWS

要将您的应用程序部署到AWS，请输入：

`boxfuse run -env=prod`

然后，Boxfuse将分析您的应用程序，为其打包一个最小的机器镜像，并自动配置，配置和保护所有必需的AWS基础架构（实例，安全组，弹性IP，ELB，MySQL或PostgreSQL RDS数据库，等等）。

<pre>Creating jhipster ...
Mapping jhipster-dev-myuser.boxfuse.io to 127.0.0.1 ...
Created App jhipster (single-instance / postgresql)
Fusing Image for jhipster-1.0.war (JHipster) ...
Image fused in 00:05.036s (96301 K) -> myuser/jhipster:1.0
Pushing myuser/jhipster:1.0 ...
Verifying myuser/jhipster:1.0 ...
Creating security group boxsg-db-myuser-prod-jhipster ...
Creating RDS PostgreSQL database (db.t2.micro / 5 GB / single-az) => boxdb-myuser-prod-jhipster (this one-time action may take up to 10 minutes to complete) ...
Waiting for AWS to create an AMI for myuser/jhipster:1.0 in eu-central-1 (this may take up to 50 seconds) ...
AMI created in 00:35.564s in eu-central-1 -> ami-35fa0b5a
Waiting for AWS to make RDS DB boxdb-myuser-prod-jhipster available ...
DB boxdb-myuser-prod-jhipster [creating]
DB boxdb-myuser-prod-jhipster [backing-up]
DB boxdb-myuser-prod-jhipster [available]
Creating security group boxsg-myuser-prod-jhipster ...
Creating Elastic IP ...
Mapping jhipster-myuser.boxfuse.io to 52.29.78.197 ...
Creating security group boxsg-myuser-prod-jhipster-1.0 ...
Launching t2.micro instance of myuser/jhipster:1.0 (ami-35fa0b5a) in prod (eu-central-1) ...
Instance launched in 00:20.687s -> i-95d15028
Creating Cloud Watch Alarm for Instance auto-recovery -> i-95d15028-auto-recovery-alarm
Waiting for AWS to boot Instance i-95d15028 and Payload to start at http://54.93.63.207:8080/ ...
Payload started in 01:29.685s -> http://54.93.63.207:8080/
Remapping Elastic IP 52.29.78.197 to i-95d15028 ...
Waiting 15s for AWS to complete Elastic IP Zero Downtime transition ...
Deployment completed successfully. myuser/jhipster:1.0 is up and running at http://jhipster-myuser.boxfuse.io:8080/</pre>

请注意，您无需明确指定端口，健康检查URL或数据库类型之类的内容。默认情况下，Boxfuse会根据JHipster war中`application-prod.yml`文件和包含的jar文件来自动发现。当然，您可以根据需要覆盖这些自动发现的设置，但是在大多数情况下，您不需要这样做。

## 部署更新

要将更新部署到现有应用程序，只需遵循上面概述的准备和部署步骤。所有更新均可零停机时间，蓝色部署来执行。

## 更多信息

*   [Boxfuse和JHipster入门](https://boxfuse.com/getstarted/jhipster)
*   [JHipster Boxfuse文档](https://boxfuse.com/docs/payloads/jhipster)
