---
layout: default
title: 技术栈
permalink: /tech-stack/
redirect_from:
  - /tech_stack.html
sitemap:
    priority: 0.8
    lastmod: 2014-05-16T00:00:00-00:00
---

# <i class="fa fa-stack-overflow"></i> 技术栈

## 前端技术栈

单页应用:

*   [Angular](https://angular.io/)或[React](https://reactjs.org/) 或[Vue](https://vuejs.org/)
*   基于[推特Bootstrap](http://getbootstrap.com/)自适应Web设计
*   [HTML5 Boilerplate模板](http://html5boilerplate.com/)
*   现代浏览器兼容 (Chrome, FireFox, Microsoft Edge...)
*   完整国际化支持
*   可选的[Sass](https://www.npmjs.com/package/node-sass)支持
*   基于Sprint websocket组件可选的Websocket支持

优秀的开发工作流:

*   使用[NPM](https://www.npmjs.com/get-npm)安装最新的JavaScript库
*   使用[Webpack](https://webpack.js.org/)构建，优化和热重载
*   基于[Jest](https://facebook.github.io/jest/)和[Protractor](http://www.protractortest.org)测试

单页应用不能满足你的需求？

*   支持 [Thymeleaf](http://www.thymeleaf.org/)模板引擎，在服务端生成Web页面

## 后端技术栈

完整的[Spring应用](http://spring.io/):

*   基于[Spring Boot](http://projects.spring.io/spring-boot/)提供应用配置
*   [Maven](http://maven.apache.org/)或[Gradle](http://www.gradle.org/)构建，测试，运行应用
*   [开发与生产配置文件分离]({{ site.url }}/profiles/) (同时支持Maven和Gradle)
*   [Spring Security组件](http://docs.spring.io/spring-security/site/index.html)
*   [Spring MVC REST](http://spring.io/guides/gs/rest-service/) + [Jackson](https://github.com/FasterXML/   jackson)
*   基于Sprint websocket组件, 可选的Websocket支持
*   [Spring Data JPA](http://projects.spring.io/spring-data-jpa/)和Bean校验
*   基于[Liquibase](http://www.liquibase.org/)数据库更新
*   [Elasticsearch](https://github.com/elastic/elasticsearch)支持，如果你需要基于你的数据库提供高级搜索能力
*   [MongoDB](http://www.mongodb.org)和[Couchbase](https://www.couchbase.com) 支持, 如果你想使用面向文档的NOSQL数据库替代JPA
*   [Cassandra](http://cassandra.apache.org/)支持, 如果你想使用面向列的NOSQL数据库替代JPA
*   [Kafka](http://kafka.apache.org/)支持, 如果你需要一个消息发布订阅系统

## 微服务技术栈

微服务是可选的，但完全支持:

* HTTP路由使用[Spring Cloud Gateway](https://github.com/spring-cloud/spring-cloud-gateway)
* 基于[Netflix Eureka](https://github.com/Netflix/eureka)或 [HashiCorp Consul](https://www.consul.io/)的服务发现

## 适应生产环境:

*   使用[Metrics](http://metrics.dropwizard.io/)和[ELK Stack](https://www.elastic.co/products)监控
*   使用[ehcache](http://ehcache.org/)(本地缓存), [Caffeine](https://github.com/ben-manes/caffeine) (本地缓存), [Hazelcast](http://www.hazelcast.com/)、 [Infinispan](http://infinispan.org/)、 [Memcached](https://memcached.org/) 或者 [Redis](https://redis.io/)提供缓存
*   静态资源优化 (gzip filter, HTTP cache headers)
*   使用[Logback](http://logback.qos.ch/)管理日志，可在运行时配置日志输出
*   使用[HikariCP](https://github.com/brettwooldridge/HikariCP)连接库带来极致的性能提升
*   构建标准WAR文件或者可执行的JAR文件
*   完整的Docker和Docker Compose支持
*   支持所有主流的云服务提供商: AWS, Cloud Foundry, GCP, Heroku, Kubernetes, OpenShift, Azure, Docker…
