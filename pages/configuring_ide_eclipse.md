---
layout: default
title: 配置使用Maven的Eclipse
permalink: /configuring-ide-eclipse/
redirect_from:
  - /configuring_ide_eclipse.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 配置使用Maven的Eclipse

在Eclipse中导入JHipster应用程序将需要一些额外的手动配置步骤。您将需要进行如下一些配置：

- Maven方面（针对Maven用户）

- JavaScript方面（因此Eclipse可以忽略几个静态文件文件夹）

## 1. 将项目导入为Maven项目

- 选择 File -> Import
- 选择 "Existing Maven Projects"
- 选择你的项目
- 点击"Finish"

![Import]({{ site.url }}/images/configuring_ide_eclipse_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_2.png)

在导入阶段结束时，可以看到以下对话框。"Maven plugin connectors"是m2eclipse的扩展。需要安装该程序，完成后需要重新启动Eclipse。

如果您已经安装了它，则无需执行任何其他操作。

![Select]({{ site.url }}/images/configuring_ide_eclipse_maven_processor.png)

__注意__: 如果您已经有一个现有的JHipster项目，但尚未安装相应的connectors，则应该看到以下错误:

`Plugin execution not covered by lifecycle configuration: org.bsc.maven:maven-processor-plugin:2.2.4:process (execution: process, phase: generate-sources)`

需在错误标记上选择Quick Fix/Ctrl+1（在Mac上为Cmd+1），然后选择"Discover new m2e connectors"

## 2. 排除生成的静态文件夹

在此阶段，您应该没有任何Java错误出现了，但仍然应该看到一些JavaScript错误。这是因为您有一些Eclipse无法正确解析的JavaScript文件。这些文件仅在执行时使用，并且不需要在您的工作区中可见。他们应该被排除在外。

### 排除‘node_modules’文件夹

- 进入 Project -> Properties -> Resource -> Resource Filters
- 选择: Exclude all, Applies to folders, Name matches node_modules
- 点击"Ok"

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_3.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_4.png)


### 从src/main/webapp中排除'app'

- 进入 Project -> Properties -> Javascript -> Include path
- 单击“source”选项卡，然后选择 your_project/src/main/webapp
- 选择 “Excluded: (N  one) -> Edit -> Add multiple
- 选择`app`然后点击“Ok”
- 以下文件夹应该已经被自动排除（如果没有的话，请手动排除它们）：
    - `bower_components`
    - `node_modules/`

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_5.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_6.png)

![Multiple select]({{ site.url }}/images/configuring_ide_eclipse_7.png)

### Maven IDE配置文件

如果使用Maven，则需要在Eclipse中激活`IDE`配置文件。这用于应用IDE特定的调整，目前仅包括应用MapStruct注解处理器。

- 进入 Project -> Properties -> Maven
- 在"Active Maven Profiles"配置中, 输入`dev,IDE`

通过此配置，您将同时使用JHipster`dev`和`IDE`配置文件。

### 配置MapStruct插件

为了使IDE正确识别mapstruct代码生成器，还需要一些配置。

您应该使用m2e-apt插件（https://marketplace.eclipse.org/content/m2e-apt）。安装m2e-apt插件，使Eclipse能够与mapstruct一起使用。

您也可以安装MapStruct的Eclipse插件（https://marketplace.eclipse.org/content/mapstruct-eclipse-plugin），以获取IDE的帮助和提示。