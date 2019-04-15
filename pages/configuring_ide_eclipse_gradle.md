---
layout: default
title: 使用Gradle配置Eclipse
permalink: /configuring-ide-eclipse-gradle/
redirect_from:
  - /configuring-ide-eclipse-gradle.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 使用Gradle配置Eclipse

要在Eclipse中获得完全的Gradle支持，您应该安装 [buildship plugin](https://gradle.org/eclipse/).
要配置 [JavaScript]({{ site.url }}/configuring-ide-eclipse/) 端，可以按照maven的说明进行操作。

## 1. 将项目导入为Gradle项目

- Select ``File -> Import``
- Choose ``Gradle Project``
- Select your projects root directory
- Click on ``Next`` and finish the wizard

![Import]({{ site.url }}/images/configuring_ide_eclipse_gradle_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_gradle_2.png)

## 2. 添加 apt 生成的源代码目录到 build path

使用Buildship Gradles时，默认输出文件夹将被筛选，并且在工作区中不可见。
因此，您需要从Eclipse的资源过滤器设置中删除它。

- Right click on your project and select ``Properties``
- Select ``Resources``
- Remove the entry ``build``
- Select ``Java Build Path``
- Click ``Add Folder...``
- Check the path ``build/generated/source/apt/main``

在通过Eclipse运行Jhipster时，请确保新的源文件夹包含正确生成的映射器实现。

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_gradle_3.png)

![Buildpath]({{ site.url }}/images/configuring_ide_eclipse_gradle_4.png)
