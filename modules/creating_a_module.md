---
layout: default
title: 创建模块
permalink: /modules/creating-a-module/
redirect_from:
  - /creating_a_module.html
  - /modules/creating_a_module.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> 创建模块

JHipster模块是一个Yeoman生成器，由特定的JHipster子生成器[组成](http://yeoman.io/authoring/composability.html)，以继承JHipster的某些常用功能。 
JHipster模块还可以注册其自身，以充当JHipster生成器的钩子。

JHipster模块在[JHipster市场]({{site.url}}/modules/marketplace/) 上列出。

这允许创建可以访问JHipster变量和函数并像标准JHipster子生成器一样工作的第三方生成器。
钩子机制在应用程序生成和实体生成之前和之后调用第三方生成器。

## 示例

[JHipster Fortune 模块](https://github.com/jdubois/generator-jhipster-fortune) 在JHipster生成的应用程序中生成“fortune cookie”页面。

这是我们的示例模块，展示了如何使用JHipster的变量和函数来创建自己的生成器。

或者，您可以使用[JHipster模块生成器](https://github.com/jhipster/generator-jhipster-module) 来帮助您初始化模块。

## JHipster模块的基本规则

JHipster模块：

- 是NPM包，并且是Yeoman生成器。
- 遵循[http://yeoman.io/generators/](http://yeoman.io/generators/) 上列出的Yeoman规则的扩展，并且可以使用`yo`命令进行安装，使用和更新。 它不是以`generator-`为前缀，而是以`generator-jhipster-`为前缀，并且不仅仅具有`yeoman-generator`关键字，还必须具有两个关键字：`yeoman-generator`和`jhipster-module`。
- 注册为钩子的JHipster模块不应在被挂钩的生成器中调用`process.exit`。

## 导入generator-jhipster

JHipster模块必须导入generator-jhipster：

```
    const util = require('util');
    const BaseGenerator = require('generator-jhipster/generators/generator-base');
    const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

    const JhipsterGenerator = generator.extend({});
    util.inherits(JhipsterGenerator, BaseGenerator);

    module.exports = JhipsterGenerator.extend({

        // all your yeoman code here

    });
```

然后，您可以直接访问JHipster的变量和函数。

## 钩子

JHipster将在其某些任务之前和之后调用某些挂钩，下面列出了当前可用和计划中的任务。

- 实体创建后钩子
- 实体创建前钩子 [计划中]
- 应用程序创建后钩子 [计划中]
- 应用程序创建前钩子 [计划中]

[JHipster模块生成器](https://github.com/jhipster/generator-jhipster-module)现在可以选择生成它。
JHipster模块的主要生成器由最终用户运行时，可以注册以充当钩子。 您需要从主（应用）生成器中调用`registerModule`方法以注册为钩子，您需要在方法中传递以下参数，如下所示：

```javascript
this.registerModule(npmPackageName, hookFor, hookType[, callbackSubGenerator[, description]])
```

- `npmPackageName` 生成器的npm包名称。如： `jhipster-generator-fortune`
- `hookFor` 上面的哪个Jhipster钩子应该注册到 ( 值必须是`entity`或`app`)
- `hookType` 在生成器阶段将其挂在哪里 ( 值必须是`pre`或`post`)
- `callbackSubGenerator` [可选] 被调用子生成器，如果未指定，则将调用模块的主（应用）生成器，例如：`bar`或`foo`生成器。
- `description` [可选] 生成器的描述，如果未给出，我们将根据给定的npm名称生成默认值

## 可用的变量和功能

### 配置中的变量：

您必须使用此功能：

您可以在`.yo-rc.json`中访问配置：

```
    this.jhipsterAppConfig = this.getAllJhipsterConfig();
    this.baseName = this.jhipsterAppConfig.baseName;
    this.packageName = this.jhipsterAppConfig.packageName;
    this.clientFramework = this.jhipsterAppConfig.clientFramework;
```

### 全局变量：

您可以在[generator-constants](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-constants.js) 中使用常量：

```
    const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
    const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
```

### 功能:

您可以在[generator-base](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-base.js)中使用所有功能。

```
    this.angularAppName = this.getAngularAppName(); // 获取Angular应用程序名称。
    this.printJHipsterLogo(); // 打印JHipster徽标
```

**注意**: `generator-base.js` 中的功能和 `generator-constants.js`  中的变量是公共API的一部分，因此将遵循semver版本控制。但是其他文件如`generator-base-private.js`、`utils.js` 等将不会遵循semver版本控制，并且可能会在次要版本中破坏方法签名。

## 向JHipster市场注册模块

要使您的模块在[JHipster市场]({{site.url}}/modules/marketplace/)中可用，您需要确保在已发布的npm包`package.json`中有2个关键字`yeoman-generator`和`jhipster-module` 。
如果您在市场上找到不是JHipster模块的任何条目，则可以通过将其添加到[modules-config.json文件](https://github.com/jhipster/jhipster.github.io/blob/master/modules/marketplace/data/modules-config.json)的`blacklistedModules`部分中来将其列入黑名单，方法是对 [jhipster/jhipster.github.io项目] (https://github.com/jhipster/jhipster.github.io) 发出拉取请求

如果JHipster团队对其进行验证，则您的模块将变为“已验证”。

将模块发布到NPM后，您的模块将在我们的市场上可用。