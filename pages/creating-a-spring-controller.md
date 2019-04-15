---
layout: default
title: 创建控制器
permalink: /creating-a-spring-controller/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 创建Spring控制器

## Introduction

_Note: 子生成器比[entity sub-generator]({{ site.url }}/creating-an-entity/) 创建完整的CRUD实体类更简单_

子生成器生成Spring MVC REST 控制器. 它还可以创建简单的REST方法。

为了生成 "Foo" Spring MVC REST 控制器, 只需键入:

`jhipster spring-controller Foo`

子生成器将询问您要生成哪个方法：只需回答您要使用的方法名和HTTP动词，然后将生成一个简单的方法。

## Can we document this Spring MVC REST Controller with Swagger?

对！事实上，已经完成了！在“dev”模式下，只需使用“administration>api”菜单访问Swagger UI并开始使用生成的控制器。

## Can we add security to Spring MVC REST Controllers?

对！只需在类或方法上添加spring security的“@secured”注释，并使用提供的“authoritiescostants”类限制对特定用户权限的访问。

## Can we proxy it from our Microservice Gateway dev server?

Yes! By adding the servicename to the context of the proxy in webpack/webpack.dev.js
```javascript
module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './target/www',
        proxy: [{
            context: [
                '/<servicename>',
                /* jhipster-needle-add-entity-to-webpack - JHipster will add entity api paths here */
                ....
```
