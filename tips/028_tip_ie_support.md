---
layout: default
title: 提供Internet Explorer支持
sitemap:
priority: 0.1
lastmod: 2019-03-05T18:20:00-00:00
---

# 提供Internet Explorer支持

**提交者 [@wmarques](https://github.com/wmarques)** 和 [@anthony-o](https://github.com/anthony-o)

JHipster仅支持Evergreen Browser。
但是，您仍然可以轻松地支持某些较旧的浏览器，例如Internet Explorer。

为此，您必须：

1. 在您的`tsconfig`中将目标设置为`es5`。
2. 然后，您有两个选择：
   1. 从'core-js'添加正确的polyfill，如果您不知道应该使用哪个，请检查Angular CLI项目及其polyfill。
   2. 或使用babel+[Babel预设环境](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) 自动基于浏览器列表文件导入正确的core-js polyfill。

## 使用Babel的完整提示

首先，添加以下`package.json`依赖项：`@babel/core`、`@babel/preset-env` 和 `babel-loader`。`yarn`例子:
```bash
yarn add @babel/core @babel/preset-env babel-loader --exact --dev
```
(已针对JHipster v6.3.1生成的应用程序上的可用IE11版本使用以下版本进行了测试：
```json
    "@babel/core": "7.6.4",
    "@babel/preset-env": "7.6.3",
    "babel-loader": "8.0.6",
```
)

现在，在`src/main/webapp/app/polyfills.ts`的顶部添加以下行 :
```ts
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

在 `webpack/webpack.common.js`文件中，
```js
            {
                test: /manifest.webapp$/,
                loader: 'file-loader',
                options: {
                    name: 'manifest.webapp'
                }
            },
```
之后，添加以下行：
```js
            {
                test: /\.js/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    "presets": [
                      [
                        "@babel/preset-env",
                        {
                          "targets": {
                            "firefox": "60",
                            "ie": "11"
                          },
                          "useBuiltIns": "entry",
                          "corejs": 3
                        }
                      ]
                    ]
                  }
                },
                exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
              },
```

最后，在`tsconfig.json`和`tsconfig-aot.json`中将`target`更改为`es5`。

参见 [GitHub issue](https://github.com/jhipster/generator-jhipster/issues/10184#issuecomment-541650501) 和 [this SO answer](https://stackoverflow.com/a/58377002/535203) 了解更多信息。
