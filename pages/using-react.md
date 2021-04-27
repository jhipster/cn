---
layout: default
title: 使用React
permalink: /using-react/
sitemap:
    priority: 0.7
    lastmod: 2018-04-02T23:41:00-00:00
---

# <i class="fa fa-html5"></i> 使用React（与Redux）
本部分引用与**Redux**一起使用的JavaScript库**React**。

## 项目结构

您可以在`src/main/webapp`下找到JHipster前端代码，该代码与[Piotr Witek React样式指南](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md)密切相关。

如果您对我们的应用程序结构、文件名、TypeScript约定有任何疑问，请先阅读本指南。

对于React路由，我们遵循破折号命名约定，以便URL干净且一致。
当您生成实体时，将根据此约定生成路由名称，路由URL和REST API端点URL，并且实体名称也会在需要时自动复数。

这是主要的项目结构：

```
webapp
├── app                             - Your application
│   ├── config                      - General configuration (redux store, middleware, etc.)
│   ├── entities                    - Generated entities
│   ├── modules                     - Main components directory
│   │   ├── account                 - Account related components
│   │   ├── administration          - Administration related components
│   │   ├── home                    - Application homepage
│   │   └── login                   - Login related components
│   ├── shared                      - Shared elements such as your header, footer, reducers, models and util classes
│   ├── app.scss                    - Your global application stylesheet if you choose the Sass option
│   ├── app.css                     - Your global application stylesheet
│   ├── app.tsx                     - The application main class
│   ├── index.tsx                   - Index script
│   ├── routes.tsx                  - Application main routes
│   └── typings.d.ts                -
├── i18n                            - Translation files
├── static                          - Contains your static files such as images and fonts
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
│   └── entities
│       ├── foo                           - CRUD front-end for the Foo entity
│       │   ├── foo-delete-dialog.tsx     - Delete dialog component
│       │   ├── foo-detail.tsx            - Detail page component
│       │   ├── foo-dialog.tsx            - Creation dialog component
│       │   ├── foo.reducer.ts            - Foo entity reducer
│       │   ├── foo.tsx                   - Entity main component
│       │   └── index.tsx                 - Entity main routes
│       └── index.tsx                     - Entities routes    
└── i18n                                  - Translation files
     ├── en                               - English translations
     │   ├── foo.json                     - English translation of Foo name, fields, ...
     └── fr                               - French translations
         └── foo.json                     - French translation of Foo name, fields, ...
```

请注意，默认语言翻译将基于您在应用生成过程中选择的语言。在此处仅显示'en'和'fr'以进行演示。

## Redux

[Redux](https://redux.js.org/)是一个用于应用程序状态管理的开源JavaScript库。它与React一起使用来管理React组件的状态。

Redux提供了一个对象**store**，用于存储应用程序的整个状态。
要访问此存储并因此更新状态组件，唯一的方法是调度描述请求更新的**actions**，
然后**reducers**将定义如何响应这些操作来更新状态。

这是`reducers`的示例：

``` typescript
export const ACTION_TYPES = {
  FETCH_FOOS: 'foo/FETCH_FOOS',
};

const initialState = {
  loading: false,
  foos: [],
  updateSuccess: false,
  updateFailure: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        updateSuccess: false,
        updateFailure: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        updateFailure: false,
        foos: action.payload.data
      };
    default:
      return state;
  }
};
```

为了访问您的商店并更新当前应用程序状态，您需要如前所述，将操作分派到商店。动作是JavaScript对象，并且必须具有描述动作将要执行的操作的**type**，通常，它们还具有与要传递给存储的数据相对应的**payload**。

这是访问商店的操作：

``` typescript
const apiUrl = SERVER_API_URL + '/api/foos';

// Action
export const getFoos = () => ({
  type: ACTION_TYPES.FETCH_FOOS,
  payload: axios.get(apiUrl)
});
```

上述动作表明我们要通过发送GET请求来检索所有Foo对象。操作类型将匹配。
请注意，**export**关键字用于使连接的组件能够在必要时使用该操作（例如，每次更新组件时）。

## 鉴权

Jhipster使用[React路由器](https://github.com/ReactTraining/react-router)来组织应用程序的不同部分。

当涉及需要身份验证的路由时，将使用生成的`PrivateRoute`组件。该组件将阻止任何未经身份验证的用户访问路由。

这是PrivateRoute用法的示例：

``` typescript
const Routes = () => (
  <div className="view-routes">
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/account" component={Account} />
  </div>
);
```

如您所见，未经身份验证的用户可以访问`/`和`/login`，但是访问`/account`需要登录。

请注意，PrivateRoute使用`authentication.isAuthenticated`存储值来了解用户是否已通过身份验证。

## 通知系统

JHipster使用[react-toastify](https://github.com/fkhadra/react-toastify)为通知系统提供告警。

默认情况下，每当创建/更新/删除实体时，JHipster都会显示成功通知，而从响应中捕获到错误时，JHipster将显示错误通知。

## React JHipster库

[react-jhipster](https://github.com/jhipster/react-jhipster)库为生成的应用程序提供实用程序和通用服务。它也处理i18n。
