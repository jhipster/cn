---
layout: default
title: 使用Oh-My-Zsh
permalink: /oh-my-zsh/
redirect_from:
  - /oh-my-zsh.html
sitemap:
    priority: 0.7
    lastmod: 2016-07-25T18:40:00-00:00
---

# <i class="fa fa-terminal"></i> 使用Oh-My-Zsh

如果您使用的是Linux或Mac OS X，[Oh-My-Zsh](http://ohmyz.sh/)是管理ZSH配置的好工具。

JHipster开发团队中的大多数人都使用Oh-My-Zsh，如果您看到人们在其终端中使用快捷方式，那么神奇魔术就来自这里！

## Oh-My-Zsh JHipster插件

JHipster Oh-My-Zsh插件可从GitHub上的[https://github.com/jhipster/jhipster-oh-my-zsh-plugin](https://github.com/jhipster/jhipster-oh-my-zsh-plugin)获得。

目前，它仅添加快捷方式（此处为[完整](https://github.com/jhipster/jhipster-oh-my-zsh-plugin/blob/master/jhipster.plugin.zsh)列表），但我们欢迎您提供更好的自动完成功能！

它还不是官方插件列表的一部分，因此您需要手动安装它：

1. 编辑`~/.zshrc`并将`jhipster`添加到插件列表以启用：

    `plugins=( ... jhipster )`

2. 在命令行中，转到_oh-my-zsh_自定义插件目录，然后克隆仓库：

    `cd ~/.oh-my-zsh/custom/plugins && git clone https://github.com/jhipster/jhipster-oh-my-zsh-plugin.git jhipster && cd && . ~/.zshrc`

## 推荐插件

`git`, `docker`和`docker-compose`插件通常对JHipster有用。

因此，您的`.zshrc`文件中的插件部分将是：

    plugins=(git docker docker-compose jhipster)

## 其他安装方式

### Antigen

如果您使用的是[Antigen](https://github.com/zsh-users/antigen):

1. 将`antigen bundle jhipster/jhipster-oh-my-zsh-plugin`添加到列出其他插件的`.zshrc`中。
2. 关闭并重新打开您的Terminal/iTerm窗口以**刷新上下文**并使用插件。另外，您可以在shell中运行`antigen bundle jhipster/jhipster-oh-my-zsh-plugin`克隆antigen并加载*jhipster*。

### zgen

如果您使用的是[zgen](https://github.com/tarjoilija/zgen):

1. 将`zgen load jhipster/jhipster-oh-my-zsh-plugin`以及其他`zgen load`命令添加到您的`.zshrc`中。
2. `rm ${ZGEN_INIT}/init.zsh && zgen save`
