---
layout: default
title: 使用React
permalink: /using-react/
sitemap:
    priority: 0.7
    lastmod: 2018-04-02T23:41:00-00:00
---

# <i class="fa fa-html5"></i> 使用React (with Redux)
本节介绍与**React**一起使用的**Redux**JavaScript库

## 项目结构

JHipster客户机代码可以在`src/main/webapp`下找到，并严格遵循[Piotr Witek React style guide](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md).

如果您对我们的应用程序结构、文件名、打印脚本约定有任何疑问，请先阅读本指南…

对于react路由，我们遵循破折号命名约定，这样URL就干净一致了。

当您生成一个实体时，路由名称、路由URL和RESTAPI端点URL将根据此约定生成，并且在需要时，实体名称也将自动复数。

主要项目结构如下：

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

Using the [entity sub-generator]({{ site.url }}/creating-an-entity/) to create a new entity called `Foo` generates the following front-end files under `src/main/webapp`:

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

请注意，默认语言翻译将基于您在应用程序生成期间选择的内容。此处显示的“en”和“fr”仅供演示。

## Redux

[Redux](https://redux.js.org/)是JavaScript的可预测状态容器。它被用来与React一起管理React组件的状态。

基本上，redux提供了一个对象 **store** ，用于存储应用程序的整个状态。
要访问此存储并因此更新状态组件，唯一的方法是
**操作** 描述请求更新的事实，然后 **减速器** 将
定义如何响应这些操作更新状态。

Here is an example of a reducer:

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

为了访问存储并更新当前应用程序状态，需要调度
对商店的操作，如前所述。操作是简单的javascript对象，必须具有**类型**，它描述了
该操作将执行，通常它们也有一个 **有效载荷** ，对应于
要传递到存储区的数据。

Here is an action to access the store:

``` typescript
const apiUrl = SERVER_API_URL + '/api/foos';

// Action
export const getFoos = () => ({
  type: ACTION_TYPES.FETCH_FOOS,
  payload: axios.get(apiUrl)
});
```

上面描述的操作表明我们希望通过
发送GET请求。操作类型将匹配
请注意，**export** 关键字用于使连接的组件能够使用该操作。
必要时（例如，每次更新组件时）。

## Authorizations

Jhipster uses the [React router](https://github.com/ReactTraining/react-router) to organize the differents parts of your application.

当涉及到需要身份验证的路由时，将使用生成的`privateroute`组件。此组件只会阻止任何未经身份验证的用户访问路由。

Here is an example of PrivateRoute usage:

``` typescript
const Routes = () => (
  <div className="view-routes">
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/account" component={Account} />
  </div>
);
```

如您所见，未经身份验证的用户可以访问`/`和`/login`但访问`/account`需要登录。

请注意，privateroute使用`authentication.isAuthenticated` 存储值来确定用户是否已通过身份验证。

## 通知系统

JHipster uses [react-toastify](https://github.com/fkhadra/react-toastify) alerts for the notification system.

默认情况下，只要创建/更新/删除实体，JHipster就会显示成功通知。
以及从响应中捕获错误时的错误通知。

## React JHipster库

[react-jhipster](https://github.com/jhipster/react-jhipster) 库为生成的应用程序提供实用程序和通用服务。它还可以处理i18n。
