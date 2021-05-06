---
layout: default
title: 给generator-jhipster提速
sitemap:
priority: 0.5
lastmod: 2016-05-15T22:22:00-00:00
---

# 给generator-jhipster提速

__提交者 [@pascalgrimaud](https://github.com/pascalgrimaud)__

**警告！** 这些提示不适用于npm 3+，因为它使用了symlink。

当使用generator-jhipster时，根据您的连接速度，命令`npm install`可能要花费几分钟。

这个技巧可以在许多情况下使用：

- JHipster的演示，以改善您的体验
- 对于开发团队，可以使用`.yo-rc.json`更快地重新生成项目
- 持续集成

## 为node_modules创建一个新项目

创建一个目录，其中将包含所有`node_modules`库，然后进入该目录：

```
mkdir jhipster-speedup
cd jhipster-speedup
```

创建目录`node_modules`：

```
mkdir -p node_modules
```

项目结构为：

    jhipster-speedup
    ├── node_modules


**警告！** 仅当您是JHipster的开发人员时，才使用此下一个命令。 它将链接到generator-jhipster的fork项目：

```
npm link generator-jhipster
```

## 生成项目

创建一个目录，其中将包含您的新JHipster项目，然后进入该目录：

```
mkdir jhipster
cd jhipster
```

创建指向目录`node_modules`的链接：

```
ln -s <your path>/jhipster-speedup/node_modules
```

生成一个新项目，并回答所有问题：

```
jhipster
```

第一次需要几分钟。

下次，它将使用现有的`node_modules`目录，因此npm不会下载所有库。

**警告！** 如果您使用特定的库并修改package.json，则应将jnodester-speedup中的node_modules复制到文件夹项目中，而不要使用链接。
