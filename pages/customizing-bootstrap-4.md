---
layout: default
title: 自定义 Bootstrap 4
permalink: /customizing-bootstrap-4/
sitemap:
    priority: 0.7
    lastmod: 2017-12-08T00:00:00-00:00
---

# <i class="fa fa-css3"></i> 自定义 Bootstrap 4

## 基本定制

_Pro tip: 别忘了运行 `npm start` 或 `yarn start` 以立即获得您的变化反馈!_

自定义Jhipster应用程序外观的最简单方法是
覆盖 `src/main/webapp/content/css/global.css`中的CSS式样,或者如果选择了sass选项, 则覆盖 `src/main/webapp/content/scss/global.scss`.

使用sass比简单的css更容易、更简洁、更强大，因为引导程序也是用sass编写的，请参阅引导程序[official documentation about theming](https://getbootstrap.com/docs/4.0/getting-started/theming/) .

如果要在自己的`scss`文件中使用bootstrap [partials](http://sass-lang.com/guide) 请在“scss”文件的开头导入它，如下所示。
例如使用 border-radius 边界混合:

```
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/border-radius";
```

确保只导入部分而不导入主SASS文件，否则将生成可能导致问题的重复CSS。

要更改默认引导设置（如颜色、边框半径等），请添加或更改部分文件中属性的值 `src/main/webapp/content/scss/_bootstrap-variable.scss`

可以在此处覆盖Bootstrap [_variables.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss) 中定义的所有值。
