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

本指南介绍如何使用[boxfuse](https://boxfuse.com/)将Jhipster应用程序部署到AWS。

[![]({{ site.url }}/images/logo/logo-boxfuse.png)](https://boxfuse.com/)

Boxfuse附带 **first-class support for JHipster**，它通过为您的应用程序创建最小的不可变机器映像来工作，然后可以在virtualbox或AWS上部署这些映像。

<div class="alert alert-info"><i>Tip: </i>

作为Boxfuse的替代方案，您也可以使用弹性Beanstalk将JHipster应用程序部署到AWS。

</div>

## 前置条件

要能够部署，必须首先[创建一个Boxfuse账号](https://console.boxfuse.com)并安装 [Boxfuse Client](https://boxfuse.com/getstarted/download).

您还需要在[Boxfuse Console](https://console.boxfuse.com)中连接您的AWS帐户。

## 准备部署

当应用程序准备就绪时，您可以通过键入以下内容来准备部署：

`./mvnw package -Pprod -DskipTests`

或者使用gradle:

`./gradlew -Pprod bootWar -x test`

## 部署到AWS

要将应用程序部署到AWS类型，请执行以下操作：

`boxfuse run -env=prod`

然后BoxFuse将分析您的应用程序，为其融合最小的机器图像，并自动提供、配置和保护所有必要的

AWS基础设施(instances, security groups, Elastic IPs, ELBs, MySQL or PostgreSQL RDS databases, ...)

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

Note that you didn't need to explicitly specify things like ports, healthcheck urls or database types. By default Boxfuse auto-discovers those
from your JHipster war based on your `application-prod.yml` file and the included jars. You can of course
override those auto-discovered settings if you want to, but in most cases you won't need to.

## 部署更新

要将更新部署到现有应用程序，只需遵循上面概述的准备和部署步骤。所有更新
执行为零停机蓝色部署。

## 更多信息

*   [Get Started with Boxfuse and JHipster](https://boxfuse.com/getstarted/jhipster)
*   [JHipster Boxfuse documentation](https://boxfuse.com/docs/payloads/jhipster)
