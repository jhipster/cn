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

JHipster中缺少您的语言吗？通过提交PR来帮助我们改善项目！

## 项目生成后如何添加语言？

为此，您可以使用以下命令运行语言子生成器：

`jhipster languages`

![]({{ site.url }}/images/install_new_languages.png)

请注意，如果您想以刚添加的语言翻译实体，则需要重新生成实体。

## 如何添加不支持的新语言？

所有语言都保存在文件夹`src/main/webapp/i18n`（客户端）和`src/main/resources/i18n`（服务器端）中

以下是安装一种称为 `new_lang`的新语言的步骤：

1.  将`src/main/webapp/i18/en`文件夹复制到`src/main/webapp/i18/new_lang` （这是所有前端翻译文件的存储位置）
2.  翻译文件夹`src/main/webapp/i18/new_lang`下的所有文件
3.  对于AngularJS 1，将语言代码`new_lang`添加到`src/main/webapp/app/components/language/language.constants.js`中定义的`LANGUAGES`常量中。

        .constant('LANGUAGES', [
            'en',
            'fr',
            'new_lang'
            // jhipster-needle-i18n-language-constant - JHipster will add/remove languages in this array
        ]

    对于Angular 2+，将语言代码 `new_lang`添加到`src/main/webapp/app/shared/language/language.constants.ts`中定义的`LANGUAGES`常量中。


        export const LANGUAGES: string[] = [
            'en',
            'fr',
            'new_lang'
            // jhipster-needle-i18n-language-constant - JHipster will add/remove languages in this array
        ];

4.  在`src/main/resources/i18n`文件夹中，将`messages_en.properties`文件复制到`messages_new_lang.properties`（这是服务器端翻译存储位置）
5.  翻译`messages_new_lang.properties`文件中的所有keys
6.  对于AngularJS 1，在`src/main/webapp/app/components/language/language.filter.js`文件中的`filter('findLanguageFromKey')`函数中添加新语言的名称。对于Angular 2+，在`src/main/webapp/app/shared/language/find-language-from-key.pipe.ts`中的`FindLanguageFromKeyPipe`的`languages`变量中添加新的语言名称。

7.  对于Angular 2+，将新的语言绑定到`webpack.common.js`

        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/new_lang/*.json", fileName: "./i18n/new_lang.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
            }
        })


新的语言`new_lang`现在在语言菜单中可用，并且在前端Angular应用程序和后端Spring应用程序中均可用。

### 提交新语言给generator-jhipster

如果您想为生成器提供一种新的语言，请按照上面的步骤1、2、4和5进行操作。将新语言的条目添加到`generators/generator-constants.js`中的`LANGUAGES`常量中，并将该语言添加到`generator-jhipster`项目中的`test/templates/all-languages/.yo-rc.json`中。提交包括所有这些变更的PR。

## 如何删除现有语言？

以下是删除称为`old_lang`的语言的步骤：

1.  从`src/main/webapp/i18/old_lang`删除语言文件夹
2.  删除 `src/main/webapp/app/components/language/language.constants.js`或`src/main/webapp/app/shared/language/language.constants.ts`中的常量条目
3.  删除`src/main/resources/i18n/messages_old_lang.properties`文件

