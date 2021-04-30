---
layout: default
title: 配置新语言
permalink: /installing-new-languages/
redirect_from:
  - /installing_new_languages.html
sitemap:
    priority: 0.7
    lastmod: 2014-12-10T00:00:00-00:00
---

# <i class="fa fa-flag"></i> 国际化

## 介绍

在生成新项目的过程中，系统将询问您是否要启用国际化支持。

如果启用它，则需要选择应用程序的默认语言。之后，您可以选择要安装的其他语言。如果您不想从一开始就支持任何其他语言，也可以随时在以后需要时通过运行语言子生成器来添加新的语言。

如果您确定永远不会将此应用程序翻译成另一种语言，则不应启用国际化。

## 支持的语言

这些是当前支持的语言

*   Albanian
*   Arabic (Libya)
*   Armenian
*   Belarusian
*   Bengali
*   Bulgarian
*   Catalan
*   Chinese (Simplified)
*   Chinese (Traditional)
*   Czech
*   Danish
*   Dutch
*   English
*   Estonian
*   Farsi
*   Finnish
*   French
*   Galician
*   German
*   Greek
*   Hindi
*   Hungarian
*   Indonesian
*   Italian
*   Japanese
*   Korean
*   Marathi
*   Myanmar
*   Polish
*   Portuguese (Brazilian)
*   Portuguese
*   Romanian
*   Russian
*   Slovak
*   Serbian
*   Sinhala
*   Spanish
*   Swedish
*   Turkish
*   Tamil
*   Telugu
*   Thai
*   Turkish
*   Ukrainian
*   Uzbek (Cyrillic)
*   Uzbek (Latin)
*   Vietnamese

JHipster中缺少您的语言吗？通过提交PR来帮助我们改善项目！

## 项目生成后如何添加语言？

为此，您可以使用以下命令运行语言子生成器：

`jhipster languages`

![]({{ site.url }}/images/install_new_languages.png)

请注意，如果您想以现在添加的语言翻译实体，则需要重新生成实体。

## 如何添加不支持的新语言？

所有语言都保存在文件夹`src/main/webapp/i18n`（客户端）和`src/main/resources/i18n`（服务器端）中

以下是安装一种称为 `new_lang`的新语言的步骤：

1.  将`src/main/webapp/i18/en`文件夹复制到`src/main/webapp/i18/new_lang` （这是所有前端翻译文件的存储位置）
2.  翻译文件夹`src/main/webapp/i18/new_lang`下的所有文件
3.  将语言代码`new_lang`添加到`src/main/webapp/app/shared/language/find-language-from-key-pipe.ts`中定义的`languages`变量中。
```js
        private languages: { [key: string]: { name: string; rtl?: boolean } } = {
            en: { name: 'English' },
            new_lang: { name: 'New Language' }
            // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
        };
```
4.  在`src/main/resources/i18n`文件夹中，将`messages_en.properties`文件复制到`messages_new_lang.properties`（这是服务器端翻译存储位置）
5.  翻译`messages_new_lang.properties`文件中的所有keys
6.  将新的语言捆绑添加到`webpack/webpack.common.js`中
```js
        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/new_lang/*.json", fileName: "./i18n/new_lang.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
            }
        })
```

新的语言`new_lang`现在在语言菜单中可用，并且在前端Angular应用程序和后端Spring应用程序中均可用。

### 提交新语言给generator-jhipster

如果您想为生成器提供一种新的语言，请按照上面的步骤1、2、4和5进行操作。将新语言的条目添加到`generators/generator-constants.js`中的`LANGUAGES`常量中，并将该语言添加到`generator-jhipster`项目中的`test/templates/all-languages/.yo-rc.json`中。提交包括所有这些变更的PR。
如果您想为生成器提供一种新的语言，请执行以下步骤。

- 在将语言添加到`LANGUAGES`常量中 [`generators/gnerator-constants.js`](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-constants.js)
```js
        { name: 'New Language', dispName: 'New Language', value: 'nl' }
```

- 复制文件[`generators/languages/templates/src/main/resources/i18n/messages_en.properties.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/languages/templates/src/main/resources/i18n/messages_en.properties.ejs) 到`generators/languages/templates/src/main/resources/i18n/messages_nl.properties.ejs`并将所有值转换为新语言。

- 复制文件夹[`generators/languages/templates/src/main/webapp/i18n/en`](https://github.com/jhipster/generator-jhipster/tree/main/generators/languages/templates/src/main/webapp/i18n/en) 到 `generators/languages/templates/src/main/webapp/i18n/nl`并翻译其中的所有文件。

- 复制文件[`generators/entity-i18n/templates/i18n/entity_en.json.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/entity-i18n/templates/i18n/entity_en.json.ejs) 到 `generators/entity-i18n/templates/i18n/entity_nl.json.ejs` 并翻译其中的所有值。

- 复制文件[`generators/languages/templates/src/test/resources/i18n/messages_en.properties.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/server/templates/src/test/resources/i18n/messages_en.properties.ejs) 到 `generators/languages/templates/src/test/resources/i18n/messages_nl.properties.ejs`并翻译其中的所有值。

- 将语言值`nl`添加到[`test/templates/all-languages/.yo-rc.json`](https://github.com/jhipster/generator-jhipster/blob/main/test/templates/all-languages/.yo-rc.json) 中的`language`数组中。

提交所有这些更改的PR。

## 如何删除现有语言？

以下是删除称为`old_lang`的语言的步骤：

1.  从`src/main/webapp/i18/old_lang`删除整个语言文件夹
2.  删除 `src/main/webapp/app/core/language/language.constants.ts`中的LANGUAGES常量条目。
3.  删除`src/main/webapp/app/shared/language/find-language-from-key.pipe.ts`中的`languages`常量条目。
4.  删除`webpack/webpack.prod.js`删除中的localesToKeep常量条目
5.  删除`webpack/webpack.common.js`中`MergeJsonWebpackPlugin`的模式。
6.  删除`src/main/resources/i18n/messages_old_lang.properties`文件
7.  删除`src/test/resources/i18n/messages_old_lang.properties`文件

