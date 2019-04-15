---
layout: default
title: 代码质量
permalink: /code-quality/
sitemap:
    priority: 0.7
    lastmod: 2018-08-18T12:40:00-00:00
---

# <i class="fa fa-diamond"></i> 代码质量

使用JHipster自动配置的[SonarCloud](https://sonarcloud.io)可以很容易地分析代码质量。

## 在JHipster使用Sonar

JHipster为Sonar提供了Docker Compose配置 ([here is the JHipster Docker Compose documentation]({{ site.url }}/docker-compose/)) that provides an out-of-the box Sonar instance. At the root of your project, please run:

    docker-compose -f src/main/docker/sonar.yml up -d

如果使用maven，则会自动配置它：

    ./mvnw -Pprod clean test sonar:sonar

如果使用Gradle，它也会自动配置：

    ./gradlew -Pprod clean test sonarqube

分析完成后，Sonar仪表板将显示该信息，默认情况下, 默认可以在[http://127.0.0.1:9001/](http://127.0.0.1:9001/).

## 自动代码分析

JHipster生成器项目发布一个示例项目，每次在“master”分支中合并一个新的提交时都会分析该示例项目：

[Analysis of the sample JHipster project](https://sonarcloud.io/dashboard?id=io.github.jhipster.sample%3Ajhipster-sample-application)

这允许JHipster团队确保您将开始在尽可能干净的代码上开发项目。

此分析由 [SonarCloud](https://sonarcloud.io)免费提供。
