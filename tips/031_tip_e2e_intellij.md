---
layout: default
title: 在IntelliJ IDEA中运行Protractor e2e测试
sitemap:
priority: 0.1
lastmod: 2018-04-14T03:57:00-00:00
---

# 在IntelliJ IDEA中运行Protractor e2e测试

**提交者 [@SudharakaP](https://github.com/SudharakaP) 和 [@yelhouti](https://github.com/yelhouti)**

本技巧适用于JHipster v6.8.0或更高版本。 默认情况下，JHipster项目在Protractor配置文件（`src/test/javascript/protractor.conf.js`）中将具有以下`beforeLanuch`函数。

```js
beforeLaunch: function() {
    require('ts-node').register({
        project: 'tsconfig.e2e.json'
    });
}
``` 

如果通过在项目的根文件夹中运行`npm run e2e`来执行Protractor测试，这非常方便。

但是，IntelliJ Ultimate也支持[在IDE中运行Protractor测试](https://www.jetbrains.com/help/idea/protractor.html#ws_protractor_running) 。
如果要使用此方法，则必须更改`beforeLanuch`函数，如下所示；

```js
beforeLaunch: function() {
    require('ts-node').register({
        project: '../../../tsconfig.e2e.json'
    });
}
``` 
这样IntelliJ就会知道在哪里可以找到`tsconfig.e2e.json`文件。

请注意，按上述方式更改`protractor.conf.js`文件后，`npm run e2e`将不再起作用，因此，如果您打算再次使用npm进行e2e测试，则必须回滚。