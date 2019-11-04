---
layout: default
title: 升级应用程序
permalink: /upgrading-an-application/
sitemap:
    priority: 0.7
    lastmod: 2014-06-02T00:00:00-00:00
gitgraph: http://jsfiddle.net/lordlothar99/tqp9gyu3
---

# <i class="fa fa-refresh"></i> 升级应用程序

当发布新版本的JHipster时，JHipster的升级子生成器将帮助您将现有应用程序升级到该新版本，并且不会清除您更改的代码。

这有助于：

- 在现有应用程序中更新到最新的JHipster功能
- 获取重要的错误修复或安全更新
- 将已更改部分保留在代码库中，并轻松将其与新生成的代码合并

_升级之前，请仔细阅读此页面，以了解升级过程的工作方式_

## 要求

为了使此子生成器正常工作，您需要从[http://git-scm.com](http://git-scm.com/)安装`git`。

## 运行升级子生成器

进入应用程序的根目录：

`cd myapplication/`

要升级您的应用程序，请输入：

`jhipster upgrade`

您可以通过以下选项：

* `--verbose` - 详细记录升级过程的每个步骤
* `--target-version=4.2.0` -升级到目标版本而不是最新版本，如果项目落后多个版本，则很有用
* `--force` - 即使没有新的JHipster版本，也要运行升级子生成器

如果您需要多次进行升级，则可以考虑像这样首先升级JHipster：
	
    git checkout jhipster_upgrade
	git checkout --patch master .yo-rc.json
	git checkout --patch master .jhipster
	git commit -a
	git push --set-upstream origin jhipster_upgrade
	git checkout master

通过执行上述操作，您可以在已有最新更改下，来升级jhipster_upgrade分支，以便JHipster可以在升级期间使用它。例如，当您更改模型时。

## 升级过程的图形视图

这是图形化升级过程的方式（请阅读以下各节以进行文字说明）：

![GitGraph]({{ site.url }}/images/upgrade_gitgraph.png)

（此图片来自[JSFiddle](http://jsfiddle.net/lordlothar99/tqp9gyu3/)）

请注意，尽管`jhipster_upgrade`分支在上图中无法正确显示，但将在您的项目中创建为孤立分支。

## 升级过程的分步说明

以下是JHipster的升级子生成器处理步骤：

1. 检查是否有新版本的JHipster（如果使用`--force`，则不适用）。
2. 检查应用程序是否已经初始化为`git`仓库，否则JHipster将为您初始化一个，并将当前代码库提交到master分支。
3. 检查以确保存储库中没有未提交的本地更改。如果发现未提交的更改，则该过程将退出。
4. 检查是否存在`jhipster_upgrade`分支。如果没有，那么将创建一个分支：在“首次升级时需要执行的特殊步骤”部分中提供了有关此步骤的详细信息。
5. 检出`jhipster_upgrade`分支。
6. 将JHipster全局升级到最新的可用版本。
7. 清理当前项目目录。
8. 使用`jhipster --force --with-entities`命令重新生成应用程序。
9. 将生成的代码提交到`jhipster_upgrade`分支。
10. 合并`jhipster_upgrade`分支回到启动`jhipster upgrade`命令的原始分支。
11. 现在，您只需要继续解决合并冲突（如果有）。

恭喜，您的应用程序现已升级到最新版本的JHipster！

## 首次升级时需要执行的特殊步骤

在首次执行JHipster升级子生成器时，为了避免清楚所有更改，将运行一些附加步骤：

1. `jhipster_upgrade`分支是孤立的（没有父级）。
2. 整个应用程序已生成（使用您当前的JHipster版本）。
3. 在`master`分支上进行块合并提交：在`master`分支上的代码库上不进行任何更改；这只是在Git中记录`master`的HEAD与当前JHipster版本最新的一种实用方法。

### 建议

不要在`jhipster_upgrade`分支上提交任何内容。该分支专用于JHipster升级子生成器：每次运行子生成器时，都会创建一个新的提交。本教程不解释上述多次升级的技巧。