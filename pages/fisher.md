---
layout: default
title: 使用 Fisher
permalink: /fisher/
redirect_from:
  - /fisher.html
sitemap:
    priority: 0.7
    lastmod: 2018-10-20T18:40:00-00:00
---

# <i class="fa fa-terminal"></i> 使用 Fisher

如果您使用的是Linux或Mac OS X，[fisher](https://github.com/jorgebucaran/fisher) 是一个不错的工具用来管理您的[fish shell](http://fishshell.com/) 配置.

一些JHipster开发团队使用fish shell with Fisherman, 如果你看到人们在他们的终端上使用快捷方式，魔法就来自这里！

## Fisherman JHipster 插件

JHipster Fisherman 插件在 [https://github.com/jhipster/jhipster-fisher-plugin](https://github.com/jhipster/jhipster-fisher-plugin).

当前只添加快捷方式 (完整列表 [here](https://github.com/jhipster/jhipster-fisher-plugin/blob/master/conf.d/jhipster.aliases.fish)), 但我们欢迎贡献有更好的自动完成！

它还不是官方插件列表的一部分，因此您需要手动安装它：

1. Clone the plugin repository:

    `git clone git@github.com:jhipster/jhipster-fisher-plugin.git`

2. Install it via ``fisher`` command from local directory:

    `fisher add ~/path/to/cloned/repository`

For more details about [Fisher](https://github.com/jorgebucaran/fisher) have a look at their [usage](https://github.com/jorgebucaran/fisher#usage) section.
