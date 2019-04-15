---
layout: default
title: 配置Visual Studio Code
permalink: /configuring-ide-visual-studio-code/
sitemap:
    priority: 0.7
    lastmod: 2016-09-15T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 配置Visual Studio Code

Visual Studio Code是一个由Microsoft开发的开源文本编辑器。它对字体脚本有很好的支持，所以很多人都想用它来开发Angular2应用程序。

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_1.png)

## Yeoman Support

**Warning! At the time of this writing, this extension is broken**

Visual Studio Code 有一个Yeoman扩展, 它可以帮助您运行JHipster命令。

您可以使用Visual Studio代码市场进行安装：

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_2.png)

## Java代码支持

VisualStudio代码有一个由Red Hat开发的Java扩展。它具有良好的Java支持，使用Maven或Gradle。

您可以使用Visual Studio代码市场进行安装：

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_3.png)

## Common tasks: 编译、运行和打包代码

VisualStudio代码Java扩展不能用于运行命令：它不能编译、运行代码或打包应用程序。

对于所有这些任务，有两种解决方案：

- Use the [JHipster App]({{ site.url }}/jhipster-app), which offers a graphical interface for all those commands
- Use the terminal, for instance the internal terminal provided by Visual Studio Code, to run those commands manually

## 使用Spring Boot Devtools的应用程序“热重启”

[Spring Boot devtools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)由JHipster配置，并在编译项目中的类时“热重启”应用程序。这是一个必须具备的特性，因为它可以让您的应用程序即时更新。

要在Visual Studio Code中使用它，需要:

- 在终端中运行应用程序，通常通过键入 `./mvnw`
- 在另一个终端中，编译应用程序：`./mvnw compile`

在第一个终端中，JHipster应用程序应该自动重新部署，并使用新代码。

如果使用JHipster应用程序，只需点击两个按钮（一个用于运行应用程序，另一个用于编译应用程序），应用程序将以相同的方式自动重新部署。

## 自定义设置

为了获得最佳性能，建议在项目的`.vscode`文件夹中排除一些文件夹，创建一个` settings.json`文件，如下所示：

```
{
    // Configure glob patterns for excluding files and folders.
    "files.exclude": {
        "**/.git": true,
        "**/.gradle": true,
        "**/.idea": true,
        "**/.mvn": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/.DS_Store": true
    },
    // Configure glob patterns for excluding files and folders in searches. Inherits all glob patterns from the files.exclude setting.
    "search.exclude": {
        "**/node": true,
        "**/node_modules": true,
        "**/bower_components": true,
        "**/build": true,
        "**/target": true
    }
}
```
