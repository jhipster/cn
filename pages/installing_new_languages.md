---
layout: default
title: 安装新语言
permalink: /installing-new-languages/
redirect_from:
  - /installing_new_languages.html
sitemap:
    priority: 0.7
    lastmod: 2014-12-10T00:00:00-00:00
---

# <i class="fa fa-flag"></i> 国际化

## 简介

在生成新项目的过程中，将询问您是否希望启用国际化支持。

如果启用它，则需要选择应用程序的本机语言。之后，您可以选择要安装的其他语言。如果您不想从一开始就支持任何其他语言，您可以在以后需要时通过运行语言子生成器来添加语言。

如果您确定永远不会将此应用程序转换为其他语言，则不应启用国际化。

## 支持的语言

这些是当前支持的语言

*   Albanian
*   Arabic (Libya)
*   Armenian
*   Belarusian
*   Bengali
*   Indonesian
*   Catalan
*   Chinese (Simplified)
*   Chinese (Traditional)
*   Czech
*   Danish
*   Dutch
*   English
*   Estonian
*   Farsi
*   French
*   Galician
*   German
*   Greek
*   Hindi
*   Hungarian
*   Italian
*   Japanese
*   Korean
*   Marathi
*   Myanmar
*   Polish
*   Portuguese
*   Portuguese (Brazilian)
*   Romanian
*   Russian
*   Slovak
*   Serbian
*   Spanish
*   Swedish
*   Turkish
*   Tamil
*   Thai
*   Turkish
*   Ukrainian
*   Uzbek (Cyrillic)
*   Uzbek (Latin)
*   Vietnamese

_你的语言不在JHipster吗？帮助我们使用PR改进项目!_

## 如何在项目生成后添加语言？

为此，您可以使用以下命令运行语言子生成器：

`jhipster languages`

![]({{ site.url }}/images/install_new_languages.png)

请注意，如果您希望用刚添加的语言翻译实体，则需要重新生成实体。

## 如何添加不支持的新语言？

所有语言都保存在文件夹'src/main/webapp/i18n`（客户端）和'src/main/resources/i18n`（服务器端）中。

以下是安装名为`new_lang`的新语言的步骤：

1.  将`src/main/webapp/i18/en`文件夹复制到`src/main/webapp/i18/new_lang`（这是存储所有前端翻译的位置）
2.  翻译文件夹下的所有文件`src/main/webapp/i18/new_lang`
3.  对于angularJS 1，将语言代码`new_lang`添加到在`src/main/webapp/app/components/language/language.constants.js`中定义的`languages`常量中`

        .constant('LANGUAGES', [
            'en',
            'fr',
            'new_lang'
            // jhipster-needle-i18n-language-constant - JHipster will add/remove languages in this array
        ]

    对于Angular 2+添加语言编码 `new_lang` 到 `LANGUAGES` 常量定义在`src/main/webapp/app/shared/language/language.constants.ts`

        export const LANGUAGES: string[] = [
            'en',
            'fr',
            'new_lang'
            // jhipster-needle-i18n-language-constant - JHipster will add/remove languages in this array
        ];

4.  在`src/main/resources/i18n`文件夹中，将`messages-en.properties`文件复制到`messages-new-lang.properties`中（这是存储服务器端翻译的位置）。
5.  翻译`messages_new_lang.properties`文件中的所有键
6.  对于angularJS 1，将新语言的名称添加到`src/main/webapp/app/components/language/language.filter.js`文件的`filter（'findlanguagefromkey'）`函数中。对于Angular 2+，在`src/main/webapp/app/shared/language/find language from key pipe`的`language s`变量中添加新语言的名称。`
7.  对于Angular2+将新的语言绑定添加到`webpack.common.js`

        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/new_lang/*.json", fileName: "./i18n/new_lang.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
            }
        })


新语言`new_lang`现在可以在语言菜单中使用，它既可以在前端角度应用程序中使用，也可以在后端弹簧应用程序中使用。

### Contributing the language to generator-jhipster

如果要为生成器贡献一种新语言，请执行上面的步骤1、2、4和5。将新语言的条目添加到`generator/generator constants.js`中的`languages`常量，并将该语言添加到`generator jhipster`项目中的`test/templates/all languages/.yo-rc.json`。提交包含所有这些更改的PR。

## 如何删除现有语言？

以下是删除名为`old_lang`的语言的步骤：:

1.  删除语言目录`src/main/webapp/i18/old_lang`
2.  删除中的常量项 `src/main/webapp/app/components/language/language.constants.js` or `src/main/webapp/app/shared/language/language.constants.ts` and `webpack.common.js`
3.  删除 `src/main/resources/i18n/messages_old_lang.properties` 文件
