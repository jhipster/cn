---
layout: default
title: Traefik
permalink: /traefik/
sitemap:
    priority: 0.7
    lastmod: 2017-09-27T00:00:00-00:00
---

# <i class="fa fa-exchange"></i> Traefik

## Traefik概述

[Traefik](https://traefik.io/)是一个现代的HTTP反向代理和负载均衡器，用于轻松部署微服务。

它可以像zuul那样路由HTTP请求，因此它与[JHipster gateway]({{ site.url }}/api-gateway/)有一些重叠， 但它的工作级别低于API Gateway: 它只路由HTTP请求，不提供速率限制、安全性或Swagger文档聚合。

One of the benefits of Traefik is that is can work with many different service discovery solutions: with JHipster, however, it only works with [Consul]({{ site.url }}/consul/) by default.

It can be used in two different architecture styles, described below.

## Architecture diagram 1: default configuration

As Traefik is a reverse proxy and load balancer, it supercedes Zuul, and it routes directly all HTTP requests to the correct service.

<img src="{{ site.url }}/images/microservices_architecture_detail.004.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

In that architecture, a JHipster "gateway" is not a real gateway anymore, it is mostly here to serve the Angular application.

This is our default configuration.

## Architecture diagram 2: Traefik and Zuul

Traefik can also work with Zuul: in that case, an HTTP request to a microservice goes through Traefik and then through Zuul before reaching its destination.

<img src="{{ site.url }}/images/microservices_architecture_detail.005.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

This makes one more network request, and thus is less efficient than the previous architecture. However, this allows to use a JHipster gateway to its full potential: it can handle rate limiting or Swagger documentation aggregation.

As a result, Traefik can be used as an edge service, which allows to scale JHipster gateways.

This configuration works out-of-the-box with JHipster: the only issue is that client-side applications use an absolute URL, so for example, for "microservice1":

- The default URL is "/microservice1", which goes only through Traefik (this is the "default configuration" above).
- The "/gateway/microservice1" URL would use the "gateway" application configured in Traefik, which would then use Zuul to reach the "microservice1" application.

## Getting started

Please note that Traefik only works with [Consul]({{ site.url }}/consul/), so this cannot work if you use a [JHipster Registry]({{ site.url }}/jhipster-registry/).

To use Traefik in a microservice architecture, run the [docker-compose sub-generator]({{ site.url }}/docker-compose/) and select Traefik when you have the question asking you which gateway you want to use.

This will generate a `traefik.yml` configuration for running Traefik in Docker, as well as a `traefik/traefik.toml` file, which is Traefik's configuration file.

This configuration file is set up so that:

- Traefik runs on port `80`, so if you have an application called `gateway`, you can reach it by going to [http://localhost/gateway/](http://localhost/gateway/).
- The Traefik administration UI is available on port `28080`, so you can visit it at [http://localhost:28080](http://localhost:28080).

As Traefik is using Consul, it will also be useful to check the Consul administration UI, which is available on port `8500`: [http://localhost:8500](http://localhost:8500).
