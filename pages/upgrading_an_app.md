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

## 摘要

1. [自动升级](#automatic_upgrade)
2. [手动升级](#manual_upgrade)

## <a name="automatic_upgrade"></a> 自动升级

当发布新版本的JHipster时，JHipster的升级子生成器将帮助您将现有应用程序升级到该新版本，并且不会清除您更改的代码。

这有助于：

- 在现有应用程序中更新到最新的JHipster功能
- 获取重要的错误修复或安全更新
- 将已更改部分保留在代码库中，并将其与新生成的代码合并

_升级之前，请仔细阅读此页面，以了解升级过程的工作方式_

### 要求

为了使此子生成器正常工作，您需要从[http://git-scm.com](http://git-scm.com/)安装`git`。

### 运行升级子生成器

进入应用程序的根目录：

`cd myapplication/`

要升级您的应用程序，请输入：

`jhipster upgrade`

您可以通过以下选项：

* `--verbose` - 详细记录升级过程的每个步骤
* `--target-version 6.6.0` - 升级到JHipster目标版本而不是最新版本，如果项目落后多个版本，则很有用
* `--target-blueprint-versions kotlin@1.4.0,vuejs@1.3.0` - 升级到目标方案（Blueprint）版本，而不是每个方案的最新版本。 但是，方案的目标版本应与目标JHipster版本兼容。
* `--force` - 即使没有新的JHipster版本，也要运行升级子生成器
* `--skip-checks` - 在项目重新生成期间禁用检查
*`--skip-install`- 在升级过程中跳过安装依赖项
* `--silent` - 隐藏生成过程的输出

如果您需要多次进行升级，则可以考虑像这样首先升级JHipster：
	
    git checkout jhipster_upgrade
	git checkout --patch master .yo-rc.json
	git checkout --patch master .jhipster
	git commit -a
	git push --set-upstream origin jhipster_upgrade
	git checkout master

通过执行上述操作，您可以在已有最新更改下，来升级jhipster_upgrade分支，以便JHipster可以在升级期间使用它。例如，当您更改模型时。

### 升级过程的图形视图

这是图形化升级过程的方式（请阅读以下各节以进行文字说明）：

![GitGraph]({{ site.url }}/images/upgrade_gitgraph.png)

（此图片来自[JSFiddle](http://jsfiddle.net/lordlothar99/tqp9gyu3/)）

请注意，尽管`jhipster_upgrade`分支在上图中无法正确显示，但将在您的项目中创建为孤立分支。

### 升级过程的分步说明

以下是JHipster的升级子生成器处理步骤：

1. 检查是否有新版本的JHipster（如果使用`--force`，则不适用）。
2. 检查应用程序是否已经初始化为`git`仓库，否则JHipster将为您初始化一个，并将当前代码库提交到master分支。
3. 检查以确保存储库中没有未提交的本地更改。如果发现未提交的更改，则该过程将退出。
4. 检查是否存在`jhipster_upgrade`分支。如果没有，那么将创建一个分支：在“首次升级时指定步骤”部分中提供了有关此步骤的详细信息。
5. 检出`jhipster_upgrade`分支。
6. 将JHipster全局升级到最新的可用版本。
7. 清理当前项目目录。
8. 使用`jhipster --force --with-entities`命令重新生成应用程序。
9. 将生成的代码提交到`jhipster_upgrade`分支。
10. 合并`jhipster_upgrade`分支回到启动`jhipster upgrade`命令的原始分支。
11. 现在，您需要继续解决合并冲突（如果有）。

恭喜，您的应用程序现已升级到最新版本的JHipster！

### 首次升级时指定步骤

在首次运行JHipster的`update`子生成器时，为了避免擦除所有更改，将运行一些附加步骤：

1. `jhipster_upgrade`分支是孤立的（没有父级）。
2. 整个应用程序已生成（使用您当前的JHipster版本）。
3. 在`master`分支上进行块合并提交：在`master`分支上的代码库上不进行任何更改；这只是在Git中记录`master`的HEAD与当前JHipster版本最新的一种实用方法。

#### 建议

- 不要在`jhipster_upgrade`分支上提交任何内容。该分支专用于JHipster升级子生成器：每次运行子生成器时，都会创建一个新的提交。
- 如果您要从非常老的版本（例如，从5.0.0升级到最新版本），建议您在每个次要/补丁版本之间逐步进行更新，并执行测试以确保应用程序能够按预期运行。
- JHipster社区提供了一些有用的方法，以这种方式设计应用程序，使更新过程更容易，并减少合并冲突的数量。 我们建议使用[JHipster Side-by-Side approach](https://www.youtube.com/watch?v=Gg5CYoBdpVo) 。

## <a name="manual_upgrade"></a> 手动升级

要进行手动升级，请首先使用以下方法升级您的JHipster版本：

```
npm install -g generator-jhipster
```

删除项目的`node_modules`文件夹，然后运行：

```
jhipster
```

您还可以通过运行以下命令来更新您的项目及其所有实体

```
jhipster --with-entities
```

您还可以通过再次运行`entity`子生成器来逐一更新实体，例如，如果您的实体名为 _Foo_

```
jhipster entity Foo
```

### 有关重命名文件的提示

有时，文件可能会在生成器中重命名。 如果您想查看Git重命名检测结果，则可以运行`git add`（全部添加用`git add .`），然后使用您最喜欢的Git客户端查看更改。

如果重命名了许多文件，则可能需要在Git配置中增加`diff.renameLimit`，以使Git重命名检测按预期工作。 例如`git config --replace-all diff.renameLimit 10000`。

默认情况下，Git重命名检测使用50％的相似性阈值。 要查看较少的重命名相似文件，可以在Git命令中使用选项`--find-renames = <n>`。 例如`git diff --staged --find-renames = 30`。

### 看到自己的变化

如果您希望查看生成项目后所做的更改，可以按照以下步骤操作。

使用`git clone`将您的项目克隆到新文件夹中。

删除克隆项目中的所有文件和文件夹，`.git`、`.jhipster`和`.yo-rc.json`除外。

找出上一次用于生成项目的JHipster版本：查看项目根文件夹中的`.yo-rc.json`，找出`jhipsterVersion`的值。

安装上次生成项目时使用的JHipster版本：

```
npm install -g generator-jhipster@jhipsterVersionYouUsedLastTime
```

重新生成您的项目：

```
jhipster --force --with-entities --skip-install
```

使用`git diff`，您现在可以看到所有更改已还原。 如果您希望看到所有已添加的更改，则可以将所有更改提交到Git，然后还原上一次提交。

### 参见JHipster的更改

如果您希望查看JHipster所做的更改，可以按照以下描述的步骤进行。

使用您上次用于生成项目的JHipster版本生成项目：
* 新建一个文件夹
* 将您的项目`.yo-rc.json`文件和`.jhipster`文件夹复制到此新文件夹中
* 找出您上次用于生成项目的JHipster版本：查看`.yo-rc.json`，找出`jhipsterVersion`的值
* 安装上次用于生成项目的JHipster版本：`npm install -g generator-jhipster @ jhipsterVersionYouUsedLastTime`
* 在创建的文件夹中运行：`jhipster --with-entities --skip-install`

使用最新的JHipster生成项目：
* 新建一个文件夹
* 将您的项目`.yo-rc.json`文件和`.jhipster`文件夹复制到此新文件夹中
* 安装最新的JHipster版本：`npm install -g generator-jhipster`
* 在创建的文件夹中运行：`jhipster --with-entities --skip-install`

使用您喜欢的文件和文件夹比较工具将这2个文件夹进行比较，以查看JHipster所做的更改。