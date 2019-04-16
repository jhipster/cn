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

# <i class="fa fa-terminal"></i> 使用 Oh-My-Zsh

如果您使用的是Linux或Mac OS X，[Oh-My-Zsh](http://ohmyz.sh/) 是管理zsh配置的好工具。

JHipster开发团队中的大多数人都使用Oh-My-Zsh，如果你看到人们在他们的终端中使用快捷方式，那么魔法就来自这里！

## Oh-My-Zsh JHipster plugin

The JHipster Oh-My-Zsh plugin is available on GitHub at [https://github.com/jhipster/jhipster-oh-my-zsh-plugin](https://github.com/jhipster/jhipster-oh-my-zsh-plugin).

Currently it only adds shortcuts (full list [here](https://github.com/jhipster/jhipster-oh-my-zsh-plugin/blob/master/jhipster.plugin.zsh)), but we welcome contributions to have better auto-completion!

It is not part (yet) of the official plugin list, so you need to install it manually:

1. Edit your `~/.zshrc` and add `jhipster` to the list of plugins to enable:

    `plugins=( ... jhipster )`

2. In the command line, change to _oh-my-zsh_'s custom plugin directory and clone the repository:

    `cd ~/.oh-my-zsh/custom/plugins && git clone https://github.com/jhipster/jhipster-oh-my-zsh-plugin.git jhipster && cd && . ~/.zshrc`

## Recommended plugins

The `git`, `docker` and `docker-compose` plugins are usually useful with JHipster.

So your plugins section in your `.zshrc` file would be:

    plugins=(git docker docker-compose jhipster)

## Other installation methods

### Antigen

If you're using [Antigen](https://github.com/zsh-users/antigen):

1. Add `antigen bundle jhipster/jhipster-oh-my-zsh-plugin` to your `.zshrc` where you've listed your other plugins.
2. Close and reopen your Terminal/iTerm window to **refresh context** and use the plugin. Alternatively, you can run `antigen bundle jhipster/jhipster-oh-my-zsh-plugin` in a running shell to have antigen clone and load *jhipster*.

### zgen

If you're using [zgen](https://github.com/tarjoilija/zgen):

1. Add `zgen load jhipster/jhipster-oh-my-zsh-plugin` to your `.zshrc` along with your other `zgen load` commands.
2. `rm ${ZGEN_INIT}/init.zsh && zgen save`
