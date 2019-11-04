---
layout: default
title: 配置Visual Studio Code
permalink: /configuring-ide-visual-studio-code/
sitemap:
    priority: 0.7
    lastmod: 2016-09-15T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 配置Visual Studio Code

Visual Studio Code是Microsoft制作的开源文本编辑器。它对TypeScript具有出色的支持，因此许多人都希望将其用于开发Angular 2应用程序。

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_1.png)

## Yeoman支持

**警告！在撰写本文时，此扩展已损坏**

Visual Studio Code具有Yeoman扩展，可以帮助您运行JHipster命令。

您可以使用Visual Studio Code市场来安装它：

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_2.png)

## Java代码支持

Visual Studio Code具有Red Hat开发的Java扩展。它对使用Maven或Gradle都具有良好的Java支持。

您可以使用Visual Studio Code市场来安装它：

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_3.png)

## 常见任务：编译，运行和打包代码

Visual Studio Code Java扩展不能用于运行命令：它不能编译，运行代码或打包应用程序。

对于所有这些任务，有两种解决方案：

- 使用[JHipster App]({{ site.url }}/jhipster-app)，该应用程序为所有这些命令提供图形界面

- 使用终端（例如，Visual Studio Code提供的内部终端）手动运行这些命令

## 使用Spring Boot开发工具的应用程序"热重启"

[Spring Boot开发工具](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)已由JHipster配置, ，并且在编译项目中的类时将“热重启”您的应用程序。这是一项必备功能，因为它可以使您的应用程序实时更新。

Spring Boot devtools由JHipster配置，并且在编译项目中的类时将“热重启”您的应用程序。这是一项必备功能，因为它可以使您的应用程序实时更新。

要在Visual Studio Code中使用它，您需要：

- 在终端中运行您的应用程序, 通常在终端中输入 `./mvnw`

- 在另一个终端中，编译您的应用程序： `./mvnw compile`

在第一个终端中，您的JHipster应用程序会自动使用新代码重新部署。

如果您使用JHipster App，只需单击2个按钮即可（一个用于运行该应用程序，另一个用于编译它），您的应用程序将以相同的方式自动重新部署。

## 自定义设置

为了获得最佳性能，建议排除一些文件夹，在项目的`.vscode`文件夹中创建一个`settings.json`文件，如下所示：

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
