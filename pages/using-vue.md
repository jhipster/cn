---
layout: default
title: 使用Vue
permalink: /using-vue/
sitemap:
    priority: 0.7
    lastmod: 2019-03-27T23:41:00-00:00
---

# <i class="fa fa-html5"></i> 使用Vue
本节引用JavaScript库**Vue.js**。

## 项目结构

可以在`src/main/webapp`下找到JHipster前端代码。

如果您对我们的应用程序结构，文件名，TypeScript约定有任何疑问，请先阅读本指南。

请注意，在生成的Vue应用程序中使用TypeScript，我们遵循[vue-class-component](https://github.com/vuejs/vue-class-component)样式和准则。

对于Vue路由，我们遵循双引号命名约定，以便URL干净且一致。
当您生成实体时，将根据此约定生成路由名称，路由URL和REST API端点URL，并且实体名称也会在需要时自动复数。

这是主要的项目结构：

```
webapp
├── app                             - Your application
│   ├── account                     - Account related components
│   ├── admin                       - Administration related components
│   ├── core                        - Main components such as Home, navbar, ...
│   ├── entities                    - Generated entities
│   ├── locale                      - I18n / translation related components
│   ├── router                      - Routing configuration
│   ├── shared                      - Shared elements such as your config, models and util classes
│   ├── app.component.ts            - The application main class
│   ├── app.vue                     - The application main SFC component
│   ├── constants.ts                - Global application constants
│   ├── main.ts                     - Index script, application entrypoint
│   └── shims-vue.d.ts
├── content                         - Contains your static files such as images and fonts
├── i18n                            - Translation files
├── swagger-ui                      - Swagger UI front-end
├── 404.html                        - 404 page
├── favicon.ico                     - Fav icon
├── index.html                      - Index page
├── manifest.webapp                 - Application manifest
└── robots.txt                      - Configuration for bots and Web crawlers
```

使用[实体子生成器]({{ site.url }}/creating-an-entity/)创建名为`Foo`的新实体会在`src/main/webapp`下生成以下前端文件：

```
webapp
├── app                                        
│   ├── entities
│   │   └── foo                           - CRUD front-end for the Foo entity
│   │       ├── foo-details.vue           - Details SFC component
│   │       ├── foo-detail.component.ts   - Details page component
│   │       ├── foo-update.vue            - Creation / Update SFC component
│   │       ├── foo-update.component.ts   - Creation / Update component class
│   │       ├── foo.vue                   - Entity main SFC component
│   │       ├── foo.component.ts          - Entity main component class
│   │       └── foo.service.ts            - Foo entity service
│   ├── router
│   │   └── index.ts                      - Entity main routes configuration
│   └── shared
│       └── model
│           └── foo.model.ts              - Entity model class
└── i18n                                  - Translation files
     ├── en                               - English translations
     │   ├── foo.json                     - English translation of Foo name, fields, ...
     └── fr                               - French translations
         └── foo.json                     - French translation of Foo name, fields, ...
```

Please note that the default language translations would be based on what you have choosen during app generation. 'en' and 'fr' are shown here only for demonstration.

## 使用VuexStore进行存储

应用程序将使用存储[VuexStore](https://vuex.vuejs.org/guide/state.html)来维护应用程序内的状态。

该存储启动时在`app/config/config.ts:initVueXStore`中配置。请参考Vuex文档以添加新状态或变异。

该应用程序将使用存储来维护：

* 用户认证信息
* 语言和翻译
* 通知和警报信息
* 活动配置文件数据

## 鉴权

JHipster使用[Vue路由器](https://router.vuejs.org/)来组织应用程序的不同部分。

对于需要身份验证的路由，将在所需路由上使用`authorities`元数据。该组件将阻止任何未经身份验证或未经授权的用户访问路由。

这是PrivateRoute用法的示例：

``` typescript
const Routes = () => [{
      path: '/public',
      name: 'public',
      component: Public
    },
    {
      path: '/private',
      name: 'Private',
      component: Private,
      meta: { authorities: ['ROLE_USER'] }
    }];
```

如您所见，未经身份验证的用户可以访问`/public`，但是访问`/private`至少需要登录。

请注意，拦截器使用`$store.getters.authenticated`存储值来了解用户是否已通过身份验证。

## 校验系统

为了执行表单验证，我们使用[Vuelidate](https://vuelidate.netlify.com/)库。除了添加校验约束之外，还提供了一些过滤器，它们可以对表单进行全面验证。自定义验证可以这样添加：

```typescript
import { required } from 'vuelidate/lib/validators';

const mustBeCool = (value) => value.indexOf('cool') >= 0;
const validations = {
  foo: {
    required,
    mustBeCool
  }
};
@Component({
  validations
})
export default class FooComponent extends Vue {
  foo: string = null;
}
```

## Bootswatch主题

可以使用[Bootswatch](https://bootswatch.com)主题直接完成Bootstrap主题设置。现在，我们在生成期间提供选择，以选择Bootswatch提供的众多主题之一。
