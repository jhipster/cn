---
layout: default
title: 前端的动态环境变量
sitemap:
priority: 0.1
lastmod: 2020-07-01T10:50:00-00:00
---
# 前端的动态环境变量

__提示提交者 [@yelhouti](https://github.com/yelhouti)__

假设您需要在编译代码后更新前端变量的值。 （例如：您的IP、网址，用于联系人的电子邮件等等）

一种方法是将其作为application.yml的一部分，并使后端使用新的自定义端点将其返回到前端，与我们在使用OAuth2时在`AuthInfoResource.java`中所做的相同。

另一种方法是创建一个名为`env.js`的新文件，能够消除对该端点的需要并提供更好的灵活性和更少的代码，如下所示：

```javascript
window.__env = window.__env || {};
window.__env.myDynamicVariable = 'http://127.0.0.1:8090';
```

如果尚未声明，下面的代码将创建一个全局的`__env`变量。

可以在您的Angular文件中访问它，但是我们建议通过constants.ts公开它，如下所示：
```typescript
@ts-ignore
export const MY_DYNAMIC_VARIABLE = window.__env.myDynamicVariable;
```
当使用kubernetes时，可以将这种格式的文件作为configMap挂载，这就是为什么我们保留了这种简单的键值语法的原因。

现在，我们需要通过像这样在`<head>`中添加脚本标签来确保`index.html`加载它：
```html
    ...
    <!-- jhipster-needle-add-resources-to-root - JHipster will add new resources here -->
    <script src="env.js"></script>
```
然后我们告诉webpack使用打包的代码按原样复制它：
```javascript
// jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
{ from: './<%= MAIN_SRC_DIR %>env.js', to: 'env.js' },
```

我们建议将文件添加到`.eslintignore.ejs`中以使用简洁的语法：
```
src/main/webapp/env.js
```

下一步是研究完成所有这些工作的蓝图。
