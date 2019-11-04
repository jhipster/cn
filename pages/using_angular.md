---
layout: default
title: 使用Angular
permalink: /using-angular/
sitemap:
    priority: 0.7
    lastmod: 2015-01-29T23:41:00-00:00
---

# <i class="fa fa-html5"></i> 使用Angular

## 工具

Angular使用TypeScript而不是JavaScript，因此需要一些特定的工具来有效地使用它。我们针对Angular 2+应用程序的[开发]({{ site.url }}/development/)工作流程如下所示，如果您愿意，可以使用`npm`代替`yarn`。

1. 生成应用程序时，将创建新的文件，并在生成结束时触发`npm install`任务。
2. 一旦`npm install`完成，它将在`package.json`中调用`postInstall`脚本，此步骤将触发`webpack:build`任务。
3. 现在，基于您选择的生成工具（Maven或Gradle），所有的文件应该被生成并编译到`target`或`build`文件夹内的`www`文件夹中。
4. 现在运行`./mvnw`或`./gradlew`来启动应用程序服务器，它应该在[localhost:8080](localhost:8080)上可用，这也可以提供根据上述步骤编译的前端代码。
5. 现在，在新终端中运行`npm start`或`yarn start`，以使用BrowserSync启动Webpack开发服务器。这将负责编译您的TypeScript代码，并自动重新加载浏览器。

如果您在没有运行`npm start`或`yarn start`的情况下开始对前端代码进行更改，则不会反映任何内容，因为更改未被编译，因此您需要在更改后手动运行`npm run webpack:build`或运行`npm start`或`yarn start`运行。

您还可以在传递诸如`./mvnw -Pdev,webpack`或`./gradlew -Pdev -Pwebpack`之类的`webpack`配置文件开始时，强制maven/gradle运行`webpack:dev`任务。这在运行`clean`任务之后特别有用。

其他可用的yarn/npm命令可以在您项目的`package.json`文件的`scripts`部分中找到。

- 要在浏览器中处理代码，我们建议使用[Angular Augury](https://augury.angular.io/)，以便您可以直观地查看路由并调试代码

## 项目结构

可以在`src/main/webapp`下找到JHipster前端代码，该代码与[John Papa Angular 2样式指南](https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md)密切相关。如果您对我们的应用程序结构，文件名，TypeScript约定有任何疑问，请先阅读本指南。

该样式指南已被Angular团队认可，并提供了每个Angular项目都应遵循的最佳实践。

对于Angular路由，我们遵循双引号命名约定，以使URL干净且一致。
当您生成实体时，将根据此约定生成路由名称，路由URL和REST API端点URL，并且实体名称也会在需要时自动复数。

这是主要的项目结构：

    webapp
    ├── app                               - Your application
    │   ├── account                       - User account management UI
    │   ├── admin                         - Administration UI
    │   ├── blocks                        - Common building blocks like configuration and interceptors
    │   ├── entities                      - Generated entities (more information below)
    │   ├── home                          - Home page
    │   ├── layouts                       - Common page layouts like navigation bar and error pages
    │   ├── shared                        - Common services like authentication and internationalization
    │   ├── app.main.ts                   - Main application class
    │   ├── app.module.ts                 - Application modules configuration
    │   ├── app.route.ts                  - Main application router
    ├── content                           - Static content
    │   ├── css                           - CSS stylesheets
    │   ├── images                        - Images
    ├── i18n                              - Translation files
    ├── scss                              - Sass style sheet files will be here if you choose the option
    ├── swagger-ui                        - Swagger UI front-end
    ├── 404.html                          - 404 page
    ├── favicon.ico                       - Fav icon
    ├── index.html                        - Index page
    ├── robots.txt                        - Configuration for bots and Web crawlers

使用[实体子生成器]({{ site.url }}/creating-an-entity/)创建名为`Foo`的新实体会在`src/main/webapp`下生成以下前端文件：

    webapp
    ├── app
    │   ├── entities
    │       ├── foo                                    - CRUD front-end for the Foo entity
    │           ├── foo.component.html                 - HTML view for the list page
    │           ├── foo.component.ts                   - Controller for the list page
    │           ├── foo.model.ts                       - Model representing the Foo entity
    │           ├── foo.module.ts                      - Angular module for the Foo entity
    │           ├── foo.route.ts                       - Angular Router configuration
    │           ├── foo.service.ts                     - Service which access the Foo REST resource
    │           ├── foo-delete-dialog.component.html   - HTML view for deleting a Foo
    │           ├── foo-delete-dialog.component.ts     - Controller for deleting a Foo
    │           ├── foo-detail.component.html          - HTML view for displaying a Foo
    │           ├── foo-detail.component.ts            - Controller or displaying a Foo
    │           ├── foo-dialog.component.html          - HTML view for editing a Foo
    │           ├── foo-dialog.component.ts            - Controller for editing a Foo
    │           ├── foo-popup.service.ts               - Service for handling the create/update dialog pop-up
    │           ├── index.ts                           - Barrel for exporting everything
    ├── i18n                                           - Translation files
    │   ├── en                                         - English translations
    │   │   ├── foo.json                               - English translation of Foo name, fields, ...
    │   ├── fr                                         - French translations
    │   │   ├── foo.json                               - French translation of Foo name, fields, ...

请注意，默认语言翻译将基于您在应用生成过程中选择的语言。在此处仅显示'en'和'fr'以进行演示。

## 鉴权

JHipster使用[Angular路由器](https://angular.io/docs/ts/latest/guide/router.html) 来组织前端应用程序的不同部分。

对于每个路径，所需的权限都列在该路径的数据中，并且当权限列表为空时，表示可以匿名访问该路径。

权限也在服务器端`AuthoritiesConstants.java`类中定义，并且从逻辑上讲，前端和服务器端权限应相同。

在下面的示例中，'sessions'路径设计为仅由具有`ROLE_USER`权限的经过身份验证的用户访问：

    export const sessionsRoute: Route = {
        path: 'sessions',
        component: SessionsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.sessions'
        },
        canActivate: [UserRouteAccessService]
    };

一旦在路由器中定义了这些权限，就可以根据参数类型通过`jhiHasAnyAuthority`指令在其2个变量中使用它们：

- 对于单个字符串，该指令仅在用户具有所需权限时才显示HTML组件
- 对于字符串数组，如果用户具有列出的权限之一，则伪指令将显示HTML组件

例如，以下文本仅显示给具有`ROLE_ADMIN`权限的用户：

    <h1 *jhiHasAnyAuthority="'ROLE_ADMIN'">Hello, admin user</h1>

例如，以下文本仅显示给具有`ROLE_ADMIN`或`ROLE_USER`权限之一的用户：

    <h1 *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">Hello, dear user</h1>

*请注意* 这些指令仅在前端显示或隐藏HTML组件，并且您还需要在服务器端保护代码！

## ng-jhipster库

ng-jhipster库是免费和OSS的，可在[https://github.com/jhipster/ng-jhipster](https://github.com/jhipster/ng-jhipster)上获得。

ng-jhipster库包含Angular 2+应用程序使用的实用程序功能和通用组件。他们包括：

- 校验指令
- 国际化组件
- 常用管道，例如大写，排序和单词截断
- Base64，日期和分页处理服务
- 通知系统（见下文）

### 通知系统

JHipster使用自定义通知系统将事件从服务器端发送到前端，并具有支持i18n的`JhiAlertComponent`和`JhiAlertErrorComponent`组件，这些组件可在整个生成的应用程序中使用。

默认情况下，当HTTP响应捕获到错误时，JHipster将显示错误通知。

要显示自定义通知或警报，请在将`AlertService`注入控制器，指令或服务后使用以下方法。

简化方法`success`、`info`、`warning`和`error`的默认超时为5秒，可以被配置：

    this.alerts.push(
        this.alertService.addAlert(
            {
                type: 'danger',
                msg: 'you should not have pressed this button!',
                timeout: 5000,
                toast: false,
                scoped: true
            },
            this.alerts
        )
    );

## 使用Angular CLI

<div class="alert alert-info"><i>信息：</i>

Angular CLI和JHipster可以并行用于开发，并且都有自己独立的配置文件。默认情况下，JHipster在部署应用程序或使用CI-CD子生成器时使用其自己的配置。

</div>

### 总览

[Angular CLI](https://cli.angular.io/)是用于开发，构建和维护Angular应用程序的工具。JHipster生成Angular CLI配置文件，因此Angular CLI工作流程可与JHipster一起使用。

通过在应用程序根文件夹中生成`angular.json`文件，并将其依赖项添加到`package.json`文件中来完成此集成。

### 用法

```bash
ng help
```

### 构建

您不应该使用`ng build`来构建前端，因为JHipster具有自己的脚本。查看我们的[开发使用文档]({{ site.url }}/development/)和[生产使用文档]({{ site.url }}/production/)。

### 生成组件，指令，管道和服务

您可以使用`ng generate`（或仅`ng g`）命令生成Angular组件：

```bash
ng generate component my-new-component
ng g component my-new-component # using the alias

# 组件支持相对路径生成
# 转到src/app/feature/并运行
ng g component new-cmp
# 您的组件将在src/app/feature/new-cmp中生成
# 但是如果你运行了
ng g component ../newer-cmp
# 您的组件将在src/app/newer-cmp中生成
```
您可以在下表中找到所有可能的蓝图：

脚手架  | 用法
---       | ---
[Component](https://github.com/angular/angular-cli/wiki/generate-component) | `ng g component my-new-component`
[Directive](https://github.com/angular/angular-cli/wiki/generate-directive) | `ng g directive my-new-directive`
[Pipe](https://github.com/angular/angular-cli/wiki/generate-pipe)           | `ng g pipe my-new-pipe`
[Service](https://github.com/angular/angular-cli/wiki/generate-service)     | `ng g service my-new-service`
[Class](https://github.com/angular/angular-cli/wiki/generate-class)         | `ng g class my-new-class`
[Guard](https://github.com/angular/angular-cli/wiki/generate-guard)         | `ng g guard my-new-guard`
[Interface](https://github.com/angular/angular-cli/wiki/generate-interface) | `ng g interface my-new-interface`
[Enum](https://github.com/angular/angular-cli/wiki/generate-enum)           | `ng g enum my-new-enum`
[Module](https://github.com/angular/angular-cli/wiki/generate-module)       | `ng g module my-module`


### 测试

为了考虑JHipster应用程序上的一致性，只通过`npm`命令执行测试执行：

```bash
npm test
```

### i18n

JHipster使用`ng2-translate`依赖项进行翻译。Angular CLI i18n基于默认的Angular i18n支持，该支持与JHipster不兼容。

### 运行服务

如果您更喜欢使用Angular CLI开发应用程序，则可以使用其专用命令直接运行服务器。

```bash
ng serve
```

通过使用它，它将编译您的Angular应用程序，并允许您在`http://localhost:4200`上对其进行访问。但是，默认情况下您的后端不可用。

要使用本地后端服务器，请使用：

```bash
ng serve --proxy-conf proxy.conf.json
```

然后，您将可以访问您的API。

### 结论

有关Angular CLI的更多信息，请访问官方网站[https://cli.angular.io/](https://cli.angular.io/)
