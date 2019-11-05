---
layout: default
title: 自定义Bootstrap 4
permalink: /customizing-bootstrap-4/
sitemap:
    priority: 0.7
    lastmod: 2017-12-08T00:00:00-00:00
---

# <i class="fa fa-css3"></i> 自定义Bootstrap 4

## 基本定制

_专家提示：不要忘记运行`npm start`或`yarn start`以获取更改后的即时反馈！_

定制JHipster应用程序外观的最简单方法是，通过覆盖`src/main/webapp/content/css/global.css`中的CSS样式，或者如果您选择了Sass选项，则重写`src/main/webapp/content/scss/global.scss`文件。

由于Bootstrap也是用Sass编写的，因此与普通CSS相比，使用Sass既简单，简洁又功能强大，请参考[Bootstrap的官方主题文档](https://getbootstrap.com/docs/4.0/getting-started/theming/)。

如果要在自己的`scss`文件中使用Bootstrap [partials](http://sass-lang.com/guide)，请按如下所示将其导入`scss`文件的开头。
例如，使用border-radius mixin：
```
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/border-radius";
```

确保仅导入部分文件而不导入主Sass文件，否则最终将生成重复的CSS，这可能会导致问题。

要更改默认的Bootstrap设置（例如颜色，边框半径等），请在局部文件`src/main/webapp/content/scss/_bootstrap-variable.scss`中添加或更改属性的值

Bootstrap  [_variables.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss)中定义的所有值都可以在此处覆盖。