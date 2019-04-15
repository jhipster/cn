---
layout: default
title: 使用Maven进行Eclipse的配置
permalink: /configuring-ide-eclipse/
redirect_from:
  - /configuring_ide_eclipse.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 使用Maven进行Eclipse的配置

在Eclipse中导入JHipster应用程序需要几个手动步骤。您需要进行一些配置：

- on the Maven side (for Maven users)
- on the JavaScript side (so Eclipse can ignore a couple of folders for static files)

## 1. 将项目导入为Maven项目

- Select File -> Import
- Choose "Existing Maven Projects"
- Select your project
- Click on "Finish"

![Import]({{ site.url }}/images/configuring_ide_eclipse_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_2.png)


在导入阶段结束时，您可以看到下面的对话框。“Maven插件连接器”是M2Eclipse的扩展。应该安装一个，Eclipse需要在完成后重新启动。

如果您已经安装了它，您将很好地去，不需要做任何事情。

![Select]({{ site.url }}/images/configuring_ide_eclipse_maven_processor.png)

__Note__: 如果您已经有了一个现有的Jhipster项目，并且没有安装相应的连接器，那么应该会看到以下错误：

`Plugin execution not covered by lifecycle configuration: org.bsc.maven:maven-processor-plugin:2.2.4:process (execution: process, phase: generate-sources)`

只需在错误标记上选择快速修复/ctrl+1（在Mac上选择Cmd+1），然后选择“发现新的M2E连接器”。

## 2. 排除生成的静态文件夹
在这个阶段，您不应该有任何Java错误，但仍然应该看到一些JavaScript错误。这是因为有些JavaScript文件Eclipse无法正确解析。这些文件仅在执行时使用，不需要在工作区中可见。他们应该被排除在外。


### 排除 ‘node_modules’ 文件夹

- Right-click on Project -> Properties -> Resource -> Resource Filters
- Select: Exclude all, Applies to folders, Name matches node_modules
- Press "Ok"

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_3.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_4.png)


### 排除 'app' from src/main/webapp

- Right click on Project -> Properties -> Javascript -> Include path
- Click on the “source” tab and select your_project/src/main/webapp
- Select “Excluded: (None) -> Edit -> Add multiple
- Select  `app` and click “Ok”
- The following folders should have been automatically excluded (if not, exclude them manually):
    - `bower_components`
    - `node_modules/`

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_5.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_6.png)

![Multiple select]({{ site.url }}/images/configuring_ide_eclipse_7.png)

### Maven IDE profile

如果使用maven，则需要在eclipse中激活`IDE`配置文件。这用于应用特定于IDE的调整，目前只包括应用mapstruct注释处理器。

- Right click on Project -> Properties -> Maven
- In "Active Maven Profiles", type `dev,IDE`

With this configuration, you will be using both the JHipster `dev` and `IDE` profiles.

### 配置 MapStruct 插件

为了让IDE正确识别mapstruct代码生成器，还需要做一些其他的事情。

您应该使用插件m2e apt(https://marketplace.eclipse.org/content/m2e apt)。安装m2e apt插件，使Eclipse能够与mapstruct一起工作。

此外，您还可以安装插件mapstruct eclipse插件(https://marketplace.eclipse.org/content/mapstruct-eclipse-plugin)，以获取IDE的帮助和提示。
