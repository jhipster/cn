---
layout: default
title: 提高开发人员的体验，如果在IDE中只打开前端
sitemap:
priority: 0.1
lastmod: 2019-10-14T12:35:00-00:00
---

# 提高开发人员的体验，如果在IDE中只打开前端

**提交者 [@kaidohallik](https://github.com/kaidohallik)**

至少在Visual Studio代码中，将发生以下行为。

如果生成完整技术栈的应用程序（不跳过服务器或前端），并且前端开发人员希望看到的文件越少越好，并且仅在IDE中打开文件夹`src/main/webapp/app`，则IDE无法识别以`app`开头的导入。 这些导入是红色的，开发人员无法看到这些导入的类的内容，也无法一键跳转到这些导入的类。 路径`app`是在位于生成的应用程序的根文件夹中的`tsconfig.json`文件中定义的，因此，如果打开某些子文件夹，则会丢失此信息。

## 可能的解决方案1

向文件 `src/main/webapp/app/tsconfig.json` 中添加以下内容：
```
{
    "extends": "../../../../tsconfig.json"
}
```
并为测试文件 `src/test/javascript/spec/tsconfig.json` 添加同样的内容：
```
{
    "extends": "../../../../tsconfig.json"
}
```
之后，如果仅打开文件夹`src/main/webapp/app`或`src/test/javascript/spec`，Visual Studio Code会正确解析路径app。

## 可能的解决方案2

* 将node脚本`remove-import-alias.js`添加到应用程序根文件夹，该文件夹将导入别名替换为相对路径：

```
const fs = require('fs');

removeImportAlias = function(dir, level, additionalPath) {
  fs.readdirSync(dir).forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      removeImportAlias(dir + file + '/', level + 1, additionalPath);
    } else if (file.endsWith('.ts')) {
      fs.readFile(dir + file, 'utf8', function (err, content) {
        if (err) {
          console.log(err);
        } else {
          let path = '../'.repeat(level);
          if (additionalPath) {
            path += additionalPath;
          }
          if (!path) {
            path = './';
          }
          const newContent = content.replace(/import \{ (.*) \} from 'app\/(.*)';/g, `import { $1 } from '${path}$2';`);
          fs.writeFile(dir + file, newContent, 'utf8', function (err) {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    }
  });
};

removeImportAlias(`./src/main/webapp/app/`, 0);
removeImportAlias(`./src/test/javascript/spec/`, 0, '../../../main/webapp/app/');
```

* 在 `.eslintignore`中添加`remove-import-alias.js`

* 运行添加的脚本：`node remove-import-alias.js`

* 从`tsconfig.json`文件的`compilerOptions.paths`部分中删除`app/*`
