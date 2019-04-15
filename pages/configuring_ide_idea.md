---
layout: default
title: 配置 Intellij IDEA
permalink: /configuring-ide-idea/
redirect_from:
  - /configuring_ide_idea.html
sitemap:
    priority: 0.7
    lastmod: 2015-11-28T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 配置 Intellij IDEA

## 打开项目

- 只需正常打开项目
- 应该检测到Maven，您的项目将自动生成

如果您想要对设置进行更多的控制，也可以选择“导入项目”。

## 排除目录

如果使用Git，只需初始化项目 (`git init && git add . && git commit -m 'Initial commit'`), Intellij IDEA 将自动排除被git忽略的目录（所以您没有任何事情要做）。

手动排除目录:

- Right-click on the `node_modules/` folder
- Select "Mark Directory As" and select "Excluded"

![Exclude]({{ site.url }}/images/configuring_ide_idea_1.png)

由于'node_modules/'目录仅由jhipster内部使用，因此可以安全地排除它。


## Spring支持（社区版不提供）

要将Spring支持添加到新项目中的许多Jhipster模块中，首先转到`File → Project Structure`.

![Project Structure]({{ site.url }}/images/configuring_ide_idea_2.png)

然后转到“模块”选项卡，单击“+”按钮，然后单击“Spring”将Spring代码帮助添加到项目中。

![Spring]({{ site.url }}/images/configuring_ide_idea_3.png)

它将告诉您存在未映射的Spring配置文件，单击右下角的“+”符号（不是原始符号），然后选择属于您的项目的所有Spring文件，只需单击文件夹就可以选择所有内容。

![Spring Application Context]({{ site.url }}/images/configuring_ide_idea_4.png)

然后单击“确定”，Spring应该配置适当的代码帮助。

现在单击最初用于添加Spring的“+”按钮，然后添加Hibernate。您不需要在此文件上添加任何文件，只需在其中添加它，就可以获得基于休眠的代码帮助。记住在“项目结构”对话框中单击“确定”。

现在应该对大多数代码库提供弹簧支持。每次启动新项目时都必须重复此步骤，因为这些设置是特定于项目的。

## 应用使用 Spring Boot devtools"热启动"

[Spring Boot devtools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html) 由JHipster配置，并在编译项目中的类时“热重启”应用程序。这是一个必须具备的特性，因为它可以让您的应用程序即时更新。

默认情况下，Intellij IDEA不会在应用程序运行时自动编译文件。要启用“保存时编译”功能：

* Go to `File -> Settings -> Build, Execution, Deployment -> Compiler` and enable "Make project automatically"
* Open the Action window :
  * Linux : `CTRL+SHIFT+A`
  * Mac OSX : `SHIFT+COMMAND+A`
  * Windows : `CTRL+ALT+SHIFT+/`
* Enter `Registry...` and enable `compiler.automake.allow.when.app.running`

## Maven IDE profile

如果使用maven，则需要在IntelliJ中激活`IDE`配置文件。这用于应用特定于IDE的调整
目前只包括应用mapstruct注释处理器。

Open the "Maven Projects" tool window (View -> Tool Windows), check the `IDE` maven profile to activate it.

## Gradle

为了获得Gradle的最佳开箱即用体验，您应直接将所有[ide构建/运行操作委托给Gradle](https://www.jetbrains.com/idea/whatsnew/v2017-3-gradle)。使用此设置，注释处理将自动配置，并且在混合使用IDE和CLI构建时，不会有重复的类。如果使用旧版本（<2016.3），则必须手动启用注释处理。
