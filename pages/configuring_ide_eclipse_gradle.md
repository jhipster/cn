---
layout: default
title: 配置使用Gradle的Eclipse
permalink: /configuring-ide-eclipse-gradle/
redirect_from:
  - /configuring-ide-eclipse-gradle.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 配置使用Gradle的Eclipse

为了在Eclipse中获得Gradle的全面支持，您应该安装[buildship插件](https://gradle.org/eclipse/)。对于JavaScript配置部分，您可以参照使用Maven的指引进行操作。

## 1. 将您的项目导入为Gradle项目

- 选择 ``File -> Import``
- 选择 ``Gradle Project``
- 选择项目根目录
- 单击``Next``，完成向导

![Import]({{ site.url }}/images/configuring_ide_eclipse_gradle_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_gradle_2.png)

## 2. 添加apt生成的源文件夹以构建路径

当使用buildship gradles时，默认的output文件夹被过滤, 并且在工作空间中不可见。因此，您需要将其从eclipse的资源过滤器设置中删除。

- 右键单击您的项目，然后选择 ``Properties``
- 选择 ``Resources``
- 删除条目 ``build``
- 选择 ``Java Build Path``
- 点击 ``Add Folder...``
- 检查路径 ``build/generated/source/apt/main``

通过Eclipse运行JHipster时，请确保新的源文件夹包含正确生成的mapper实现。

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_gradle_3.png)

![Buildpath]({{ site.url }}/images/configuring_ide_eclipse_gradle_4.png)
