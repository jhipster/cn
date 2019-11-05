---
layout: default
title: 配置Intellij IDEA
permalink: /configuring-ide-idea/
redirect_from:
  - /configuring_ide_idea.html
sitemap:
    priority: 0.7
    lastmod: 2015-11-28T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 配置Intellij IDEA

## 打开你的项目

- 正常打开项目
- Maven应该自动被检测到，您的项目将自动构建

如果需要对设置进行更多修改，还可以选择 "Import project"。

## 排除目录

如果您使用Git，只需初始化项目(`git init && git add . && git commit -m 'Initial commit'`)，Intellij IDEA将自动排除被Git忽略的目录（因此您无需执行任何操作）。

要手动排除目录：

- 右键`node_modules/`目录
- 选择"Mark Directory As"并且选择"Excluded"

![Exclude]({{ site.url }}/images/configuring_ide_idea_1.png)

由于`node_modules/`目录仅由JHipster使用，因此可以安全地排除它。

## Spring支持 (在社区版中不可用)

在一个新项目，如果需要在Spring中支持大多JHipster模块，请首先转到`File → Project Structure`。

![Project Structure]({{ site.url }}/images/configuring_ide_idea_2.png)

然后转到“Modules”选项卡，单击`+`按钮，然后单击"Spring"以将Spring代码帮助添加到您的项目。

![Spring]({{ site.url }}/images/configuring_ide_idea_3.png)

它会提示您有未映射的Spring配置文件，单击右下角的`+`号（不是最初那个），然后选择您的项目的所有Spring文件，只需单击文件夹就可以选择所有内容。

![Spring Application Context]({{ site.url }}/images/configuring_ide_idea_4.png)

之后，单击`OK`，然后Spring应该配置了适当的代码辅助。

现在，单击最初用于添加Spring的`+` 按钮，然后添加Hibernate。您无需在此这里添加任何文件，只需在其中添加提供基于Hibernate的代码帮助。请记住在“Project structure”对话框上单击`OK`。

现在，大多数代码库都具有Spring支持。每次启动新项目时，都必须重复此步骤，因为这些设置是基于项目特殊配置的。

## 使用Spring Boot开发工具支持应用程序“热重启”

[Spring Boot开发工具](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)已由JHipster配置, ，并且在编译项目中的类时将“热重启”您的应用程序。这是一项必备功能，因为它可以使您的应用程序实时更新。

默认情况下，IntelliJ IDEA在应用程序运行时不会自动编译文件。要启用"Compile on save"功能：

* 转到`File -> Settings -> Build, Execution, Deployment -> Compiler`然后启用"Make project automatically"
* 打开Action窗口：
  * Linux : `CTRL+SHIFT+A`
  * Mac OSX : `SHIFT+COMMAND+A`
  * Windows : `CTRL+ALT+SHIFT+/`
* 进入`Registry...`并启用`compiler.automake.allow.when.app.running`

## Maven IDE配置文件

如果使用的是Maven，则需要在IntelliJ中激活`IDE`配置文件。这是用于应用IDE特定的调整，目前仅包括应用MapStruct注解处理器。

打开"Maven Projects"工具窗口（View -> Tool Windows），检查`IDE`maven配置文件并将其激活。

## Gradle

为了获得Gradle的最佳开箱即用体验，您应该将所有[IDE生成/运行操作直接委派给Gradle](https://www.jetbrains.com/idea/whatsnew/#v2017-3-gradle)。使用此设置，注解处理将自动配置，并且在混合IDE和cli构建时不会有重复的类。如果您使用的是旧版本（<2016.3），则必须手动启用注解处理。